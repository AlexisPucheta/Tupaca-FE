import { STATUS } from "../enums";
export interface Task {
    title: string;
    description?: string;
    status: STATUS
    updatedAt?: string,
    createdAt:string,
    index: number
  }
  export interface TaskWithId extends Task {
    id: string;
  }
  export interface TasksFromBE {
    toDo: TaskWithId[],
    inProgress: TaskWithId[],
    done: TaskWithId[]
  }