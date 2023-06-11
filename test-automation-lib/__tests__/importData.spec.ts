import { describe, expect, test } from '@jest/globals';
import { exportedForTesting } from '../src';
const { importData } = exportedForTesting;

import {
  SimpsonsCSV,
  SimpsonsCSVColonDelimeter,
  GoodSimpsonsCSVResult,
  BlankCSVResult,
  BlanksCV,
  simpsonsCsvFileName,
  simpsonsColonCsvFileName,
  blankFileName,
} from './utils/fixtures'
import { createFile } from '../utils/helpers';

const simpsonsCsvFile = createFile({ data: SimpsonsCSV, fileName: simpsonsCsvFileName, type: `csv` });
const simpsonsColonCsvFile = createFile({ data: SimpsonsCSVColonDelimeter, fileName: simpsonsColonCsvFileName, type: `csv` });
const blankFile = createFile({ data: BlanksCV, fileName: blankFileName, type: `csv` });

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
        expect(importedData).toEqual(BlankCSVResult);
      })
    })
  })
});
