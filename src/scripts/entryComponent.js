/*
EntryComponent: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,
*/

import makeElement from "./elementFactory"
import manageDOM from "./DOMmanager";


const buildEntry = {
  componentArray: [],
  singleJournalEntry: makeElement.elementFactory("section", {class: "journalSubmission"}),

  makeEntryElements: (journalObj)=>{
    let type = ["h3", "p", "p", "p", "p"]
    let content = [journalObj.concept, journalObj.date, journalObj.name, journalObj.mood, journalObj.entry]
    let clazz = ["journalConcept", "journalDate", "journalAuthor", "journalMood", "journalEntry"]
    for(let i = 0; i < type.length; i++){
      let element = makeElement.elementFactory(type[i], {class: clazz[i]}, content[i])
      buildEntry.componentArray.push(element)
    }
    buildEntry.wrapEntryElement()
  },

  wrapEntryElement: ()=>{
    for(const item in buildEntry.componentArray){
      buildEntry.singleJournalEntry.appendChild(buildEntry.componentArray[item])
    }
    manageDOM.appendEntry(buildEntry.singleJournalEntry)
  }
}
export default buildEntry
