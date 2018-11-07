import buildEntry from "./entryComponent";
import journalEntries from "./data"
import entriesList from "./entriesDOM";
import manageDOM from "./DOMmanager";

const filterEntries = {
  moodSelector: () =>{
    document.querySelectorAll(".radioButton").forEach(button=>{
      button.addEventListener("click", (event)=>{
        let filteredMood = event.target.value
        console.log(filteredMood)
        filterEntries.restrictEntries(filteredMood)
        return filteredMood
      })
    })
  },
  restrictEntries: (mood)=>{
    console.log(mood)
    return journalEntries.getEntries()
    .then((entries)=>entries.filter((entry)=> entry.mood === mood)
    ).then(taco => {
      if (taco.length > 0){
        console.log("taco", taco)
        taco.map(item => manageDOM.appendEntry(buildEntry.makeEntryElements(item)))
      } else {
        alert("There are no entries that match your search, please try again")
      }
    })
  }
}
export default filterEntries

