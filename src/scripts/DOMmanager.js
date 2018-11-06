
// import makePage from "./makePage"


const manageDOM = {
  appendForm: (form)=>{
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#flexbox")
    formFragment.appendChild(form)
    formDiv.appendChild(formFragment)
  },
  appendEntry: (dailyJournalEntries)=>{
    const $entryDiv =$(".entryLog")
    console.log($entryDiv)
    $entryDiv.empty().append(dailyJournalEntries)
    console.log("entrydiv after append", $entryDiv)

  }
}

// export default (element, components) => {
//   const $container = $(`#${element}`)
//   // holy cow! $.append() can take an array of DOM components as an argument and it will automagically loop over them and add them all
//   $container.empty().append(components)
// }


export default manageDOM