import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthError from "./AuthError";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AuthError />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});