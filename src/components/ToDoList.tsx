import CreateToDo from "./CreateToDo";
import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import SelectToDo from "./SelectToDo";
import styled  from "styled-components";
import { useState } from "react";


const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;  
`;
const H1 = styled.h1`
  font-size: 50px;
  font-weight: 400;
  text-align: center;
`;
const Ul = styled.ul`
  margin: auto;
  width: 93%;  
  border-radius: 10px;
  //background-color: #f6e58d;
  //box-shadow: 5px 10px 20px rgba(0,0,0,0.5);
`;
const Add = styled.button`
  display: block;
  cursor: pointer;
  margin: 10px auto;
  background-color: transparent;
  border: 0;
  color: ${props=>props.theme.textColor};
  font-size: 16px;
  font-weight: 400;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [addBtn, SetAddBtn] = useState(false);
  const onClick = () => {
    SetAddBtn((current) => !current);    
  }
  return (    
    <Container>      
      <H1>TASK LIST</H1>
      <hr />
      {addBtn ? <CreateToDo /> : null}
      <SelectToDo />            
      <Ul>
        {toDos?.map(toDo => <ToDo key = {toDo.id} {...toDo}/>)}
      </Ul>
      <Add onClick = {onClick}>
        {addBtn? "- Hide New To Do..." : "+ Add New To Do..."}
      </Add>      
    </Container>    
  );
}

export default ToDoList;