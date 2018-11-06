/*

data.js - Move the code that deals with getting the data into this file.

Data.js: Get and post requests, only interacts with the API/ Database, should not be used to call any other functions


DAILY JOURNAL 5
Implement the method using fetch to perform a POST request.
In main module, invoke method to save entry, then add item to local array.
Update DOM with updated array values.

Write a method in your API module that performs a POST and a GET, then use that method in the event listener.
*/

const journalEntries = {
  getEntries: ()=>{
    return fetch("http://localhost:8088/entries")
    .then((entries) => entries.json())
  },

  saveJournalEntry: (journalEntry)=>{
    return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(journalEntry)
    })
  }
}

export default journalEntries