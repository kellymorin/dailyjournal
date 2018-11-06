
// import makePage from "./makePage"


const manageDOM = {
  appendForm: (form)=>{
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#flexbox")
    formFragment.appendChild(form)
    formDiv.appendChild(formFragment)
  },
  appendEntry: (singleJournalEntry)=>{
    let entryDiv = document.querySelector(".entryLog")
    // if (entryDiv.innerHTML === " "){
      let elementFragment = document.createDocumentFragment();
      elementFragment.appendChild(singleJournalEntry)
      entryDiv.appendChild(elementFragment)
    // }
  }
}

export default manageDOM