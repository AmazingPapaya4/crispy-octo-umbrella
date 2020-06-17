import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import history from "../history";

import Feedbacks from "./Feedbacks";
import ReviewPages from "./ReviewPages";
import EmployeePages from "./EmployeePages";

export default function Pages({ userData }) {
  return (
    <Router history={history}>
      <div>
        <nav className="nav">
          {userData && userData.is_admin ? ( // if user is admin
            <ul>
              <li>
                <Link to="/">Feedbacks</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to="/employees">Employees</Link>
              </li>
              <li>
                <a href="/accounts/logout/">Logout</a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/">Feedbacks</Link>
              </li>
              <li>
                <a href="/accounts/logout/">Logout</a>
              </li>
            </ul>
          )}
        </nav>
        <Switch>
          <Route path="/reviews">
            <ReviewPages />
          </Route>
          <Route path="/employees">
            <EmployeePages />
          </Route>
          <Route path="/">
            <Feedbacks userData={userData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
