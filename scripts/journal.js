const journalEntries = [
  Entry1, {
      date: "07/24/2018",
      concept: "Array methods",
      entry: "We learned about 4 different array methods today. forEach made sense, but the others still confuse me.",
      mood: "Ok"
  },
]
// const journalEntries = [
//   {
//   date: "10/08/2018",
//   concept: "Flexbox",
//   entry: "We learned about using flexbox to style our pages",
//   mood: "fine"
//   }
// ]

// Put together a function that takes inputs from the form and changes them into objects and adds them to the journalEntries array

document.getElementById("journalEntryButton").addEventListener("click", function(){
    console.log("the button is working");
});

let date = document.getElementById("journalDate").value;
let concept = document.getElementById("conceptsCovered").value;
let entry = document.getElementById("journalEntry").value;
let mood = document.getElementById("mood").value;
console.log("date", date, "concept", concept, "entry", entry, "mood", mood);

// create entry counter to put at the beginning of each entry
// assign each input to the correct key
// append each component together 
// add each object to the array

// const makeJournalEntryComponent = (journalEntry) => {
//   // Create HTML structure for a journal entry
//   return `${date}: Today we learned about ${concept}. 
//   ${entry}`
// }

// for (i = 0; i<journalEntries.length; i++){
    // let date = journalEntries.date[i];
    // let concept = journalEntries.concept[i];
    // let entry = journalEntries.entry[i];
    // let mood = journalEntries.mood[i];

    // return `${date}: Today we learned about ${concept}.
    // ${entry}.`
// }