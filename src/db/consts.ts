import { DbTable } from "./types";

const defaultTableConfig = {
  keyPath: "id",
  autoIncrement: true
};
export const DB_NAME = "money_and_todo_management";
export const TABLES: DbTable[] = [
  {
    name: "users",
    config: defaultTableConfig,
    fields: [
      { key: "email", unique: true },
      { key: "firstName", unique: false },
      { key: "lastName", unique: false },
      { key: "password", unique: false },
      { key: "avatar", unique: false },
      { key: "lang", unique: false },
      { key: "currency", unique: false },
      { key: "theme", unique: false },
      { key: "createdAt", unique: false },
    ],
    complexIndices: [
      { fields: ["email", "password"], unique: false }
    ]
  },
  {
    name: "transactions",
    config: defaultTableConfig,
    fields: [
      { key: "title", unique: false },
      { key: "user", unique: false },
      { key: "category", unique: false },
      { key: "amount", unique: false },
      { key: "type", unique: false },
      { key: "currency", unique: false },
      { key: "createdAt", unique: false },
    ]
  },
  {
    name: "counters",
    config: defaultTableConfig,
    fields: [
      { key: "user", unique: false },
      { key: "field", unique: false },
      { key: "value", unique: false }
    ]
  }
];
