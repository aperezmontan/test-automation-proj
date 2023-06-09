import { describe, expect, test } from '@jest/globals';

import { Customer } from '../src/Customer';
import { CustomerBuilder } from '../src/CustomerBuilder';
import { CustomerValidator } from '../src/CustomerValidator';
import { goodDataArray, badDataObj } from './utils/fixtures';

// NOTE: I put spaces in between each of the test function 
// calls because I think it makes it a bit more readable

class NewCustomerValidator extends CustomerValidator { }

describe(`CustomerBuilder`, () => {

  describe(`constructor()`, () => {

    describe(`when a VALIDATOR IS PROVIDED`, () => {

      test(`it SETS validator TO PROVIDED VALIDATOR`, () => {
        const newCustomerBuilder = new CustomerBuilder({ data: goodDataArray, validator: NewCustomerValidator })

        expect(newCustomerBuilder['validator']).toEqual(NewCustomerValidator);
      })
    })

    describe(`when a VALIDATOR IS NOT PROVIDED`, () => {

      test(`it SETS validator TO CustomerValidator`, () => {
        const newCustomerBuilder = new CustomerBuilder({ data: goodDataArray })

        expect(newCustomerBuilder['validator']).toEqual(CustomerValidator);
      })
    })
  })

  describe(`build()`, () => {

    describe(`when VALID DATA is provided`, () => {

      test(`it RETURNS A NEW CUSTOMER`, () => {
        const newCustomerBuilder = new CustomerBuilder({ data: goodDataArray })

        expect(newCustomerBuilder.build()).toBeInstanceOf(Customer)
      })
    })

    describe(`when INVALID DATA is provided`, () => {

      test(`it THROWS AN ERROR`, () => {
        const { badDataArray, errorMessage } = badDataObj;
        const newCustomerBuilder = new CustomerBuilder({ data: badDataArray })

        expect(newCustomerBuilder.build).toThrow(Error);
        expect(newCustomerBuilder.build).toThrow(errorMessage);

        const newCustomerBuilderWithBlank = new CustomerBuilder({ data: [] })

        expect(newCustomerBuilderWithBlank.build).toThrow(Error);
        expect(newCustomerBuilderWithBlank.build).toThrow("firstName is required, lastName is required, stateOfResidence is required, age is required");
      })
    })
  })
})
