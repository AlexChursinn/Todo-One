import React, { useState, useEffect, useReducer } from "react";
import TodoList from "./TodoList";
import { Context } from "./context"; /* Вызываем контекст */
import reducer from "./reducer";

export default function App() {
  /* Есть state и  dispatch который будет менять это состояние*/
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos"))
  );

  /* Локальный стейт */
  /* useState(начальное состояние) todos = начальное состояние, setTodos будет менять начальное состояние*/
  const [todos, setTodos] = useState([]);

  const [todoTitle, setTodoTitle] = useState("");

  const addTodo = (event) => {
    /* Проверяем совершали ли мы нажатие на клавишу Enter */
    if (event.key === "Enter") {
      dispatch({
        type: "add" /* Параметр по которому буде менять state */,
        payload: todoTitle /* который содержит состояние todoTitle */,
      });

      setTodoTitle(""); /* очищаем поле ввода */
    }
  };

  /*   
Добавляется несколько кликов сразу remove чтобы убрать
const handleClick = () => console.log("click"); */

  /* 
  ИЗБАВИЛИСЬ ТАК КАК ПЕРЕДАЕМ ЕГО В REDUCER
  Будет вызываться при старте данного компонента 
  Забиоаем todo которые сохранены локально */
  /*   useEffect(() => {
    const raw = localStorage.getItem("todos") || [];
    setTodos(JSON.parse(raw));
  }, []);
 */

  /* Все что вносим в todo сохраняем в localStorage */
  useEffect(() => {
    /*  document.addEventListener("click", handleClick); */
    localStorage.setItem("todos", JSON.stringify(state));
    /*     return () => {
      document.removeEventListener("click", handleClick);
    }; */
  }, [state]);

  /* Удаление todo */
  /*   const removeTodo = (id) => {
    setTodos(
      state.filter((todo) => {
        return todo.id !== id;
      })
    );
  }; */

  /* Делаем todo зачёркнутым */
  /*   const toogleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }; */

  return (
    /* Передаем компонентам контекст */
    <Context.Provider
      value={{
        /* toogleTodo, removeTodo */
        dispatch,
      }}
    >
      <div className="container">
        <h1>Todo app</h1>

        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
            onKeyDown={addTodo} /* Чтобы при нажатии Enter добовлять todo */
          />
          <label>Todo name</label>
        </div>

        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}
