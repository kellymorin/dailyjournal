/*
EntryComponent: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,
*/

import makeElement from "./elementFactory"
// import manageDOM from "./DOMmanager";


const buildEntry = {
  componentArray: [],

  makeEntryElements: (journalObjArray)=>{
    // let journalObjArray = []
    // journalObjArray.push(journalObj)
    // console.log(journalObjArray)
    journalObjArray.forEach(journalObj =>{
      buildEntry.makeEachElement(journalObj)
      // console.log("journalObj", journalObj)
      // for(let i = 0; i < journalObj.length; i++){
        //   let type = ["h3", "p", "p", "p", "p"]
        //   let clazz = ["journalConcept", "journalDate", "journalAuthor", "journalMood", "journalEntry"]
        //   let content = [journalObj.concept, journalObj.date, journalObj.name, journalObj.mood, journalObj.entry]
        //   let element = makeElement.elementFactory(type[i], {class: clazz[i]}, content[i])
        //   buildEntry.componentArray.push(element)
        //   console.log("component Array inside loop", buildEntry.componentArray)
        //   }
        // console.log("component array outside loop", buildEntry.componentArray)
        // buildEntry.wrapEntryElement()
      })
      // for(const item in buildEntry.componentArray){
        //   buildEntry.singleJournalEntry.appendChild(buildEntry.componentArray[item])
        // }
        // console.log(buildEntry.singleJournalEntry)
        // return buildEntry.singleJournalEntry
      },

      makeEachElement: (journalObj)=>{
        console.log("inside make element", journalObj)
        let eachObjArray = []
        let type = ["h3", "p", "p", "p", "p"]
        let clazz = ["journalConcept", "journalDate", "journalAuthor", "journalMood", "journalEntry"]
        let content = [journalObj.concept, journalObj.date, journalObj.name, journalObj.mood, journalObj.entry]

        for(let i = 0; i < type.length; i++){
          let element = makeElement.elementFactory(type[i], {class: clazz[i]}, content[i])
          eachObjArray.push(element)
          // buildEntry.componentArray.push(element)
          // console.log("component Array inside loop", buildEntry.componentArray)
        }
        console.log(eachObjArray)
        buildEntry.wrapEntryElement(eachObjArray)
        eachObjArray = []
      //   for(const item in buildEntry.componentArray){
      //   let singleJournalEntry = makeElement.elementFactory("section", {class: "journalSubmission"})
      //   singleJournalEntry.appendChild(buildEntry.componentArray[item])
      //   console.log(singleJournalEntry)
      // }
      // return buildEntry.singleJournalEntry
  },

  wrapEntryElement: (eachObjArray)=>{
    let singleJournalEntry = makeElement.elementFactory("section", {class: "journalSubmission"})

    for(const item in eachObjArray){
      singleJournalEntry.appendChild(eachObjArray[item])
    }
    console.log(singleJournalEntry)
    // return buildEntry.singleJournalEntry
    // manageDOM.appendEntry(buildEntry.singleJournalEntry)
  }
}
export default buildEntry
