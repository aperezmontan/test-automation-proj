<a id="readme-top" name="readme-top"></a>
# Blockgraph Testing Team Take Home

<!-- PROJECT LOGO -->
<br />
<div class="logo-container" align="center">
  <a href="https://www.blockgraph.co/">
    <img src="images/logo.svg" alt="Logo" width="200" height="50">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><h3>Table of Contents</h3></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#instructions">Instructions</a></li>
        <li><a href="#deliverable">Deliverable</a></li>
        <li><a href="#hints">Hints</a></li>
      </ul>
    </li>
    <li>
      <a href="#my-approach">My Approach</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#be-aware">Be Aware</a></li>
      </ul>
    </li>
    <li>
      <a href="#python">Python</a>
      <ol>
        <li>
          <a href="#getting-started">Getting Started</a>
          <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
          </ul>
        </li>
        <li>
          <a href="#usage">Usage</a>
          <ul>
            <li><a href="#using-other-data">Using Other Data</a></li>
            <li><a href="#output-to-file">Output To File</a></li>
            <li><a href="#running-tests">Running Tests</a></li>
          </ul>
        </li>
        <li>
          <a href="#notes-on-implementation">Notes On Implementation</a>
          <ul>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#other-considerations">Other Considerations</a></li>
          </ul>
        </li>
      </ol>
    </li>
    <li>
      <a href="#javascript">JavaScript</a>
      <ol>
        <li>
          <a href="#getting-started-1">Getting Started</a>
          <ul>
            <li><a href="#prerequisites-1">Prerequisites</a></li>
            <li><a href="#installation-1">Installation</a></li>
          </ul>
        </li>
        <li>
          <a href="#usage-1">Usage</a>
          <ul>
            <li><a href="#using-other-data-1">Using Other Data</a></li>
            <li><a href="#output-to-file-1">Output To File</a></li>
            <li><a href="#running-tests-1">Running Tests</a></li>
          </ul>
        </li>
        <li>
          <a href="#notes-on-implementation-1">Notes On Implementation</a>
          <ul>
            <li><a href="#how-it-works-1">How It Works</a></li>
            <li><a href="#other-considerations-1">Other Considerations</a></li>
          </ul>
        </li>
      </ol>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

NOTE: ADD THIS [![GIF of the project working][product-screenshot]](https://example.com)

The good folks at Blockgraph asked my to complete this take home project with the intention of evaluating my general engineering capabilities. They sent me a zip file which included a README, the contents of which, Instructions, Deliverible and Hints, is included below:

### Instructions
This zip file includes the following sample data. Assume these are customers on the email list for Store1 and Store2.
* Store1.csv
* Store2.csv

We want to determine which customers that patronize both Alice's Aquariums and Bob's Books. The
list of customer's from Alice's Aquariums in Store1.csv and Bob's Books in Store2.csv. Customers
are uniquely identified by their first and last name, age, and state of residence. Each time a
customer patronizes a store an entry is added to the ledger in the store's csv file.
intersection of customers between Store1 and Store2. Specifically, 
* Create a function that takes in two distinct filenames as inputs. You may assume that these are
  always distinct.
* Determine which customers have patronized both stores and output them in a list.
* Customers are defined by first and last name, age, and state of residence. This means that your
  output list should be a list of Customer objects/structs/dictionaries with these four fields

Please include unit test cases. Use whatever programming language you feel comfortable with. 

### Deliverable
* Please include files related to the take home exercise in the same zip/tar.gz or otherwise compressed file.
* Considering your personal life and busy schedule, you will have 2-3 days to complete this exercise although there is no penalty for taking longer should you need to.

### Hints
* Please include a short summary of how your code works. (This is a test on documentation as well as engineering)
* Feel free to write as many helper functions as needed for easier testing and readability

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## My Approach
The job description mentioned they were looking for someone with programming experience in Java, Go, Javascript, Typescript and scripting experience in either Python or Bash. Given those qualifications, I thought it'd be best to write this project in TypeScript/JavaScript and, if time allowed, Python. 
### Built With

[![Python][Python.com]][Python-url]
[![TypeScript][TypeScript.com]][TypeScript-url]
[![JavaScript][JavaScript.com]][JavaScript-url]
[![Node][Node.com]][Node-url]

### *Be Aware*

From here this README is split into 2 different, equivalent, sections: __Python__ and __JavaScript__. Equivalent in that they both accomplish the task just using different languages. I encourage you to try both, but feel free to use whichever you're most comfortable with.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Python

One version of this project is written in Python. The `run.py` is a script file that acts as a small adapter that leverages the methods in the `compare.py` file, where the real logic is contained.

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This project is meant to run on Python3. Most of the functionality works on Python2 also, but writing to files and running tests raises errors so this documentation assumes you will be using Python3.

### Installation

1. If you happen to have a Mac, the easiest way to download Python3 is to use homebrew:

* Installing python3 on Mac with Homebrew

  ```sh
  brew install python
  ```
Otherwise, download the latest version [here](https://www.python.org/downloads/).

2. When you're done, do a quick check to confirm by printing the version number: 

   ```sh
    ~> python3 -V
    Python 3.11.1
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Once you've installed Python, running it should be a cinch. From the root folder, just type `python3` with the name of the file to run the script:

   ```sh
    test-automation-proj ~> python3 compare_py/run.py
    Customers that are in both lists:  [{'first_name': 'James', 'last_name': 'Davis', ...
   ```

As you can see from the example above, the default output is an array of dictionaries listing the customers who have patronized both stores.

### Using Other Data

The default behavior for this script is to use the provided `Store1.csv` and `Store2.csv` files. However, if you'd like to use your own data, you can do that too ! For this, you'll need to: 

1. Make sure your data is in a CSV in the same format as the Store files (*comma delimmited and with First Name,Last Name,Age,State as headers*). 
2. Copy your data CSV file into the root directory.
3. To run the app against your data, you'll need to specify the file names you'd like to compare. For example, if the file you copied over is called `custom_data.csv`, and you'd like to compare that file with the provided `Store1.csv`, the command would look something like this:

   ```sh
    test-automation-proj:> python3 compare_py/run.py Store1.csv custom_data.csv
    Customers that are in both lists:  [{'first_name': 'Leo', 'last_name': ...]
    ```

### Output To File

Finally, you also have the choice of saving the customers to a new CSV file. To do this, all you need to do is specify a filename and it will save the results in the root directory. Continuing the example from above, if you wanted to take the output from the comparison of `Store1.csv` and `custom_data.csv` and save it to a file called `new_comparison.csv`, that command would be:

   ```sh
    test-automation-proj:> python3 compare_py/run.py Store1.csv custom_data.csv new_comparison.csv
    Customers saved to:  new_comparison.csv
   ```
You should now see the file `new_comparison.csv` containing all of the customers in both lists in the root directory.

### Running Tests

Running tests is relatively straightforward. To see the tests run, just type:

   ```sh
  test-automation-proj:> python3 compare_py/test_compare.py 
........
----------------------------------------------------------------------
Ran 8 tests in 0.017s

OK
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Notes On Implementation

### How It Works

As mentioned above, the `run.py` file is a script file that acts as the entrypoint for the app. It orchestrates the use of 3 methods in the `compare.py` file to return a result: 

- `csv_to_data_set`: takes a CSV file and returns the data as an array of dictionaries.
- `intersection`: *__CORE LOGIC__* this is where the sausage is made. It takes the lists, compares them, and returns the intersection set.
- `print_intersection`: takes the result from `intersection` and returns it to the user in the way they prefer (either printed to the screen or written to a file)

### Other Considerations

- I couldn't, for the life of me, figure out how to run tests on the `run.py` script file. I think this is ok, though, because it's essentially just working as a small adapter and any issues would probably make the script fail pretty evidently. Just wanted to point that out. I could be wrong, of course !

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# JavaScript

This project is also written in TypeScript, which gets compiled to JavaScript. Similar to the Python version, the `js-entrypoint` acts as a small adapter that leverages the `test-automation-lib` where the real logic is contained and is written completely in TypeScript. 

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To get it up and running, you'll need to have Yarn and Node at __these minimum versions__:

- Node 16
- Yarn 1.22

### Installation

1. If you happen to have a Mac, the easiest way to download Node and Yarn is to use homebrew:

* Installing Node and Yarn on Mac with Homebrew

  ```sh
  brew install node
  brew install yarn
  ```
Otherwise, you can use the links below :

- [Node](https://nodejs.org/en/download)
- [Yarn](https://yarnpkg.com/getting-started/install)

2. When you're done, do a quick check to confirm by printing the version number: 

NOTE: CHANGE THIS TO THE LATEST VERSIONS

   ```sh
    ~> node -v
    v18.16.0
    ~> yarn -v
    3.6.0
   ```

3. Now you can setup the app. First, go into the `test-automation-lib` folder and run:

   ```sh
    test-automation-lib:> yarn install
    ➤ YN0000: ┌ Resolution step
    ➤ YN0032: │ fsevents@npm:2.3.2: Implicit dependencies on node-gyp are discouraged
    ➤ YN0061: │ @npmcli/move-file@npm:2.0.1 is deprecated: This functionality has been moved to @npmcli/fs
    ➤ YN0000: └ Completed in 4s 591ms
    ...
    ...
    ...
    ➤ YN0000: Done with warnings in 9s 45ms

    test-automation-lib:> yarn build
   ```

- *__CAVEAT IF RUNNING LESS THAN Yarn 2__*: instead of running `yarn build` you should run `yarn setup`.

4. NOTE: FINISH WRITING OUT THE INSTALLATION INSTRUCTIONS

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
Once you've got Node and Yarn installed, running it should be very straightforward. From the root folder, just type `node` with the name of the file to run the script:

   ```sh
  test-automation-proj:> node js-entrypoint/index.js 
Error while trying to build a new CustomerBuilder: age ""Age"" is invalid
...
...
Customers that are in both lists: [
  {
    firstName: 'Charlotte',
    lastName: 'Wilson',
    age: 58,
    stateOfResidence: 'Idaho'
  },
  {
    firstName: 'James',
    lastName: 'Davis',
  ...
   ```

- *NOTE: there will be a series of errors before the final result is returned. This is addressed [here](#other-considerations-1).*

As you can see from the example above, the default output is an array of dictionaries listing the customers who have patronized both stores.

### Using Other Data

The default behavior for this script is to use the provided `Store1.csv` and `Store2.csv` files. However, if you'd like to use your own data, you can do that too ! For this, you'll need to: 

1. Make sure your data is in a CSV in the same format as the Store files (*comma delimmited and with First Name,Last Name,Age,State as headers*). 
2. Copy your data CSV file into the root directory.
3. To run the app against your data, you'll need to specify the file names you'd like to compare. For example, if the file you copied over is called `custom_data.csv`, and you'd like to compare that file with the provided `Store1.csv`, the command would look something like this:

   ```sh
    test-automation-proj:> node js-entrypoint/index.js Store1.csv custom_data.csv
    ...
    ...
    Customers that are in both lists: [
      {
        firstName: 'Harper',
        lastName: 'Jackson',
        age: 44,
        stateOfResidence: 'Wisconsin'
      },
    ...
    ```

### Output To File

Finally, you also have the choice of saving the customers to a new CSV file. To do this, all you need to do is specify a filename and it will save the results in the root directory. Continuing the example from above, if you wanted to take the output from the comparison of `Store1.csv` and `custom_data.csv` and save it to a file called `new_comparison.csv`, that command would be:

   ```sh
    test-automation-proj:> node js-entrypoint/index.js Store1.csv custom_data.csv new_comparison.csv
    ...
    Results written to new_comparison.csv
   ```
You should now see the file `new_comparison.csv` containing all of the customers in both lists in the root directory.

### Running Tests

Running tests is also straightforward. The only caveat is that you have to run them from their respective folders, `js-entrypoint` and `test-automation-lib`:

- `js-entrypoint`

  ```sh
    js-entrypoint:> yarn test
    yarn run v2
    $ jest
    PASS  __tests__/importData.spec.ts
    PASS  __tests__/CustomerValidator.spec.ts
    PASS  __tests__/Comparer.spec.ts
    PASS  __tests__/CustomerBuilder.spec.ts
    PASS  __tests__/Customer.spec.ts

    Test Suites: 5 passed, 5 total
    Tests:       21 passed, 21 total
    Snapshots:   0 total
    Time:        5.222 s, estimated 6 s
    Ran all test suites.
    ✨  Done in 6.13s.
   ```

- `test-automation-lib`

  ```sh
    test-automation-proj:> yarn test
    yarn run v2
    $ jest
    PASS  __tests__/importData.spec.ts
    PASS  __tests__/CustomerValidator.spec.ts
    PASS  __tests__/Comparer.spec.ts
    PASS  __tests__/CustomerBuilder.spec.ts
    PASS  __tests__/Customer.spec.ts

    Test Suites: 5 passed, 5 total
    Tests:       21 passed, 21 total
    Snapshots:   0 total
    Time:        5.222 s, estimated 6 s
    Ran all test suites.
    ✨  Done in 6.13s.
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Notes On Implementation

### How It Works

I used a slightly different implementation to run on the JavaScript side. The `compareCustomers` function works almost exactly like the Python version. Like the Python version, it acts like an orchestrator, leveraging 3 functions to do the work:

- `importData`: takes the CSV data and converts it into a 2-dimmensional array.
- `intersection`: *__CORE LOGIC__* Once the `Comparer` is instanitated with the imported data, it takes the arrays, compares them, and returns the intersection set.
- `serialize`: Calls `.getObj` on the `Customer` instances to serialize the output.

You'll notice that the `test-automation-lib` has a much more Object Oriented approach than the Python version. The `index.ts` uses a couple of functions to parse the data, but, besides that, the `compareCustomers` function leverages the `Comparer` class to abstract away most of the core logic. The `Comparer` class has one function to call where the core logic is contained, `intersection`.

### Other Considerations

- You'll notice that a bunch of errors are raised when the app is run...
   ```sh
  ~> node js-entrypoint/index.js 
  Error while trying to build a new CustomerBuilder: age ""Age"" is invalid
  Error while trying to build a new CustomerBuilder: firstName is required, lastName is required, stateOfResidence is required
  ...
   ```
  These are really just warnings and they come as a result of making the app more robust. It doesn't assume the file has headers and doesn't assume that all the rows have valid data. When it encounters either of these situations, it raises a warning. Thought it would be more informative to show these errors rather than supress them but wanted to point it out.
- The `randomBadData` helper in the `CustomerValidator.spec.ts` file randomly . Not sure if this is best testing practice, but I do think that throwing some inconsistency into testing, *__if it can be properly controlled__* (I understand this can be a __BIG IF__), is very useful. Like [Chaos Monkey](https://netflix.github.io/chaosmonkey/) at Netflix, which "randomly terminating instances in production to ensure that engineers implement their services to be resilient to instance failures", I think a bit of randomness can be good to test your systems. As always, these are strong convictions loosely held. Would love to discuss more with the team !!
- There's a __TODO__ in the `importData` function to be able to specify a delimiter. Some files use tabs or semi colons. Being able to specify a delimiter would make this implementation a bit more robust.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[TypeScript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
[JavaScript.com]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://www.javascript.com/
[Node.com]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Python.com]: https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/

