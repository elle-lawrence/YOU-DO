import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteToDo } from '../api/data/toDosData';

export const CompletedToDoStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;

  h3.toDoName {
    display: flex;
    flex-grow: 3;
    justify-content: flex-start;
    font-family: 'Shadows Into Light', cursive;
    color: #b1a7a6;
    text-decoration: line-through;
  }

  button {
    color: light blue;

    &:first-child {
      margin-right: 10px;
    }
  }
  .compContainer {
    display: flex;
    min-width: 150px;
    align-items: center;
    align-content: stretch;

    .doneMark {
      font-size: 35px;
      font-family: 'Londrina Solid', cursive;
      color: #d32326;
      margin-bottom: 0;
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
        <div className="compContainer">
          <h4 className="doneMark">DONE!</h4>
        </div>
        <h3 className="toDoName">{toDo.name}</h3>
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
