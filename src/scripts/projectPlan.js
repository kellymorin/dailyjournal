/*
Main.js: Single responsibility: attach event listeners that call behavior at a specific time

ElementFactory.js: Loop over provided information and create HTML element that can be displayed in the DOM

MakePage.js: Single Responsibility: Initiate form build, call build page which loops over data and creates input elements. Calls element factory function

ValidateData.js: Single Responsibility: take provided data and check for required section completion, curse words, and special characters

Data.js: Get and post requests, only interacts with the API/ Database, should not be used to call any other functions

MakeEntry: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,

ShowEntries.js: Single responsibility: take all entries from Make Entry and append to the DOM

Priority Order of Tasks:
  6. Build form validation
    6a. Add event listener to main.js that calls this function on submit
    6c. Checks that the entries do not contain profanity


  EXTRA PROJECT PIECES
  Allow for radio buttons to be attached to the entrieslog section and filter entries based on selection
  Refactor with jQuery
  Include an ability to Cache entries


  COMPLETED TASKS:
    1. Complete element factory and test (COMPLETE)
    2. create MakePage Function that has two functions that call element factory (COMPLETE)
    3. Create function that appends the form to the DOM (COMPLETE)
      3a. add EventListener to main that calls this function onLoad (COMPLETE)
    4. Create function that loops over entries and calls element factory (COMPLETE)
    5. Create function that appends the entries to the DOM (COMPLETE)
      6a. Checks that all required elements are filled out and completed (COMPLETE)
      6b. Checks that all form entries only contain required characters/ no special characters (COMPLETE)
    7. Create a file that contains a class that can be used to store a new instance of an entry to pass to the API (COMPLETE)
    8. Create data module that completes both the get and post functionality to the API (COMPLETE)
    6c. if elements already exist, be sure to clear before loading again(COMPLETE)
*/