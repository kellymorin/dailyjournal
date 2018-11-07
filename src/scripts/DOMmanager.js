// import validateJournalEntry from "./validatedata";

// import makePage from "./makePage"
const manageDOM = {
  appendForm: (form)=>{
    let formFragment = document.createDocumentFragment();
    // let formDiv = document.querySelector("#flexbox")
    formFragment.appendChild(form)
    $("#flexbox").append(formFragment)
    // validateJournalEntry.validateForm()
    // $("form").validate()
  },
  appendEntry: (dailyJournalEntries)=>{
    const $entryDiv =$("#entryLog")
    $entryDiv.empty().append(dailyJournalEntries)
  },
  appendButtons: (fieldset)=>{
    // let buttonSection = document.querySelector("#filterMoodButtons")
    $("#filterMoodButtons").append(fieldset)
  }
}

export default manageDOM