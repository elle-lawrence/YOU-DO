import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createTodo, updateTodo } from '../api/data/todoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
};

export default function TodoForm({ obj, setTodos, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);

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
    // e.persist();
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <label htmlFor="name">
            Name:
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
          </label>
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
