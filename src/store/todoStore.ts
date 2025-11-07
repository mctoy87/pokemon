import { create } from "zustand";

//определим интерфейс задачи
interface Todo {
  id: number;
  text: string;
}

//определим интерфейс списка задач 
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
}

//создадим store
export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {id: Date.now(), text}],
  })),

  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id),
  })),
}));

