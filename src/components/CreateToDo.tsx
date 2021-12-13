import { useSetRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";
import { useEffect } from "react";

const Form = styled.form`
  margin: 15px 0px;
  padding: 0 20px;
  height: 32px;
  display: flex;
  justify-content : space-between ;
`;
const Input = styled.input`
  width: 90%;
  height: 100%;
  border: 0;
  border-radius: 5px;
  padding: 0 20px;
  margin-right: 5px;      
`;
const Button = styled.button`
  cursor: pointer;
  width: 32px;
  height: 100%;
  font-size: 20px;
  border-radius: 5px;
  border: 0;
  background-color: rgba(255,255,255,0.5);
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }  
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);  //toDo state set up
  const savedToDos = useRecoilValue(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue} = useForm();
  const handleValid = ({toDo} : IForm) => {
    setToDos(oldToDos => [{text: toDo, id: Date.now(), category}, ...oldToDos])
    setValue("toDo", "");    
  };
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(savedToDos))
  },[savedToDos]); 
  //localStorage에 입력값 저장 
  return (    
      <Form onSubmit = {handleSubmit(handleValid)}>
        <Input 
        {...register("toDo", { required: "Please Write a To Do."})}
        placeholder = "New To do..."         
        />
        <Button>+</Button>
      </Form>
  );
}

export default CreateToDo;