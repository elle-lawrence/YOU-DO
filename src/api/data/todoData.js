import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getTodos = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/todos.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createTodo = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/todos.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/todos/${response.data.name}.json`, { firebaseKey })
        .then(() => {
          getTodos().then(resolve);
        });
    })
    .catch(reject);
});

const deleteTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/todos/${firebaseKey}.json`)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

const updateTodo = (todo) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/todos/${todo.firebaseKey}.json`, todo)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

export {
  getTodos, createTodo, deleteTodo, updateTodo,
};
