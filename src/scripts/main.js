/*
Main.js: Single responsibility: attach event listeners that call behavior at a specific time
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
  makePage.createRadioButtons()
  filterEntries.moodSelector();
}


$("#journalEntryButton").click((event)=>{
  event.preventDefault()
  console.log("the form has been clicked")

  validateJournalEntry.validateForm()
  if(validateJournalEntry.clearStatus === true){
    console.log("The status of check 1 has cleared")
    const newEntry = new JournalEntry({
      date: $("#journalDate").val(),
      name: $("#authorName").val(),
      concept: $("#conceptsCovered").val(),
      entry: $("#journalEntry").val(),
      mood: $("#mood").val(),
    })
    $("form").trigger("reset")
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

$("#conceptsCovered").keypress(()=>
  validateJournalEntry.maximumConceptEntryLength()
)

