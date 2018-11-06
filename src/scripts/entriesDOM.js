import buildEntry from "./entryComponent";
import journalEntries from "./data";

/*
entriesDOM.js - Move the code that is responsible for modifying the DOM into this file.
*/

// // Insert the fragment into the DOM as children of the Entry Log section in index.html


const entriesList = {
  buildList: ()=>{
    return journalEntries.getEntries()
    .then((entries)=> entries.map(entry => buildEntry.makeEntryElements(entry)))
  }
}
export default entriesList
