// MakePage.js: Single Responsibility: Initiate form build, call build page which loops over data and creates input elements. Calls element factory function

import makeElement from "./elementFactory"
import manageDOM from "./DOMmanager"

const makePage = {
  buildForm: (name, type, title) => {
    let label = makeElement.elementFactory("label", {for: name}, title)
    let input = makeElement.elementFactory("input", {type: type, name: name, id: name, required: true})
    let fieldset = makeElement.elementFactory("fieldset", {}, null, label, input)
    return fieldset
  },

  initiateForm: () => {
    let dateEntry = makePage.buildForm("journalDate", "date", "Date of entry")
    let authorNameEntry = makePage.buildForm("authorName", "text", "Author Name");
    let conceptsCoveredEntry = makePage.buildForm("conceptsCovered", "text", "Concepts Covered")
    let journalEntryLabel = makeElement.elementFactory("label", {for: "journalEntry"}, "Journal Entry")
    let journalEntryTextarea = makeElement.elementFactory("textarea", {name: "journalEntry", id: "journalEntry", cols: "60", rows: "10"})
    let journalEntry = makeElement.elementFactory("fieldset", {}, null, journalEntryLabel, journalEntryTextarea)
    let entryButton = makeElement.elementFactory("button", {type: "submit", id: "journalEntryButton"}, "Record Journal Entry")
    let moodLabel = makeElement.elementFactory("label", {for: "mood", id: "moodLabel"}, "Mood for the Day")
    let moodOptionHappy = makeElement.elementFactory("option", {value: "happy"}, "Happy")
    let moodOptionSad = makeElement.elementFactory("option", {value: "sad"}, "Sad")
    let moodOptionFrustrated = makeElement.elementFactory("option", {value: "frustrated"}, "Frustrated")
    let moodOptionFine = makeElement.elementFactory("option", {value: "fine"}, "Fine")
    let moodSelect = makeElement.elementFactory("select", {name: "mood", id: "mood"}, null, moodOptionFine, moodOptionFrustrated, moodOptionHappy, moodOptionSad)
    let moodEntry = makeElement.elementFactory("fieldset", {}, null, moodLabel, moodSelect)
    let form = makeElement.elementFactory("form", {}, null, dateEntry, authorNameEntry, conceptsCoveredEntry, journalEntry, moodEntry, entryButton)
    manageDOM.appendForm(form)
  },
  createRadioButtons: ()=>{
    let moods = ["sad", "happy", "fine", "frustrated"]
    let fieldset = makeElement.elementFactory("fieldset", {}, null)
    for(let i = 0; i < moods.length; i++){
      let input = makeElement.elementFactory("input", {type: "radio", name: "mood", value: moods[i], class: "radioButton", id: `filter-${moods[i]}`})
      let label = makeElement.elementFactory("label", {for: `filter-${moods[i]}`}, moods[i])
      let wrapperDiv = makeElement.elementFactory("div", {}, null, input, label)
      fieldset.appendChild(wrapperDiv)
    }
    manageDOM.appendButtons(fieldset)
    // return fieldset
  }
}

export default makePage