import type { IDBAdapter } from "./adapter";
import { UpdateData, SearchCondition, CreatedRecord } from "./types";

/** Wrapper for IDBAdapter which manages certain collection */
export class IDBCollection<T> {
  constructor(private db: IDBAdapter, public collection: string) { }

  queryAll(condition?: SearchCondition<T>) {
    return this.db.queryAll<T>(this.collection, condition);
  }

  async queryOne(condition: SearchCondition<T>) {
    return this.db.queryOne<T>(this.collection, condition);
  }

  create<T>(data: T): Promise<CreatedRecord<T>> {
    const createdAt = Date.now();
    return this.db.create<T>(this.collection, {
      ...data,
      createdAt,
      updatedAt: createdAt
    });
  }

  update(condition: SearchCondition<T>, updateData: UpdateData<T>) {
    return this.db.update(this.collection, condition, updateData);
  }

  delete(condition: SearchCondition<T>) {
    return this.db.delete(this.collection, condition);
  }
}