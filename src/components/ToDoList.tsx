import CreateToDo from "./CreateToDo";
import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import SelectToDo from "./SelectToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>TASK LIST</h1>
      <hr />
      <CreateToDo />
      <SelectToDo />            
      <ul>
        {toDos?.map(toDo => <ToDo key = {toDo.id} {...toDo}/>)}
      </ul>
    </div>
  );
}

export default ToDoList;