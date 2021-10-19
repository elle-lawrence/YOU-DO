import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createTodo, updateTodo } from '../api/data/todoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
};

export default function TodoForm({ obj, setTodos, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
      });
    }
    // DEPENDENCY ARRAY WATCHES JUST THE OBJ TO CHANGE;
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
    setEditItem({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTodo(formInput).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setTodos(todos);
        resetForm();
        history.push('/');
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <input
            className="form-control form-control-lg me-1"
            type="text"
            name="name"
            id="name"
            value={formInput.name}
            onChange={handleChange}
            placeholder="ADD A YOU-DO"
            required
          />
          <button className="btn btn-success" type="submit">
            {obj.firebaseKey ? 'UPDATE' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </>
  );
}

TodoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
  }),
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

TodoForm.defaultProps = { obj: {} };
