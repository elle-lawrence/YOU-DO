import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteToDo } from '../api/data/toDoData';

export const CompletedToDoStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;

  h3 {
    display: flex;
    flex-grow: 3;
    justify-content: flex-start;
  }

  button {
    color: light blue;

    &:first-child {
      margin-right: 10px;
    }
  }
`;
export default function CompletedToDo({ toDo, setToDos }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteToDo(toDo.firebaseKey).then(setToDos);
    }
  };

  return (
    <>
      <CompletedToDoStyle className="alert alert-light" role="alert">
        <h3 style={{ color: 'red' }}>DONE!</h3>
        <h3>{toDo.name}</h3>
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-outline-danger"
          type="button"
        >
          <i className="fas fa-trash-alt" />
        </button>
      </CompletedToDoStyle>
    </>
  );
}

CompletedToDo.propTypes = {
  toDo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setToDos: PropTypes.func.isRequired,
};
