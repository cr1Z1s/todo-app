import { useContext, useState } from "react";
import { TodoContext } from "../../context/todo-context";

const Input = () => {
  const [inputValue, setInputValue] = useState("");

  const { setTodos } = useContext(TodoContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const mutateData = async ({
    url,
    inputValue,
  }: {
    url: string;
    inputValue: string;
  }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputValue }),
    });

    const data = await response.json();

    if (data) {
      setTodos((t) => [...t, data.todo]);
    }
  };

  const addTodo = () => {
    if (inputValue) {
      mutateData({ url: "http://localhost:1337/todos/create", inputValue });
    }
    setInputValue("");
  };

  const handleClick = () => {
    addTodo();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex gap-x-1">
      <div className="flex-1">
        <input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          name="todo"
          type="text"
          placeholder="Add a new todo"
          className="p-2 w-full focus:outline-none border-purple-400 focus:border-purple-800  border-2 rounded transition-colors"
        />
      </div>

      <button
        onClick={handleClick}
        type="button"
        className="focus:outline-none text-white bg-purple-700 active:bg-purple-600 hover:bg-purple-800 rounded px-5 py-2"
      >
        Add Todo
      </button>
    </div>
  );
};

export default Input;
