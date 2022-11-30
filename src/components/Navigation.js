import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import { signOutUser } from '../api/auth';

export default function Navigation() {
  const history = useHistory();

  return (
    <div className="text-center mb-3">
      <ButtonGroup size="lg">
        <button
          type="button"
          onClick={() => history.push('/')}
          className="btn btn-light border border-dark"
        >
          To Do
        </button>
        <button
          type="button"
          onClick={() => history.push('/completed')}
          className="btn btn-light border border-dark"
        >
          Completed To Dos
        </button>
        <button
          type="button"
          onClick={() => history.push('/alltodos')}
          className="btn btn-light border border-dark"
        >
          All To Dos
        </button>
        <button
          onClick={signOutUser}
          type="button"
          className="btn btn-danger border border-dark"
        >
          <i className="fas fa-sign-out-alt" />
        </button>
      </ButtonGroup>
    </div>
  );
}
