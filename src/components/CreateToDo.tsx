import { useSetRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState, SAVETODOS_KEY } from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  margin: 15px 0px;
  padding: 0 20px;
  height: 32px;
  line-height: 1.2;
  display: flex;
  justify-content : space-between ;
`;
const Input = styled.input`
  width: 90%;
  height: 100%;
  border: 0;
  border-radius: 5px;
  padding: 0 20px;        
`;
const Button = styled.button`
  cursor: pointer;
  width: 32px;
  height: 32px;    
  font-size: 25px;
  border-radius: 5px;
  border: 0;
  background-color: rgba(255, 255, 255, 0.5);
  color: ${props => props.theme.textColor};  
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }  
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);  //toDo state set up
  const category = useRecoilValue(categoryState);  
  const { register, handleSubmit, setValue} = useForm();
  const handleValid = ({toDo} : IForm) => {     
    setToDos((oldToDos) => {
      const newToDos = [{text: toDo, id: Date.now(), category}, ...oldToDos ];
      const savedToDos = JSON.stringify(newToDos);
      localStorage.setItem(SAVETODOS_KEY, savedToDos);
      return newToDos; //localstorage에 입력값 추가 
    });
    setValue("toDo", "");   
  };
  
  return (    
      <Form onSubmit = {handleSubmit(handleValid)}>
        <Input 
        {...register("toDo", { required: "Please Write a To Do.", maxLength: 28 })}
        placeholder = "New To do...(type Limit: 28)"         
        />
        <Button>+</Button>
      </Form>
  );
}

export default CreateToDo;