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

  describe(`isEqual()`, () => {

    describe(`when the uniqId is provided`, () => {

      test(`it USES THE PROVIDED uniqId TO COMPARE`, () => {
        const newCustomer = new Customer({ uniqId: 'foo', firstName: 'A', lastName: 'P', age: 5, stateOfResidence: 'NY' })
        const sameCustomer = new Customer({ uniqId: 'foo', firstName: 'A', lastName: 'P', age: 5, stateOfResidence: 'NY' })
        const differentCustomer = new Customer({ uniqId: 'bar', firstName: 'B', lastName: 'C', age: 56, stateOfResidence: 'LA' })

        expect(newCustomer.isEqual({ otherCustomer: sameCustomer })).toEqual(true);
        expect(sameCustomer.isEqual({ otherCustomer: newCustomer })).toEqual(true);
        expect(newCustomer.isEqual({ otherCustomer: differentCustomer })).toEqual(false);
        expect(sameCustomer.isEqual({ otherCustomer: differentCustomer })).toEqual(false);
      })
    })

    describe(`when the uniqId is not provided`, () => {

      test(`it USES THE GENERATED uniqId TO COMPARE`, () => {
        const newCustomer = new Customer({ firstName: 'A', lastName: 'P', age: 5, stateOfResidence: 'NY' })
        const sameCustomer = new Customer({ firstName: 'A', lastName: 'P', age: 5, stateOfResidence: 'NY' })
        const differentCustomer = new Customer({ firstName: 'B', lastName: 'P', age: 5, stateOfResidence: 'NY' })

        expect(newCustomer.isEqual({ otherCustomer: sameCustomer })).toEqual(true);
        expect(sameCustomer.isEqual({ otherCustomer: newCustomer })).toEqual(true);
        expect(newCustomer.isEqual({ otherCustomer: differentCustomer })).toEqual(false);
        expect(sameCustomer.isEqual({ otherCustomer: differentCustomer })).toEqual(false);
      })
    })
  })
})