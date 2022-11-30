import React, { useEffect, useState } from 'react';
import { getToDos } from '../api/data/toDosData';
import CompletedToDo from '../components/CompletedToDo';
import { PageHeader } from './Home';
// import { CompletedToDoStyle } from '../components/CompletedToDo';

export default function CompletedView() {
  const [completedToDos, setCompletedToDos] = useState([]);

  useEffect(() => {
    getToDos(true).then(setCompletedToDos);
  }, []);

  // const handleClick = (key) => {
  //   deleteCompleteToDo(key).then(setCompletedToDos);
  // };

  return (
    <div>
      <PageHeader>COMPLETED TO DOS:</PageHeader>
      {completedToDos.map((toDo) => (
        <CompletedToDo
          key={toDo.firebaseKey}
          toDo={toDo}
          setToDos={setCompletedToDos}
        />
      ))}
    </div>
  );
}
