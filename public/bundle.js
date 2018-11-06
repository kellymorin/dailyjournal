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
      taco.map(item => _entryComponent.default.makeEntryElements(item));

      _DOMmanager.default.appendEntry();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllcy5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBO0FBQ0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQjtBQUNBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQWQ7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtBQUNELEdBTmU7QUFPaEIsRUFBQSxXQUFXLEVBQUcsbUJBQUQsSUFBdUI7QUFDbEMsVUFBTSxTQUFTLEdBQUUsQ0FBQyxDQUFDLFdBQUQsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLE1BQWxCLENBQXlCLG1CQUF6QjtBQUNELEdBVmU7QUFXaEIsRUFBQSxhQUFhLEVBQUcsUUFBRCxJQUFZO0FBQ3pCLFFBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLG9CQUF2QixDQUFwQjtBQUNBLElBQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsUUFBMUI7QUFDRDtBQWRlLENBQWxCO2VBaUJlLFM7Ozs7Ozs7Ozs7O0FDbkJmOzs7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O0FBQ0EsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDZCQUFaO0FBQ0QsT0FIRCxNQUdNO0FBQ0osUUFBQSxLQUFLLENBQUUsUUFBTyxLQUFNLDZHQUFmLENBQUw7QUFDQSxRQUFBLG9CQUFvQixDQUFDLFdBQXJCLEdBQW1DLEtBQW5DO0FBQ0E7QUFDRDtBQUNGOztBQUNELFdBQU8sb0JBQW9CLENBQUMsV0FBNUI7QUFDRCxHQTlCMEIsQ0FpQzdCO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQXpDNkIsQ0FBN0I7ZUEyQ2Usb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbi8vIGltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5jb25zdCBtYW5hZ2VET00gPSB7XG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZsZXhib3hcIilcbiAgICBmb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybSlcbiAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGZvcm1GcmFnbWVudClcbiAgfSxcbiAgYXBwZW5kRW50cnk6IChkYWlseUpvdXJuYWxFbnRyaWVzKT0+e1xuICAgIGNvbnN0ICRlbnRyeURpdiA9JChcIiNlbnRyeUxvZ1wiKVxuICAgICRlbnRyeURpdi5lbXB0eSgpLmFwcGVuZChkYWlseUpvdXJuYWxFbnRyaWVzKVxuICB9LFxuICBhcHBlbmRCdXR0b25zOiAoZmllbGRzZXQpPT57XG4gICAgbGV0IGJ1dHRvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpbHRlck1vb2RCdXR0b25zXCIpXG4gICAgYnV0dG9uU2VjdGlvbi5hcHBlbmRDaGlsZChmaWVsZHNldClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBtYW5hZ2VET00iLCIvKlxuXG5kYXRhLmpzIC0gTW92ZSB0aGUgY29kZSB0aGF0IGRlYWxzIHdpdGggZ2V0dGluZyB0aGUgZGF0YSBpbnRvIHRoaXMgZmlsZS5cblxuRGF0YS5qczogR2V0IGFuZCBwb3N0IHJlcXVlc3RzLCBvbmx5IGludGVyYWN0cyB3aXRoIHRoZSBBUEkvIERhdGFiYXNlLCBzaG91bGQgbm90IGJlIHVzZWQgdG8gY2FsbCBhbnkgb3RoZXIgZnVuY3Rpb25zXG5cblxuREFJTFkgSk9VUk5BTCA1XG5JbXBsZW1lbnQgdGhlIG1ldGhvZCB1c2luZyBmZXRjaCB0byBwZXJmb3JtIGEgUE9TVCByZXF1ZXN0LlxuSW4gbWFpbiBtb2R1bGUsIGludm9rZSBtZXRob2QgdG8gc2F2ZSBlbnRyeSwgdGhlbiBhZGQgaXRlbSB0byBsb2NhbCBhcnJheS5cblVwZGF0ZSBET00gd2l0aCB1cGRhdGVkIGFycmF5IHZhbHVlcy5cblxuV3JpdGUgYSBtZXRob2QgaW4geW91ciBBUEkgbW9kdWxlIHRoYXQgcGVyZm9ybXMgYSBQT1NUIGFuZCBhIEdFVCwgdGhlbiB1c2UgdGhhdCBtZXRob2QgaW4gdGhlIGV2ZW50IGxpc3RlbmVyLlxuKi9cblxuY29uc3Qgam91cm5hbEVudHJpZXMgPSB7XG4gIGdldEVudHJpZXM6ICgpPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcbiAgICAudGhlbigoZW50cmllcykgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUpvdXJuYWxFbnRyeTogKGpvdXJuYWxFbnRyeSk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGpvdXJuYWxFbnRyeSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxFbnRyaWVzIiwiLy8gRWxlbWVudEZhY3RvcnkuanM6IExvb3Agb3ZlciBwcm92aWRlZCBpbmZvcm1hdGlvbiBhbmQgY3JlYXRlIEhUTUwgZWxlbWVudCB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgaW4gdGhlIERPTVxuXG5jb25zdCBtYWtlRWxlbWVudCA9IHtcbiAgZWxlbWVudEZhY3Rvcnk6IChlbCwgYXR0cmlidXRlc09iaiwgY29udGVudCwgLi4uY2hpbGRyZW4pPT57XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKVxuICAgIC8vIFNldCBBdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgYXR0ciBpbiBhdHRyaWJ1dGVzT2JqKXtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNPYmpbYXR0cl0pXG4gICAgfVxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50IHx8IG51bGxcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfSlcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VFbGVtZW50IiwiaW1wb3J0IGJ1aWxkRW50cnkgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCI7XG5cbi8qXG5lbnRyaWVzRE9NLmpzIC0gTW92ZSB0aGUgY29kZSB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBtb2RpZnlpbmcgdGhlIERPTSBpbnRvIHRoaXMgZmlsZS5cbiovXG5cbi8vIC8vIEluc2VydCB0aGUgZnJhZ21lbnQgaW50byB0aGUgRE9NIGFzIGNoaWxkcmVuIG9mIHRoZSBFbnRyeSBMb2cgc2VjdGlvbiBpbiBpbmRleC5odG1sXG5cblxuY29uc3QgZW50cmllc0xpc3QgPSB7XG4gIGJ1aWxkTGlzdDogKCk9PntcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuZ2V0RW50cmllcygpXG4gICAgLnRoZW4oKGVudHJpZXMpPT4gZW50cmllcy5tYXAoZW50cnkgPT4gYnVpbGRFbnRyeS5tYWtlRW50cnlFbGVtZW50cyhlbnRyeSkpKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBlbnRyaWVzTGlzdFxuIiwiLypcbkVudHJ5Q29tcG9uZW50OiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IExvb3Agb3ZlciBwcm92aWRlZCBkYXRhIGFuZCBwcm9kdWNlIEhUTUwgdG8gYmUgZGlzcGxheWVkIHRvIHRoZSBET00sXG4qL1xuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuXG5cbmNvbnN0IGJ1aWxkRW50cnkgPSB7XG4gIGNvbXBvbmVudEFycmF5OiBbXSxcblxuICBtYWtlRW50cnlFbGVtZW50czogKGpvdXJuYWxFbnRyeU9iaik9PntcbiAgICBsZXQgY29uY2VwdCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaDNcIiwge2NsYXNzOiBcImpvdXJuYWxDb25jZXB0XCJ9LCBqb3VybmFsRW50cnlPYmouY29uY2VwdClcbiAgICBsZXQgZGF0ZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbERhdGVcIn0sIGpvdXJuYWxFbnRyeU9iai5kYXRlKVxuICAgIGxldCBhdXRob3IgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxBdXRob3JcIn0sIGpvdXJuYWxFbnRyeU9iai5uYW1lKVxuICAgIGxldCBtb29kID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsTW9vZFwifSwgam91cm5hbEVudHJ5T2JqLm1vb2QpXG4gICAgbGV0IGVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsRW50cnlcIn0sIGpvdXJuYWxFbnRyeU9iai5lbnRyeSlcbiAgICBsZXQgc2luZ2xlSm91cm5hbEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWN0aW9uXCIsIHtjbGFzczogXCJzaW5nbGVKb3VybmFsRW50cnlcIn0sIG51bGwsIGNvbmNlcHQsIGRhdGUsIGF1dGhvciwgbW9vZCwgZW50cnkpXG4gICAgcmV0dXJuIHNpbmdsZUpvdXJuYWxFbnRyeVxuICAgIH0sXG59XG5leHBvcnQgZGVmYXVsdCBidWlsZEVudHJ5XG4iLCJpbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIlxuaW1wb3J0IGVudHJpZXNMaXN0IGZyb20gXCIuL2VudHJpZXNET01cIjtcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiO1xuXG5jb25zdCBmaWx0ZXJFbnRyaWVzID0ge1xuICBtb29kU2VsZWN0b3I6ICgpID0+e1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmFkaW9CdXR0b25cIikuZm9yRWFjaChidXR0b249PntcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KT0+e1xuICAgICAgICBsZXQgZmlsdGVyZWRNb29kID0gZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgIGNvbnNvbGUubG9nKGZpbHRlcmVkTW9vZClcbiAgICAgICAgZmlsdGVyRW50cmllcy5yZXN0cmljdEVudHJpZXMoZmlsdGVyZWRNb29kKVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRNb29kXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIHJlc3RyaWN0RW50cmllczogKG1vb2QpPT57XG4gICAgY29uc29sZS5sb2cobW9vZClcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuZ2V0RW50cmllcygpXG4gICAgLnRoZW4oKGVudHJpZXMpPT5lbnRyaWVzLmZpbHRlcigoZW50cnkpPT4gZW50cnkubW9vZCA9PT0gbW9vZClcbiAgICApLnRoZW4odGFjbyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcInRhY29cIiwgdGFjbylcbiAgICAgIHRhY28ubWFwKGl0ZW0gPT4gYnVpbGRFbnRyeS5tYWtlRW50cnlFbGVtZW50cyhpdGVtKSlcbiAgICAgIG1hbmFnZURPTS5hcHBlbmRFbnRyeSgpO1xuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZpbHRlckVudHJpZXNcblxuIiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuXG5cblxuICAgICAgICAgICAgY29uc3QgY29udGFjdCA9IHtcblxuICAgICAgICAgICAgICBjcmVhdGVDb250YWN0Q2FyZDogKGNvbnRhY3RJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3QubWFrZUNvbnRhY3QoY29udGFjdEluZm8pKTtcbiAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChmcmFnbWVudClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuKi9cbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCJcblxuY2xhc3MgSm91cm5hbEVudHJ5IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHRoaXMuZGF0ZSA9IHByb3BzLmRhdGVcbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lXG4gICAgdGhpcy5jb25jZXB0ID0gcHJvcHMuY29uY2VwdFxuICAgIHRoaXMuZW50cnkgPSBwcm9wcy5lbnRyeVxuICAgIHRoaXMubW9vZCA9IHByb3BzLm1vb2RcbiAgfVxuICBzaW5nbGVKb3VybmFsRW50cnkoKXtcbiAgICByZXR1cm4ge2RhdGU6IHRoaXMuZGF0ZSwgbmFtZTogdGhpcy5uYW1lLCBjb25jZXB0OiB0aGlzLmNvbmNlcHQsIGVudHJ5OiB0aGlzLmVudHJ5LCBtb29kOiB0aGlzLm1vb2R9XG4gIH1cbiAgc2F2ZSgpe1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5zYXZlSm91cm5hbEVudHJ5KHRoaXMuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSm91cm5hbEVudHJ5IiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuSW4geW91ciBtYWluIEphdmFTY3JpcHQgbW9kdWxlIChqb3VybmFsLmpzKSBhZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgUmVjb3JkIEpvdXJuYWwgRW50cnkgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgeW91ciBmb3JtLiBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCB5b3UgbmVlZCB0byBjcmVhdGUgYSBuZXcgZW50cnkgaW4geW91ciBBUEkuIFRoZSBIVFRQIG1ldGhvZCB0aGF0IHlvdSB1c2UgdG8gY3JlYXRlIHJlc291cmNlcyBpcyBQT1NULiBHdWlkYW5jZSBvbiBzeW50YXggaXMgcHJvdmlkZWQgYmVsb3cuXG5cbiovXG5cbmltcG9ydCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSBmcm9tIFwiLi92YWxpZGF0ZWRhdGFcIlxuaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL21ha2VQYWdlXCJcbmltcG9ydCBKb3VybmFsRW50cnkgZnJvbSBcIi4vam91cm5hbFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiO1xuaW1wb3J0IGVudHJpZXNMaXN0IGZyb20gXCIuL2VudHJpZXNET01cIjtcbmltcG9ydCBmaWx0ZXJFbnRyaWVzIGZyb20gXCIuL2ZpbHRlckVudHJpZXNcIjtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKXtcbiAgbWFrZVBhZ2UuaW5pdGlhdGVGb3JtKCk7XG4gIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKS50aGVuKChkYXRhKT0+IGVudHJpZXNMaXN0LmJ1aWxkTGlzdChkYXRhKSkudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gIGZpbHRlckVudHJpZXMubW9vZFNlbGVjdG9yKCk7XG59XG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGhhcyBiZWVuIGNsaWNrZWRcIilcblxuICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5ub0VtcHR5VmFsdWVzKClcbiAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKFwiVGhlIHN0YXR1cyBvZiBjaGVjayAxIGhhcyBjbGVhcmVkXCIpXG4gICAgY29uc3QgbmV3RW50cnkgPSBuZXcgSm91cm5hbEVudHJ5KHtcbiAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWUsXG4gICAgICBuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F1dGhvck5hbWVcIikudmFsdWUsXG4gICAgICBjb25jZXB0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZSxcbiAgICAgIGVudHJ5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS52YWx1ZSxcbiAgICAgIG1vb2Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZFwiKS52YWx1ZSxcbiAgICB9KVxuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm9ubHlBbGxvd2VkQ2hhcmFjdGVycyhuZXdFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgICBpZih2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9PT0gdHJ1ZSl7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMiBoYXMgY2xlYXJlZFwiKVxuICAgICAgbmV3RW50cnkuc2F2ZSgpXG4gICAgICAudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpXG4gICAgICAudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91ciBzdWJtaXNzaW9uIGhhcyBiZWVuIHRlcm1pbmF0ZWQsIHBsZWFzZSB0cnkgYWdhaW5cIilcbiAgICB9XG4gIH1cbn0pXG5cbiIsIi8vIE1ha2VQYWdlLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IEluaXRpYXRlIGZvcm0gYnVpbGQsIGNhbGwgYnVpbGQgcGFnZSB3aGljaCBsb29wcyBvdmVyIGRhdGEgYW5kIGNyZWF0ZXMgaW5wdXQgZWxlbWVudHMuIENhbGxzIGVsZW1lbnQgZmFjdG9yeSBmdW5jdGlvblxuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCJcblxuY29uc3QgbWFrZVBhZ2UgPSB7XG4gIGJ1aWxkRm9ybTogKG5hbWUsIHR5cGUsIHRpdGxlKSA9PiB7XG4gICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBuYW1lfSwgdGl0bGUpXG4gICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogdHlwZSwgbmFtZTogbmFtZSwgaWQ6IG5hbWUsIHJlcXVpcmVkOiB0cnVlfSlcbiAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBsYWJlbCwgaW5wdXQpXG4gICAgcmV0dXJuIGZpZWxkc2V0XG4gIH0sXG5cbiAgaW5pdGlhdGVGb3JtOiAoKSA9PiB7XG4gICAgbGV0IGRhdGVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImpvdXJuYWxEYXRlXCIsIFwiZGF0ZVwiLCBcIkRhdGUgb2YgZW50cnlcIilcbiAgICBsZXQgYXV0aG9yTmFtZUVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiYXV0aG9yTmFtZVwiLCBcInRleHRcIiwgXCJBdXRob3IgTmFtZVwiKTtcbiAgICBsZXQgY29uY2VwdHNDb3ZlcmVkRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJjb25jZXB0c0NvdmVyZWRcIiwgXCJ0ZXh0XCIsIFwiQ29uY2VwdHMgQ292ZXJlZFwiKVxuICAgIGxldCBqb3VybmFsRW50cnlMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJqb3VybmFsRW50cnlcIn0sIFwiSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBqb3VybmFsRW50cnlUZXh0YXJlYSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwidGV4dGFyZWFcIiwge25hbWU6IFwiam91cm5hbEVudHJ5XCIsIGlkOiBcImpvdXJuYWxFbnRyeVwiLCBjb2xzOiBcIjYwXCIsIHJvd3M6IFwiMTBcIn0pXG4gICAgbGV0IGpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGpvdXJuYWxFbnRyeUxhYmVsLCBqb3VybmFsRW50cnlUZXh0YXJlYSlcbiAgICBsZXQgZW50cnlCdXR0b24gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImJ1dHRvblwiLCB7dHlwZTogXCJzdWJtaXRcIiwgaWQ6IFwiam91cm5hbEVudHJ5QnV0dG9uXCJ9LCBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCIpXG4gICAgbGV0IG1vb2RMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJtb29kXCIsIGlkOiBcIm1vb2RMYWJlbFwifSwgXCJNb29kIGZvciB0aGUgRGF5XCIpXG4gICAgbGV0IG1vb2RPcHRpb25IYXBweSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJoYXBweVwifSwgXCJIYXBweVwiKVxuICAgIGxldCBtb29kT3B0aW9uU2FkID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcInNhZFwifSwgXCJTYWRcIilcbiAgICBsZXQgbW9vZE9wdGlvbkZydXN0cmF0ZWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZnJ1c3RyYXRlZFwifSwgXCJGcnVzdHJhdGVkXCIpXG4gICAgbGV0IG1vb2RPcHRpb25GaW5lID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZpbmVcIn0sIFwiRmluZVwiKVxuICAgIGxldCBtb29kU2VsZWN0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWxlY3RcIiwge25hbWU6IFwibW9vZFwiLCBpZDogXCJtb29kXCJ9LCBudWxsLCBtb29kT3B0aW9uRmluZSwgbW9vZE9wdGlvbkZydXN0cmF0ZWQsIG1vb2RPcHRpb25IYXBweSwgbW9vZE9wdGlvblNhZClcbiAgICBsZXQgbW9vZEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbW9vZExhYmVsLCBtb29kU2VsZWN0KVxuICAgIGxldCBmb3JtID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmb3JtXCIsIHt9LCBudWxsLCBkYXRlRW50cnksIGF1dGhvck5hbWVFbnRyeSwgY29uY2VwdHNDb3ZlcmVkRW50cnksIGpvdXJuYWxFbnRyeSwgbW9vZEVudHJ5LCBlbnRyeUJ1dHRvbilcbiAgICBtYW5hZ2VET00uYXBwZW5kRm9ybShmb3JtKVxuICB9LFxuICBjcmVhdGVSYWRpb0J1dHRvbnM6ICgpPT57XG4gICAgbGV0IG1vb2RzID0gW1wic2FkXCIsIFwiaGFwcHlcIiwgXCJmaW5lXCIsIFwiZnJ1c3RyYXRlZFwiXVxuICAgIGxldCBmaWVsZHNldCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwpXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG1vb2RzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwicmFkaW9cIiwgbmFtZTogXCJtb29kXCIsIHZhbHVlOiBtb29kc1tpXSwgY2xhc3M6IFwicmFkaW9CdXR0b25cIiwgaWQ6IGBmaWx0ZXItJHttb29kc1tpXX1gfSlcbiAgICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogYGZpbHRlci0ke21vb2RzW2ldfWB9LCBtb29kc1tpXSlcbiAgICAgIGxldCB3cmFwcGVyRGl2ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJkaXZcIiwge30sIG51bGwsIGlucHV0LCBsYWJlbClcbiAgICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKHdyYXBwZXJEaXYpXG4gICAgfVxuICAgIG1hbmFnZURPTS5hcHBlbmRCdXR0b25zKGZpZWxkc2V0KVxuICAgIC8vIHJldHVybiBmaWVsZHNldFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIiwiLy8gVmFsaWRhdGVEYXRhLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IHRha2UgcHJvdmlkZWQgZGF0YSBhbmQgY2hlY2sgZm9yIHJlcXVpcmVkIHNlY3Rpb24gY29tcGxldGlvbiwgY3Vyc2Ugd29yZHMsIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuXG5jb25zdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSA9IHtcbiAgY2xlYXJTdGF0dXM6IGZhbHNlLFxuXG4gIG5vRW1wdHlWYWx1ZXM6ICgpPT57XG4gICAgbGV0IGZvcm09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG4gICAgY29uc29sZS5sb2coZm9ybSlcbiAgICBpZihmb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gdHJ1ZSl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGlzIHZhbGlkXCIpXG4gICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzKVxuICAgICAgcmV0dXJuIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwicGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHNcIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSxcblxuICBvbmx5QWxsb3dlZENoYXJhY3RlcnM6IChzb21ldGhpbmcpPT57XG4gICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSBmYWxzZVxuICAgIGZvcihjb25zdCBpbnB1dCBpbiBzb21ldGhpbmcpe1xuICAgICAgaWYoc29tZXRoaW5nW2lucHV0XS5tYXRjaCgvKFstYS16QS1aMC05KCl7fTo7XSspLykpe1xuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgaW5wdXQgaGFzIGJlZW4gYWNjZXB0ZWRcIilcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgYWxlcnQoYFlvdXIgJHtpbnB1dH0gc3VibWlzc2lvbiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMuIFBsZWFzZSBvbmx5IGluY2x1ZGUgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgb3IgKCl7fTs6IGFuZCByZXN1Ym1pdGApXG4gICAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICB9XG59XG5cbi8vICAgbWF4aW11bUNvbmNlcHRFbnRyeUxlbmd0aDogKCk9Pntcbi8vICAgICAvLyBQaWNrIGEgbWF4aW11bSBsZW5ndGggZm9yIGNvbmNlcHRzIGZpZWxkIGFuZCBwcm92aWRlIHZpc3VhbCBmZWVkYmFjayBpZiB5b3UgdHlwZSBpbiBhIHN0cmluZyB0aGF0IGlzIGxvbmdlciB0aGFuIHRoYXQgbWF4aW11bS5cbi8vICAgfSxcblxuLy8gICBub0N1cnNlV29yZHM6ICgpPT57XG4vLyAgICAgLy8gVGVzdCB0aGF0IHRoZSBjb25jZXB0IGFuZCBlbnRyeSBmaWVsZHMgY29udGFpbiBubyBjdXJzZSB3b3Jkcy4gWW91IGNhbiB1c2UgcmVndWxhciBleHByZXNzaW9ucyBmb3IgdGhhdC5cbi8vICAgfVxuXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlSm91cm5hbEVudHJ5XG4iXX0=
