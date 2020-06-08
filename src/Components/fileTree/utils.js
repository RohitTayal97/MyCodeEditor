const Promise = require("bluebird");

// turns off forgotten return warning in Bluebird
Promise.config({
  warnings: {
    wForgottenReturn: false,
  },
});

const fs = Promise.promisifyAll(window.require("fs"));

export const generateFileTreeObject = (directoryPath) => {
  return fs.readdirAsync(directoryPath).then((arrayOfFileNames) => {
    const fileDataPromises = arrayOfFileNames.map((fileName) => {
      const fullPath = `${directoryPath}/${fileName}`;
      return fs.statAsync(fullPath).then((fileData) => {
        const file = {};
        file.filePath = fullPath;
        file.isFileBoolean = fileData.isFile();
        if (!file.isFileBoolean) {
          generateFileTreeObject(file.filePath)
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
