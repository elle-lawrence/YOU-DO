import React, { useEffect, useState } from 'react';
import { deleteCompleteTodo, getTodos } from '../api/data/todoData';

export default function Completed() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    getTodos(true).then(setCompletedTodos);
  }, []);

  const handleClick = (key) => {
    deleteCompleteTodo(key).then(setCompletedTodos);
  };

  return (
    <div>
      {completedTodos.map((completedTodo) => (
        <div
          className="alert alert-light"
          role="alert"
          key={completedTodo.firebaseKey}
        >
          {completedTodo.name}
          <button
            onClick={() => handleClick(completedTodo.firebaseKey)}
            className="btn btn-danger"
            type="button"
          >
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
}
