import { compareCustomers } from "../src";
import 'jest'; // For the types

describe("compareCustomers", () => {
  it("should compare the customers in each file", () => {
    const firstFileName = "foo";
    const secondFileName = "far";
    expect(compareCustomers({ firstFileName, secondFileName })).toEqual({ "name": "FOO" });
  });
});
