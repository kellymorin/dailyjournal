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
      console.log("taco", taco)
      taco.map(item => buildEntry.makeEntryElements(item))
      manageDOM.appendEntry();
    })
  }
}
export default filterEntries

