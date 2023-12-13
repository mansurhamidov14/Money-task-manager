type Upgradable<T> = {
  version: number;
} & T;

export type DbTableField = Upgradable<{
  key: string;
  unique: boolean;
}>;

export type DbTableConfig = {
  keyPath: string;
  autoIncrement: boolean;
};

export type ComlpexIndex = Upgradable<{
  fields: string[];
  unique: boolean;
}>;

export type DbTable = Upgradable<{
  name: string;
  config: DbTableConfig;
  fields: DbTableField[];
  complexIndices?: ComlpexIndex[]; 
}>;

export type CreatedRecord<T> = Promise<{ id: number } & T>;
