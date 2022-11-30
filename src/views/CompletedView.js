import React, { useEffect, useState } from 'react';
import { getToDos } from '../api/data/toDoData';
import CompletedToDo from '../components/CompletedToDo';
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
    // <div>
    //   <h3 style={{ color: 'grey' }}>COMPLETED</h3>
    //   {completedToDos.map((completedToDo) => (
    //     <CompletedToDoStyle
    //   className="alert alert-light"
    //   role="alert"
    //   key={completedToDo.firebaseKey}
    // >
    //   {completedToDo.name}
    //   <button
    //     onClick={() => handleClick(completedToDo.firebaseKey)}
    //     className="btn btn-outline-danger"
    //     type="button"
    //   >
    //     <i className="fas fa-trash-alt" />
    //   </button>
    //     </CompletedToDoStyle>
    //   ))}
    // </div>
    <div>
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
