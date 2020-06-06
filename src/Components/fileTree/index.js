import React, { useEffect, useState } from "react";
import { generateFileTreeObject } from "./utils";

const FileTree = (props) => {
  const [state, setState] = useState(props.files || []);
  useEffect(() => {
    generateFileTreeObject(props.directoryPath)
      .then((files) => {
        setState({ files });
      })
      .catch(console.error);
  });
  return (
    <ul>
      {state.length > 0 &&
        state.map((file) => {
          const filePath = file.filePath;
          const fileName = filePath.split("/").slice(-1).join("");
          return file.isFileBool ? (
            <li key={filePath + " Directory"}>
              {`${fileName}`}
              <FileTree directoryPath={file.filePath} files={file.files} />
            </li>
          ) : (
            <li key={filePath}>{`${fileName}`}</li>
          );
        })}
    </ul>
  );
};

export default FileTree;
