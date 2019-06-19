const fs = require('fs-extra');
const path = require('path');

const addFile = ({ filename, file, userId }) => {
  return new Promise((resolve, reject) => {
    const pathToUploadDir = fs.ensureDirSync(path.join(process.cwd(), 'uploads', userId));
    const pathToFile = path.join(pathToUploadDir, filename);
    fs.writeFileSync(pathToFile, file, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log('File saved!');
        const relativePathToFile = path.relative(pathToFile, process.cwd());
        resolve(relativePathToFile);
      }
    });
  });
};

const removeFile = ({ filename, userId }) => {
  return new Promise((resolve, reject) => {
    const pathToUploadDir = fs.ensureDirSync(path.join(process.cwd(), 'uploads', userId));
    const pathToFile = path.join(pathToUploadDir, filename);
    fs.removeSync(pathToFile, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log('File saved!');
        const relativePathToFile = path.relative(pathToFile, process.cwd());
        resolve(relativePathToFile);
      }
    });
  });
};

module.exports = {
  addFile,
  removeFile
};
