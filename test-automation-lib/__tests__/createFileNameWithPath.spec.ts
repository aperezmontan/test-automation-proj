import { describe, expect, jest, test } from '@jest/globals';
import { createFileNameWithPath } from "../src";
import path from 'path';

describe(`createFileNameWithPath`, () => {

  test(`should PROPERLY FORMAT THE PATH`, () => {
    const fileNameWithPath = createFileNameWithPath({ fileName: "foo" })
    expect(fileNameWithPath).toEqual(path.join(__dirname, "../../", "foo"));
  })
})
