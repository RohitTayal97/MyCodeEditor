import React, { useState, useEffect } from "react";
import Buttons from "./Components/buttons";
import InputButton from "./Components/inputButton";
import FileTree from "./Components/fileTree";
import { generateFileTreeObject } from "./Components/fileTree/utils";
import "./App.css";
const fs = window.require("fs");

const App = () => {
  const [files, setFiles] = useState([]);
  const [folderPath, setFolderPath] = useState("");
  const [fileObjects, setFileObjects] = useState([]);

  useEffect(() => {
    folderPath.length > 0 &&
      generateFileTreeObject(folderPath)
        .then((fileObjects) => {
          setFileObjects(fileObjects);
        })
        .catch(console.error);
  }, [folderPath]);

  const addFile = (filePath) => {
    const fileContent = fs.readFileSync(filePath).toString().split("\n");
    setFiles(fileContent);
  };

  const addFolder = (folderPath) => {
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
          <ul className="FileTree">
            {folderPath !== "" && (
              <li>{folderPath.split("/").slice(-1).join("")}</li>
            )}
            <FileTree fileObjects={fileObjects} />
          </ul>
        </div>
        <div className="CodingWindow">
          {files.map((fileContent, index) => (
            <pre className="Code" key={index}>
              {fileContent}
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
