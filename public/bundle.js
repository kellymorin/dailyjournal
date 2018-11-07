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
    const $entryDiv = $("#entryLog");
    $entryDiv.empty().append(dailyJournalEntries);
  },
  appendButtons: fieldset => {
    let buttonSection = document.querySelector("#filterMoodButtons");
    buttonSection.appendChild(fieldset);
  }
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
// // Insert the fragment into the DOM as children of the Entry Log section in index.html
const entriesList = {
  buildList: () => {
    return _data.default.getEntries().then(entries => entries.map(entry => _entryComponent.default.makeEntryElements(entry)));
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
const buildEntry = {
  componentArray: [],
  makeEntryElements: journalEntryObj => {
    let concept = _elementFactory.default.elementFactory("h3", {
      class: "journalConcept"
    }, journalEntryObj.concept);

    let date = _elementFactory.default.elementFactory("p", {
      class: "journalDate"
    }, journalEntryObj.date);

    let author = _elementFactory.default.elementFactory("p", {
      class: "journalAuthor"
    }, journalEntryObj.name);

    let mood = _elementFactory.default.elementFactory("p", {
      class: "journalMood"
    }, journalEntryObj.mood);

    let entry = _elementFactory.default.elementFactory("p", {
      class: "journalEntry"
    }, journalEntryObj.entry);

    let singleJournalEntry = _elementFactory.default.elementFactory("section", {
      class: "singleJournalEntry"
    }, null, concept, date, author, mood, entry);

    return singleJournalEntry;
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

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

var _data = _interopRequireDefault(require("./data"));

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

var _DOMmanager = _interopRequireDefault(require("./DOMmanager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filterEntries = {
  moodSelector: () => {
    document.querySelectorAll(".radioButton").forEach(button => {
      button.addEventListener("click", event => {
        let filteredMood = event.target.value;
        console.log(filteredMood);
        filterEntries.restrictEntries(filteredMood);
        return filteredMood;
      });
    });
  },
  restrictEntries: mood => {
    console.log(mood);
    return _data.default.getEntries().then(entries => entries.filter(entry => entry.mood === mood)).then(taco => {
      console.log("taco", taco);
      taco.map(item => _DOMmanager.default.appendEntry(_entryComponent.default.makeEntryElements(item))); // manageDOM.appendEntry();
    });
  }
};
var _default = filterEntries;
exports.default = _default;

},{"./DOMmanager":1,"./data":2,"./entriesDOM":4,"./entryComponent":5}],7:[function(require,module,exports){
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

},{"./data":2}],8:[function(require,module,exports){
"use strict";

var _validatedata = _interopRequireDefault(require("./validatedata"));

var _makePage = _interopRequireDefault(require("./makePage"));

var _journal = _interopRequireDefault(require("./journal"));

var _data = _interopRequireDefault(require("./data"));

var _DOMmanager = _interopRequireDefault(require("./DOMmanager"));

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

var _filterEntries = _interopRequireDefault(require("./filterEntries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
DAILY JOURNAL 5
In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

*/
if (document.readyState === "loading") {
  _makePage.default.initiateForm();

  _data.default.getEntries().then(data => _entriesDOM.default.buildList(data)).then(taco => _DOMmanager.default.appendEntry(taco));

  _makePage.default.createRadioButtons();

  _filterEntries.default.moodSelector();
}

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
      newEntry.save().then(data => _entriesDOM.default.buildList(data)).then(taco => _DOMmanager.default.appendEntry(taco));
    } else {
      console.log("Your submission has been terminated, please try again");
    }
  }
});

},{"./DOMmanager":1,"./data":2,"./entriesDOM":4,"./filterEntries":6,"./journal":7,"./makePage":9,"./validatedata":10}],9:[function(require,module,exports){
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

    _DOMmanager.default.appendForm(form);
  },
  createRadioButtons: () => {
    let moods = ["sad", "happy", "fine", "frustrated"];

    let fieldset = _elementFactory.default.elementFactory("fieldset", {}, null);

    for (let i = 0; i < moods.length; i++) {
      let input = _elementFactory.default.elementFactory("input", {
        type: "radio",
        name: "mood",
        value: moods[i],
        class: "radioButton",
        id: `filter-${moods[i]}`
      });

      let label = _elementFactory.default.elementFactory("label", {
        for: `filter-${moods[i]}`
      }, moods[i]);

      let wrapperDiv = _elementFactory.default.elementFactory("div", {}, null, input, label);

      fieldset.appendChild(wrapperDiv);
    }

    _DOMmanager.default.appendButtons(fieldset); // return fieldset

  }
};
var _default = makePage;
exports.default = _default;

},{"./DOMmanager":1,"./elementFactory":3}],10:[function(require,module,exports){
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

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllcy5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBO0FBQ0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQjtBQUNBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQWQ7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtBQUNELEdBTmU7QUFPaEIsRUFBQSxXQUFXLEVBQUcsbUJBQUQsSUFBdUI7QUFDbEMsVUFBTSxTQUFTLEdBQUUsQ0FBQyxDQUFDLFdBQUQsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLE1BQWxCLENBQXlCLG1CQUF6QjtBQUNELEdBVmU7QUFXaEIsRUFBQSxhQUFhLEVBQUcsUUFBRCxJQUFZO0FBQ3pCLFFBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLG9CQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsUUFBMUI7QUFDRDtBQWRlLENBQWxCO2VBaUJlLFM7Ozs7Ozs7Ozs7O0FDbkJmOzs7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UUFBQSxvQkFBb0IsQ0FBQyxXQUFyQixHQUFtQyxJQUFuQztBQUNBLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNELE9BSEQsTUFHTTtBQUNKLFFBQUEsS0FBSyxDQUFFLFFBQU8sS0FBTSw2R0FBZixDQUFMO0FBQ0EsUUFBQSxvQkFBb0IsQ0FBQyxXQUFyQixHQUFtQyxLQUFuQztBQUNBO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPLG9CQUFvQixDQUFDLFdBQTVCO0FBQ0QsR0E5QjBCLENBaUM3QjtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUF6QzZCLENBQTdCO2VBMkNlLG9CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG4vLyBpbXBvcnQgbWFrZVBhZ2UgZnJvbSBcIi4vbWFrZVBhZ2VcIlxuY29uc3QgbWFuYWdlRE9NID0ge1xuICBhcHBlbmRGb3JtOiAoZm9ybSk9PntcbiAgICBsZXQgZm9ybUZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGxldCBmb3JtRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmbGV4Ym94XCIpXG4gICAgZm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm0pXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChmb3JtRnJhZ21lbnQpXG4gIH0sXG4gIGFwcGVuZEVudHJ5OiAoZGFpbHlKb3VybmFsRW50cmllcyk9PntcbiAgICBjb25zdCAkZW50cnlEaXYgPSQoXCIjZW50cnlMb2dcIilcbiAgICAkZW50cnlEaXYuZW1wdHkoKS5hcHBlbmQoZGFpbHlKb3VybmFsRW50cmllcylcbiAgfSxcbiAgYXBwZW5kQnV0dG9uczogKGZpZWxkc2V0KT0+e1xuICAgIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWx0ZXJNb29kQnV0dG9uc1wiKVxuICAgIGJ1dHRvblNlY3Rpb24uYXBwZW5kQ2hpbGQoZmllbGRzZXQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFuYWdlRE9NIiwiLypcblxuZGF0YS5qcyAtIE1vdmUgdGhlIGNvZGUgdGhhdCBkZWFscyB3aXRoIGdldHRpbmcgdGhlIGRhdGEgaW50byB0aGlzIGZpbGUuXG5cbkRhdGEuanM6IEdldCBhbmQgcG9zdCByZXF1ZXN0cywgb25seSBpbnRlcmFjdHMgd2l0aCB0aGUgQVBJLyBEYXRhYmFzZSwgc2hvdWxkIG5vdCBiZSB1c2VkIHRvIGNhbGwgYW55IG90aGVyIGZ1bmN0aW9uc1xuXG5cbkRBSUxZIEpPVVJOQUwgNVxuSW1wbGVtZW50IHRoZSBtZXRob2QgdXNpbmcgZmV0Y2ggdG8gcGVyZm9ybSBhIFBPU1QgcmVxdWVzdC5cbkluIG1haW4gbW9kdWxlLCBpbnZva2UgbWV0aG9kIHRvIHNhdmUgZW50cnksIHRoZW4gYWRkIGl0ZW0gdG8gbG9jYWwgYXJyYXkuXG5VcGRhdGUgRE9NIHdpdGggdXBkYXRlZCBhcnJheSB2YWx1ZXMuXG5cbldyaXRlIGEgbWV0aG9kIGluIHlvdXIgQVBJIG1vZHVsZSB0aGF0IHBlcmZvcm1zIGEgUE9TVCBhbmQgYSBHRVQsIHRoZW4gdXNlIHRoYXQgbWV0aG9kIGluIHRoZSBldmVudCBsaXN0ZW5lci5cbiovXG5cbmNvbnN0IGpvdXJuYWxFbnRyaWVzID0ge1xuICBnZXRFbnRyaWVzOiAoKT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXG4gICAgLnRoZW4oKGVudHJpZXMpID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVKb3VybmFsRW50cnk6IChqb3VybmFsRW50cnkpPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShqb3VybmFsRW50cnkpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRW50cmllcyIsIi8vIEVsZW1lbnRGYWN0b3J5LmpzOiBMb29wIG92ZXIgcHJvdmlkZWQgaW5mb3JtYXRpb24gYW5kIGNyZWF0ZSBIVE1MIGVsZW1lbnQgdGhhdCBjYW4gYmUgZGlzcGxheWVkIGluIHRoZSBET01cblxuY29uc3QgbWFrZUVsZW1lbnQgPSB7XG4gIGVsZW1lbnRGYWN0b3J5OiAoZWwsIGF0dHJpYnV0ZXNPYmosIGNvbnRlbnQsIC4uLmNoaWxkcmVuKT0+e1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcbiAgICAvLyBTZXQgQXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlc09iail7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzT2JqW2F0dHJdKVxuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudCB8fCBudWxsXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBtYWtlRWxlbWVudCIsImltcG9ydCBidWlsZEVudHJ5IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiO1xuXG4vKlxuZW50cmllc0RPTS5qcyAtIE1vdmUgdGhlIGNvZGUgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgbW9kaWZ5aW5nIHRoZSBET00gaW50byB0aGlzIGZpbGUuXG4qL1xuXG4vLyAvLyBJbnNlcnQgdGhlIGZyYWdtZW50IGludG8gdGhlIERPTSBhcyBjaGlsZHJlbiBvZiB0aGUgRW50cnkgTG9nIHNlY3Rpb24gaW4gaW5kZXguaHRtbFxuXG5cbmNvbnN0IGVudHJpZXNMaXN0ID0ge1xuICBidWlsZExpc3Q6ICgpPT57XG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+IGVudHJpZXMubWFwKGVudHJ5ID0+IGJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoZW50cnkpKSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZW50cmllc0xpc3RcbiIsIi8qXG5FbnRyeUNvbXBvbmVudDogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBMb29wIG92ZXIgcHJvdmlkZWQgZGF0YSBhbmQgcHJvZHVjZSBIVE1MIHRvIGJlIGRpc3BsYXllZCB0byB0aGUgRE9NLFxuKi9cblxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcblxuXG5jb25zdCBidWlsZEVudHJ5ID0ge1xuICBjb21wb25lbnRBcnJheTogW10sXG5cbiAgbWFrZUVudHJ5RWxlbWVudHM6IChqb3VybmFsRW50cnlPYmopPT57XG4gICAgbGV0IGNvbmNlcHQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImgzXCIsIHtjbGFzczogXCJqb3VybmFsQ29uY2VwdFwifSwgam91cm5hbEVudHJ5T2JqLmNvbmNlcHQpXG4gICAgbGV0IGRhdGUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxEYXRlXCJ9LCBqb3VybmFsRW50cnlPYmouZGF0ZSlcbiAgICBsZXQgYXV0aG9yID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsQXV0aG9yXCJ9LCBqb3VybmFsRW50cnlPYmoubmFtZSlcbiAgICBsZXQgbW9vZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbE1vb2RcIn0sIGpvdXJuYWxFbnRyeU9iai5tb29kKVxuICAgIGxldCBlbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbEVudHJ5XCJ9LCBqb3VybmFsRW50cnlPYmouZW50cnkpXG4gICAgbGV0IHNpbmdsZUpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwic2VjdGlvblwiLCB7Y2xhc3M6IFwic2luZ2xlSm91cm5hbEVudHJ5XCJ9LCBudWxsLCBjb25jZXB0LCBkYXRlLCBhdXRob3IsIG1vb2QsIGVudHJ5KVxuICAgIHJldHVybiBzaW5nbGVKb3VybmFsRW50cnlcbiAgICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFbnRyeVxuIiwiaW1wb3J0IGJ1aWxkRW50cnkgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCJcbmltcG9ydCBlbnRyaWVzTGlzdCBmcm9tIFwiLi9lbnRyaWVzRE9NXCI7XG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcblxuY29uc3QgZmlsdGVyRW50cmllcyA9IHtcbiAgbW9vZFNlbGVjdG9yOiAoKSA9PntcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhZGlvQnV0dG9uXCIpLmZvckVhY2goYnV0dG9uPT57XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgICAgICAgbGV0IGZpbHRlcmVkTW9vZCA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zb2xlLmxvZyhmaWx0ZXJlZE1vb2QpXG4gICAgICAgIGZpbHRlckVudHJpZXMucmVzdHJpY3RFbnRyaWVzKGZpbHRlcmVkTW9vZClcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkTW9vZFxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICByZXN0cmljdEVudHJpZXM6IChtb29kKT0+e1xuICAgIGNvbnNvbGUubG9nKG1vb2QpXG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+ZW50cmllcy5maWx0ZXIoKGVudHJ5KT0+IGVudHJ5Lm1vb2QgPT09IG1vb2QpXG4gICAgKS50aGVuKHRhY28gPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJ0YWNvXCIsIHRhY28pXG4gICAgICB0YWNvLm1hcChpdGVtID0+IG1hbmFnZURPTS5hcHBlbmRFbnRyeShidWlsZEVudHJ5Lm1ha2VFbnRyeUVsZW1lbnRzKGl0ZW0pKSlcbiAgICAgIC8vIG1hbmFnZURPTS5hcHBlbmRFbnRyeSgpO1xuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZpbHRlckVudHJpZXNcblxuIiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuXG5cblxuICAgICAgICAgICAgY29uc3QgY29udGFjdCA9IHtcblxuICAgICAgICAgICAgICBjcmVhdGVDb250YWN0Q2FyZDogKGNvbnRhY3RJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3QubWFrZUNvbnRhY3QoY29udGFjdEluZm8pKTtcbiAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChmcmFnbWVudClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuKi9cbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCJcblxuY2xhc3MgSm91cm5hbEVudHJ5IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHRoaXMuZGF0ZSA9IHByb3BzLmRhdGVcbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lXG4gICAgdGhpcy5jb25jZXB0ID0gcHJvcHMuY29uY2VwdFxuICAgIHRoaXMuZW50cnkgPSBwcm9wcy5lbnRyeVxuICAgIHRoaXMubW9vZCA9IHByb3BzLm1vb2RcbiAgfVxuICBzaW5nbGVKb3VybmFsRW50cnkoKXtcbiAgICByZXR1cm4ge2RhdGU6IHRoaXMuZGF0ZSwgbmFtZTogdGhpcy5uYW1lLCBjb25jZXB0OiB0aGlzLmNvbmNlcHQsIGVudHJ5OiB0aGlzLmVudHJ5LCBtb29kOiB0aGlzLm1vb2R9XG4gIH1cbiAgc2F2ZSgpe1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5zYXZlSm91cm5hbEVudHJ5KHRoaXMuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSm91cm5hbEVudHJ5IiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuSW4geW91ciBtYWluIEphdmFTY3JpcHQgbW9kdWxlIChqb3VybmFsLmpzKSBhZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgUmVjb3JkIEpvdXJuYWwgRW50cnkgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgeW91ciBmb3JtLiBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCB5b3UgbmVlZCB0byBjcmVhdGUgYSBuZXcgZW50cnkgaW4geW91ciBBUEkuIFRoZSBIVFRQIG1ldGhvZCB0aGF0IHlvdSB1c2UgdG8gY3JlYXRlIHJlc291cmNlcyBpcyBQT1NULiBHdWlkYW5jZSBvbiBzeW50YXggaXMgcHJvdmlkZWQgYmVsb3cuXG5cbiovXG5cbmltcG9ydCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSBmcm9tIFwiLi92YWxpZGF0ZWRhdGFcIlxuaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL21ha2VQYWdlXCJcbmltcG9ydCBKb3VybmFsRW50cnkgZnJvbSBcIi4vam91cm5hbFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiO1xuaW1wb3J0IGVudHJpZXNMaXN0IGZyb20gXCIuL2VudHJpZXNET01cIjtcbmltcG9ydCBmaWx0ZXJFbnRyaWVzIGZyb20gXCIuL2ZpbHRlckVudHJpZXNcIjtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKXtcbiAgbWFrZVBhZ2UuaW5pdGlhdGVGb3JtKCk7XG4gIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKS50aGVuKChkYXRhKT0+IGVudHJpZXNMaXN0LmJ1aWxkTGlzdChkYXRhKSkudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gIG1ha2VQYWdlLmNyZWF0ZVJhZGlvQnV0dG9ucygpXG4gIGZpbHRlckVudHJpZXMubW9vZFNlbGVjdG9yKCk7XG59XG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGhhcyBiZWVuIGNsaWNrZWRcIilcblxuICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5ub0VtcHR5VmFsdWVzKClcbiAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKFwiVGhlIHN0YXR1cyBvZiBjaGVjayAxIGhhcyBjbGVhcmVkXCIpXG4gICAgY29uc3QgbmV3RW50cnkgPSBuZXcgSm91cm5hbEVudHJ5KHtcbiAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWUsXG4gICAgICBuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F1dGhvck5hbWVcIikudmFsdWUsXG4gICAgICBjb25jZXB0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZSxcbiAgICAgIGVudHJ5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS52YWx1ZSxcbiAgICAgIG1vb2Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZFwiKS52YWx1ZSxcbiAgICB9KVxuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm9ubHlBbGxvd2VkQ2hhcmFjdGVycyhuZXdFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgICBpZih2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9PT0gdHJ1ZSl7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMiBoYXMgY2xlYXJlZFwiKVxuICAgICAgbmV3RW50cnkuc2F2ZSgpXG4gICAgICAudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpXG4gICAgICAudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91ciBzdWJtaXNzaW9uIGhhcyBiZWVuIHRlcm1pbmF0ZWQsIHBsZWFzZSB0cnkgYWdhaW5cIilcbiAgICB9XG4gIH1cbn0pXG5cbiIsIi8vIE1ha2VQYWdlLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IEluaXRpYXRlIGZvcm0gYnVpbGQsIGNhbGwgYnVpbGQgcGFnZSB3aGljaCBsb29wcyBvdmVyIGRhdGEgYW5kIGNyZWF0ZXMgaW5wdXQgZWxlbWVudHMuIENhbGxzIGVsZW1lbnQgZmFjdG9yeSBmdW5jdGlvblxuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCJcblxuY29uc3QgbWFrZVBhZ2UgPSB7XG4gIGJ1aWxkRm9ybTogKG5hbWUsIHR5cGUsIHRpdGxlKSA9PiB7XG4gICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBuYW1lfSwgdGl0bGUpXG4gICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogdHlwZSwgbmFtZTogbmFtZSwgaWQ6IG5hbWUsIHJlcXVpcmVkOiB0cnVlfSlcbiAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBsYWJlbCwgaW5wdXQpXG4gICAgcmV0dXJuIGZpZWxkc2V0XG4gIH0sXG5cbiAgaW5pdGlhdGVGb3JtOiAoKSA9PiB7XG4gICAgbGV0IGRhdGVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImpvdXJuYWxEYXRlXCIsIFwiZGF0ZVwiLCBcIkRhdGUgb2YgZW50cnlcIilcbiAgICBsZXQgYXV0aG9yTmFtZUVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiYXV0aG9yTmFtZVwiLCBcInRleHRcIiwgXCJBdXRob3IgTmFtZVwiKTtcbiAgICBsZXQgY29uY2VwdHNDb3ZlcmVkRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJjb25jZXB0c0NvdmVyZWRcIiwgXCJ0ZXh0XCIsIFwiQ29uY2VwdHMgQ292ZXJlZFwiKVxuICAgIGxldCBqb3VybmFsRW50cnlMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJqb3VybmFsRW50cnlcIn0sIFwiSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBqb3VybmFsRW50cnlUZXh0YXJlYSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwidGV4dGFyZWFcIiwge25hbWU6IFwiam91cm5hbEVudHJ5XCIsIGlkOiBcImpvdXJuYWxFbnRyeVwiLCBjb2xzOiBcIjYwXCIsIHJvd3M6IFwiMTBcIn0pXG4gICAgbGV0IGpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGpvdXJuYWxFbnRyeUxhYmVsLCBqb3VybmFsRW50cnlUZXh0YXJlYSlcbiAgICBsZXQgZW50cnlCdXR0b24gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImJ1dHRvblwiLCB7dHlwZTogXCJzdWJtaXRcIiwgaWQ6IFwiam91cm5hbEVudHJ5QnV0dG9uXCJ9LCBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCIpXG4gICAgbGV0IG1vb2RMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJtb29kXCIsIGlkOiBcIm1vb2RMYWJlbFwifSwgXCJNb29kIGZvciB0aGUgRGF5XCIpXG4gICAgbGV0IG1vb2RPcHRpb25IYXBweSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJoYXBweVwifSwgXCJIYXBweVwiKVxuICAgIGxldCBtb29kT3B0aW9uU2FkID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcInNhZFwifSwgXCJTYWRcIilcbiAgICBsZXQgbW9vZE9wdGlvbkZydXN0cmF0ZWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZnJ1c3RyYXRlZFwifSwgXCJGcnVzdHJhdGVkXCIpXG4gICAgbGV0IG1vb2RPcHRpb25GaW5lID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZpbmVcIn0sIFwiRmluZVwiKVxuICAgIGxldCBtb29kU2VsZWN0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWxlY3RcIiwge25hbWU6IFwibW9vZFwiLCBpZDogXCJtb29kXCJ9LCBudWxsLCBtb29kT3B0aW9uRmluZSwgbW9vZE9wdGlvbkZydXN0cmF0ZWQsIG1vb2RPcHRpb25IYXBweSwgbW9vZE9wdGlvblNhZClcbiAgICBsZXQgbW9vZEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbW9vZExhYmVsLCBtb29kU2VsZWN0KVxuICAgIGxldCBmb3JtID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmb3JtXCIsIHt9LCBudWxsLCBkYXRlRW50cnksIGF1dGhvck5hbWVFbnRyeSwgY29uY2VwdHNDb3ZlcmVkRW50cnksIGpvdXJuYWxFbnRyeSwgbW9vZEVudHJ5LCBlbnRyeUJ1dHRvbilcbiAgICBtYW5hZ2VET00uYXBwZW5kRm9ybShmb3JtKVxuICB9LFxuICBjcmVhdGVSYWRpb0J1dHRvbnM6ICgpPT57XG4gICAgbGV0IG1vb2RzID0gW1wic2FkXCIsIFwiaGFwcHlcIiwgXCJmaW5lXCIsIFwiZnJ1c3RyYXRlZFwiXVxuICAgIGxldCBmaWVsZHNldCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwpXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG1vb2RzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwicmFkaW9cIiwgbmFtZTogXCJtb29kXCIsIHZhbHVlOiBtb29kc1tpXSwgY2xhc3M6IFwicmFkaW9CdXR0b25cIiwgaWQ6IGBmaWx0ZXItJHttb29kc1tpXX1gfSlcbiAgICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogYGZpbHRlci0ke21vb2RzW2ldfWB9LCBtb29kc1tpXSlcbiAgICAgIGxldCB3cmFwcGVyRGl2ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJkaXZcIiwge30sIG51bGwsIGlucHV0LCBsYWJlbClcbiAgICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKHdyYXBwZXJEaXYpXG4gICAgfVxuICAgIG1hbmFnZURPTS5hcHBlbmRCdXR0b25zKGZpZWxkc2V0KVxuICAgIC8vIHJldHVybiBmaWVsZHNldFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIiwiLy8gVmFsaWRhdGVEYXRhLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IHRha2UgcHJvdmlkZWQgZGF0YSBhbmQgY2hlY2sgZm9yIHJlcXVpcmVkIHNlY3Rpb24gY29tcGxldGlvbiwgY3Vyc2Ugd29yZHMsIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuXG5jb25zdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSA9IHtcbiAgY2xlYXJTdGF0dXM6IGZhbHNlLFxuXG4gIG5vRW1wdHlWYWx1ZXM6ICgpPT57XG4gICAgbGV0IGZvcm09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG4gICAgY29uc29sZS5sb2coZm9ybSlcbiAgICBpZihmb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gdHJ1ZSl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGlzIHZhbGlkXCIpXG4gICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzKVxuICAgICAgcmV0dXJuIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwicGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHNcIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSxcblxuICBvbmx5QWxsb3dlZENoYXJhY3RlcnM6IChzb21ldGhpbmcpPT57XG4gICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSBmYWxzZVxuICAgIGZvcihjb25zdCBpbnB1dCBpbiBzb21ldGhpbmcpe1xuICAgICAgaWYoc29tZXRoaW5nW2lucHV0XS5tYXRjaCgvKFstYS16QS1aMC05KCl7fTo7XSspLykpe1xuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgaW5wdXQgaGFzIGJlZW4gYWNjZXB0ZWRcIilcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgYWxlcnQoYFlvdXIgJHtpbnB1dH0gc3VibWlzc2lvbiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMuIFBsZWFzZSBvbmx5IGluY2x1ZGUgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgb3IgKCl7fTs6IGFuZCByZXN1Ym1pdGApXG4gICAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICB9XG59XG5cbi8vICAgbWF4aW11bUNvbmNlcHRFbnRyeUxlbmd0aDogKCk9Pntcbi8vICAgICAvLyBQaWNrIGEgbWF4aW11bSBsZW5ndGggZm9yIGNvbmNlcHRzIGZpZWxkIGFuZCBwcm92aWRlIHZpc3VhbCBmZWVkYmFjayBpZiB5b3UgdHlwZSBpbiBhIHN0cmluZyB0aGF0IGlzIGxvbmdlciB0aGFuIHRoYXQgbWF4aW11bS5cbi8vICAgfSxcblxuLy8gICBub0N1cnNlV29yZHM6ICgpPT57XG4vLyAgICAgLy8gVGVzdCB0aGF0IHRoZSBjb25jZXB0IGFuZCBlbnRyeSBmaWVsZHMgY29udGFpbiBubyBjdXJzZSB3b3Jkcy4gWW91IGNhbiB1c2UgcmVndWxhciBleHByZXNzaW9ucyBmb3IgdGhhdC5cbi8vICAgfVxuXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlSm91cm5hbEVudHJ5XG4iXX0=
