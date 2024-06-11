import { Repository, DataSource } from "typeorm";
import { Task } from "../entities/task-entity";

export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.manager);
  }
}
