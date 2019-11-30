import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import ActivitiesList from "./ActivitiesList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Route
        exact 
        path='/org/:orgId'
        component={ActivitiesList}
      />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div); 
});