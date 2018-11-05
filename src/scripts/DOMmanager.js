
import makeElement from "./elementFactory"

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
    let moodLabel = makeElement.elementFactory("label", {for: "mood", id: "mood"}, "Mood for the Day")
    let moodOptionHappy = makeElement.elementFactory("option", {value: "happy"}, "Happy")
    let moodOptionSad = makeElement.elementFactory("option", {value: "sad"}, "Sad")
    let moodOptionFrustrated = makeElement.elementFactory("option", {value: "frustrated"}, "Frustrated")
    let moodOptionFine = makeElement.elementFactory("option", {value: "fine"}, "Fine")
    let moodSelect = makeElement.elementFactory("select", {name: "mood", id: "mood"}, null, moodOptionFine, moodOptionFrustrated, moodOptionHappy, moodOptionSad)
    let moodEntry = makeElement.elementFactory("fieldset", {}, null, moodLabel, moodSelect)
    let form = makeElement.elementFactory("form", {}, null, dateEntry, authorNameEntry, conceptsCoveredEntry, journalEntry, moodEntry, entryButton)
    makePage.appendForm(form)
  },

  appendForm: (form)=>{
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#flexbox")
    formFragment.appendChild(form)
    formDiv.appendChild(formFragment)
  }
}
export default makePage