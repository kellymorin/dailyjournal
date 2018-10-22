// Move the code that deals with getting the data into this file.

const getEntries = {
  getJournalEntries () {
    // Fetch data from entries.json (owned data source)
     return fetch("http://localhost:8088/entries")
    .then((entries)=> entries.json()) //Transition fetch response from JSON to JS
  }
}
