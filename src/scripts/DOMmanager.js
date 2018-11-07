
const manageDOM = {
  appendPageItems: (element, selector)=> {
    $(`#${selector}`).append(element)
  },
  appendEntry: (dailyJournalEntries)=>{
    const $entryDiv =$("#entryLog")
    $entryDiv.empty().append(dailyJournalEntries)
  },
}

export default manageDOM