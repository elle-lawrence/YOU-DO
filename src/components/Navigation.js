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
          Home
        </button>
        <button
          type="button"
          onClick={() => history.push('/completed')}
          className="btn btn-light border border-dark"
        >
          View Completed
        </button>
        <button
          type="button"
          onClick={() => history.push('/alltodos')}
          className="btn btn-light border border-dark"
        >
          View All Todos
        </button>
        <button
          onClick={signOutUser}
          type="button"
          className="btn btn-danger border border-dark"
        >
          Logout
        </button>
      </ButtonGroup>
    </div>
  );
}
