import { OneTimeTask, RecurringTask, Task } from "@app/entities";
import { TaskFormSchema } from "@app/schemas";
import { HttpService } from "./HttpService";
import { HttpResponse } from "./types";

export class TaskService {
  constructor (private http: HttpService) { }

  create(task: TaskFormSchema) {
    return this.http.post<void>(`/task/new`, task);
  }

  update(id: Task['id'], data: TaskFormSchema) {
    return this.http.patch(`/task/${id}`, data);
  }

  async getById(id: string): Promise<HttpResponse<RecurringTask | OneTimeTask>> {
    return this.http.get<RecurringTask | OneTimeTask>(`/task/${id}`);
  }

  async getList(): Promise<HttpResponse<Task[]>> {
    return this.http.get<Task[]>(`/task/list`);
  }

  toggleDone(id: Task['id'], doneAt: number) {
    return this.http.patch(`/task/${id}/done`, { doneAt });
  }

  delete(id: Task['id'], hard?: boolean) {
    return this.http.delete(`/task/${id}`, { params: { hard } });
  }
}
