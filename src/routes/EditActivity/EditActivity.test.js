import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import EditActivity from "./EditActivity";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Route
        path='/org/:orgId/activity/edit/:activityId'
        component={EditActivity} 
      />
    </BrowserRouter>
    ,
    div);
  ReactDOM.unmountComponentAtNode(div); 
});