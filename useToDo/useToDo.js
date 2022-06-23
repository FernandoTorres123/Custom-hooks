import { useEffect, useReducer } from "react";
import { todoReducer } from "../todoReducer";


const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('toDos')) || [];
}

export const useToDo = () => {

    const [toDos, dispatchToDo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }, [toDos]);

    const handleNewToDo = (todo) => {
        const action = {
            type: '[TODO] Add ToDo',
            payload: todo,
        }

        dispatchToDo(action);
    }

    const handleDeleteToDo = (id) => {
        dispatchToDo({
            type: '[TODO] Remove ToDo',
            payload: id
        });
    }

    const handleToggleToDo = (id) => {
        // console.log({ id });
        dispatchToDo({
            type: '[TODO] Toggle ToDo',
            payload: id
        });
    }

    

  return {
    toDos,
    handleNewToDo,
    handleDeleteToDo,
    handleToggleToDo,
    toDosCount: toDos.length,
    pendingToDosCount: toDos.filter( todo => !todo.done ).length,
  }
}
