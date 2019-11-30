import React from "react";
import ReactDOM from "react-dom";
import ActivityFilters from "./ActivityFilters";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ActivityFilters />, div);
  ReactDOM.unmountComponentAtNode(div); 
});