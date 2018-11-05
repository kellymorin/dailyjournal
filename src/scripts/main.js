/*
DAILY JOURNAL 8
Here's an example of what main.js could look like. Again, this is just an example. Your code does not need to look like this. You will build your own modules and give them names that make sense to you.

import DataManager from "./data/dataManager"
import DOMManager from "./dom/domManager"

DataManager.getJournalEntries().then(DOMManager.renderEntries)
*/

import makePage from "./DOMmanager"

if (document.readyState === "loading"){
  makePage.initiateForm();
}