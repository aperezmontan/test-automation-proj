// INTERFACES

// Options for the compare function
interface CompareCostumerOptionsType {
  firstFileDelimiter?: string;
  secondFileDelimiter?: string;
}

// Adds a unique string to make comparing customers more straightfoward
interface CostumerType extends CustomerEntityType {
  uniqId: string;
}

// Customer is defined by firstName, lastName, age and state
interface CustomerEntityType {
  firstName: string;
  lastName: string;
  age: number;
  stateOfResidence: string;
}

// IMPORTS

import { Parser, parse } from 'csv-parse';
import fs, { ReadStream } from 'fs';

// FUNCTIONS

// const getParser = () => {
//   return ()
// }

// Imports the CSV data and returns it as an array of strings.
// OR !! Could raise an error if the file is not found or the file is not a CSV
export const importData = async ({ filePath, delimiter = `,` }: { filePath: string, delimiter?: string }) => {
  let parsedData;
  const readStream = fs.createReadStream(filePath);

  // TODO: see if you can push this up to the getParser function above
  const parser: Parser = parse({ delimiter }, function (err, data) {
    parsedData = data;
  });

  await parseData({ parser, readStream })
  return parsedData;
}

const createParser = () => {

}

const parseData = ({ parser, readStream }: { parser: Parser, readStream: ReadStream }): Promise<void> => {
  readStream.pipe(parser);

  return new Promise((resolve, reject) => {
    parser.on('end', () => resolve(parser.read()));
    readStream.on('error', (e) => console.log("Error in parseData", e));
    readStream.on('close', () => { /* console.log("this would be a callback function" */ });
  })
}

// Create the customers using the parsed Data
export const createCustomers = (): CostumerType[] => {
  return [];
}

// Returns the customers that are in both lists
const customerIntersection = ({ firstCustomerList, secondCostumerList }: { firstCustomerList: CostumerType[], secondCostumerList: CostumerType[] }): CostumerType[] => {
  return []
}

// Displays the customers
const returnCustomers = ({ customers }: { customers: CostumerType[] }): void => {

}

export const compareCustomers = ({ firstFileName, secondFileName, options = {} }: { firstFileName: string, secondFileName: string, options?: {} }): CustomerEntityType[] => {
  // createCostumers - (could filter at the same time to make this O(n) time)
  // filterCommonCustomers
  // returnFilteredCustomers
  importData({ filePath: firstFileName });

  return [{
    firstName: "firstName",
    lastName: "lastName",
    age: 22,
    stateOfResidence: "stateOfResidence"
  }].map(({ firstName, lastName, age, stateOfResidence }) => ({
    firstName,
    lastName,
    age,
    stateOfResidence,
  }) as CustomerEntityType);
}

export const createCostumer = ({ firstName, lastName, age, stateOfResidence }: { firstName: string, lastName: string, age: number, stateOfResidence: string }): CostumerType => {
  const uniqId = `${firstName}${lastName}${age}${stateOfResidence}`
  return {
    uniqId,
    firstName,
    lastName,
    age,
    stateOfResidence,
  } as CostumerType
}
