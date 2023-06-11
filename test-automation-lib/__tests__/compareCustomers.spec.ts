import { describe, expect, test } from '@jest/globals';
import { compareCustomers } from '../src';

import {
  SimpsonsCSV,
  GoodSimpsonsComparerResult,
  simpsonsCsvFileName,
  simpsonsColonCsvFileName,
  SimpsonsCSVColonDelimeter
} from './utils/fixtures'
import { createFile } from '../utils/helpers';

// NOTE: I put spaces in between each of the test function 
// calls because I think it makes it a bit more readable

describe(`compareCustomers`, () => {
  test(`should WORK CORRECTLY`, async () => {
    const firstFileName = createFile({ data: SimpsonsCSV, fileName: simpsonsCsvFileName, type: `csv` });
    const secondFileName = createFile({ data: SimpsonsCSVColonDelimeter, fileName: simpsonsColonCsvFileName, type: `csv` });
    const options = {
      secondFileDelimiter: ":"
    }
    const comparedCustomers = await compareCustomers({ firstFileName, secondFileName, options });
    expect(comparedCustomers).toEqual(GoodSimpsonsComparerResult);
  })
})
