import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteToDo, updateToDo } from '../api/data/toDoData';

export const ToDoStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  .alertStyle h3 {
    flex-grow: 2;
    margin-left: 20px;
    color: grey;
  }

  button {
    color: light blue;
  }
`;
export default function ToDo({ toDo, setToDos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteToDo(toDo.firebaseKey).then(setToDos);
    }

    if (method === 'complete') {
      updateToDo({ ...toDo, complete: true }).then(setToDos);
    }
  };

  return (
    <>
      <ToDoStyle className="alert alert-light alertStyle" role="alert">
        <button
          onClick={() => handleClick('complete')}
          className="btn btn-outline-info"
          type="button"
        >
          COMPLETE
        </button>
        <h3 style={{ color: 'grey' }}>{toDo.name}</h3>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={() => setEditItem(toDo)}
            className="btn btn-outline-info"
            type="button"
          >
            <i className="fas fa-edit" />
          </button>
          <button
            onClick={() => handleClick('delete')}
            className="btn btn-outline-danger"
            type="button"
          >
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </ToDoStyle>
    </>
  );
}

ToDo.propTypes = {
  toDo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setToDos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
