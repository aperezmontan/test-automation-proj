<a id="readme-top" name="readme-top"></a>
# Blockgraph Testing Team Take Home

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.svg" alt="Logo" width="200" height="50">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
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
        </li>
      </ol>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![GIF of the project working][product-screenshot]](https://example.com)

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
The job description mentioned they were looking for someone with scripting experience in either Python or Bash and programming experience in Java, Go, Javascript and Typescript. Given those qualifications, I thought it'd be best to write this project in TypeScript/JavaScript and, if time allowed, Python. 
### Built With

* [![TypeScript][TypeScript.com]][TypeScript-url]
* [![JavaScript][JavaScript.com]][JavaScript-url]
* [![Node][Node.com]][Node-url]
* [![Python][Python.com]][Python-url]

### *Be Aware*

From here this README is split into 2 different, equivalent, sections: __Python__ and __JavaScript__. Equivalent in that they both accomplish the task just using different languages. I encourage you to try both, but feel free to use whichever you're most comfortable with.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Python

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

As you can see from the example above, the default output is an array of dictionaries listing the customers you have patronized both stoes.

### Using Other Data

The default behavior for this script is to use the provided `Store1.csv` and `Store2.csv` files. However, if you'd like to use your own data, you can do that too ! For this, you'll need to 

1. Make sure your data is in a CSV in the same format as the Store files (*comma delimmited and with First Name,Last Name,Age,State as headers*). 
2. Copy your data CSV file into the root directory.
3. To run the app against your data, you'll need to specify the file names you'd like to compare. For example, if the file you copied over is called `custom_data.csv`, and you'd like to compare that file with the provided `Store1.csv`, the command would look something like this:

   ```sh
    ~> python3 compare_py/run.py Store1.csv custom_data.csv
    Customers that are in both lists:  [{'first_name': 'Leo', 'last_name': ...]
    ```

### Output To File

Finally, you also have the choice of saving the customers to a new CSV file. To do this, all you need to do is specify a filename and it will save the results in the root directory. Continuing the example from above, if you wanted to take the output from the comparison of `Store1.csv` and `custom_data.csv` and save it to a file called `new_comparison.csv`, that command would be:

   ```sh
    ~> python3 compare_py/run.py Store1.csv custom_data.csv new_comparison.csv
    Customers saved to:  new_comparison.csv
   ```
You should now see the file `new_comparison.csv` containing all of the customers in both lists in the root directory.

### Running Tests

Running tests is relatively straightforward. To see the tests run, just type:

   ```sh
    ~> python3 compare_py/test_compare.py 
........
----------------------------------------------------------------------
Ran 8 tests in 0.017s

OK
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Notes On Implementation

- I implemented this version of the comparison slightly different than in the JavaScript version (more details on that in the respective section, [below](#notes-on-implementation-1)). In the Python implementation, I create 2 dictionaries to make the comparison. This takes up more space than the JavaScript version because, in the JavaScript one, I only create one dictionary and iterate over the customers in the other file to make the comparison in place. They both run in O(n) time, but, for really large values of n, this will likely start to run faster than the JavaScript implementation, but it will also take up a lot more space. 
- If you look at the `run.py` and the `compare.py` files, you'll see that the `run.py` file is a script file that leverages the methods in the `compare.py`. I but I couldn't, for the life of me, figure out how to run tests on the `run.py` script file. I think this is ok, though, because it's essentially just working as a small adapter and any issues would probably make the script fail pretty evidently. Just wanted to point that out. I could be wrong, of course !

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# JavaScript

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


### Using Other Data


### Output To File

### Running Tests



<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Notes On Implementation



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

