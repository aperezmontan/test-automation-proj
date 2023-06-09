// IMPORTS

import { Parser, parse } from 'csv-parse';
import fs, { ReadStream } from 'fs';
import { CustomerBuilder } from './CustomerBuilder';
import { CustomerEntityType } from './Customer';
import { Comparer } from './Comparer';

// INTERFACES

interface CustomerDataType {
  [key: string]: CustomerEntityType
}
// interface CompareCostumerOptionsType {
//   firstFileDelimiter?: string;
//   secondFileDelimiter?: string;
// }

// FUNCTIONS

// Imports the CSV data and returns it as an array of strings.
export const importData = async ({ filePath, delimiter = `,` }: { filePath: string, delimiter?: string }): Promise<string[][]> => {
  let parsedData: string[][] = [[]];
  const readStream = fs.createReadStream(filePath);

  // TODO: see if you can push this up to the getParser function above
  const parser: Parser = parse({ delimiter }, function (err, data: string[][]) {
    parsedData = data;
  });

  await parseData({ parser, readStream })
  return parsedData;
}

const parseData = ({ parser, readStream }: { parser: Parser, readStream: ReadStream }): Promise<void> => {
  readStream.pipe(parser);

  return new Promise((resolve, reject) => {
    parser.on('end', () => resolve(parser.read()));
    readStream.on('error', (e) => console.log("Error in parseData", e));
    readStream.on('close', () => { /* console.log("this would be a callback function" */ });
  })
}

// // Create the customers using the parsed Data
// export const createCustomers = (): CustumerType[] => {
//   return [];
// }

// // Returns the customers that are in both lists
// const customerIntersection = ({ firstCustomerList, secondCostumerList }: { firstCustomerList: CustumerType[], secondCostumerList: CustumerType[] }): CustumerType[] => {
//   return []
// }

// // Displays the customers
// const returnCustomers = ({ customers }: { customers: CustumerType[] }): void => {

// }

// const compare

const generateCustomersFromData = ({ data }: { data: string[][] }): CustomerDataType[] => {
  return []
}

// const customerIntersection = ({ firstFileData, secondFileData }: { firstFileData: string[][], secondFileData: string[][] }): CustomerEntityType[] => {
//   const firstFileCustomers = generateCustomersFromData({ data: firstFileData })
//   const intersection = 
//   return []
// }

const serialize = (element: any) => element?.getObj();

export const compareCustomers = async ({ firstFileName, secondFileName, options = {} }: { firstFileName: string, secondFileName: string, options?: {} }): Promise<CustomerEntityType[]> => {
  const firstFileData = await importData({ filePath: firstFileName });
  const secondFileData = await importData({ filePath: secondFileName });

  const comparer = new Comparer({ firstFileData, secondFileData, builder: CustomerBuilder })
  const intersectingCustomers = comparer.intersection();



  return intersectingCustomers.map(serialize)

  const customerData = firstFileData.concat(secondFileData);

  // console.log("firstFileData", firstFileData)
  // console.log("secondFileData", secondFileData)


  // new CustomerComparer({ firstFileCustomers, seco })
  // return customerComparer.visit()

  // return [{
  //   firstName: "firstName",
  //   lastName: "lastName",
  //   age: 22,
  //   stateOfResidence: "stateOfResidence"
  // }].map(({ firstName, lastName, age, stateOfResidence }) => ({
  //   firstName,
  //   lastName,
  //   age,
  //   stateOfResidence,
  // }) as CustomerEntityType);
}

// export const createCostumer = ({ firstName, lastName, age, stateOfResidence }: { firstName: string, lastName: string, age: number, stateOfResidence: string }): CustumerType => {
//   const uniqId = `${firstName}${lastName}${age}${stateOfResidence}`
//   return {
//     uniqId,
//     firstName,
//     lastName,
//     age,
//     stateOfResidence,
//   } as CustumerType
// }
