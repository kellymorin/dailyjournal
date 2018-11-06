(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import makePage from "./makePage"
const manageDOM = {
  appendForm: form => {
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#flexbox");
    formFragment.appendChild(form);
    formDiv.appendChild(formFragment);
  },
  appendEntry: dailyJournalEntries => {
    const $entryDiv = $(".entryLog");
    console.log($entryDiv);
    $entryDiv.empty().append(dailyJournalEntries);
    console.log("entrydiv after append", $entryDiv);
  } // export default (element, components) => {
  //   const $container = $(`#${element}`)
  //   // holy cow! $.append() can take an array of DOM components as an argument and it will automagically loop over them and add them all
  //   $container.empty().append(components)
  // }

};
var _default = manageDOM;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*

data.js - Move the code that deals with getting the data into this file.

Data.js: Get and post requests, only interacts with the API/ Database, should not be used to call any other functions


DAILY JOURNAL 5
Implement the method using fetch to perform a POST request.
In main module, invoke method to save entry, then add item to local array.
Update DOM with updated array values.

Write a method in your API module that performs a POST and a GET, then use that method in the event listener.
*/
const journalEntries = {
  getEntries: () => {
    return fetch("http://localhost:8088/entries").then(entries => entries.json());
  },
  saveJournalEntry: journalEntry => {
    return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(journalEntry)
    });
  }
};
var _default = journalEntries;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ElementFactory.js: Loop over provided information and create HTML element that can be displayed in the DOM
const makeElement = {
  elementFactory: (el, attributesObj, content, ...children) => {
    let element = document.createElement(el); // Set Attributes

    for (let attr in attributesObj) {
      element.setAttribute(attr, attributesObj[attr]);
    }

    element.textContent = content || null;
    children.forEach(child => {
      element.appendChild(child);
    });
    return element;
  }
};
var _default = makeElement;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
entriesDOM.js - Move the code that is responsible for modifying the DOM into this file.
*/
// let entryLog = document.querySelector(".entryLog");
// let fragment = document.createDocumentFragment();
// // Insert the fragment into the DOM as children of the Entry Log section in index.html
// function outputEntries(entries) {
//   entries.forEach((entry)=>{
//     fragment.appendChild(buildEntry(entry))
//   })
//   entryLog.appendChild(fragment)
// };
const entriesList = {
  buildList: () => {
    return _data.default.getEntries().then(entries => _entryComponent.default.makeEntryElements(entries)); // console.log("entries list entries", entries))
    // .map(entry => buildEntry.makeEntryElements(entry)))
    // buildEntry.makeEntryElements(entry)))
  }
};
var _default = entriesList;
exports.default = _default;

},{"./data":2,"./entryComponent":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
EntryComponent: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,
*/
// import manageDOM from "./DOMmanager";
const buildEntry = {
  componentArray: [],
  makeEntryElements: journalObjArray => {
    // let journalObjArray = []
    // journalObjArray.push(journalObj)
    // console.log(journalObjArray)
    journalObjArray.forEach(journalObj => {
      buildEntry.makeEachElement(journalObj); // console.log("journalObj", journalObj)
      // for(let i = 0; i < journalObj.length; i++){
      //   let type = ["h3", "p", "p", "p", "p"]
      //   let clazz = ["journalConcept", "journalDate", "journalAuthor", "journalMood", "journalEntry"]
      //   let content = [journalObj.concept, journalObj.date, journalObj.name, journalObj.mood, journalObj.entry]
      //   let element = makeElement.elementFactory(type[i], {class: clazz[i]}, content[i])
      //   buildEntry.componentArray.push(element)
      //   console.log("component Array inside loop", buildEntry.componentArray)
      //   }
      // console.log("component array outside loop", buildEntry.componentArray)
      // buildEntry.wrapEntryElement()
    }); // for(const item in buildEntry.componentArray){
    //   buildEntry.singleJournalEntry.appendChild(buildEntry.componentArray[item])
    // }
    // console.log(buildEntry.singleJournalEntry)
    // return buildEntry.singleJournalEntry
  },
  makeEachElement: journalObj => {
    console.log("inside make element", journalObj);
    let eachObjArray = [];
    let type = ["h3", "p", "p", "p", "p"];
    let clazz = ["journalConcept", "journalDate", "journalAuthor", "journalMood", "journalEntry"];
    let content = [journalObj.concept, journalObj.date, journalObj.name, journalObj.mood, journalObj.entry];

    for (let i = 0; i < type.length; i++) {
      let element = _elementFactory.default.elementFactory(type[i], {
        class: clazz[i]
      }, content[i]);

      eachObjArray.push(element); // buildEntry.componentArray.push(element)
      // console.log("component Array inside loop", buildEntry.componentArray)
    }

    console.log(eachObjArray);
    buildEntry.wrapEntryElement(eachObjArray);
    eachObjArray = []; //   for(const item in buildEntry.componentArray){
    //   let singleJournalEntry = makeElement.elementFactory("section", {class: "journalSubmission"})
    //   singleJournalEntry.appendChild(buildEntry.componentArray[item])
    //   console.log(singleJournalEntry)
    // }
    // return buildEntry.singleJournalEntry
  },
  wrapEntryElement: eachObjArray => {
    let singleJournalEntry = _elementFactory.default.elementFactory("section", {
      class: "journalSubmission"
    });

    for (const item in eachObjArray) {
      singleJournalEntry.appendChild(eachObjArray[item]);
    }

    console.log(singleJournalEntry); // return buildEntry.singleJournalEntry
    // manageDOM.appendEntry(buildEntry.singleJournalEntry)
  }
};
var _default = buildEntry;
exports.default = _default;

},{"./elementFactory":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
DAILY JOURNAL 5



            const contact = {

              createContactCard: (contactInfo) => {
                  let fragment = document.createDocumentFragment()
                  fragment.appendChild(contact.makeContact(contactInfo));
                  contactList.addToList(fragment)
                },
            }
*/
class JournalEntry {
  constructor(props) {
    this.date = props.date;
    this.name = props.name;
    this.concept = props.concept;
    this.entry = props.entry;
    this.mood = props.mood;
  }

  singleJournalEntry() {
    return {
      date: this.date,
      name: this.name,
      concept: this.concept,
      entry: this.entry,
      mood: this.mood
    };
  }

  save() {
    return _data.default.saveJournalEntry(this.singleJournalEntry());
  }

}

var _default = JournalEntry;
exports.default = _default;

},{"./data":2}],7:[function(require,module,exports){
"use strict";

var _validatedata = _interopRequireDefault(require("./validatedata"));

var _makePage = _interopRequireDefault(require("./makePage"));

var _journal = _interopRequireDefault(require("./journal"));

var _data = _interopRequireDefault(require("./data"));

var _DOMmanager = _interopRequireDefault(require("./DOMmanager"));

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
DAILY JOURNAL 5
In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

*/
// import buildEntry from "./entryComponent"
if (document.readyState === "loading") {
  _makePage.default.initiateForm();
} // let journal = [{
//   concept: "something",
//   date: "10/21/2018",
//   name: "Kelly",
//   mood: "happy",
//   entry: "We learned some really difficult things today."
// },
// {
//   concept: "santa",
//   date: "10/28/2018",
//   name: "Kelly",
//   mood: "sad",
//   entry: "Why santa no here yet?"
// }
// ]
// journal.forEach((journal)=>buildEntry.makeEntryElements(journal))
// const form = document.querySelector("form")
// export default form


document.querySelector("#journalEntryButton").addEventListener("click", event => {
  event.preventDefault();
  console.log("the form has been clicked");

  _validatedata.default.noEmptyValues();

  if (_validatedata.default.clearStatus === true) {
    console.log("The status of check 1 has cleared");
    const newEntry = new _journal.default({
      date: document.querySelector("#journalDate").value,
      name: document.querySelector("#authorName").value,
      concept: document.querySelector("#conceptsCovered").value,
      entry: document.querySelector("#journalEntry").value,
      mood: document.querySelector("#mood").value
    });

    _validatedata.default.onlyAllowedCharacters(newEntry.singleJournalEntry());

    if (_validatedata.default.clearStatus === true) {
      console.log("The status of check 2 has cleared");
      newEntry.save().then(data => {
        console.log("New entry saved", data);
        return _data.default.getEntries();
      }).then(journalEntryList => _DOMmanager.default.appendEntry(_entriesDOM.default.buildList)); // .then(contactList => render("contact-list", contactList))
    } else {
      console.log("Your submission has been terminated, please try again");
    }
  }
}); // After post, call get, then pass information to DOM manager that passes in function
// Get entries, then map, then call single journal entry

},{"./DOMmanager":1,"./data":2,"./entriesDOM":4,"./journal":6,"./makePage":8,"./validatedata":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

var _DOMmanager = _interopRequireDefault(require("./DOMmanager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MakePage.js: Single Responsibility: Initiate form build, call build page which loops over data and creates input elements. Calls element factory function
const makePage = {
  buildForm: (name, type, title) => {
    let label = _elementFactory.default.elementFactory("label", {
      for: name
    }, title);

    let input = _elementFactory.default.elementFactory("input", {
      type: type,
      name: name,
      id: name,
      required: true
    });

    let fieldset = _elementFactory.default.elementFactory("fieldset", {}, null, label, input);

    return fieldset;
  },
  initiateForm: () => {
    let dateEntry = makePage.buildForm("journalDate", "date", "Date of entry");
    let authorNameEntry = makePage.buildForm("authorName", "text", "Author Name");
    let conceptsCoveredEntry = makePage.buildForm("conceptsCovered", "text", "Concepts Covered");

    let journalEntryLabel = _elementFactory.default.elementFactory("label", {
      for: "journalEntry"
    }, "Journal Entry");

    let journalEntryTextarea = _elementFactory.default.elementFactory("textarea", {
      name: "journalEntry",
      id: "journalEntry",
      cols: "60",
      rows: "10"
    });

    let journalEntry = _elementFactory.default.elementFactory("fieldset", {}, null, journalEntryLabel, journalEntryTextarea);

    let entryButton = _elementFactory.default.elementFactory("button", {
      type: "submit",
      id: "journalEntryButton"
    }, "Record Journal Entry");

    let moodLabel = _elementFactory.default.elementFactory("label", {
      for: "mood",
      id: "moodLabel"
    }, "Mood for the Day");

    let moodOptionHappy = _elementFactory.default.elementFactory("option", {
      value: "happy"
    }, "Happy");

    let moodOptionSad = _elementFactory.default.elementFactory("option", {
      value: "sad"
    }, "Sad");

    let moodOptionFrustrated = _elementFactory.default.elementFactory("option", {
      value: "frustrated"
    }, "Frustrated");

    let moodOptionFine = _elementFactory.default.elementFactory("option", {
      value: "fine"
    }, "Fine");

    let moodSelect = _elementFactory.default.elementFactory("select", {
      name: "mood",
      id: "mood"
    }, null, moodOptionFine, moodOptionFrustrated, moodOptionHappy, moodOptionSad);

    let moodEntry = _elementFactory.default.elementFactory("fieldset", {}, null, moodLabel, moodSelect);

    let form = _elementFactory.default.elementFactory("form", {}, null, dateEntry, authorNameEntry, conceptsCoveredEntry, journalEntry, moodEntry, entryButton);

    console.log(form);

    _DOMmanager.default.appendForm(form); // makePage.appendForm(form)

  }
};
var _default = makePage;
exports.default = _default;

},{"./DOMmanager":1,"./elementFactory":3}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ValidateData.js: Single Responsibility: take provided data and check for required section completion, curse words, and special characters
const validateJournalEntry = {
  clearStatus: false,
  noEmptyValues: () => {
    let form = document.querySelector("form");
    console.log(form);

    if (form.checkValidity() === true) {
      // console.log("the form is valid")
      validateJournalEntry.clearStatus = true;
      console.log(validateJournalEntry.clearStatus);
      return validateJournalEntry.clearStatus;
    } else {
      alert("please fill out all fields");
      return;
    }
  },
  onlyAllowedCharacters: something => {
    validateJournalEntry.clearStatus = false;

    for (const input in something) {
      if (something[input].match(/([-a-zA-Z0-9(){}:;]+)/)) {
        validateJournalEntry.clearStatus = true;
        console.log("the input has been accepted");
      } else {
        alert(`Your ${input} submission contains invalid characters. Please only include alphanumeric characters or (){};: and resubmit`);
        validateJournalEntry.clearStatus = false;
        return;
      }
    }

    return validateJournalEntry.clearStatus;
  } //   maximumConceptEntryLength: ()=>{
  //     // Pick a maximum length for concepts field and provide visual feedback if you type in a string that is longer than that maximum.
  //   },
  //   noCurseWords: ()=>{
  //     // Test that the concept and entry fields contain no curse words. You can use regular expressions for that.
  //   }
  // }

};
var _default = validateJournalEntry;
exports.default = _default;

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBO0FBR0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQjtBQUNBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQWQ7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtBQUNELEdBTmU7QUFPaEIsRUFBQSxXQUFXLEVBQUcsbUJBQUQsSUFBdUI7QUFDbEMsVUFBTSxTQUFTLEdBQUUsQ0FBQyxDQUFDLFdBQUQsQ0FBbEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWjtBQUNBLElBQUEsU0FBUyxDQUFDLEtBQVYsR0FBa0IsTUFBbEIsQ0FBeUIsbUJBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHVCQUFaLEVBQXFDLFNBQXJDO0FBRUQsR0FiZSxDQWdCbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFwQmtCLENBQWxCO2VBdUJlLFM7Ozs7Ozs7Ozs7O0FDM0JmOzs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU0sY0FBYyxHQUFHO0FBQ3JCLEVBQUEsVUFB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V0FBckIsR0FBbUMsSUFBbkM7QUFDQSxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNkJBQVo7QUFDRCxPQUhELE1BR007QUFDSixRQUFBLEtBQUssQ0FBRSxRQUFPLEtBQU0sNkdBQWYsQ0FBTDtBQUNBLFFBQUEsb0JBQW9CLENBQUMsV0FBckIsR0FBbUMsS0FBbkM7QUFDQTtBQUNEO0FBQ0Y7O0FBQ0QsV0FBTyxvQkFBb0IsQ0FBQyxXQUE1QjtBQUNELEdBOUIwQixDQWlDN0I7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBekM2QixDQUE3QjtlQTJDZSxvQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuLy8gaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL21ha2VQYWdlXCJcblxuXG5jb25zdCBtYW5hZ2VET00gPSB7XG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZsZXhib3hcIilcbiAgICBmb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybSlcbiAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGZvcm1GcmFnbWVudClcbiAgfSxcbiAgYXBwZW5kRW50cnk6IChkYWlseUpvdXJuYWxFbnRyaWVzKT0+e1xuICAgIGNvbnN0ICRlbnRyeURpdiA9JChcIi5lbnRyeUxvZ1wiKVxuICAgIGNvbnNvbGUubG9nKCRlbnRyeURpdilcbiAgICAkZW50cnlEaXYuZW1wdHkoKS5hcHBlbmQoZGFpbHlKb3VybmFsRW50cmllcylcbiAgICBjb25zb2xlLmxvZyhcImVudHJ5ZGl2IGFmdGVyIGFwcGVuZFwiLCAkZW50cnlEaXYpXG5cbiAgfVxufVxuXG4vLyBleHBvcnQgZGVmYXVsdCAoZWxlbWVudCwgY29tcG9uZW50cykgPT4ge1xuLy8gICBjb25zdCAkY29udGFpbmVyID0gJChgIyR7ZWxlbWVudH1gKVxuLy8gICAvLyBob2x5IGNvdyEgJC5hcHBlbmQoKSBjYW4gdGFrZSBhbiBhcnJheSBvZiBET00gY29tcG9uZW50cyBhcyBhbiBhcmd1bWVudCBhbmQgaXQgd2lsbCBhdXRvbWFnaWNhbGx5IGxvb3Agb3ZlciB0aGVtIGFuZCBhZGQgdGhlbSBhbGxcbi8vICAgJGNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChjb21wb25lbnRzKVxuLy8gfVxuXG5cbmV4cG9ydCBkZWZhdWx0IG1hbmFnZURPTSIsIi8qXG5cbmRhdGEuanMgLSBNb3ZlIHRoZSBjb2RlIHRoYXQgZGVhbHMgd2l0aCBnZXR0aW5nIHRoZSBkYXRhIGludG8gdGhpcyBmaWxlLlxuXG5EYXRhLmpzOiBHZXQgYW5kIHBvc3QgcmVxdWVzdHMsIG9ubHkgaW50ZXJhY3RzIHdpdGggdGhlIEFQSS8gRGF0YWJhc2UsIHNob3VsZCBub3QgYmUgdXNlZCB0byBjYWxsIGFueSBvdGhlciBmdW5jdGlvbnNcblxuXG5EQUlMWSBKT1VSTkFMIDVcbkltcGxlbWVudCB0aGUgbWV0aG9kIHVzaW5nIGZldGNoIHRvIHBlcmZvcm0gYSBQT1NUIHJlcXVlc3QuXG5JbiBtYWluIG1vZHVsZSwgaW52b2tlIG1ldGhvZCB0byBzYXZlIGVudHJ5LCB0aGVuIGFkZCBpdGVtIHRvIGxvY2FsIGFycmF5LlxuVXBkYXRlIERPTSB3aXRoIHVwZGF0ZWQgYXJyYXkgdmFsdWVzLlxuXG5Xcml0ZSBhIG1ldGhvZCBpbiB5b3VyIEFQSSBtb2R1bGUgdGhhdCBwZXJmb3JtcyBhIFBPU1QgYW5kIGEgR0VULCB0aGVuIHVzZSB0aGF0IG1ldGhvZCBpbiB0aGUgZXZlbnQgbGlzdGVuZXIuXG4qL1xuXG5jb25zdCBqb3VybmFsRW50cmllcyA9IHtcbiAgZ2V0RW50cmllczogKCk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKVxuICAgIC50aGVuKChlbnRyaWVzKSA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSm91cm5hbEVudHJ5OiAoam91cm5hbEVudHJ5KT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoam91cm5hbEVudHJ5KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbEVudHJpZXMiLCIvLyBFbGVtZW50RmFjdG9yeS5qczogTG9vcCBvdmVyIHByb3ZpZGVkIGluZm9ybWF0aW9uIGFuZCBjcmVhdGUgSFRNTCBlbGVtZW50IHRoYXQgY2FuIGJlIGRpc3BsYXllZCBpbiB0aGUgRE9NXG5cbmNvbnN0IG1ha2VFbGVtZW50ID0ge1xuICBlbGVtZW50RmFjdG9yeTogKGVsLCBhdHRyaWJ1dGVzT2JqLCBjb250ZW50LCAuLi5jaGlsZHJlbik9PntcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpXG4gICAgLy8gU2V0IEF0dHJpYnV0ZXNcbiAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXNPYmope1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc09ialthdHRyXSlcbiAgICB9XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQgfHwgbnVsbFxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9KVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgbWFrZUVsZW1lbnQiLCJpbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcblxuLypcbmVudHJpZXNET00uanMgLSBNb3ZlIHRoZSBjb2RlIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIG1vZGlmeWluZyB0aGUgRE9NIGludG8gdGhpcyBmaWxlLlxuKi9cblxuLy8gbGV0IGVudHJ5TG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbnRyeUxvZ1wiKTtcbi8vIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuLy8gLy8gSW5zZXJ0IHRoZSBmcmFnbWVudCBpbnRvIHRoZSBET00gYXMgY2hpbGRyZW4gb2YgdGhlIEVudHJ5IExvZyBzZWN0aW9uIGluIGluZGV4Lmh0bWxcblxuLy8gZnVuY3Rpb24gb3V0cHV0RW50cmllcyhlbnRyaWVzKSB7XG4vLyAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpPT57XG4vLyAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYnVpbGRFbnRyeShlbnRyeSkpXG4vLyAgIH0pXG4vLyAgIGVudHJ5TG9nLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuLy8gfTtcblxuY29uc3QgZW50cmllc0xpc3QgPSB7XG4gIGJ1aWxkTGlzdDogKCk9PntcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuZ2V0RW50cmllcygpXG4gICAgLnRoZW4oKGVudHJpZXMpPT4gYnVpbGRFbnRyeS5tYWtlRW50cnlFbGVtZW50cyhlbnRyaWVzKSlcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiZW50cmllcyBsaXN0IGVudHJpZXNcIiwgZW50cmllcykpXG5cbiAgICAvLyAubWFwKGVudHJ5ID0+IGJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoZW50cnkpKSlcblxuICAgICAgLy8gYnVpbGRFbnRyeS5tYWtlRW50cnlFbGVtZW50cyhlbnRyeSkpKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBlbnRyaWVzTGlzdFxuIiwiLypcbkVudHJ5Q29tcG9uZW50OiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IExvb3Agb3ZlciBwcm92aWRlZCBkYXRhIGFuZCBwcm9kdWNlIEhUTUwgdG8gYmUgZGlzcGxheWVkIHRvIHRoZSBET00sXG4qL1xuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuLy8gaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCI7XG5cblxuY29uc3QgYnVpbGRFbnRyeSA9IHtcbiAgY29tcG9uZW50QXJyYXk6IFtdLFxuXG4gIG1ha2VFbnRyeUVsZW1lbnRzOiAoam91cm5hbE9iakFycmF5KT0+e1xuICAgIC8vIGxldCBqb3VybmFsT2JqQXJyYXkgPSBbXVxuICAgIC8vIGpvdXJuYWxPYmpBcnJheS5wdXNoKGpvdXJuYWxPYmopXG4gICAgLy8gY29uc29sZS5sb2coam91cm5hbE9iakFycmF5KVxuICAgIGpvdXJuYWxPYmpBcnJheS5mb3JFYWNoKGpvdXJuYWxPYmogPT57XG4gICAgICBidWlsZEVudHJ5Lm1ha2VFYWNoRWxlbWVudChqb3VybmFsT2JqKVxuICAgICAgLy8gY29uc29sZS5sb2coXCJqb3VybmFsT2JqXCIsIGpvdXJuYWxPYmopXG4gICAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgam91cm5hbE9iai5sZW5ndGg7IGkrKyl7XG4gICAgICAgIC8vICAgbGV0IHR5cGUgPSBbXCJoM1wiLCBcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIl1cbiAgICAgICAgLy8gICBsZXQgY2xhenogPSBbXCJqb3VybmFsQ29uY2VwdFwiLCBcImpvdXJuYWxEYXRlXCIsIFwiam91cm5hbEF1dGhvclwiLCBcImpvdXJuYWxNb29kXCIsIFwiam91cm5hbEVudHJ5XCJdXG4gICAgICAgIC8vICAgbGV0IGNvbnRlbnQgPSBbam91cm5hbE9iai5jb25jZXB0LCBqb3VybmFsT2JqLmRhdGUsIGpvdXJuYWxPYmoubmFtZSwgam91cm5hbE9iai5tb29kLCBqb3VybmFsT2JqLmVudHJ5XVxuICAgICAgICAvLyAgIGxldCBlbGVtZW50ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkodHlwZVtpXSwge2NsYXNzOiBjbGF6eltpXX0sIGNvbnRlbnRbaV0pXG4gICAgICAgIC8vICAgYnVpbGRFbnRyeS5jb21wb25lbnRBcnJheS5wdXNoKGVsZW1lbnQpXG4gICAgICAgIC8vICAgY29uc29sZS5sb2coXCJjb21wb25lbnQgQXJyYXkgaW5zaWRlIGxvb3BcIiwgYnVpbGRFbnRyeS5jb21wb25lbnRBcnJheSlcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tcG9uZW50IGFycmF5IG91dHNpZGUgbG9vcFwiLCBidWlsZEVudHJ5LmNvbXBvbmVudEFycmF5KVxuICAgICAgICAvLyBidWlsZEVudHJ5LndyYXBFbnRyeUVsZW1lbnQoKVxuICAgICAgfSlcbiAgICAgIC8vIGZvcihjb25zdCBpdGVtIGluIGJ1aWxkRW50cnkuY29tcG9uZW50QXJyYXkpe1xuICAgICAgICAvLyAgIGJ1aWxkRW50cnkuc2luZ2xlSm91cm5hbEVudHJ5LmFwcGVuZENoaWxkKGJ1aWxkRW50cnkuY29tcG9uZW50QXJyYXlbaXRlbV0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYnVpbGRFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkpXG4gICAgICAgIC8vIHJldHVybiBidWlsZEVudHJ5LnNpbmdsZUpvdXJuYWxFbnRyeVxuICAgICAgfSxcblxuICAgICAgbWFrZUVhY2hFbGVtZW50OiAoam91cm5hbE9iaik9PntcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgbWFrZSBlbGVtZW50XCIsIGpvdXJuYWxPYmopXG4gICAgICAgIGxldCBlYWNoT2JqQXJyYXkgPSBbXVxuICAgICAgICBsZXQgdHlwZSA9IFtcImgzXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiXVxuICAgICAgICBsZXQgY2xhenogPSBbXCJqb3VybmFsQ29uY2VwdFwiLCBcImpvdXJuYWxEYXRlXCIsIFwiam91cm5hbEF1dGhvclwiLCBcImpvdXJuYWxNb29kXCIsIFwiam91cm5hbEVudHJ5XCJdXG4gICAgICAgIGxldCBjb250ZW50ID0gW2pvdXJuYWxPYmouY29uY2VwdCwgam91cm5hbE9iai5kYXRlLCBqb3VybmFsT2JqLm5hbWUsIGpvdXJuYWxPYmoubW9vZCwgam91cm5hbE9iai5lbnRyeV1cblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdHlwZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgbGV0IGVsZW1lbnQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeSh0eXBlW2ldLCB7Y2xhc3M6IGNsYXp6W2ldfSwgY29udGVudFtpXSlcbiAgICAgICAgICBlYWNoT2JqQXJyYXkucHVzaChlbGVtZW50KVxuICAgICAgICAgIC8vIGJ1aWxkRW50cnkuY29tcG9uZW50QXJyYXkucHVzaChlbGVtZW50KVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tcG9uZW50IEFycmF5IGluc2lkZSBsb29wXCIsIGJ1aWxkRW50cnkuY29tcG9uZW50QXJyYXkpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coZWFjaE9iakFycmF5KVxuICAgICAgICBidWlsZEVudHJ5LndyYXBFbnRyeUVsZW1lbnQoZWFjaE9iakFycmF5KVxuICAgICAgICBlYWNoT2JqQXJyYXkgPSBbXVxuICAgICAgLy8gICBmb3IoY29uc3QgaXRlbSBpbiBidWlsZEVudHJ5LmNvbXBvbmVudEFycmF5KXtcbiAgICAgIC8vICAgbGV0IHNpbmdsZUpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwic2VjdGlvblwiLCB7Y2xhc3M6IFwiam91cm5hbFN1Ym1pc3Npb25cIn0pXG4gICAgICAvLyAgIHNpbmdsZUpvdXJuYWxFbnRyeS5hcHBlbmRDaGlsZChidWlsZEVudHJ5LmNvbXBvbmVudEFycmF5W2l0ZW1dKVxuICAgICAgLy8gICBjb25zb2xlLmxvZyhzaW5nbGVKb3VybmFsRW50cnkpXG4gICAgICAvLyB9XG4gICAgICAvLyByZXR1cm4gYnVpbGRFbnRyeS5zaW5nbGVKb3VybmFsRW50cnlcbiAgfSxcblxuICB3cmFwRW50cnlFbGVtZW50OiAoZWFjaE9iakFycmF5KT0+e1xuICAgIGxldCBzaW5nbGVKb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlY3Rpb25cIiwge2NsYXNzOiBcImpvdXJuYWxTdWJtaXNzaW9uXCJ9KVxuXG4gICAgZm9yKGNvbnN0IGl0ZW0gaW4gZWFjaE9iakFycmF5KXtcbiAgICAgIHNpbmdsZUpvdXJuYWxFbnRyeS5hcHBlbmRDaGlsZChlYWNoT2JqQXJyYXlbaXRlbV0pXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHNpbmdsZUpvdXJuYWxFbnRyeSlcbiAgICAvLyByZXR1cm4gYnVpbGRFbnRyeS5zaW5nbGVKb3VybmFsRW50cnlcbiAgICAvLyBtYW5hZ2VET00uYXBwZW5kRW50cnkoYnVpbGRFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRW50cnlcbiIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcblxuXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG5cbiAgICAgICAgICAgICAgY3JlYXRlQ29udGFjdENhcmQ6IChjb250YWN0SW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGNvbnRhY3RJbmZvKSk7XG4gICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5hZGRUb0xpc3QoZnJhZ21lbnQpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiovXG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiXG5cbmNsYXNzIEpvdXJuYWxFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICB0aGlzLmRhdGUgPSBwcm9wcy5kYXRlXG4gICAgdGhpcy5uYW1lID0gcHJvcHMubmFtZVxuICAgIHRoaXMuY29uY2VwdCA9IHByb3BzLmNvbmNlcHRcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHMuZW50cnlcbiAgICB0aGlzLm1vb2QgPSBwcm9wcy5tb29kXG4gIH1cbiAgc2luZ2xlSm91cm5hbEVudHJ5KCl7XG4gICAgcmV0dXJuIHtkYXRlOiB0aGlzLmRhdGUsIG5hbWU6IHRoaXMubmFtZSwgY29uY2VwdDogdGhpcy5jb25jZXB0LCBlbnRyeTogdGhpcy5lbnRyeSwgbW9vZDogdGhpcy5tb29kfVxuICB9XG4gIHNhdmUoKXtcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuc2F2ZUpvdXJuYWxFbnRyeSh0aGlzLnNpbmdsZUpvdXJuYWxFbnRyeSgpKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpvdXJuYWxFbnRyeSIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcbkluIHlvdXIgbWFpbiBKYXZhU2NyaXB0IG1vZHVsZSAoam91cm5hbC5qcykgYWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIFJlY29yZCBKb3VybmFsIEVudHJ5IGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHlvdXIgZm9ybS4gV2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGJ1dHRvbiwgeW91IG5lZWQgdG8gY3JlYXRlIGEgbmV3IGVudHJ5IGluIHlvdXIgQVBJLiBUaGUgSFRUUCBtZXRob2QgdGhhdCB5b3UgdXNlIHRvIGNyZWF0ZSByZXNvdXJjZXMgaXMgUE9TVC4gR3VpZGFuY2Ugb24gc3ludGF4IGlzIHByb3ZpZGVkIGJlbG93LlxuXG4qL1xuXG5pbXBvcnQgdmFsaWRhdGVKb3VybmFsRW50cnkgZnJvbSBcIi4vdmFsaWRhdGVkYXRhXCJcbmltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG4vLyBpbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXG5pbXBvcnQgSm91cm5hbEVudHJ5IGZyb20gXCIuL2pvdXJuYWxcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcbmltcG9ydCBlbnRyaWVzTGlzdCBmcm9tIFwiLi9lbnRyaWVzRE9NXCI7XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIil7XG4gIG1ha2VQYWdlLmluaXRpYXRlRm9ybSgpO1xufVxuXG4vLyBsZXQgam91cm5hbCA9IFt7XG4vLyAgIGNvbmNlcHQ6IFwic29tZXRoaW5nXCIsXG4vLyAgIGRhdGU6IFwiMTAvMjEvMjAxOFwiLFxuLy8gICBuYW1lOiBcIktlbGx5XCIsXG4vLyAgIG1vb2Q6IFwiaGFwcHlcIixcbi8vICAgZW50cnk6IFwiV2UgbGVhcm5lZCBzb21lIHJlYWxseSBkaWZmaWN1bHQgdGhpbmdzIHRvZGF5LlwiXG4vLyB9LFxuLy8ge1xuLy8gICBjb25jZXB0OiBcInNhbnRhXCIsXG4vLyAgIGRhdGU6IFwiMTAvMjgvMjAxOFwiLFxuLy8gICBuYW1lOiBcIktlbGx5XCIsXG4vLyAgIG1vb2Q6IFwic2FkXCIsXG4vLyAgIGVudHJ5OiBcIldoeSBzYW50YSBubyBoZXJlIHlldD9cIlxuLy8gfVxuXG4vLyBdXG5cbi8vIGpvdXJuYWwuZm9yRWFjaCgoam91cm5hbCk9PmJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoam91cm5hbCkpXG5cblxuXG4vLyBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIilcbi8vIGV4cG9ydCBkZWZhdWx0IGZvcm1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGhhcyBiZWVuIGNsaWNrZWRcIilcblxuICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5ub0VtcHR5VmFsdWVzKClcbiAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKFwiVGhlIHN0YXR1cyBvZiBjaGVjayAxIGhhcyBjbGVhcmVkXCIpXG4gICAgY29uc3QgbmV3RW50cnkgPSBuZXcgSm91cm5hbEVudHJ5KHtcbiAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWUsXG4gICAgICBuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F1dGhvck5hbWVcIikudmFsdWUsXG4gICAgICBjb25jZXB0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZSxcbiAgICAgIGVudHJ5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS52YWx1ZSxcbiAgICAgIG1vb2Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZFwiKS52YWx1ZSxcbiAgICB9KVxuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm9ubHlBbGxvd2VkQ2hhcmFjdGVycyhuZXdFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgICBpZih2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9PT0gdHJ1ZSl7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMiBoYXMgY2xlYXJlZFwiKVxuICAgICAgbmV3RW50cnkuc2F2ZSgpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IGVudHJ5IHNhdmVkXCIsIGRhdGEpXG4gICAgICAgIHJldHVybiBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKClcbiAgICB9KVxuICAgIC50aGVuKGpvdXJuYWxFbnRyeUxpc3QgPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KGVudHJpZXNMaXN0LmJ1aWxkTGlzdCkpXG5cblxuICAgIC8vIC50aGVuKGNvbnRhY3RMaXN0ID0+IHJlbmRlcihcImNvbnRhY3QtbGlzdFwiLCBjb250YWN0TGlzdCkpXG5cblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdXIgc3VibWlzc2lvbiBoYXMgYmVlbiB0ZXJtaW5hdGVkLCBwbGVhc2UgdHJ5IGFnYWluXCIpXG4gICAgfVxuICB9XG59KVxuXG4vLyBBZnRlciBwb3N0LCBjYWxsIGdldCwgdGhlbiBwYXNzIGluZm9ybWF0aW9uIHRvIERPTSBtYW5hZ2VyIHRoYXQgcGFzc2VzIGluIGZ1bmN0aW9uXG5cbi8vIEdldCBlbnRyaWVzLCB0aGVuIG1hcCwgdGhlbiBjYWxsIHNpbmdsZSBqb3VybmFsIGVudHJ5XG5cbiIsIi8vIE1ha2VQYWdlLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IEluaXRpYXRlIGZvcm0gYnVpbGQsIGNhbGwgYnVpbGQgcGFnZSB3aGljaCBsb29wcyBvdmVyIGRhdGEgYW5kIGNyZWF0ZXMgaW5wdXQgZWxlbWVudHMuIENhbGxzIGVsZW1lbnQgZmFjdG9yeSBmdW5jdGlvblxuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCJcblxuY29uc3QgbWFrZVBhZ2UgPSB7XG4gIGJ1aWxkRm9ybTogKG5hbWUsIHR5cGUsIHRpdGxlKSA9PiB7XG4gICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBuYW1lfSwgdGl0bGUpXG4gICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogdHlwZSwgbmFtZTogbmFtZSwgaWQ6IG5hbWUsIHJlcXVpcmVkOiB0cnVlfSlcbiAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBsYWJlbCwgaW5wdXQpXG4gICAgcmV0dXJuIGZpZWxkc2V0XG4gIH0sXG5cbiAgaW5pdGlhdGVGb3JtOiAoKSA9PiB7XG4gICAgbGV0IGRhdGVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImpvdXJuYWxEYXRlXCIsIFwiZGF0ZVwiLCBcIkRhdGUgb2YgZW50cnlcIilcbiAgICBsZXQgYXV0aG9yTmFtZUVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiYXV0aG9yTmFtZVwiLCBcInRleHRcIiwgXCJBdXRob3IgTmFtZVwiKTtcbiAgICBsZXQgY29uY2VwdHNDb3ZlcmVkRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJjb25jZXB0c0NvdmVyZWRcIiwgXCJ0ZXh0XCIsIFwiQ29uY2VwdHMgQ292ZXJlZFwiKVxuICAgIGxldCBqb3VybmFsRW50cnlMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJqb3VybmFsRW50cnlcIn0sIFwiSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBqb3VybmFsRW50cnlUZXh0YXJlYSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwidGV4dGFyZWFcIiwge25hbWU6IFwiam91cm5hbEVudHJ5XCIsIGlkOiBcImpvdXJuYWxFbnRyeVwiLCBjb2xzOiBcIjYwXCIsIHJvd3M6IFwiMTBcIn0pXG4gICAgbGV0IGpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGpvdXJuYWxFbnRyeUxhYmVsLCBqb3VybmFsRW50cnlUZXh0YXJlYSlcbiAgICBsZXQgZW50cnlCdXR0b24gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImJ1dHRvblwiLCB7dHlwZTogXCJzdWJtaXRcIiwgaWQ6IFwiam91cm5hbEVudHJ5QnV0dG9uXCJ9LCBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCIpXG4gICAgbGV0IG1vb2RMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJtb29kXCIsIGlkOiBcIm1vb2RMYWJlbFwifSwgXCJNb29kIGZvciB0aGUgRGF5XCIpXG4gICAgbGV0IG1vb2RPcHRpb25IYXBweSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJoYXBweVwifSwgXCJIYXBweVwiKVxuICAgIGxldCBtb29kT3B0aW9uU2FkID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcInNhZFwifSwgXCJTYWRcIilcbiAgICBsZXQgbW9vZE9wdGlvbkZydXN0cmF0ZWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZnJ1c3RyYXRlZFwifSwgXCJGcnVzdHJhdGVkXCIpXG4gICAgbGV0IG1vb2RPcHRpb25GaW5lID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZpbmVcIn0sIFwiRmluZVwiKVxuICAgIGxldCBtb29kU2VsZWN0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWxlY3RcIiwge25hbWU6IFwibW9vZFwiLCBpZDogXCJtb29kXCJ9LCBudWxsLCBtb29kT3B0aW9uRmluZSwgbW9vZE9wdGlvbkZydXN0cmF0ZWQsIG1vb2RPcHRpb25IYXBweSwgbW9vZE9wdGlvblNhZClcbiAgICBsZXQgbW9vZEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbW9vZExhYmVsLCBtb29kU2VsZWN0KVxuICAgIGxldCBmb3JtID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmb3JtXCIsIHt9LCBudWxsLCBkYXRlRW50cnksIGF1dGhvck5hbWVFbnRyeSwgY29uY2VwdHNDb3ZlcmVkRW50cnksIGpvdXJuYWxFbnRyeSwgbW9vZEVudHJ5LCBlbnRyeUJ1dHRvbilcbiAgICBjb25zb2xlLmxvZyhmb3JtKVxuICAgIG1hbmFnZURPTS5hcHBlbmRGb3JtKGZvcm0pXG4gICAgLy8gbWFrZVBhZ2UuYXBwZW5kRm9ybShmb3JtKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIiwiLy8gVmFsaWRhdGVEYXRhLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IHRha2UgcHJvdmlkZWQgZGF0YSBhbmQgY2hlY2sgZm9yIHJlcXVpcmVkIHNlY3Rpb24gY29tcGxldGlvbiwgY3Vyc2Ugd29yZHMsIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuXG5jb25zdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSA9IHtcbiAgY2xlYXJTdGF0dXM6IGZhbHNlLFxuXG4gIG5vRW1wdHlWYWx1ZXM6ICgpPT57XG4gICAgbGV0IGZvcm09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG4gICAgY29uc29sZS5sb2coZm9ybSlcbiAgICBpZihmb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gdHJ1ZSl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGlzIHZhbGlkXCIpXG4gICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzKVxuICAgICAgcmV0dXJuIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwicGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHNcIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSxcblxuICBvbmx5QWxsb3dlZENoYXJhY3RlcnM6IChzb21ldGhpbmcpPT57XG4gICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSBmYWxzZVxuICAgIGZvcihjb25zdCBpbnB1dCBpbiBzb21ldGhpbmcpe1xuICAgICAgaWYoc29tZXRoaW5nW2lucHV0XS5tYXRjaCgvKFstYS16QS1aMC05KCl7fTo7XSspLykpe1xuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgaW5wdXQgaGFzIGJlZW4gYWNjZXB0ZWRcIilcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgYWxlcnQoYFlvdXIgJHtpbnB1dH0gc3VibWlzc2lvbiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMuIFBsZWFzZSBvbmx5IGluY2x1ZGUgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgb3IgKCl7fTs6IGFuZCByZXN1Ym1pdGApXG4gICAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICB9XG59XG5cbi8vICAgbWF4aW11bUNvbmNlcHRFbnRyeUxlbmd0aDogKCk9Pntcbi8vICAgICAvLyBQaWNrIGEgbWF4aW11bSBsZW5ndGggZm9yIGNvbmNlcHRzIGZpZWxkIGFuZCBwcm92aWRlIHZpc3VhbCBmZWVkYmFjayBpZiB5b3UgdHlwZSBpbiBhIHN0cmluZyB0aGF0IGlzIGxvbmdlciB0aGFuIHRoYXQgbWF4aW11bS5cbi8vICAgfSxcblxuLy8gICBub0N1cnNlV29yZHM6ICgpPT57XG4vLyAgICAgLy8gVGVzdCB0aGF0IHRoZSBjb25jZXB0IGFuZCBlbnRyeSBmaWVsZHMgY29udGFpbiBubyBjdXJzZSB3b3Jkcy4gWW91IGNhbiB1c2UgcmVndWxhciBleHByZXNzaW9ucyBmb3IgdGhhdC5cbi8vICAgfVxuXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlSm91cm5hbEVudHJ5XG4iXX0=
