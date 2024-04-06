import { Task } from "@app/entities";
import { IDBAdapter, IDBCollection } from "@app/adapters/IDB";
import structure from "./structure";

export const dbConnection = new IDBAdapter(structure);
export const taskCollection = new IDBCollection<Task>(dbConnection, "tasks");
// @ts-ignore
window.db = dbConnection;