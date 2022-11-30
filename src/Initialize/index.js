import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';
import { getToDos } from '../api/data/toDosData';
import Navigation from '../components/Navigation';
import ToDoForm from '../components/ToDoForm';
import Routes from '../routes';
import SignIn from '../views/SignIn';

const Container = styled.div`
  width: 60%;
  margin: auto;
  padding: 50px 0;

  h1 {
    color: #d32326;
    text-align: center;
    font-size: 104px;
    font-family: 'Londrina Solid', cursive;
    text-shadow: 2px 2px #540b0e;
  }
  h2 {
    color: grey;
    text-align: center;
    font-family: 'Shadows Into Light', cursive;
    font-size: 38px;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

function Initialize() {
  const [toDos, setToDos] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getToDos(false).then(setToDos);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <h1>YOU DO</h1>
          <h2>YOUR TO DO LIST</h2>
          <Navigation />
          <ToDoForm
            obj={editItem}
            setToDos={setToDos}
            setEditItem={setEditItem}
          />
          <Routes toDos={toDos} setToDos={setToDos} setEditItem={setEditItem} />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </Container>
  );
}

export default Initialize;
