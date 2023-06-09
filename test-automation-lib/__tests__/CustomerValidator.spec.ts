import { describe, expect, test } from '@jest/globals';
import { CustomerValidator } from '../src/CustomerValidator';
import { badDataList, goodData } from './utils/fixtures';

// NOTE: NOT SURE IF RANDOMIZING IS BEST PRACTICE BUT I DO THINK IT'S VALUABLE TO 
// THROW SOME CHAOS MONKEY TYPE STUFF IN YOUR APP. COULD BE CONVINCED OTHERWISE !!

const randomBadData = () => {
  let expectedErrorList: string[] = []

  const badData = badDataList.reduce<Record<string, any>>((acc, item) => {
    // This will add the bad element at a 50/50 clip for each item
    if (Math.random() < 0.5) {
      acc[item.dataKey] = item.dataValue;
      expectedErrorList.push(item.expectedError)
    }

    return acc;
  }, {})

  // This will fill out the remaining keys that weren't chosen with their error messages, if any
  CustomerValidator.STRING_KEYS.concat(CustomerValidator.NUMBER_KEYS).forEach(key => {
    if (!badData[key])
      expectedErrorList.push(`${key} is required`);
  });

  return { badData, expectedErrorList }
}

// NOTE: I put spaces in between each of the test function 
// calls because I think it makes it a bit more readable

describe(`CustomerValidator`, () => {
  describe(`NUMBER_KEYS`, () => {

    test(`should be correct`, () => {
      expect(CustomerValidator.NUMBER_KEYS).toEqual(['age']);
    })
  })

  describe(`STRING_KEYS`, () => {

    test(`should be correct`, () => {
      expect(CustomerValidator.STRING_KEYS).toEqual(['firstName', 'lastName', 'stateOfResidence']);
    })
  })

  describe(`errors()`, () => {

    describe(`when there ARE NONE`, () => {

      test(`should RETURN AN EMPTY ARRAY`, () => {
        expect(CustomerValidator.errors({ data: goodData })).toEqual([]);
      })
    })

    describe(`when there`, () => {

      test(`ARE SOME VALID PARAMETERS it should RETURN AN ARRAY OF THE ERRORS`, () => {
        const { badData, expectedErrorList } = randomBadData();
        expect(CustomerValidator.errors({ data: badData }).sort()).toEqual(expectedErrorList.sort());
      })

      test(`ARE NO VALID PARAMETERS it should RETURN AN ARRAY OF THE MISSING KEYS`, () => {
        const incorrectDataFormat = "foo";
        expect(CustomerValidator.errors({ data: incorrectDataFormat }).sort()).toEqual(["age is required", "firstName is required", "lastName is required", "stateOfResidence is required"]);
      })
    })
  })

  describe(`isValid()`, () => {

    describe(`when it IS VALID`, () => {

      test(`should RETURN TRUE`, () => {
        expect(CustomerValidator.isValid({ data: goodData })).toEqual(true);
      })
    })


    describe(`when it IS NOT VALID`, () => {

      test(`should RETURN FALSE`, () => {
        const { badData } = randomBadData();
        expect(CustomerValidator.isValid({ data: badData })).toEqual(false);
      })
    })
  })
})
