# Wdio

WebdriveIO tests for Gymondo task

## To use this:

- INSTALL node.js

- CLONE the project from github

- RUN npm install in the cloned project location

- RUN npx wdio run wdio.conf.js

### General info:

The scenarios can be improved and have more verifications.

Code can be orgenized for better readability using variables.

Test cases are in the project under "Test cases"

One of the test found a minor bug, see below.
Currently the test is invalid so it will not fail.
In order to make the test valid follow the instructions on calendar.e2e.js (line 35)

Bug:
Today isn't selected in calendar if user ends program after selecting another day

Found in test:
Calendar => Remove the program and verify UI is back to default

Found in this step:
Remove the program and verify UI is back to default => Verify that today is selected in the calendar
