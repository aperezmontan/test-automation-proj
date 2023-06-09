export class CustomerValidator {
  static NUMBER_KEYS = ['age'];
  static STRING_KEYS = ['firstName', 'lastName', 'stateOfResidence'];
  static KEYS = ['firstName', 'lastName', 'age', 'stateOfResidence'];

  static errors = ({ data }: { data: {} }): string[] => {
    let errorsList: string[] = []

    // CHECKS IF EVERY WORD IS A STRING     
    CustomerValidator.STRING_KEYS.forEach(key => {
      const value = data[key as keyof typeof data];
      if (!this.isStringOfAtLeastLengthOne(value))
        errorsList.push(this.errorMessage(key, value))
    });

    // CHECKS IF AGE IS A PARSABLE NUMBER > 0
    CustomerValidator.NUMBER_KEYS.forEach(key => {
      const value = data[key as keyof typeof data];
      if (!this.isNumberGreaterThanZero(value))
        errorsList.push(this.errorMessage(key, value))
    });

    return errorsList
  }

  static isValid = ({ data }: { data: {} }): boolean => !this.errors({ data }).some(error => error);

  // PRIVATE

  private static errorMessage = (key: string, item: any): string => {
    if (!!item) {
      return `${key} "${JSON.stringify(item)}" is invalid`;
    }

    return `${key} is required`;
  }

  private static isNumberGreaterThanZero = (age: any): boolean => parseInt(age) > 0;

  private static isStringOfAtLeastLengthOne = (item: any): boolean => (typeof item === 'string' || item instanceof String) && (item.length > 0);
}