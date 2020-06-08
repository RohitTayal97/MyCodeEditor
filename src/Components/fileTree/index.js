import React from "react";

const FileTree = ({ fileObjects }) => {
  console.log("@@@@1", fileObjects);
  return (
    <ul>
      {fileObjects.map((file) => {
        const filePath = file.filePath;
        const fileName = filePath.split("/").slice(-1).join("");

        return !file.isFileBoolean ? (
          <li key={filePath + " Directory"}>
            {`${fileName}`}
            <FileTree files={file.files} />
          </li>
        ) : (
          <li key={filePath}>{`${fileName}`}</li>
        );
      })}
    </ul>
  );
};

export default FileTree;
