export interface BadDataType {
  dataKey: string;
  dataValue: any;
  expectedError: string;
}

export const goodData = {
  firstName: "Ari",
  lastName: "P",
  age: "40",
  stateOfResidence: "NY"
}

export const goodDataArray = ["Ari", "P", "40", "NY"]

export const badDataObj = {
  badDataArray: ["Ari", "P", "-40", "NY"],
  errorMessage: `age ""-40"" is invalid`
}

export const badFirstName: BadDataType = {
  dataKey: 'firstName',
  dataValue: ["foo"],
  expectedError: 'firstName "["foo"]" is invalid'
}

export const badLastName: BadDataType = {
  dataKey: 'lastName',
  dataValue: 43,
  expectedError: 'lastName "43" is invalid'
}

export const badAge: BadDataType = {
  dataKey: 'age',
  dataValue: "-4",
  expectedError: 'age ""-4"" is invalid'
}

export const badStateOfResidence: BadDataType = {
  dataKey: 'stateOfResidence',
  dataValue: { "state": "NY" },
  expectedError: 'stateOfResidence "{"state":"NY"}" is invalid'
}

export const badDataList = [
  badFirstName,
  badLastName,
  badAge,
  badStateOfResidence
]

export const SimpsonsCSV = `First Name,Last Name, Age,State
Homer, Simpson,45, Oregon
Seymour, Skinner,58, Oregon
Bart, Simpson,10, Oregon
Montgomery, Burns,102, Oregon
Mayor, Quimby,48, Oregon
Waylon, Smithers,55, Oregon
Barney, Gumble,41, Oregon
Marge, Simpson,41, Oregon
Edna, Krabappel,47, Oregon
Lisa, Simpson,8, Oregon
Maggie, Simpson,3, Oregon
Linel, Hutz,42, Oregon
Troy, McClure,47, California
Krusty, Clown,51, Oregon
`;

export const SimpsonsCSVColonDelimeter = `First Name:Last Name: Age:State
Homer: Simpson:45: Oregon
Seymour: Skinner:58: Oregon
Bart: Simpson:10: Oregon
Montgomery: Burns:102: Oregon
Mayor: Quimby:48: Oregon
Waylon: Smithers:55: Oregon
Barney: Gumble:41: Oregon
Marge: Simpson:41: Oregon
Edna: Krabappel:47: Oregon
Lisa: Simpson:8: Oregon
Maggie: Simpson:3: Oregon
Linel: Hutz:42: Oregon
Troy: McClure:47: California
Krusty: Clown:51: Oregon
`;

export const GoodSimpsonsCSVResult = [
  [`First Name`, `Last Name`, ` Age`, `State`],
  [`Homer`, ` Simpson`, `45`, ` Oregon`],
  [`Seymour`, ` Skinner`, `58`, ` Oregon`],
  [`Bart`, ` Simpson`, `10`, ` Oregon`],
  [`Montgomery`, ` Burns`, `102`, ` Oregon`],
  [`Mayor`, ` Quimby`, `48`, ` Oregon`],
  [`Waylon`, ` Smithers`, `55`, ` Oregon`],
  [`Barney`, ` Gumble`, `41`, ` Oregon`],
  [`Marge`, ` Simpson`, `41`, ` Oregon`],
  [`Edna`, ` Krabappel`, `47`, ` Oregon`],
  [`Lisa`, ` Simpson`, `8`, ` Oregon`],
  [`Maggie`, ` Simpson`, `3`, ` Oregon`],
  [`Linel`, ` Hutz`, `42`, ` Oregon`],
  [`Troy`, ` McClure`, `47`, ` California`],
  [`Krusty`, ` Clown`, `51`, ` Oregon`],
]

export const GoodSimpsonsComparerResult = [
  {
    "age": 45,
    "firstName": "Homer",
    "lastName": " Simpson",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 58,
    "firstName": "Seymour",
    "lastName": " Skinner",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 10,
    "firstName": "Bart",
    "lastName": " Simpson",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 102,
    "firstName": "Montgomery",
    "lastName": " Burns",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 48,
    "firstName": "Mayor",
    "lastName": " Quimby",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 55,
    "firstName": "Waylon",
    "lastName": " Smithers",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 41,
    "firstName": "Barney",
    "lastName": " Gumble",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 41,
    "firstName": "Marge",
    "lastName": " Simpson",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 47,
    "firstName": "Edna",
    "lastName": " Krabappel",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 8,
    "firstName": "Lisa",
    "lastName": " Simpson",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 3,
    "firstName": "Maggie",
    "lastName": " Simpson",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 42,
    "firstName": "Linel",
    "lastName": " Hutz",
    "stateOfResidence": " Oregon",
  },
  {
    "age": 47,
    "firstName": "Troy",
    "lastName": " McClure",
    "stateOfResidence": " California",
  },
  {
    "age": 51,
    "firstName": "Krusty",
    "lastName": " Clown",
    "stateOfResidence": " Oregon",
  }
]

export const SimpsonsSecondCSV = [
  [`First Name`, `Last Name`, ` Age`, `State`],
  [`Bart`, ` Simpson`, `10`, ` Oregon`],
  [`Marge`, ` Simpson`, `41`, ` Oregon`],
  [`Linel`, ` Hutz`, `42`, ` Oregon`],
  [`Sideshow`, ` Bob`, `53`, ` Oregon`], // This is not in the first list
  [`Marge`, ` Simpson`, `41`, ` Oregon`], // This is a repeat. It should not show twice
  ['', '', '18', ''],
]

export const BlankCSVResult = [
  ['', '', '22', ''],
  ['', '', '85', ''],
  ['', '', '66', ''],
  ['', '', '18', ''],
  ['', '', '', '']
]

export const BlanksCV = `,,22,
,,85,
,,66,
,,18,
,,,
`
export const simpsonsCsvFileName = `simpsons`;
export const simpsonsColonCsvFileName = `simpsonsColon`;
export const blankFileName = `blank`;

export const SimpsonsComparerResult = [
  { "age": 10, "firstName": "Bart", "lastName": " Simpson", "stateOfResidence": " Oregon" },
  { "age": 41, "firstName": "Marge", "lastName": " Simpson", "stateOfResidence": " Oregon" },
  { "age": 42, "firstName": "Linel", "lastName": " Hutz", "stateOfResidence": " Oregon" }
]
