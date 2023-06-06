import { useContext } from "react";
import { Todo } from "../../types/todo";
import { TodoContext } from "../../context/todo-context";

type Props = Todo;

const TodoItem = ({ _id, text, completed }: Props) => {
  const { setTodos } = useContext(TodoContext);

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const response = await fetch(`http://localhost:1337/todos/update/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, completed: e.target.checked }),
    });

    const data = await response.json();

    if (response.ok) {
      setTodos((t) =>
        t.map((todo) => {
          if (todo._id === data.todo._id) {
            return data.todo;
          }
          return todo;
        })
      );
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:1337/todos/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setTodos((t) => t.filter((t) => t._id !== data.todo._id));
    }
  };

  return (
    <div className="flex items-center my-4">
      <input
        id={`checkbox-${_id}`}
        aria-describedby={`helper-checkbox-${_id}`}
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
        className="w-4 h-4 rounded me-2"
      />

      <label htmlFor="checkbox" className="w-full flex-1">
        {completed ? <s>{text}</s> : text}
      </label>

      <span
        onClick={handleDelete}
        className="cursor-pointer rounded hover:bg-purple-400"
      >
        ✖
      </span>
    </div>
  );
};

export default TodoItem;
