import { DB_NAME, TABLES } from "./consts";
import { CreatedRecord } from "./types";

export class Database {
  constructor(private dbName: string) {}

  async queryAll<T>(collection: string, condition?: [accessor: string | string[], value: any]): Promise<T[]> {
    const db = await this.openDbConnection();
    const transaction = db.transaction(collection, "readonly");
    const objectStore = transaction.objectStore(collection);

    return new Promise((resolve, reject) => {
      let getRequest: IDBRequest<T[]>;
      if (condition) {
        const accessor = Array.isArray(condition[0]) ? condition[0].join(', ') : condition[0];
        getRequest = objectStore.index(accessor).getAll(condition[1]);
      } else {
        getRequest = objectStore.getAll();
      }

      getRequest.onsuccess = () => {
        const result = getRequest.result as T[];
        db.close();
        resolve(result);
      }

      getRequest.onerror = () => {
        const error = getRequest.error;
        db.close();
        reject(error);
      }
    });
  }

  async getById<T>(collection: string, id: string | number): Promise<T | null> {
    const db = await this.openDbConnection();
    const transaction = db.transaction(collection, "readonly");
    const objectStore = transaction.objectStore(collection);

    return new Promise((resolve, reject) => {
      const getRequest = objectStore.get(id);
      getRequest.onsuccess = () => {
        const result = getRequest.result as T;
        db.close();
        resolve(result);
      }
      getRequest.onerror = () => {
        const error = getRequest.error;
        db.close();
        reject(error);
      }
    });
  } 

  async create<T>(collection: string, data: T): CreatedRecord<T> {
    const db = await this.openDbConnection();
    const transaction = db.transaction(collection, "readwrite");
    const objectStore = transaction.objectStore(collection);

    return new Promise((resolve, reject) => {
      const request = objectStore.add(data);

      request.addEventListener("success", () => {
        const id = request.result as number;
        db.close();
        resolve({ id, ...data });
      });

      request.addEventListener("error", () => {
        const error = request.error;
        db.close();
        reject(error);
      });
    })
  }

  private async openDbConnection(): Promise<IDBDatabase> {
    const openOrCreateDB = window.indexedDB.open(this.dbName, 1);

    return new Promise((res, rej) => {
      openOrCreateDB.addEventListener("success", () => {
        const db = openOrCreateDB.result;
        res(db);
      });
      
      openOrCreateDB.addEventListener("upgradeneeded", () => {
        const db = openOrCreateDB.result;
      
        db.onerror = () => {
          rej("Error loading database.")
        };
      
        TABLES.forEach(tableData => {
          const table = db.createObjectStore(tableData.name, tableData.config);
          tableData.fields.forEach(field => {
            table.createIndex(field.key, field.key, { unique: field.unique });
          });
          tableData.complexIndices?.forEach(({ fields, unique }) => {
            table.createIndex(fields.join(", "), fields, { unique })
          });
        });
      });
    })
  }
}

export const database = new Database(DB_NAME);
