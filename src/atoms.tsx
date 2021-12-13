import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
} //enum default: number but changed string.

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom({
  key: "category",
  default: Categories.TO_DO,
})

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({ 
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState); //atom을 selector내부로 호출.
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
})
//selector는 state를 보기좋게 변형, state logic이 변화하지않음.