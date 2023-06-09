const path = require("path");
const fs = require('fs');
const { compareCustomers } = require("test-automation-lib");

const compareFiles = ({firstFileName, secondFileName, saveToFile = null}) => {
  const firstFileNameWithPath = createFileNameWithPath({ fileName: firstFileName || 'Store1.csv' });
  const secondFileNameWithPath = createFileNameWithPath({ fileName: secondFileName || 'Store2.csv' });
  const saveToFileWithPath = saveToFile && createFileNameWithPath({ fileName: saveToFile });

  compareCustomers({ firstFileName: firstFileNameWithPath, secondFileName: secondFileNameWithPath })
  .then((res) => {
    if (saveToFileWithPath) {
      const header = ["First Name", "Last Name", "Age", "State"]
      const content = res.map((obj) => Object.values(obj));
      const csvContent = [header].concat(content)
      const fileNameWithPath = createFileNameWithPath({ fileName: saveToFile })
      
      const writeStream = fs.createWriteStream(fileNameWithPath);

      writeStream.write(csvContent.join("\n"));

      console.log(`Results written to ${saveToFile}`)
    } else {
      console.log("Customers that are in both lists:", res)
    }
  }).catch((error) => console.error("Uh oh, something went wrong ->", error))
}

const createFileNameWithPath = ({ fileName }) => {
  const basePath = path.join(__dirname, '../');
  return path.join(basePath, fileName);
}

exports.compareFiles = compareFiles;
