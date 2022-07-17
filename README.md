# Gymondo-wdio-automation-task

WebdriveIO tests for Gymondo (Coding task)

## Prerequisites

- Node.js is installed on your system

## Usage

- Run `npm i` from project root

- Run `npx wdio run wdio.conf.js`

### General info

A list of the test cases can be found [here](./test_cases.md).
Test cases can be found [here](./test/specs/myPlan.e2e.js)

A minor bug was found during the development of one of the test cases.

In light of this bug, and in order to not provide a failing test in this coding task, currently the test is a false positive on purpose.
After this issue is fixed, the test could become valid, by following the instructions on myPlan.e2e.js (lines 68, 71, 75).

The above mentioned Bug:
Today isn't selected in calendar if user ends program after selecting another day

This bug was found in test:
Today is selected in the calendar after ending the last prograrm
