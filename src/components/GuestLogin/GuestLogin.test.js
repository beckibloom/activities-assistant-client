import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import GuestLogin from "./GuestLogin";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><GuestLogin /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div); 
});