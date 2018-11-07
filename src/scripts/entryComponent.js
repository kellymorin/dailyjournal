/*
EntryComponent: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,
*/

import DOMComponent from "../lib/node_modules/nss-domcomponent"

class newEntry extends DOMComponent{
  constructor(attributes, ...children){
    super("section", attributes, ...children)
  }
}

class p extends DOMComponent{
  constructor(attributes, ...children){
    super("p", attributes, ...children)
  }
}
class H3 extends DOMComponent{
  constructor(attributes, ...children){
    super("h3", attributes, ...children)
  }
}


const buildEntry = {
  makeEntryElements: (journalEntryObj)=> {
    const journalEntry = new newEntry(
      {
        className: "singleJournalEntry",

      },
      new H3({
        className: "journalConcept",
        textContent: journalEntryObj.concept
      }),
      new p({
        className: "journalDate",
        textContent: journalEntryObj.date
      }),
      new p({
        className: "journalAuthor",
        textContent: journalEntryObj.name,
      }),
      new p({
        className: "journalMood",
        textContent: journalEntryObj.mood,
      }),
      new p ({
        className: "journalEntry",
        textContent: journalEntryObj.entry
      })
    ).render("#entryLog")
  }
}



// const buildEntry = {

  // makeEntryElements: (journalEntryObj)=>{
    // let concept = makeElement.elementFactory("h3", {class: "journalConcept"}, journalEntryObj.concept)
    // let date = makeElement.elementFactory("p", {class: "journalDate"}, journalEntryObj.date)
    // let author = makeElement.elementFactory("p", {class: "journalAuthor"}, journalEntryObj.name)
    // let mood = makeElement.elementFactory("p", {class: "journalMood"}, journalEntryObj.mood)
    // let entry = makeElement.elementFactory("p", {class: "journalEntry"}, journalEntryObj.entry)
    // let singleJournalEntry = makeElement.elementFactory("section", {class: "singleJournalEntry"}, null, concept, date, author, mood, entry)
    // return singleJournalEntry
//     },
// }
export default buildEntry
