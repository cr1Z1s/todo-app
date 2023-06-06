import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useFetch } from "../hooks/use-fetch";
import { Todo } from "../types/todo";

type ContextValues = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { data } = useFetch({
    url: "http://localhost:1337/todos/get",
    method: "GET",
  });

  useEffect(() => {
    if (!data) return;
    setTodos(data?.todos);
  }, [data]);

  const contextValues = { todos, setTodos };

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

export const TodoContext = createContext<ContextValues>({} as ContextValues);
