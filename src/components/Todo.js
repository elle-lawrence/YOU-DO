import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteTodo, updateTodo } from '../api/data/todoData';

const TodoStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  h5 {
    flex-grow: 2;
    margin-left: 20px;
  }

  button {
    color: white;

    &:first-child {
      margin-right: 10px;
    }
  }
`;
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
      <TodoStyle className="alert alert-light" role="alert">
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
      </TodoStyle>
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
