import React from "react";
const { dialog } = window.require("electron").remote;

const InputButton = ({ label, dialogProp, add }) => {
  return (
    <input
      type="button"
      value={label}
      onClick={() => {
        dialog
          .showOpenDialog({
            properties: [dialogProp],
          })
          .then((file) => {
            if (file) {
              add(file.filePaths[0]);
            }
          });
      }}
    />
  );
};

export default InputButton;
