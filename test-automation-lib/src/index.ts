// IMPORTS

import { Parser, parse } from 'csv-parse';
import fs, { ReadStream } from 'fs';
import path from 'path';
import { CustomerBuilder } from './CustomerBuilder';
import { CustomerEntityType } from './Customer';
import { Comparer } from './Comparer';

interface OptionsType {
  firstFileDelimiter?: string | undefined;
  secondFileDelimiter?: string | undefined
}

// FUNCTIONS

// The orchestrator
export const compareCustomers = async ({ firstFileName, secondFileName, options = {} }: { firstFileName: string, secondFileName: string, options?: OptionsType }): Promise<CustomerEntityType[]> => {
  const { firstFileDelimiter, secondFileDelimiter } = options;
  const firstFileData = await importData({ filePath: firstFileName, delimiter: firstFileDelimiter });
  const secondFileData = await importData({ filePath: secondFileName, delimiter: secondFileDelimiter });

  // NOTE: explain the dependency injection here with CustomerBuilder
  const comparer = new Comparer({ firstFileData, secondFileData, builder: CustomerBuilder })
  const intersectingCustomers = comparer.intersection();
  // console.log("intersection", intersection)
  return intersectingCustomers.map(serialize)
}

export const createFileNameWithPath = ({ fileName }: { fileName: string }): string => path.join(__dirname, "../../", fileName);

// Imports the CSV data and returns it as an array of strings.
// TODO: add the ability to specify a delimiter
const importData = async ({ filePath, delimiter = `,` }: { filePath: string, delimiter?: string }): Promise<string[][]> => {
  let parsedData: string[][] = [[]];
  const readStream = fs.createReadStream(filePath);

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

export const exportedForTesting = {
  importData,
  serialize
}
