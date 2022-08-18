import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ToDoList from "./components/ToDoList";
import { ITodo } from "./types";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffacd;
`;

const ToDoInputWrap = styled.div`
  display: flex;
  height: 32px;
  width: 320px;
  margin-top: 32px;
  box-shadow: 1px 1px 4px #ffe4b5;
`;
const ToDoInput = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  padding: 0 8px;
`;
const IconsWrap = styled.div<{
  backgroundColor?: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  width: 32px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin-top: 40px;
`;

const MenuItem = styled.div<{
  check?: Boolean;
}>`
  width: 40px;
  background-color: ${(props) => (props.check ? "#F4A460" : "white")};
  color: ${(props) => (props.check ? "white" : "black")};
  padding: 8px;
  box-shadow: 1px 1px 4px #ffe4b5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    background-color: #f4a460;
    color: white;
    opacity: 0.5;
  }
`;

function App() {
  const initialTodoList: ITodo[] = localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList")!)
    : [];
  const [selectedMenu, setSelectedMenu] = useState<"ALL" | "TODO" | "DONE">(
    "ALL"
  );
  const [todoList, setTodoList] = useState<ITodo[]>(initialTodoList);
  const [todoInput, setTodoInput] = useState<string>("");

  const location = useLocation();

  const onClickAdd = () => {
    setTodoList((prev) => [
      ...prev,
      { idx: prev.length + todoInput, state: "TODO", context: todoInput },
    ]);
    setTodoInput("");
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/all":
        setSelectedMenu("ALL");
        break;
      case "/todo":
        setSelectedMenu("TODO");
        break;
      case "/done":
        setSelectedMenu("DONE");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <Container>
      <h1 style={{ color: "#F4A460" }}>ToDo List</h1>
      <ToDoInputWrap>
        <ToDoInput
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <IconsWrap backgroundColor="#f4a460">
          <VscAdd onClick={onClickAdd} />
        </IconsWrap>
      </ToDoInputWrap>
      <Menu>
        <NavLink to="/all" style={{ textDecoration: "none" }}>
          <MenuItem
            check={selectedMenu === "ALL"}
            onClick={() => setSelectedMenu("ALL")}
          >
            All
          </MenuItem>
        </NavLink>
        <NavLink to="/todo" style={{ textDecoration: "none" }}>
          <MenuItem
            check={selectedMenu === "TODO"}
            onClick={() => setSelectedMenu("TODO")}
          >
            Todo
          </MenuItem>
        </NavLink>
        <NavLink to="/done" style={{ textDecoration: "none" }}>
          <MenuItem
            check={selectedMenu === "DONE"}
            onClick={() => setSelectedMenu("DONE")}
          >
            Done
          </MenuItem>
        </NavLink>
      </Menu>
      <Routes>
        <Route path="/" element={<Navigate to="/all" />} />
        <Route
          path="/all"
          element={
            <ToDoList
              type="ALL"
              todoList={todoList}
              setTodoList={setTodoList}
            />
          }
        />
        <Route
          path="/todo"
          element={
            <ToDoList
              type="TODO"
              todoList={todoList}
              setTodoList={setTodoList}
            />
          }
        />
        <Route
          path="/done"
          element={
            <ToDoList
              type="DONE"
              todoList={todoList}
              setTodoList={setTodoList}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
