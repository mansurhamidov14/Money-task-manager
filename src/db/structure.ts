import { DB_NAME, DB_VERSION } from "./consts";
import { Structure } from "@app/adapters/IDB";
import { createColumn } from "./helpers";

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
        createColumn("email", 1, true),
        createColumn("firstName"),
        createColumn("lastName"),
        createColumn("password"),
        createColumn("avatar"),
        createColumn("primaryCurrency"),
        createColumn("createdAt"),
        createColumn("updatedAt"),
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
        createColumn("title"),
        createColumn("user"),
        createColumn("category"),
        createColumn("amount"),
        createColumn("type"),
        createColumn("account"),
        createColumn("currency"),
        createColumn("transactionDate"),
        createColumn("transactionDateTime"),
        createColumn("createdAt"),
        createColumn("updatedAt"),
      ],
      complexIndices: [
        { fields: ["category", "user"], unique: false, version: 1 },
        { fields: ["tranactionDate", "user"], unique: false, version: 1 },
        { fields: ["account", "tranactionDate"], unique: false, version: 1 },
        { fields: ["type", "user"], unique: false, version: 1 },
        { fields: ["category", "type", "user"], unique: false, version: 1 },
        { fields: ["account", "category", "user"], unique: false, version: 1 },
        { fields: ["account", "type", "user"], unique: false, version: 1 },
        { fields: ["account", "category", "type", "user"], unique: false, version: 1 },
      ]
    },
    {
      name: "accounts",
      config: defaultTableConfig,
      version: 1,
      fields: [
        createColumn("user"),
        createColumn("title"),
        createColumn("currency"),
        createColumn("balance"),
        createColumn("primary"),
        createColumn("skin"),
        createColumn("createdAt"),
        createColumn("updatedAt"),
      ],
      complexIndices: [
        { fields: ["currency", "user"], unique: false, version: 1 },
        { fields: ["primary", "user"], unique: false, version: 1 },
      ]
    }
  ]
}

export default structure;
