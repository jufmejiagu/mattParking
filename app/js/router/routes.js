import React from 'react'; //eslint-disable-line
import APP from '../components/generical/app.js';
import { Route, IndexRoute } from 'react-router'; //eslint-disable-line


import LoginContainer from '../components/login/container';
import AdministrationContainer from '../components/administration/AdministrationContainer';
import EmployeeContainer from '../components/employee/employeeContainer';

const Routes = (
    <Route name="APP" path="/" component={APP}>
      <IndexRoute component={LoginContainer}/>
      <Route path="/administration" component={AdministrationContainer} />
      <Route path="/employee" component={EmployeeContainer} />
      <Route path="*" component={LoginContainer}/>
    </Route>
);

module.exports = Routes;
