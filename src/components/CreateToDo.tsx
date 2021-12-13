import { useSetRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);  //toDo state set up
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue} = useForm();
  const handleValid = ({toDo} : IForm) => {
    setToDos(oldToDos => [{text: toDo, id: Date.now(), category}, ...oldToDos])
    setValue("toDo", "");
  };
  return (
    
      <form onSubmit = {handleSubmit(handleValid)}>
        <input 
        {...register("toDo", { required: "Please Write a To Do."})}
        placeholder = "New To do..."         
        />
        <button>+</button>
      </form>
  );
}

export default CreateToDo;