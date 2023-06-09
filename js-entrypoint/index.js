const path = require("path");
const { compareCustomers } = require("test-automation-lib");

const createFileNameWithPath = ({ fileName }) => {
  const basePath = path.join(__dirname, '../');
  return path.join(basePath, fileName);
}

const compareFiles = ({firstFileName, secondFileName, saveToFile = null}) => {
  const firstFileNameWithPath = createFileNameWithPath({ fileName: firstFileName || 'Store1.csv' });
  const secondFileNameWithPath = createFileNameWithPath({ fileName: secondFileName || 'Store2.csv' });

  console.log("firstFileNameWithPath", firstFileNameWithPath)
  console.log("secondFileNameWithPath", secondFileNameWithPath)

  compareCustomers({ firstFileName: firstFileNameWithPath, secondFileName: secondFileNameWithPath })
  .then((res) => {
    console.log("Customers that are in both lists:", res)
    // TODO: Make it so that if the user provides a filename you save it to a file
  }).catch((error) => console.log("Uh oh, something went wrong ->", error))
}

exports.compareFiles = compareFiles;
