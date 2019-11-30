import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import AddActivity from "./AddActivity";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Route
        exact
        path='/org/:orgId/activity/add'
        component={AddActivity} 
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div); 
});