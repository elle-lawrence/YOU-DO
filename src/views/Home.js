import React from 'react';
import PropTypes from 'prop-types';
import ToDo from '../components/ToDo';

export default function Home({ toDos, setToDos, setEditItem }) {
  return (
    <div>
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
