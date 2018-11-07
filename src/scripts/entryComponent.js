/*
EntryComponent: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,
*/

import makeElement from "./elementFactory"


const buildEntry = {

  makeEntryElements: (journalEntryObj)=>{
    let concept = makeElement.elementFactory("h3", {class: "journalConcept"}, journalEntryObj.concept)
    let date = makeElement.elementFactory("p", {class: "journalDate"}, journalEntryObj.date)
    let author = makeElement.elementFactory("p", {class: "journalAuthor"}, journalEntryObj.name)
    let mood = makeElement.elementFactory("p", {class: "journalMood"}, journalEntryObj.mood)
    let entry = makeElement.elementFactory("p", {class: "journalEntry"}, journalEntryObj.entry)
    let singleJournalEntry = makeElement.elementFactory("section", {class: "singleJournalEntry"}, null, concept, date, author, mood, entry)
    return singleJournalEntry
    },
}
export default buildEntry
