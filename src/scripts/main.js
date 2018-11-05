/*
DAILY JOURNAL 5
In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

*/

import makePage from "./DOMmanager"

if (document.readyState === "loading"){
  makePage.initiateForm();
}

document.querySelector("#journalEntryButton").addEventListener("click", (event)=>{
  event.preventDefault()
  let form = document.querySelector("form")
  validateJournalEntry.noEmptyValues(form);


  if(form.checkValidity()=== true){
    const entry = new journalEntry({
      date: document.querySelector("#journalDate").value,
      name: document.querySelector("#authorName").value,
      concept: document.querySelector("#conceptsCovered").value,
      entry: document.querySelector("#journalEntry").value,
      mood: document.querySelector("#mood").value
    })
    journalEntry.save()
    .then((data)=> {
      console.log("new contact saved", data)
      return getEntries()
    })
    // NEED TO FINALIZE/UPDATE THIS
    .then(entriesList => render("contact-list", entriesList))
  }
})


