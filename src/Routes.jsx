import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';

const Routes = () => {
  return (
    <div>
      <Switch>
        {/* Sign in Pages */}
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
};

export default Routes;
