import React from "react";
import logo from "./logo.gif";

function Main({ isMainOpen, setisMainOpen }) {
  document.addEventListener("click", setisMainOpen, true);
  return (
    <div className={isMainOpen ? "Main hidden" : "Main"}>
      <img src={logo} className="Main-logo" alt="logo" />
      {/* <p> Applix</p> */}
    </div>
  );
}

export default Main;
