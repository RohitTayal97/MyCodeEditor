import React from "react";
import "./buttons.css";
const remote = window.require("electron").remote;

const Buttons = () => {
  return (
    <div className="buttons">
      <button
        id="minimize"
        onClick={() => remote.BrowserWindow.getFocusedWindow().minimize()}
      >
        -
      </button>
      <button
        id="maximize"
        onClick={() => remote.BrowserWindow.getFocusedWindow().maximize()}
      >
        []
      </button>
      <button id="quit" onClick={() => remote.getCurrentWindow().close()}>
        x
      </button>
    </div>
  );
};

export default Buttons;
