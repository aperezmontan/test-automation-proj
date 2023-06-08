import { createCostumer } from "../src";
import 'jest'; // For the types

describe("createCostumer", () => {
  it("should create the customer given the required params", () => {
    expect(createCostumer({
      firstName: "firstName",
      lastName: "lastName",
      age: 22,
      stateOfResidence: "stateOfResidence"
    })).toEqual({ "name": "FOO" });
  });
});
