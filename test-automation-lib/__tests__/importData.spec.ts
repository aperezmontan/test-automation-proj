import { createCustomers, importData } from '../src';
import { writeFileSync } from 'fs';
import path from 'path';
// import '@types/jest'; // For the types

const SimpsonsCSV = `First Name,Last Name, Age,State
Homer, Simpson,45, Oregon
Seymour, Skinner,58, Oregon
Bart, Simpson,10, Oregon
Montgomery, Burns,102, Oregon
Mayor, Quimby,48, Oregon
Waylon, Smithers,55, Oregon
Barney, Gumble,41, Oregon
Marge, Simpson,41, Oregon
Edna, Krabappel,47, Oregon
Lisa, Simpson,8, Oregon
Maggie, Simpson,3, Oregon
Linel, Hutz,42, Oregon
Troy, McClure,47, California
Krusty, Clown,51, Oregon
`;

const SimpsonsCSVColonDelimeter = `First Name:Last Name: Age:State
Homer: Simpson:45: Oregon
Seymour: Skinner:58: Oregon
Bart: Simpson:10: Oregon
Montgomery: Burns:102: Oregon
Mayor: Quimby:48: Oregon
Waylon: Smithers:55: Oregon
Barney: Gumble:41: Oregon
Marge: Simpson:41: Oregon
Edna: Krabappel:47: Oregon
Lisa: Simpson:8: Oregon
Maggie: Simpson:3: Oregon
Linel: Hutz:42: Oregon
Troy: McClure:47: California
Krusty: Clown:51: Oregon
`;

const GoodSimpsonsCSVResult = [
  [`First Name`, `Last Name`, ` Age`, `State`],
  [`Homer`, ` Simpson`, `45`, ` Oregon`],
  [`Seymour`, ` Skinner`, `58`, ` Oregon`],
  [`Bart`, ` Simpson`, `10`, ` Oregon`],
  [`Montgomery`, ` Burns`, `102`, ` Oregon`],
  [`Mayor`, ` Quimby`, `48`, ` Oregon`],
  [`Waylon`, ` Smithers`, `55`, ` Oregon`],
  [`Barney`, ` Gumble`, `41`, ` Oregon`],
  [`Marge`, ` Simpson`, `41`, ` Oregon`],
  [`Edna`, ` Krabappel`, `47`, ` Oregon`],
  [`Lisa`, ` Simpson`, `8`, ` Oregon`],
  [`Maggie`, ` Simpson`, `3`, ` Oregon`],
  [`Linel`, ` Hutz`, `42`, ` Oregon`],
  [`Troy`, ` McClure`, `47`, ` California`],
  [`Krusty`, ` Clown`, `51`, ` Oregon`],
]

const BlankCSVResult = [
  ['', '', '22', ''],
  ['', '', '85', ''],
  ['', '', '66', ''],
  ['', '', '18', ''],
  ['', '', '', '']
]

const BlanksCV = `,,22,
,,85,
,,66,
,,18,
,,,
`

const basePath = path.join(__dirname, '../')

// Helper function to create files
const createFile = ({ data, fileName, type }: { data: string, fileName: string, type: string }): string => {
  const fileNameAndExtenstion = `${fileName}.${type}`;
  writeFileSync(fileNameAndExtenstion, data);
  const filePath = path.join(basePath, fileNameAndExtenstion)
  return filePath;
}

const simpsonsCsvFileName = `simpsons`;
const simpsonsColonCsvFileName = `simpsonsColon`;
const blankFileName = `blank`;

const simpsonsCsvFile = createFile({ data: SimpsonsCSV, fileName: simpsonsCsvFileName, type: `csv` });
const simpsonsColonCsvFile = createFile({ data: SimpsonsCSVColonDelimeter, fileName: simpsonsColonCsvFileName, type: `csv` });
const blankFile = createFile({ data: BlanksCV, fileName: blankFileName, type: blankFileName });

// NOTE: I put spaces in between each of the test function 
// calls because I think it makes it a bit more readable
describe(`importData`, () => {

  describe(`when the file is a CSV`, () => {

    describe(`when NO DELIMITER PROVIDED -> DEFAULTS TO COMMA`, () => {

      test(`should import a CSV with commas CORRECTLY`, async () => {
        const importedData = await importData({ filePath: simpsonsCsvFile });
        expect(importedData).toEqual(GoodSimpsonsCSVResult);
      })

      test(`should import a CSV without commas INCORRECTLY`, async () => {
        const importedData = await importData({ filePath: simpsonsColonCsvFile });
        expect(importedData).not.toEqual(GoodSimpsonsCSVResult);
      })
    })

    describe(`when DELIMITER PROVIDED`, () => {
      const delimiter = `:`;

      test(`should import a CSV with the delimiter CORRECTLY`, async () => {
        const importedData = await importData({ filePath: simpsonsColonCsvFile, delimiter });
        expect(importedData).toEqual(GoodSimpsonsCSVResult);
      })
      test(`should import a CSV with the delimiter INCORRECTLY`, async () => {
        const importedData = await importData({ filePath: simpsonsCsvFile, delimiter });
        expect(importedData).not.toEqual(GoodSimpsonsCSVResult);
      })
    })


    describe(`when VALUES ARE BLANK`, () => {
      test(`imports the data as expected`, async () => {
        const importedData = await importData({ filePath: blankFile });
        console.log("importedData", importedData)
        expect(importedData).toEqual(BlankCSVResult);
      })
    })
  })
});
