import type { IDBAdapter } from "./adapter";
import { UpdateData, SearchCondition, CreatedRecord } from "./types";

/** Wrapper for IDBAdapter which manages certain collection */
export class IDBCollection<T> {
  constructor(private db: IDBAdapter, public collection: string) { }

  queryAll(condition?: SearchCondition) {
    return this.db.queryAll<T>(this.collection, condition);
  }

  async queryOne(condition: SearchCondition) {
    return this.db.queryOne<T>(this.collection, condition);
  }

  create<T>(data: T): Promise<CreatedRecord<T>> {
    return this.db.create<T>(this.collection, data);
  }

  update(condition: SearchCondition, updateData: UpdateData<T>) {
    return this.db.update(this.collection, condition, updateData);
  }

  delete(id: string | number) {
    return this.db.delete(this.collection, id);
  }
}