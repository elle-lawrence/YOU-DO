import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToDo from '../components/ToDo';

export const PageHeader = styled.div`
  display: flex;
  font-family: 'Londrina Solid', cursive;
  font-size: 50px;
  justify-content: center;
  text-align: center;
  margin: 30px;
  color: #ffb23f;
  text-shadow: 2px 2px #d09337;
`;
export default function Home({ toDos, setToDos, setEditItem }) {
  return (
    <div>
      <PageHeader>TO DOS:</PageHeader>
      {toDos.map((toDo) => (
        <ToDo
          key={toDo.firebaseKey}
          toDo={toDo}
          setToDos={setToDos}
          setEditItem={setEditItem}
        />
      ))}
    </div>
  );
}

Home.propTypes = {
  toDos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setToDos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
