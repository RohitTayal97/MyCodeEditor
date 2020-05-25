import React, { Component } from "react";
import Buttons from "./Components/buttons/buttons";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Head">
          Code Editor
          <Buttons />
        </div>
        <div className="Body">
          <div className="Explorer">Explorer</div>
          <div className="CodingWindow">Coding Window</div>
        </div>
      </div>
    );
  }
}

export default App;
