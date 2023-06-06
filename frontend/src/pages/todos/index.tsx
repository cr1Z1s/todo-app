import Input from "../../components/todo-input";
import TodoList from "../../components/todo-list";

const Todos = () => {
  return (
    <div className="flex flex-col items-center h-screen p-10">
      <h1 className="text-2xl font-bold text-purple-800 text-center">Todos</h1>
      <div className="w-96 mx-auto my-8 rounded-md py-5 px-4 bg-purple-300">
        <Input />
        <TodoList />
      </div>
    </div>
  );
};

export default Todos;
