const journalEntries = [
   {
      date: "07/24/2018",
      concept: "Array methods",
      entry: "We learned about 4 different array methods today. forEach made sense, but the others still confuse me.",
      mood: "Ok"
  },
    {
  date: "10/08/2018",
  concept: "Flexbox",
  entry: "We learned about using flexbox to style our pages",
  mood: "fine"
  },
  {
    date: "10/17/2018",
    concept: "Handling data",
    entry: "We learned about JavaScript to pull important information out of large data files.",
    mood: "happy",
  },
]

const entryLog = document.querySelector(".entryLog");

const makeJournalEntry = (...props)=>{
  return `<p>Today is: ${props[0]}. We learned about ${props[1]}. ${props[2]}`
}

let journalEntry = ""
journalEntries.forEach((journal)=> {
  journalEntry = `${makeJournalEntry(journal.date, journal.concept, journal.entry)}`
  entryLog.innerHTML += journalEntry
})


