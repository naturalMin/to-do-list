import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React from "react";
import styled from "styled-components";

const List = styled.li`      
  margin: 10px auto;
  width: 100%;
  padding: 10px 20px;
  background-color: #f6e58d;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  border-radius: 5px;   
  display: flex;
  justify-content: space-between;
`;
const Text = styled.span`
  font-size: 18px;
  color: rgba(0,0,0);
  line-height: 1.5;  
`;
const ButtonGroup = styled.div`  
`;
const Button = styled.button`  
  border: 0;
  border-radius: 3px;
  padding: 5px;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    text-shadow: 1px 1px 2px gray;
  }  
`;

function ToDo({ text, id, category}:IToDo) {
  const setToDos = useSetRecoilState(toDoState);    
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name } } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id); // 클릭했을때 해당 번호 추출
      const newToDo = {text, id, category: name as Categories};
      return [...oldToDos.slice(0, targetIndex),
        newToDo, ...oldToDos.slice(targetIndex + 1),
      ]; // toDo 추가하는 과정
    })
  };
  const DelToDos = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
        ];
  })};
  
  return (
    <List>      
      <Text>{text}</Text>
      <ButtonGroup>
        {category !== Categories.DOING && (
        <Button name = {Categories.DOING} onClick = {onClick}>🟢</Button>
        )}
        {category !== Categories.TO_DO && (
        <Button name = {Categories.TO_DO} onClick = {onClick}>🟡</Button>
        )}
        {category !== Categories.DONE && (
        <Button name = {Categories.DONE} onClick = {onClick}>🔵</Button>
        )} 
        {/* // 해당되는 카테고리를 클릭하지 않을 때 버튼을 보여라 */}
        <Button onClick = {DelToDos}>X</Button>
      </ButtonGroup>    
      
    </List>
  );
}

export default ToDo;