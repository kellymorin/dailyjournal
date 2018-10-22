// Move the code that is responsible for creating the journal entry HTML component into this file.

const makeJournalEntry = (el, content, clazz, ...children)=>
{
  let element = document.createElement(el)
  element.innerHTML = content || null
  children.forEach((child)=>{
    element.appendChild(child)
  })
  element.setAttribute("class", clazz)
  return element
}

const buildEntry = (journal)=> {

  type = ["h3", "p", "p", "p", "p"]
  content = [journal.concept, journal.date, journal.name, journal.mood, journal.entry]
  clazz = ["journalConcept", "journalDate", "journalAuthor", "journalMood", "journalEntry"]
  let singleJournalEntry = makeJournalEntry("section", null, "journalSubmission")
  componentArray = []

  for(let i = 0; i < type.length; i++){
    let component = makeJournalEntry(type[i], content[i], clazz[i])
    componentArray.push(component)
  }
  for (let i = 0; i< componentArray.length; i++){
    singleJournalEntry.appendChild(componentArray[i])
  }
  return singleJournalEntry;
}
