// Move the code that is responsible for modifying the DOM into this file.
let entryLog = document.querySelector(".entryLog");
let fragment = document.createDocumentFragment();

// Insert the fragment into the DOM as children of the Entry Log section in index.html

function outputEntries(entries) {
  entries.forEach((entry)=>{
    fragment.appendChild(buildEntry(entry))
  })
  entryLog.appendChild(fragment)
};
