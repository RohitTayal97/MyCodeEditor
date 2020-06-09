import React, { useEffect, useState } from "react";

const FileTree = ({ fileObjects }) => {
  const [fetchedFileObjects, setter] = useState([]);
  useEffect(() => {
    let fileInterval = setInterval(function () {
      if (typeof fileObjects !== "undefined") {
        setter(fileObjects);

        clearInterval(fileInterval);
      }
    }, 20);
  }, [fileObjects]);
  return (
    <ul>
      {fetchedFileObjects.map((file) => {
        const filePath = file.filePath;
        const fileName = filePath.split("/").slice(-1).join("");

        return !file.isFileBoolean ? (
          <li key={filePath + " Directory"}>
            {`${fileName}`}
            <FileTree fileObjects={file.files} />
          </li>
        ) : (
          <li key={filePath}>{`${fileName}`}</li>
        );
      })}
    </ul>
  );
};

export default FileTree;
