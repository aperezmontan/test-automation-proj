import { Customer } from "./Customer";
import { CustomerBuilder } from "./CustomerBuilder";

interface ObjectType {
  [key: string]: any;
}

export class Comparer {
  private firstFileObject: ObjectType = {};
  private firstFileData: string[][];
  private secondFileData: string[][];
  private builder: typeof CustomerBuilder

  constructor({
    firstFileData,
    secondFileData,
    builder
  }: {
    firstFileData: string[][],
    secondFileData: string[][],
    builder?: typeof CustomerBuilder
  }) {
    this.firstFileData = firstFileData
    this.secondFileData = secondFileData
    this.builder = builder || CustomerBuilder
  }

  intersection = (): any[] => {
    const intersectingObjects: ObjectType[] = [];

    // Big O(n) where n is the number of rows in the firstFileData
    this.firstFileData.forEach(data => {
      try {
        const newBuilder = new this.builder({ data })
        const newItem = newBuilder.build();
        this.firstFileObject[newItem.getUniqId()] = true; // Value here doens't matter. Just need the ID to compare
      } catch (error) {
        this.handleError({ error })
      }
    })

    // Big O(n) where n is the number of rows in the secondFileData
    this.secondFileData.forEach(data => {
      try {
        const newBuilder = new this.builder({ data })
        const newItem = newBuilder.build();

        if (this.firstFileObject[newItem.getUniqId()])
          intersectingObjects.push(newItem)

      } catch (error) {
        this.handleError({ error })
      }
    })

    return intersectingObjects;
  }

  // PRIVATE

  private handleError = ({ error = [""] }: { error: string[] | unknown }): void => {
    console.warn(`Error while trying to build a new ${this.builder.name}:`, error)
  }
}
