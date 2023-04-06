import React, { useContext } from "react";
import { Context } from "./context"; /* Вызываем контекст */

export default function TodoItem({ title, id, completed }) {
  const cls = ["todo"];
  if (completed) {
    cls.push("completed");
  }

  /* Вызываем контекст от которого определили и функции которые передвали */
  const { dispatch } = useContext(Context);

  return (
    <li className={cls.join(" ")}>
      {/* соединили todo и completed */}
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch({ type: "toggle", payload: id })}
        />
        <span>{title}</span>

        <i
          className="material-icons red-text"
          onClick={() => dispatch({ type: "remove", payload: id })}
        >
          delete
        </i>
      </label>
    </li>
  );
}
