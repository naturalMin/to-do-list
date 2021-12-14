import React from "react";
import { useRecoilState } from "recoil";
import { Categories, categoryState} from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  margin: 15px 0px;
  padding: 0 20px;
  height: 32px;
`;
const Select = styled.select`
  width: 100%;
  height: 90%;
  border: 0;
  border-radius: 5px;
  padding: 0 18px;
  font-size: 15px;  
`;
const Option = styled.option`
  font-size: 15px;
`;

function SelectToDo() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Form>
      <Select value = {category} onInput = {onInput}>
        <Option value = {Categories.TO_DO}>
          🟡 To Do
        </Option>
        <Option value = {Categories.DOING}>
          🟢 Doing
        </Option>
        <Option value = {Categories.DONE}>
          🔵 Done
        </Option>
      </Select>
    </Form>
  );
}

export default SelectToDo;