const { compareFiles } = require("./js-entrypoint");

let firstFileName, secondFileName;

// This conditional will take the 3rd and 4th elements of the 
// inputed if there are 4 or more. Otherwise it will take the 3rd
// one only
if (process.argv.length > 3) {
  [firstFileName, secondFileName] = process.argv.slice(-2);
} else if (process.argv.length > 2) {
  [firstFileName] = process.argv.slice(-1);
}

compareFiles({ firstFileName, secondFileName })
