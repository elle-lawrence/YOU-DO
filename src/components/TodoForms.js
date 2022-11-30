import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createToDo, updateToDo } from '../api/data/toDoData';

const initialState = {
  name: '',
  complete: false,
  uid: '',
};

export default function ToDoForm({ obj, setToDos, setEditItem }) {
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
      updateToDo(formInput).then((toDos) => {
        setToDos(toDos);
        resetForm();
      });
    } else {
      createToDo({ ...formInput, date: new Date() }).then((toDos) => {
        setToDos(toDos);
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
            placeholder="ADD A TO DO"
            required
            style={{ fontFamily: 'Shadows Into Light', marginTop: '30px' }}
          />
          <button
            className="btn btn-outline-dark"
            type="submit"
            style={{ marginTop: '30px' }}
          >
            {obj.firebaseKey ? 'UPDATE' : 'ADD'}
          </button>
        </div>
      </form>
    </>
  );
}

ToDoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
  }),
  setToDos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

ToDoForm.defaultProps = { obj: {} };
