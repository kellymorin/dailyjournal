
// import makePage from "./makePage"
const manageDOM = {
  appendForm: (form)=>{
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#flexbox")
    formFragment.appendChild(form)
    formDiv.appendChild(formFragment)
  },
  appendEntry: (dailyJournalEntries)=>{
    const $entryDiv =$("#entryLog")
    $entryDiv.empty().append(dailyJournalEntries)
  }
}

export default manageDOM