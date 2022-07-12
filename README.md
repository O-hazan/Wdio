# Wdio

WebdriveIO tests for Gymondo task

## To use this:

- INSTALL node.js

- CLONE the project from github

- RUN npm install in the cloned project location

- RUN npx wdio run wdio.conf.js

### General info:

A bug was found:
Today isn't selected in calendar if user ends program after selecting another day

Found in test:
Calendar => Remove the program and verify UI is back to default

Found in this step:
Remove the program and verify UI is back to default => Verify that today is selected in the calendar
