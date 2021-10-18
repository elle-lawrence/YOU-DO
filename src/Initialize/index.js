import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
import Navigation from '../components/Navigation';
import TodoForm from '../components/TodoForms';
import Routes from '../routes';
import SignIn from '../views/SignIn';

const Container = styled.div`
  width: 60%;
  margin: auto;
  padding: 50px 0;

  h1 {
    color: white;
    text-align: center;
    font-size: 64px;
    font-weight: 400;
  }

  h3 {
    color: lightgrey;
    text-align: center;
  }
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
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
        getTodos(false).then(setTodos);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <Navigation />
          <h1>YOU DO</h1>
          <TodoForm
            obj={editItem}
            setTodos={setTodos}
            setEditItem={setEditItem}
          />
          <Routes todos={todos} setTodos={setTodos} setEditItem={setEditItem} />
        </>
      ) : (
        <SignIn user={user} />
      )}
    </Container>
  );
}

export default Initialize;
