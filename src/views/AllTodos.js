import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllTodos } from '../api/data/todoData';
import Todo from '../components/Todo';

export default function AllTodos({ todos, setTodos, setEditItem }) {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    getAllTodos(todos).then(setAllTodos);
  }, []);

  return (
    <div>
      {allTodos.map((todo) => (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
      ))}
    </div>
  );
}

AllTodos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
