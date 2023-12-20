import { DB_NAME, DB_VERSION } from "./consts";
import { Structure } from "@app/adapters/IDB";

const defaultTableConfig = {
  keyPath: "id",
  autoIncrement: true
};

const structure: Structure = {
  name: DB_NAME,
  version: DB_VERSION,
  collections: [
    {
      name: "users",
      config: defaultTableConfig,
      version: 1,
      fields: [
        { key: "email", unique: true, version: 1 },
        { key: "firstName", unique: false, version: 1 },
        { key: "lastName", unique: false, version: 1 },
        { key: "password", unique: false, version: 1 },
        { key: "avatar", unique: false, version: 1 },
        { key: "primaryCurrency", unique: false, version: 1 },
        { key: "createdAt", unique: false, version: 1 },
      ],
      complexIndices: [
        { fields: ["email", "password"], unique: false, version: 1 },
        { fields: ["email", "id" ], unique: false, version: 1 }
      ]
    },
    {
      name: "transactions",
      config: defaultTableConfig,
      version: 1,
      fields: [
        { key: "title", unique: false, version: 1 },
        { key: "user", unique: false, version: 1 },
        { key: "category", unique: false, version: 1 },
        { key: "amount", unique: false, version: 1 },
        { key: "type", unique: false, version: 1 },
        { key: "currency", unique: false, version: 1 },
        { key: "createdAt", unique: false, version: 1 },
      ],
      complexIndices: [
        { fields: ["category", "user"], unique: false, version: 1 },
        { fields: ["type", "user"], unique: false, version: 1 },
        { fields: ["category", "type", "user"], unique: false, version: 1 },
      ]
    },
    {
      name: "counters",
      config: defaultTableConfig,
      version: 1,
      fields: [
        { key: "user", unique: false, version: 1 },
        { key: "field", unique: false, version: 1 },
        { key: "value", unique: false, version: 1 }
      ],
      complexIndices: [
        { fields: ["field", "user"], unique: true, version: 1 }
      ]
    }
  ]
}

export default structure;
