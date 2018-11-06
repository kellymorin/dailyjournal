/*
DAILY JOURNAL 5
In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

*/

import validateJournalEntry from "./validatedata"
import makePage from "./makePage"
import buildEntry from "./entryComponent"
import JournalEntry from "./journal";

if (document.readyState === "loading"){
  makePage.initiateForm();
}

let journal = [{
  concept: "something",
  date: "10/21/2018",
  name: "Kelly",
  mood: "happy",
  entry: "We learned some really difficult things today."
},
{
  concept: "santa",
  date: "10/28/2018",
  name: "Kelly",
  mood: "sad",
  entry: "Why santa no here yet?"
}

]

journal.forEach((journal)=>buildEntry.makeEntryElements(journal))



// const form = document.querySelector("form")
// export default form

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
    console.log(newEntry.mood)
    console.log(newEntry.singleJournalEntry())
    validateJournalEntry.onlyAllowedCharacters(newEntry.singleJournalEntry())
  }
})

  // const entry = new journalEntry({
  //   date: document.querySelector("#journalDate").value,
  //   name: document.querySelector("#authorName").value,
  //   concept: document.querySelector("#conceptsCovered").value,
  //   entry: document.querySelector("#journalEntry").value,
  //   mood: document.querySelector("#mood").value
  // })
  // console.log(entry)
  // export default entry
  // validateJournalEntry.onlyAllowedCharacters(entry)
  // journalEntry.save()
  // .then((data)=> {
    //   console.log("new contact saved", data)
    //   return getEntries()
  // })
  //     // NEED TO FINALIZE/UPDATE THIS
  //     .then(entriesList => render("contact-list", entriesList))
  //   }
  // }
