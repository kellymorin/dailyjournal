// Create elements that will be built up later based on the query and added to the DOM
let entryLog = document.querySelector(".entryLog");
let fragment = document.createDocumentFragment(); 

const makeJournalEntry = (el, content, {id, clazz}, ...children)=>
{
  let element = document.createElement(el)
  element.innerHTML = content || null
  children.forEach((child)=>{
    element.appendChild(child)
  })
  element.setAttribute("id", id)
  element.setAttribute("class", clazz)
  return element
}

// Fetch data from entries.json (owned data source)
fetch("http://localhost:8088/entries")
  .then((entries)=> entries.json()) //Transition fetch response from JSON to JS
  .then((entry)=>{
    // Loop over converted JS information to create each of the elements
    entry.forEach((journal)=>{
      
      // Make h3 element with title
      let concept = makeJournalEntry("h3", journal.concept, {
        id: null,
        clazz: "journalConcept",
      })
      
      // Make p element with date
      let date = makeJournalEntry("p", journal.date, {
        id: null,
        clazz: "journalDate",
      })

      // Make p element with author name
      let author = makeJournalEntry("p", journal.name, {
        id: null,
        clazz: "journalAuthor",
      })
      
      // Make a p element to contain mood
      let mood = makeJournalEntry("p", `I am feeling ${journal.mood}`, {
        id: null,
        clazz: "journalMood",
      })
      
      // Make a p element to contain entry
      let entry = makeJournalEntry("p", journal.entry, {
        id: null,
        clazz: "journalEntry",
      })

      // Make a section composed of the h3 and p elements
      let journalEntry = makeJournalEntry("section", null, {
        id: null,
        clazz: "journalSubmission"
      }, concept, date, author, entry, mood)
      
      // Attach the new section to the fragment
      fragment.appendChild(journalEntry)
    })
    
    // Insert the fragment into the DOM as children of the Entry Log section in index.html
    entryLog.appendChild(fragment)
  })

