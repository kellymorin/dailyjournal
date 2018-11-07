/*
Data.js: Single Responsibility: Get and post requests, only interacts with the API/ Database, should not be used to call any other functions
*/

const journalEntries = {
  getEntries: ()=>{
    return fetch("http://localhost:8088/entries?_expand=mood")
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