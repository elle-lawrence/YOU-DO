// index for router
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import AllToDos from '../views/AllToDos';
import CompletedView from '../views/CompletedView';

export default function Routes({ toDos, setToDos, setEditItem }) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Home toDos={toDos} setToDos={setToDos} setEditItem={setEditItem} />
          )}
        />
        <Route exact path="/completed" component={CompletedView} />
        <Route
          exact
          path="/alltodos"
          component={() => (
            <AllToDos
              toDos={toDos}
              setToDos={setToDos}
              setEditItem={setEditItem}
            />
          )}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  toDos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setToDos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
