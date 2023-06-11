import { describe, expect, jest, test } from '@jest/globals';
import { compareCustomers } from "../src";


describe(`compareCustomers`, () => {

  describe(`when the file is a CSV`, () => {

    describe(`when NO DELIMITER PROVIDED -> DEFAULTS TO COMMA`, () => {

      test(`should import a CSV with commas CORRECTLY`, () => {
        // jest.spyOn(moduleApi, 'functionToMock').mockReturnValue({ someObjectProperty: 42 });
        // compareCustomers({ filePath: simpsonsCsvFile });
        // expect(importedData).toEqual(GoodSimpsonsCSVResult);
      })

      test(`should import a CSV without commas INCORRECTLY`, () => {
        // compareCustomers({ filePath: simpsonsColonCsvFile });
        // expect(importedData).not.toEqual(GoodSimpsonsCSVResult);
      })
    })
  })
})
