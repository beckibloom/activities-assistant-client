import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import ActivityDetail from "./ActivityDetail";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Route 
        exact
        path='/org/:orgId/activity/view/:activityId'
        component={ActivityDetail}
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div); 
});