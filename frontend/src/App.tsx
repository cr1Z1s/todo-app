import TodoProvider from "./context/todo-context";
import Todos from "./pages/todos";

function App() {
  return (
    <TodoProvider>
      <Todos />
    </TodoProvider>
  );
}

export default App;
