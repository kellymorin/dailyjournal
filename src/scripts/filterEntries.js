import buildEntry from "./entryComponent";
import journalEntries from "./data"

const filterEntries = {
  moodSelector: () =>{
    $(".radioButton").click(()=>{
      let filteredMood = ($("input:checked").val())
      filterEntries.restrictEntries(filteredMood)
    })
  },

  restrictEntries: (mood)=>{
    return journalEntries.getEntries()
    .then((entries)=>entries.filter((entry)=> entry.mood === mood)
    ).then(taco => {
      $("#entryLog").empty()
      taco.map(item => buildEntry.makeEntryElements(item))
    })
    }
  }
export default filterEntries

