import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getToDos = (value) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/todos.json?orderBy="complete"&equalTo=${value}`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createToDo = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/todos.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/todos/${response.data.name}.json`, { firebaseKey })
        .then(() => {
          getToDos(false).then(resolve);
        });
    })
    .catch(reject);
});

const deleteToDo = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/todos/${firebaseKey}.json`)
    .then(() => getToDos(false).then(resolve))
    .catch(reject);
});

const updateToDo = (toDo) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/todos/${toDo.firebaseKey}.json`, toDo)
    .then(() => getToDos(false).then(resolve))
    .catch(reject);
});

const getAllToDos = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/todos.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteCompleteToDo = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/todos/${firebaseKey}.json`)
    .then(() => getToDos(true).then(resolve))
    .catch(reject);
});

export {
  getToDos,
  createToDo,
  deleteToDo,
  updateToDo,
  getAllToDos,
  deleteCompleteToDo,
};
