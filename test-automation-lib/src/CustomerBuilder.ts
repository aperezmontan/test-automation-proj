import { Customer } from "./Customer";
import { CustomerValidator } from "./CustomerValidator";

interface TranformedDataType {
  [key: string]: string
}

export class CustomerBuilder {
  private data: TranformedDataType = {};
  private validator: typeof CustomerValidator

  constructor({ data, validator }: { data: string[], validator?: typeof CustomerValidator }) {
    this.validator = validator || CustomerValidator;
    this.setData({ dataArray: data });
  }

  build = (): Customer | never => {
    if (this.isValid() === true)
      return this.builtCustomer();

    const errorMessage = this.errors().join(', ');

    throw new Error(errorMessage);
  }

  // PRIVATE

  private builtCustomer = (): Customer => {
    const customerData = this.cleanData();
    return new Customer(customerData);
  }

  private cleanData = (): {
    firstName: string;
    lastName: string,
    age: number,
    stateOfResidence: string
  } => {
    const customerData = {
      firstName: this.data?.firstName,
      lastName: this.data?.lastName,
      age: parseInt(this.data?.age),
      stateOfResidence: this.data?.stateOfResidence,
    }

    return customerData;
  }

  private errors = (): string[] => {
    return this.validator.errors({ data: this.data })
  }

  private isValid = (): boolean => {
    return this.validator.isValid({ data: this.data })
  }

  private setData = ({ dataArray }: { dataArray: string[] }): void => {
    let index = 0;

    this.data = dataArray.reduce<Record<string, any>>((acc, value) => {
      acc[this.validator.KEYS[index]] = value
      index++;

      return acc;
    }, {})
  }
}