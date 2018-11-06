import buildEntry from "./entryComponent";
import journalEntries from "./data";

/*
entriesDOM.js - Move the code that is responsible for modifying the DOM into this file.
*/

// let entryLog = document.querySelector(".entryLog");
// let fragment = document.createDocumentFragment();

// // Insert the fragment into the DOM as children of the Entry Log section in index.html

// function outputEntries(entries) {
//   entries.forEach((entry)=>{
//     fragment.appendChild(buildEntry(entry))
//   })
//   entryLog.appendChild(fragment)
// };

const entriesList = {
  buildList: ()=>{
    return journalEntries.getEntries()
    .then((entries)=> buildEntry.makeEntryElements(entries))

    // console.log("entries list entries", entries))

    // .map(entry => buildEntry.makeEntryElements(entry)))

      // buildEntry.makeEntryElements(entry)))
  }
}
export default entriesList
