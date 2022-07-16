# Test cases:

## Title: Start and end a program and verify some elements are displayed. (This is a basic acceptance test for the other tests)

    Login:
        Open homepage
        Accept coockies
        Click Login button
        Enter user name and password
        Click submit
        Click "got it"
    Start program:
        Click start new program
        Click start program
        Click save
    End program:
        Click plan settings
        Click end
        Confirm end program

    Verifications:
        Verify window title
        Verify nav link attribute
        Verify nav link color
        Verify head titles are displayed

## Title: timeline workout days match calendar workout days ([timeline.e2e.js](./test/specs/timeline.e2e.js))

    Login
    Start program
    Open timeline
    Verifications:
        Workout days in the timeline mache the ones in calendar

## Title: Calendar is back to not active when ending the last program ([calendar.e2e.js](./test/specs/calendar.e2e.js))

    Login
    Start a program
    Select a different day in the calendar
    Remove the program
    Verifications:
        Selected day is today when ending the last program

## Title: Calendar displays upcoming week days and dates

    Login
    Verifications:
        Verify 7 days are displayed starting from today
        Verify correct dates appear in the calendar
