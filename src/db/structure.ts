import { DB_NAME, DB_VERSION } from "./consts";
import { Structure } from "@app/adapters/IDB";
import { createColumn, createMultiColumnIndex } from "./helpers";

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
        createColumn("hasPinProtection"),
        createColumn("pinCode"),
        createColumn("avatar"),
        createColumn("primaryCurrency"),
        createColumn("createdAt"),
        createColumn("updatedAt"),
      ],
      complexIndices: [
        createMultiColumnIndex(["email", "password"]),
        createMultiColumnIndex(["email", "id" ]),
        createMultiColumnIndex(["email", "pinCode"]),
        createMultiColumnIndex(["id", "pinCode"]),
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
        createMultiColumnIndex(["category", "user"]),
        createMultiColumnIndex(["tranactionDate", "user"]),
        createMultiColumnIndex(["account", "tranactionDate"]),
        createMultiColumnIndex(["type", "user"]),
        createMultiColumnIndex(["category", "type", "user"]),
        createMultiColumnIndex(["account", "category", "user"]),
        createMultiColumnIndex(["account", "user"]),
        createMultiColumnIndex(["account", "type", "user"]),
        createMultiColumnIndex(["account", "category", "type", "user"]),
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
        createMultiColumnIndex(["id", "user"]),
        createMultiColumnIndex(["currency", "user"]),
        createMultiColumnIndex(["primary", "user"]),
      ]
    },
    {
      name: "tasks",
      config: defaultTableConfig,
      version: 1,
      fields: [
        createColumn("originalId"),
        createColumn("user"),
        createColumn("title"),
        createColumn("isRecurring"),
        createColumn("startDate"),
        createColumn("endDate"),
        createColumn("weekday"),
        createColumn("time"),
        createColumn("doneAt"),
        createColumn("createdAt"),
        createColumn("updatedAt"),
      ],
      complexIndices: [
        createMultiColumnIndex(["id", "user"]),
        createMultiColumnIndex(["user", "weekday"]),
        createMultiColumnIndex(["user", "startDate"]),
        createMultiColumnIndex(["user", "endDate"]),
        createMultiColumnIndex(["user", "startDate", "endDate"]),
      ]
    }
  ]
};

export default structure;
