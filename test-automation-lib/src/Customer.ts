// Customer is defined by firstName, lastName, age and state
export interface CustomerEntityType {
  firstName: string;
  lastName: string;
  age: number;
  stateOfResidence: string;
}

export class Customer {
  protected uniqId: string;
  private firstName: string;
  private lastName: string;
  private age: number;
  private stateOfResidence: string;

  constructor({ uniqId, firstName, lastName, age, stateOfResidence }: { uniqId?: string, firstName: string, lastName: string, age: number, stateOfResidence: string }) {
    this.uniqId = uniqId || `${firstName}${lastName}${age}${stateOfResidence}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.stateOfResidence = stateOfResidence;
  }

  getObj = () => {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      stateOfResidence: this.stateOfResidence,
    } as CustomerEntityType
  }

  getUniqId = (): string => this.uniqId;
}
