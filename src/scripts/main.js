/*
DAILY JOURNAL 5
In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

*/

import validateJournalEntry from "./validatedata"
import makePage from "./makePage"
import JournalEntry from "./journal";
import journalEntries from "./data";
import manageDOM from "./DOMmanager";
import entriesList from "./entriesDOM";
import filterEntries from "./filterEntries";

if (document.readyState === "loading"){
  makePage.initiateForm();
  journalEntries.getEntries().then((data)=> entriesList.buildList(data)).then((taco)=> manageDOM.appendEntry(taco))
  filterEntries.moodSelector();
}


document.querySelector("#journalEntryButton").addEventListener("click", (event)=>{
  event.preventDefault()
  console.log("the form has been clicked")

  validateJournalEntry.noEmptyValues()
  if(validateJournalEntry.clearStatus === true){
    console.log("The status of check 1 has cleared")
    const newEntry = new JournalEntry({
      date: document.querySelector("#journalDate").value,
      name: document.querySelector("#authorName").value,
      concept: document.querySelector("#conceptsCovered").value,
      entry: document.querySelector("#journalEntry").value,
      mood: document.querySelector("#mood").value,
    })
    validateJournalEntry.onlyAllowedCharacters(newEntry.singleJournalEntry())
    if(validateJournalEntry.clearStatus === true){
      console.log("The status of check 2 has cleared")
      newEntry.save()
      .then((data)=> entriesList.buildList(data))
      .then((taco)=> manageDOM.appendEntry(taco))
    } else {
      console.log("Your submission has been terminated, please try again")
    }
  }
})

