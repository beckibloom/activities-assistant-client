import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AdminLogin from "./AdminLogin";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AdminLogin />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div); 
});