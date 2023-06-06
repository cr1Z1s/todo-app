import { useContext } from "react";
import { TodoContext } from "../../context/todo-context";
import TodoItem from "../todo-item";

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  if (todos.length === 0)
    return (
      <div className="pt-4 text-center text-gray-500 text-xl font-medium tracking-widest uppercase">
        <h1>No Todos</h1>
      </div>
    );

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
