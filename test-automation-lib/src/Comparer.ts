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
    // Creates a Map out of the firstFileData where the uniqId 
    // is the key and the Customer is the value
    this.populateFirstFileObject()

    // Creates a Customer for each element in secondFileData and checks the uniqId 
    // of to see if it's in the firstFileObject. If it is, and it's not a dupplicate, 
    // it includes it in the set of intersecting objects and returns it when it's done 
    // looking through all of the elements in secondFileData
    return this.findIntersectingObjectsWithSecondFileData()
  }

  // PRIVATE

  private buildNewItem = ({ data }: { data: string[] }) => {
    const newBuilder = new this.builder({ data })
    return newBuilder.build();
  }

  private handleError = ({ error }: { error: Error | unknown }): void => {
    if (error instanceof (Error)) {
      console.warn(`Error while trying to build a new ${this.builder.name}:`, error.message)
    } else {
      console.warn(`Error while trying to build a new ${this.builder.name}:`, error)
    }
  }

  private findIntersectingObjectsWithSecondFileData = (): ObjectType[] => {
    const intersectingObjects: ObjectType[] = [];
    const intersectingMap: ObjectType = {};

    // Big O(n) where n is the number of rows in the secondFileData
    // I know a lot of this code is not DRY with populateFirstFileObject, 
    // but I thought showing it this way was a lot clearer
    this.secondFileData.forEach(data => {
      try {
        const newItem = this.buildNewItem({ data })

        if (this.firstFileObject[newItem.getUniqId()] && !intersectingMap[newItem.getUniqId()]) {
          intersectingMap[newItem.getUniqId()] = true; // Value here doesn't matter. Just need the ID to compare
          intersectingObjects.push(newItem)
        }

      } catch (error) {
        this.handleError({ error })
      }
    })

    return intersectingObjects;
  }

  private populateFirstFileObject = (): void => {
    // Big O(n) where n is the number of rows in the firstFileData
    this.firstFileData.forEach(data => {
      try {
        const newItem = this.buildNewItem({ data })
        this.firstFileObject[newItem.getUniqId()] = true; // Value here doesn't matter. Just need the ID to compare
      } catch (error) {
        this.handleError({ error })
      }
    })
  }
}
