import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { deleteTodo, updateTodo } from '../api/data/todoData';

export default function Todo({ todo, setTodos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(todo.firebaseKey).then(setTodos);
    }

    if (method === 'complete') {
      updateTodo({ ...todo, complete: true }).then(setTodos);
    }
  };

  return (
    <>
      <Alert color="light">
        {todo.complete ? (
          'Done'
        ) : (
          <button
            onClick={() => handleClick('complete')}
            className="btn btn-success"
            type="button"
          >
            COMPLETE
          </button>
        )}
        <h3>{todo.name}</h3>
        <button
          onClick={() => setEditItem(todo)}
          className="btn btn-info"
          type="button"
        >
          EDIT
        </button>
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          type="button"
        >
          DELETE
        </button>
      </Alert>
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
