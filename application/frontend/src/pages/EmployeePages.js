import React from "react";
import { Switch, Route ,useRouteMatch } from "react-router-dom";

import Employees from "./Employees";
import EmployeeCreate from "./EmployeeCreate";

export default function EmployeePages() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Employees />
      </Route>
      <Route
        path={`${path}/new`}
        render={(props) => <EmployeeCreate {...props} />}
      ></Route>
    </Switch>
  );
}
