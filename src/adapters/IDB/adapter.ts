import { CreatedRecord, Structure, SearchCondition, UpdateData } from "./types";

/** Wrapper for IndexedDB */
export class IDBAdapter {
  constructor(private structure: Structure) { }

  async queryAll<T>(
    collection: string,
    condition?: SearchCondition<T>
  ): Promise<T[]> {
    const { db, data } = await this.makeQuery<T>(collection, condition);
    db.close();
    return data;
  }

  private async makeQuery<T>(collection: string, condition?: SearchCondition<T>, transactionMode?: IDBTransactionMode): Promise<{db: IDBDatabase,objectStore: IDBObjectStore,data: T[]}> {
    const db = await this.openDbConnection();
    const transaction = db.transaction(collection, transactionMode ?? "readonly");
    const objectStore = transaction.objectStore(collection);

    return new Promise((resolve, reject) => {
      let getRequest: IDBRequest<T[]>;
      if (typeof condition === "object") {
        const { accessor, searchValues } = this.getQueryFilters(condition);
        getRequest = objectStore.index(accessor).getAll(searchValues);
      } else {
        getRequest = objectStore.getAll(condition ? IDBKeyRange.only(condition) : undefined);
      }

      getRequest.onsuccess = () => {
        const data = getRequest.result as T[];
        resolve({
          data,
          db,
          objectStore
        });
      }

      getRequest.onerror = () => {
        const error = getRequest.error;
        db.close();
        reject(error);
      }
    });
  }

  async queryOne<T>(collection: string, condition: SearchCondition<T>): Promise<T | null> {
    const result = await this.queryAll<T>(collection, condition);
    return result[0] ?? null;
  }
  
  async update<T>(
    collection: string,
    condition: SearchCondition<T>,
    updateData: UpdateData<T>
  ) {
    const { db, objectStore, data } = await this.makeQuery<T>(collection, condition, "readwrite");
    const updatedAt = Date.now();
    const promises = data.reduce((acc, val) => {
      const updatedData = typeof updateData === "function"
        ? updateData(val)
        : { ...val, ...updateData };
      return acc.then(() => this.updateRecord(objectStore, { ...updatedData, updatedAt }))
    }, Promise.resolve() as Promise<any>);
    return promises.then(() => {
      db.close();
      return true;
    });
  }

  async create<T>(collection: string, data: T): Promise<CreatedRecord<T>> {
    const db = await this.openDbConnection();
    const transaction = db.transaction(collection, "readwrite");
    const objectStore = transaction.objectStore(collection);
    const createdAt = new Date().getTime();
    const updatedAt = createdAt;

    return new Promise((resolve, reject) => {
      const request = objectStore.add({ ...data, createdAt, updatedAt });

      request.addEventListener("success", () => {
        const id = request.result as number;
        db.close();
        resolve({ id, createdAt, updatedAt, ...data }) as T;
      });

      request.addEventListener("error", () => {
        const error = request.error;
        console.log("err", error);
        db.close();
        reject(error);
      });
    })
  }

  private async openDbConnection(): Promise<IDBDatabase> {
    const openOrCreateDB = window.indexedDB.open(this.structure.name, this.structure.version);

    return new Promise((res, rej) => {
      openOrCreateDB.addEventListener("success", () => {
        const db = openOrCreateDB.result;
        res(db);
      });
      
      openOrCreateDB.addEventListener("upgradeneeded", (event) => {
        const db = openOrCreateDB.result;
      
        db.onerror = () => {
          rej("Error loading database.")
        };
      
        this.structure.collections.forEach(tableData => {
          let table: IDBObjectStore
          if (tableData.version > event.oldVersion) {
            table = db.createObjectStore(tableData.name, tableData.config);
          } else {
            const target = event.target as IDBOpenDBRequest;
            table = target!.transaction!.objectStore(tableData.name) as IDBObjectStore;
          }
          tableData.fields.forEach(field => {
            if (field.version > event.oldVersion) {
              table.createIndex(field.key, field.key, { unique: field.unique });
            }
          });
          tableData.complexIndices?.forEach(({ fields, unique, version }) => {
            if (version > event.oldVersion) {
              table.createIndex(fields.join(", "), fields, { unique })
            }
          });
        });
      });
    })
  }

  public async delete<T>(collection: string, condition: SearchCondition<T>) {
    const { db, objectStore, data } = await this.makeQuery<{ id: number }>(collection, condition, "readwrite");
    
    const promises = data.reduce((acc, val) => {
      return acc.then(() => objectStore.delete(val.id));
    }, Promise.resolve() as Promise<any>);

    return promises.then(() => {
      db.close();
      return true;
    });
  }

  private async updateRecord<T>(objectStore: IDBObjectStore, data: T): Promise<T> {
    return new Promise((resolve) => {
      const updateRequest = objectStore.put(data);

      updateRequest.addEventListener("success", () => {
        resolve(data);
      });

      updateRequest.addEventListener("error", () => {
        // TODO: Prettify error message
        console.error("Can not update record");
      });
    });
  }

  private getQueryFilters<T>(condition: Partial<T>): { accessor: string, searchValues: any | any[] } {
    const keys = Object.keys(condition).toSorted() as (keyof Partial<T>)[];
    const searchValues = keys.map(key => condition[key]);

    return {
      accessor: keys.join(", "),
      searchValues: searchValues.length === 1 ? searchValues[0] : searchValues 
    };
  }
}
