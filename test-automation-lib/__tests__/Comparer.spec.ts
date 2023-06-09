import { describe, expect, jest, test } from '@jest/globals';
import { Comparer } from '../src/Comparer';
import { CustomerBuilder } from '../src/CustomerBuilder';
import { Customer } from '../src/Customer';
import { GoodSimpsonsCSVResult, SimpsonsSecondCSV, SimpsonsComparerResult, badDataObj } from './utils/fixtures';

// NOTE: I put spaces in between each of the test function 
// calls because I think it makes it a bit more readable

class NewCustomerBuilder extends CustomerBuilder { }

describe(`Comparer`, () => {

  describe(`constructor()`, () => {

    describe(`when a BUILDER IS PROVIDED`, () => {

      test(`it SETS builder TO PROVIDED BUILDER`, () => {
        const newComparer = new Comparer({ firstFileData: GoodSimpsonsCSVResult, secondFileData: SimpsonsSecondCSV, builder: NewCustomerBuilder })

        expect(newComparer['builder']).toEqual(NewCustomerBuilder);
      })
    })

    describe(`when a BUILDER IS NOT PROVIDED`, () => {

      test(`it SETS builder TO CustomerBuilder`, () => {
        const newComparer = new Comparer({ firstFileData: GoodSimpsonsCSVResult, secondFileData: SimpsonsSecondCSV })

        expect(newComparer['builder']).toEqual(CustomerBuilder);
      })
    })
  })

  describe(`intersection()`, () => {

    describe(`when there's an ERROR USING THE BUILDER`, () => {

      test(`it CATCHES IT`, () => {
        console.warn = jest.fn()

        const { badDataArray } = badDataObj;

        const newComparer = new Comparer({ firstFileData: GoodSimpsonsCSVResult, secondFileData: [badDataArray] })

        expect(newComparer.intersection).not.toThrow(Error);
        expect(newComparer.intersection()).toEqual([]);

        const newComparerWithBlank = new Comparer({ firstFileData: GoodSimpsonsCSVResult, secondFileData: [] })

        expect(newComparerWithBlank.intersection).not.toThrow(Error);
        expect(newComparerWithBlank.intersection()).toEqual([]);
        expect(console.warn).toHaveBeenCalledTimes(6)
      })
    })

    describe(`when IT RUNS WITHOUT ERRORS`, () => {

      test(`it COMPARES THE DATA ACCURATELY`, () => {
        const newComparer = new Comparer({ firstFileData: GoodSimpsonsCSVResult, secondFileData: SimpsonsSecondCSV })

        // Compare string representations of the resulting built objects to see if they're equal
        expect(JSON.stringify(newComparer.intersection()))
          .toEqual(JSON.stringify(SimpsonsComparerResult.map(simpson => new Customer(simpson))));
      })
    })
  })
})