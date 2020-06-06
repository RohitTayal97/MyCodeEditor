import React, { useState } from "react";
import Buttons from "./Components/buttons";
import InputButton from "./Components/inputButton";
import FileTree from "./Components/fileTree";
import "./App.css";
const fs = window.require("fs");

const App = () => {
  const [files, setFiles] = useState([]);
  const [folderPath, setFolderPath] = useState("");

  const addFile = (filePath = "") => {
    const fileContent = fs.readFileSync(filePath).toString().split("\n");
    setFiles(fileContent);
  };

  const addFolder = (folderPath = "") => {
    setFolderPath(folderPath);
  };

  return (
    <div className="App">
      <div className="Head">
        Code Editor
        <Buttons />
      </div>
      <div className="Body">
        <div className="Explorer">
          Explorer
          <InputButton
            label="Open File"
            dialogProp="openFile"
            add={(filePath) => addFile(filePath)}
          />
          <InputButton
            label="Open Folder"
            dialogProp="openDirectory"
            add={(folderPath) => addFolder(folderPath)}
          />
          <FileTree directoryPath={folderPath} />
        </div>
        <div className="CodingWindow">
          {files.map((fileContent, index) => (
            <p key={index}>{fileContent}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
