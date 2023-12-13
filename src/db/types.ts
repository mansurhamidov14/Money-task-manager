export type DbTableField = {
  key: string;
  unique: boolean;
}

export type DbTableConfig = {
  keyPath: string;
  autoIncrement: boolean;
}

export type ComlexIndex = {
  fields: string[];
  unique: boolean;
}

export type DbTable = {
  name: string;
  config: DbTableConfig;
  fields: DbTableField[];
  complexIndices?: ComlexIndex[]; 
}

export type CreatedRecord<T> = Promise<{ id: number } & T>;
