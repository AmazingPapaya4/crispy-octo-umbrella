import React from "react";
import { Switch, Route ,useRouteMatch } from "react-router-dom";

import Reviews from "./Reviews";
import ReviewEdit from "./ReviewEdit";
import ReviewCreate from "./ReviewCreate";

export default function ReviewPages() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Reviews />
      </Route>
      <Route
        path={`${path}/edit`}
        render={(props) => <ReviewEdit {...props} />}
      ></Route>
      <Route
        path={`${path}/new`}
        render={(props) => <ReviewCreate {...props} />}
      ></Route>
    </Switch>
  );
}
