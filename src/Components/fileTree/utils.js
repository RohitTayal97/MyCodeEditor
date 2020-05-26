const fs = require("fs");

export const generateFileTreeObject = (directoryString) => {
  return fs.readdirAsync(directoryString).then((arrayOfFileNameStrings) => {
    const fileDataPromises = arrayOfFileNameStrings.map((fileNameString) => {
      const fullPath = `${directoryString}/${fileNameString}`;
      return fs.statAsync(fullPath).then((fileData) => {
        const file = {};
        file.filePath = fullPath;
        file.isFileBoolean = fileData.isFile();
        if (!file.isFileBoolean) {
          return generateFileTreeObject(file.filePath)
            .then((fileNamesSubArray) => {
              file.files = fileNamesSubArray;
            })
            .catch(console.error);
        }
        return file;
      });
    });
    return Promise.all(fileDataPromises);
  });
};
