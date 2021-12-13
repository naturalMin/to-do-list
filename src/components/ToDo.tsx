import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React from "react";

function ToDo({ text, id, category}:IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name } } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id == id); // 클릭했을때 해당 번호 추출
      const newToDo = {text, id, category: name as Categories};
      return [...oldToDos.slice(0, targetIndex),
        newToDo, ...oldToDos.slice(targetIndex + 1),
      ]; // toDo 추가하는 과정
    })
  };
  return (
    <li>
      <span>{text}</span>    
      {category !== Categories.DOING && (
      <button name = {Categories.DOING} onClick = {onClick}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
      <button name = {Categories.TO_DO} onClick = {onClick}>To Do</button>
      )}
      {category !== Categories.DONE && (
      <button name = {Categories.DONE} onClick = {onClick}>Done</button>
      )} 
      {/* // 해당되는 카테고리를 클릭하지 않을 때 버튼을 보여라 */}
    </li>
  );
}

export default ToDo;