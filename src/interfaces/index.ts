import { STATUS } from "../enums";

export interface Task {
    title: string;
    description?: string;
    status: STATUS
    updatedAt?: string,
    createdAt:string,
    __v?: number,
    index: number
  }
  
  export interface TaskWithId extends Task {
    _id: string;
  }
  
  export interface TasksFromBE {
    ToDo: TaskWithId[],
    InProgress: TaskWithId[],
    Done: TaskWithId[]
  }