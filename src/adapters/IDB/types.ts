type Upgradable<T> = {
  version: number;
} & T;

export type TableField = Upgradable<{
  key: string;
  unique: boolean;
}>;

export type TableConfig = {
  keyPath: string;
  autoIncrement: boolean;
};

export type ComlpexIndex = Upgradable<{
  fields: string[];
  unique: boolean;
}>;

export type Collection = Upgradable<{
  name: string;
  config: TableConfig;
  fields: TableField[];
  complexIndices?: ComlpexIndex[]; 
}>;

export type Structure = Upgradable<{
  name: string;
  collections: Collection[];
}>;

export type SearchCondition = [accessor: string | string[], value: any] | number | string;

export type UpdateData<T> = ((prevValue: T) => T) | Partial<T>;

export type CreatedRecord<T> = Promise<{ id: number } & T>;
