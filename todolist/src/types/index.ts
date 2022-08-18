import { Dispatch, SetStateAction } from "react";

export interface ITodo {
    idx: string;
    state: "TODO" | "DONE";
    context: string;
  }
  
export interface ITodoList {
    type?: 'ALL' | "TODO" | "DONE";
    todoList: ITodo[];
    setTodoList: Dispatch<SetStateAction<ITodo[]>>;
  }