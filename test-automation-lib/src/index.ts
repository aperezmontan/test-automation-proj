// IMPORTS

import { Parser, parse } from 'csv-parse';
import fs, { ReadStream } from 'fs';
import { CustomerBuilder } from './CustomerBuilder';
import { CustomerEntityType } from './Customer';
import { Comparer } from './Comparer';

// FUNCTIONS

// The orchestrator
export const compareCustomers = async ({ firstFileName, secondFileName, options = {} }: { firstFileName: string, secondFileName: string, options?: {} }): Promise<CustomerEntityType[]> => {
  // console.log("firstFileName", firstFileName)
  // console.log("secondFileName", secondFileName)
  const firstFileData = await importData({ filePath: firstFileName });
  const secondFileData = await importData({ filePath: secondFileName });

  // console.log("firstFileData", firstFileData)
  // console.log("secondFileData", secondFileData)
  const comparer = new Comparer({ firstFileData, secondFileData, builder: CustomerBuilder })
  const intersectingCustomers = comparer.intersection();

  return intersectingCustomers.map(serialize)
}

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

// Reads the data and parses it
const parseData = ({ parser, readStream }: { parser: Parser, readStream: ReadStream }): Promise<void> => {
  readStream.pipe(parser);

  return new Promise((resolve, reject) => {
    parser.on('end', () => resolve(parser.read()));
    readStream.on('error', (e) => console.log("Error in parseData", e));
    readStream.on('close', () => { /* console.log("DATA IMPORTED") */ });
  })
}

const serialize = (element: any) => element?.getObj();
