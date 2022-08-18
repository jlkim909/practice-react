import styled from "@emotion/styled";
import { memo, useState } from "react";
import { VscCheck, VscTrash, VscEdit, VscChevronRight } from "react-icons/vsc";
import { ITodo, ITodoList } from "../types";

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

const TodoWrap = styled.div``;
const TodoText = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 8px;
`;
const TodoItem = styled.div<{
  checked?: Boolean;
}>`
  display: flex;
  height: 32px;
  width: 320px;
  margin-top: 32px;
  background-color: white;
  box-shadow: 1px 1px 4px #ffe4b5;
  transition: 0.5s;
  opacity: ${(prop) => (prop.checked ? "0.3" : "1")};
`;
const TodoEdit = styled.input`
  border: none;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 8px;
`;

function ToDoList({ todoList, setTodoList, type }: ITodoList) {
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState<string>("");
  const onClickCheck = (item: ITodo) => {
    const todoItemIndex = todoList.findIndex((todo) => todo.idx === item.idx);
    const newTodoList: ITodo[] = [
      ...todoList.slice(0, todoItemIndex),
      { ...item, state: item.state === "TODO" ? "DONE" : "TODO" },
      ...todoList.slice(todoItemIndex + 1, todoList.length),
    ];
    setTodoList(newTodoList);
    console.log(todoList);
  };

  const onClickDelete = (item: ITodo) => {
    const todoItemIndex = todoList.findIndex((todo) => todo.idx === item.idx);
    setTodoList((prev) => prev.splice(todoItemIndex, 1));
  };

  const onClickEnterEdit = (context: string) => {
    setEditInput(context);
    setIsEdit(true);
  };

  const onClickEdit = (item: ITodo) => {
    const todoItemIndex = todoList.findIndex((todo) => todo.idx === item.idx);
    const newTodoList: ITodo[] = [
      ...todoList.slice(0, todoItemIndex),
      { ...item, context: editInput },
      ...todoList.slice(todoItemIndex + 1, todoList.length),
    ];
    setTodoList(newTodoList);
    setIsEdit(false);
  };

  return (
    <TodoWrap>
      {todoList
        .filter(({ state }) => state === type || type === "ALL")
        .map((todo) => (
          <TodoItem key={todo.idx} checked={todo.state === "DONE"}>
            {isEdit ? (
              <>
                <TodoEdit
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <IconsWrap backgroundColor="#87CEEB">
                  <VscChevronRight onClick={() => onClickEdit(todo)} />
                </IconsWrap>
              </>
            ) : (
              <>
                <TodoText>{todo.context}</TodoText>
                <IconsWrap backgroundColor="#93b4df">
                  <VscCheck onClick={() => onClickCheck(todo)} />
                </IconsWrap>
                <IconsWrap backgroundColor="#87CEEB">
                  <VscEdit onClick={() => onClickEnterEdit(todo.context)} />
                </IconsWrap>
                <IconsWrap backgroundColor="#BC8F8F">
                  <VscTrash onClick={() => onClickDelete(todo)} />
                </IconsWrap>
              </>
            )}
          </TodoItem>
        ))}
    </TodoWrap>
  );
}

export default memo(ToDoList);
