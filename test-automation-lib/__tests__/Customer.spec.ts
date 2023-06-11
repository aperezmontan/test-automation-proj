import { describe, expect, test } from '@jest/globals';
import { Customer } from '../src/Customer';

// NOTE: I put spaces in between each of the test function 
// calls because I think it makes it a bit more readable

describe(`Customer`, () => {

  describe(`getObj()`, () => {

    test(`it PROPERLY FORMATS THE OUPUT`, () => {
      const newCustomer = new Customer({ uniqId: 'foo', firstName: 'A', lastName: 'P', age: 5, stateOfResidence: 'NY' })

      expect(newCustomer.getObj()).toEqual({
        firstName: 'A', lastName: 'P', age: 5, stateOfResidence: 'NY'
      });
    })
  })
})