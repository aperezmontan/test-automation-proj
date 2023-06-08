const path = require("path");
const { compareCustomers } = require("test-automation-lib");

const createFileNameWithPath = ({ fileName }) => {
  const basePath = path.join(__dirname, '../');
  return path.join(basePath, fileName);
}

const firstFileName = createFileNameWithPath({ fileName: 'Store1.csv' });
const secondFileName = createFileNameWithPath({ fileName: 'Store2.csv' });
compareCustomers({ firstFileName, secondFileName })

// Happy path
// console.log(compareCustomers("Store1.csv", "Store2.csv"));

// Sad path 1
// console.log(compareCustomers("Store1.csv", "Store2.csv"));
