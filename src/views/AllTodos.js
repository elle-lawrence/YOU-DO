import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllToDos } from '../api/data/toDoData';
import ToDo from '../components/ToDo';
import CompletedToDo from '../components/CompletedToDo';

export default function AllToDos({ toDos, setToDos, setEditItem }) {
  const [allToDos, setAllToDos] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAllToDos().then((toDoArray) => {
      if (isMounted) setAllToDos(toDoArray);
    });
    return () => {
      isMounted = false;
    };
  }, [toDos]);

  return (
    <div>
      <h3 style={{ color: 'grey' }}>ALL TO DOS</h3>
      {allToDos.map((toDo) => (toDo.complete ? (
        <CompletedToDo
          key={toDo.firebaseKey}
          toDo={toDo}
          setToDos={setToDos}
        />
      ) : (
        <ToDo
          key={toDo.firebaseKey}
          toDo={toDo}
          setToDos={setToDos}
          setEditItem={setEditItem}
        />
      )))}
    </div>
  );
}

AllToDos.propTypes = {
  toDos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setToDos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
