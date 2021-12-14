import { Categories, IToDo, SAVETODOS_KEY, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React from "react";
import styled from "styled-components";

const List = styled.li`      
  margin: 10px auto;
  width: 100%;
  padding: 10px;
  background-color: #f6e58d;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  border-radius: 5px;   
  display: flex;
  justify-content: space-between;   
`;
const Text = styled.span`
  width: 90%;
  font-size: 15px;
  color: rgba(0,0,0);
  line-height: 1.5;   
`;
const Input = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;
const ButtonGroup = styled.div`  
  width: 18%;
`;
const Button = styled.button`  
  border: 0;
  border-radius: 3px;  
  background-color: transparent;
  font-size: 15px;
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
      const newToDos = [...oldToDos.slice(0, targetIndex),
        newToDo, ...oldToDos.slice(targetIndex + 1),
      ];
      const stringfyTodos = JSON.stringify(newToDos);
      localStorage.setItem(SAVETODOS_KEY,stringfyTodos);
      return newToDos; // toDo 추가하는 과정
    })
  };
  const DelToDos = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { parentElement },
    } = event;
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter(toDo => toDo.id !== Number(parentElement?.id));
      //해당하는 id만 아닌 것만 남겨둘 것.
      const stringfyTodos = JSON.stringify(newToDos);
      localStorage.setItem(SAVETODOS_KEY,stringfyTodos);
      return newToDos; //삭제할 부분 filter로 거른 후 배열 재생성 및 저장
  });
};
  
  return (
    <List id = {id as any}>            
      <Text>
        <Input type = "checkbox" />
        {text}
      </Text>
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
      </ButtonGroup>   
      <Button onClick = {DelToDos}>X</Button>
    </List>
  );
}

export default ToDo;