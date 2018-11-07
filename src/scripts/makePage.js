// MakePage.js: Single Responsibility: Initiate form build, call build page which loops over data and creates input elements. Calls element factory function

import DOMComponent from "../lib/node_modules/nss-domcomponent"

class Form extends DOMComponent{
  constructor(attributes, ...children){
    super("form", attributes, ...children)
  }
}

class Label extends DOMComponent{
  constructor(attributes, ...children){
    super("label", attributes, ...children)
  }
}

class Input extends DOMComponent{
  constructor(attributes, ...children){
    super("input", attributes, ...children)
  }
}

class formInput extends DOMComponent{
  constructor(attributes){
    super("fieldset", {},
    new Label({
      for: attributes.name,
      textContent: attributes.text
    }),
    new Input({
      name: attributes.name,
      id: attributes.name,
      type: attributes.type
    })
    )
  }
}

const MakePage ={
  makeForm: ()=>{
    const journalForm = new Form({},
      new formInput({
        name: "journalDate",
        type: "date",
        text: "Date of Entry"
      }),
      new formInput({
        name: "authorName",
        type: "text",
        text: "Author Name",
      }),
      new formInput({
        name: "conceptsCovered",
        type: "text",
        text: "Concepts Covered"
      }),
      new DOMComponent("fieldset",{},
      new Label({for: "journalEntry", textContent: "JournalEntry"}),
      new DOMComponent("textarea", {name: "journalEntry", id: "journalEntry", cols: "60", rows: "10"})
      ),
      new DOMComponent("fieldset", {},
        new Label({for: "mood", id: "moodLabel", textContent: "Mood for the Day"}),
        new DOMComponent("select",{name: "mood", id: "mood"},
          new DOMComponent("option", {value: "happy", textContent: "Happy"}),
          new DOMComponent("option", {value: "sad", textContent: "Sad"}),
          new DOMComponent("option", {value: "frustrated", textContent: "Frustrated"}),
          new DOMComponent("option", {value: "fine", textContent: "Fine"}),
        )

      ),
      new DOMComponent("button", {type: "submit", id: "journalEntryButton", textContent: "Record Journal Entry"})
    ).render("#flexbox")
  },
  makeRadioButtons: () =>{
    const filterButtons = new DOMComponent("fieldset", {},
        new Label({
          for: "filter-happy",
          textContent: "Happy"
        }),
        new DOMComponent("input", {
          type: "radio",
          name: "mood",
          value: "happy",
          className: "radioButton",
          id: "filter-happy"
        }),
        new Label({
          for: "filter-sad",
          textContent: "Sad"
        }),
        new DOMComponent("input", {
          type: "radio",
          name: "mood",
          value: "sad",
          className: "radioButton",
          id: "filter-sad"
        }),
        new Label({
          for: "filter-frustrated",
          textContent: "Frustrated"
        }),
        new DOMComponent("input", {
          type: "radio",
          name: "mood",
          value: "frustrated",
          className: "radioButton",
          id: "filter-frustrated"
        }),
        new Label({
          for: "filter-fine",
          textContent: "Fine"
        }),
        new DOMComponent("input", {
          type: "radio",
          name: "mood",
          value: "fine",
          className: "radioButton",
          id: "filter-fine"
        })
    ).render("#filterMoodButtons")
  }
}
export default MakePage








//   createRadioButtons: ()=>{
//     let moods = ["sad", "happy", "fine", "frustrated"]
//     let fieldset = makeElement.elementFactory("fieldset", {}, null)
//     for(let i = 0; i < moods.length; i++){
//       let input = makeElement.elementFactory("input", {type: "radio", name: "mood", value: moods[i], class: "radioButton", id: `filter-${moods[i]}`})
//       let label = makeElement.elementFactory("label", {for: `filter-${moods[i]}`}, moods[i])
//       let wrapperDiv = makeElement.elementFactory("div", {}, null, input, label)
//       fieldset.appendChild(wrapperDiv)
//     }
//     manageDOM.appendPageItems(fieldset, "filterMoodButtons")
//   }
// }

