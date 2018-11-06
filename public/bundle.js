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
if (document.readyState === "loading") {
  _makePage.default.initiateForm();

  _data.default.getEntries().then(data => _entriesDOM.default.buildList(data)).then(taco => _DOMmanager.default.appendEntry(taco));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBO0FBQ0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQjtBQUNBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQWQ7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtBQUNELEdBTmU7QUFPaEIsRUFBQSxXQUFXLEVBQUcsbUJBQUQsSUFBdUI7QUFDbEMsVUFBTSxTQUFTLEdBQUUsQ0FBQyxDQUFDLFdBQUQsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLE1BQWxCLENBQXlCLG1CQUF6QjtBQUNEO0FBVmUsQ0FBbEI7ZUFhZSxTOzs7Ozs7Ozs7OztBQ2ZmOzs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU0sY0FBYyxHQUFHO0FBQ3JCLEVBQUEsVUFBVSxFQUFFLE1BQUk7QUFDZCxXQUFPLEtBQUssQ0FBQywrQkFBRCxDQUFMLENBQ04sSUFETSxDQUNBLE9BQUQsSUFBYSxPQUFPLENBQUMsSUFBUixFQURaLENBQVA7QUFFRCxHQUpvQjtBQU1yQixFQUFBLGdCQUFn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U0FBUyxDQUFDLEtBQUQsQ0FBVCxDQUFpQixLQUFqQixDQUF1Qix1QkFBdkIsQ0FBSCxFQUFtRDtBQUNqRCxRQUFBLG9CQUFvQixDQUFDLFdBQXJCLEdBQW1DLElBQW5DO0FBQ0EsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDZCQUFaO0FBQ0QsT0FIRCxNQUdNO0FBQ0osUUFBQSxLQUFLLENBQUUsUUFBTyxLQUFNLDZHQUFmLENBQUw7QUFDQSxRQUFBLG9CQUFvQixDQUFDLFdBQXJCLEdBQW1DLEtBQW5DO0FBQ0E7QUFDRDtBQUNGOztBQUNELFdBQU8sb0JBQW9CLENBQUMsV0FBNUI7QUFDRCxHQTlCMEIsQ0FpQzdCO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQXpDNkIsQ0FBN0I7ZUEyQ2Usb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbi8vIGltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5jb25zdCBtYW5hZ2VET00gPSB7XG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZsZXhib3hcIilcbiAgICBmb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybSlcbiAgICBmb3JtRGl2LmFwcGVuZENoaWxkKGZvcm1GcmFnbWVudClcbiAgfSxcbiAgYXBwZW5kRW50cnk6IChkYWlseUpvdXJuYWxFbnRyaWVzKT0+e1xuICAgIGNvbnN0ICRlbnRyeURpdiA9JChcIiNlbnRyeUxvZ1wiKVxuICAgICRlbnRyeURpdi5lbXB0eSgpLmFwcGVuZChkYWlseUpvdXJuYWxFbnRyaWVzKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmFnZURPTSIsIi8qXG5cbmRhdGEuanMgLSBNb3ZlIHRoZSBjb2RlIHRoYXQgZGVhbHMgd2l0aCBnZXR0aW5nIHRoZSBkYXRhIGludG8gdGhpcyBmaWxlLlxuXG5EYXRhLmpzOiBHZXQgYW5kIHBvc3QgcmVxdWVzdHMsIG9ubHkgaW50ZXJhY3RzIHdpdGggdGhlIEFQSS8gRGF0YWJhc2UsIHNob3VsZCBub3QgYmUgdXNlZCB0byBjYWxsIGFueSBvdGhlciBmdW5jdGlvbnNcblxuXG5EQUlMWSBKT1VSTkFMIDVcbkltcGxlbWVudCB0aGUgbWV0aG9kIHVzaW5nIGZldGNoIHRvIHBlcmZvcm0gYSBQT1NUIHJlcXVlc3QuXG5JbiBtYWluIG1vZHVsZSwgaW52b2tlIG1ldGhvZCB0byBzYXZlIGVudHJ5LCB0aGVuIGFkZCBpdGVtIHRvIGxvY2FsIGFycmF5LlxuVXBkYXRlIERPTSB3aXRoIHVwZGF0ZWQgYXJyYXkgdmFsdWVzLlxuXG5Xcml0ZSBhIG1ldGhvZCBpbiB5b3VyIEFQSSBtb2R1bGUgdGhhdCBwZXJmb3JtcyBhIFBPU1QgYW5kIGEgR0VULCB0aGVuIHVzZSB0aGF0IG1ldGhvZCBpbiB0aGUgZXZlbnQgbGlzdGVuZXIuXG4qL1xuXG5jb25zdCBqb3VybmFsRW50cmllcyA9IHtcbiAgZ2V0RW50cmllczogKCk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKVxuICAgIC50aGVuKChlbnRyaWVzKSA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSm91cm5hbEVudHJ5OiAoam91cm5hbEVudHJ5KT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoam91cm5hbEVudHJ5KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbEVudHJpZXMiLCIvLyBFbGVtZW50RmFjdG9yeS5qczogTG9vcCBvdmVyIHByb3ZpZGVkIGluZm9ybWF0aW9uIGFuZCBjcmVhdGUgSFRNTCBlbGVtZW50IHRoYXQgY2FuIGJlIGRpc3BsYXllZCBpbiB0aGUgRE9NXG5cbmNvbnN0IG1ha2VFbGVtZW50ID0ge1xuICBlbGVtZW50RmFjdG9yeTogKGVsLCBhdHRyaWJ1dGVzT2JqLCBjb250ZW50LCAuLi5jaGlsZHJlbik9PntcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpXG4gICAgLy8gU2V0IEF0dHJpYnV0ZXNcbiAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXNPYmope1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc09ialthdHRyXSlcbiAgICB9XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQgfHwgbnVsbFxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9KVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgbWFrZUVsZW1lbnQiLCJpbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcblxuLypcbmVudHJpZXNET00uanMgLSBNb3ZlIHRoZSBjb2RlIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIG1vZGlmeWluZyB0aGUgRE9NIGludG8gdGhpcyBmaWxlLlxuKi9cblxuLy8gLy8gSW5zZXJ0IHRoZSBmcmFnbWVudCBpbnRvIHRoZSBET00gYXMgY2hpbGRyZW4gb2YgdGhlIEVudHJ5IExvZyBzZWN0aW9uIGluIGluZGV4Lmh0bWxcblxuXG5jb25zdCBlbnRyaWVzTGlzdCA9IHtcbiAgYnVpbGRMaXN0OiAoKT0+e1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKClcbiAgICAudGhlbigoZW50cmllcyk9PiBlbnRyaWVzLm1hcChlbnRyeSA9PiBidWlsZEVudHJ5Lm1ha2VFbnRyeUVsZW1lbnRzKGVudHJ5KSkpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGVudHJpZXNMaXN0XG4iLCIvKlxuRW50cnlDb21wb25lbnQ6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogTG9vcCBvdmVyIHByb3ZpZGVkIGRhdGEgYW5kIHByb2R1Y2UgSFRNTCB0byBiZSBkaXNwbGF5ZWQgdG8gdGhlIERPTSxcbiovXG5cbmltcG9ydCBtYWtlRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50RmFjdG9yeVwiXG5cblxuY29uc3QgYnVpbGRFbnRyeSA9IHtcbiAgY29tcG9uZW50QXJyYXk6IFtdLFxuXG4gIG1ha2VFbnRyeUVsZW1lbnRzOiAoam91cm5hbEVudHJ5T2JqKT0+e1xuICAgIGxldCBjb25jZXB0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJoM1wiLCB7Y2xhc3M6IFwiam91cm5hbENvbmNlcHRcIn0sIGpvdXJuYWxFbnRyeU9iai5jb25jZXB0KVxuICAgIGxldCBkYXRlID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsRGF0ZVwifSwgam91cm5hbEVudHJ5T2JqLmRhdGUpXG4gICAgbGV0IGF1dGhvciA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbEF1dGhvclwifSwgam91cm5hbEVudHJ5T2JqLm5hbWUpXG4gICAgbGV0IG1vb2QgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxNb29kXCJ9LCBqb3VybmFsRW50cnlPYmoubW9vZClcbiAgICBsZXQgZW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxFbnRyeVwifSwgam91cm5hbEVudHJ5T2JqLmVudHJ5KVxuICAgIGxldCBzaW5nbGVKb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlY3Rpb25cIiwge2NsYXNzOiBcInNpbmdsZUpvdXJuYWxFbnRyeVwifSwgbnVsbCwgY29uY2VwdCwgZGF0ZSwgYXV0aG9yLCBtb29kLCBlbnRyeSlcbiAgICByZXR1cm4gc2luZ2xlSm91cm5hbEVudHJ5XG4gICAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRW50cnlcbiIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcblxuXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG5cbiAgICAgICAgICAgICAgY3JlYXRlQ29udGFjdENhcmQ6IChjb250YWN0SW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGNvbnRhY3RJbmZvKSk7XG4gICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5hZGRUb0xpc3QoZnJhZ21lbnQpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiovXG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiXG5cbmNsYXNzIEpvdXJuYWxFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICB0aGlzLmRhdGUgPSBwcm9wcy5kYXRlXG4gICAgdGhpcy5uYW1lID0gcHJvcHMubmFtZVxuICAgIHRoaXMuY29uY2VwdCA9IHByb3BzLmNvbmNlcHRcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHMuZW50cnlcbiAgICB0aGlzLm1vb2QgPSBwcm9wcy5tb29kXG4gIH1cbiAgc2luZ2xlSm91cm5hbEVudHJ5KCl7XG4gICAgcmV0dXJuIHtkYXRlOiB0aGlzLmRhdGUsIG5hbWU6IHRoaXMubmFtZSwgY29uY2VwdDogdGhpcy5jb25jZXB0LCBlbnRyeTogdGhpcy5lbnRyeSwgbW9vZDogdGhpcy5tb29kfVxuICB9XG4gIHNhdmUoKXtcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuc2F2ZUpvdXJuYWxFbnRyeSh0aGlzLnNpbmdsZUpvdXJuYWxFbnRyeSgpKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpvdXJuYWxFbnRyeSIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcbkluIHlvdXIgbWFpbiBKYXZhU2NyaXB0IG1vZHVsZSAoam91cm5hbC5qcykgYWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIFJlY29yZCBKb3VybmFsIEVudHJ5IGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHlvdXIgZm9ybS4gV2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGJ1dHRvbiwgeW91IG5lZWQgdG8gY3JlYXRlIGEgbmV3IGVudHJ5IGluIHlvdXIgQVBJLiBUaGUgSFRUUCBtZXRob2QgdGhhdCB5b3UgdXNlIHRvIGNyZWF0ZSByZXNvdXJjZXMgaXMgUE9TVC4gR3VpZGFuY2Ugb24gc3ludGF4IGlzIHByb3ZpZGVkIGJlbG93LlxuXG4qL1xuXG5pbXBvcnQgdmFsaWRhdGVKb3VybmFsRW50cnkgZnJvbSBcIi4vdmFsaWRhdGVkYXRhXCJcbmltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5pbXBvcnQgSm91cm5hbEVudHJ5IGZyb20gXCIuL2pvdXJuYWxcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcbmltcG9ydCBlbnRyaWVzTGlzdCBmcm9tIFwiLi9lbnRyaWVzRE9NXCI7XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIil7XG4gIG1ha2VQYWdlLmluaXRpYXRlRm9ybSgpO1xuICBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKCkudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpLnRoZW4oKHRhY28pPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KHRhY28pKVxufVxuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgY29uc29sZS5sb2coXCJ0aGUgZm9ybSBoYXMgYmVlbiBjbGlja2VkXCIpXG5cbiAgdmFsaWRhdGVKb3VybmFsRW50cnkubm9FbXB0eVZhbHVlcygpXG4gIGlmKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID09PSB0cnVlKXtcbiAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMSBoYXMgY2xlYXJlZFwiKVxuICAgIGNvbnN0IG5ld0VudHJ5ID0gbmV3IEpvdXJuYWxFbnRyeSh7XG4gICAgICBkYXRlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxEYXRlXCIpLnZhbHVlLFxuICAgICAgbmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdXRob3JOYW1lXCIpLnZhbHVlLFxuICAgICAgY29uY2VwdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWUsXG4gICAgICBlbnRyeTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikudmFsdWUsXG4gICAgICBtb29kOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikudmFsdWUsXG4gICAgfSlcbiAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5vbmx5QWxsb3dlZENoYXJhY3RlcnMobmV3RW50cnkuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gICAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgc3RhdHVzIG9mIGNoZWNrIDIgaGFzIGNsZWFyZWRcIilcbiAgICAgIG5ld0VudHJ5LnNhdmUoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4gZW50cmllc0xpc3QuYnVpbGRMaXN0KGRhdGEpKVxuICAgICAgLnRoZW4oKHRhY28pPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KHRhY28pKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdXIgc3VibWlzc2lvbiBoYXMgYmVlbiB0ZXJtaW5hdGVkLCBwbGVhc2UgdHJ5IGFnYWluXCIpXG4gICAgfVxuICB9XG59KVxuXG4iLCIvLyBNYWtlUGFnZS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBJbml0aWF0ZSBmb3JtIGJ1aWxkLCBjYWxsIGJ1aWxkIHBhZ2Ugd2hpY2ggbG9vcHMgb3ZlciBkYXRhIGFuZCBjcmVhdGVzIGlucHV0IGVsZW1lbnRzLiBDYWxscyBlbGVtZW50IGZhY3RvcnkgZnVuY3Rpb25cblxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiXG5cbmNvbnN0IG1ha2VQYWdlID0ge1xuICBidWlsZEZvcm06IChuYW1lLCB0eXBlLCB0aXRsZSkgPT4ge1xuICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogbmFtZX0sIHRpdGxlKVxuICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IHR5cGUsIG5hbWU6IG5hbWUsIGlkOiBuYW1lLCByZXF1aXJlZDogdHJ1ZX0pXG4gICAgbGV0IGZpZWxkc2V0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbGFiZWwsIGlucHV0KVxuICAgIHJldHVybiBmaWVsZHNldFxuICB9LFxuXG4gIGluaXRpYXRlRm9ybTogKCkgPT4ge1xuICAgIGxldCBkYXRlRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJqb3VybmFsRGF0ZVwiLCBcImRhdGVcIiwgXCJEYXRlIG9mIGVudHJ5XCIpXG4gICAgbGV0IGF1dGhvck5hbWVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImF1dGhvck5hbWVcIiwgXCJ0ZXh0XCIsIFwiQXV0aG9yIE5hbWVcIik7XG4gICAgbGV0IGNvbmNlcHRzQ292ZXJlZEVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiY29uY2VwdHNDb3ZlcmVkXCIsIFwidGV4dFwiLCBcIkNvbmNlcHRzIENvdmVyZWRcIilcbiAgICBsZXQgam91cm5hbEVudHJ5TGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IFwiam91cm5hbEVudHJ5XCJ9LCBcIkpvdXJuYWwgRW50cnlcIilcbiAgICBsZXQgam91cm5hbEVudHJ5VGV4dGFyZWEgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInRleHRhcmVhXCIsIHtuYW1lOiBcImpvdXJuYWxFbnRyeVwiLCBpZDogXCJqb3VybmFsRW50cnlcIiwgY29sczogXCI2MFwiLCByb3dzOiBcIjEwXCJ9KVxuICAgIGxldCBqb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBqb3VybmFsRW50cnlMYWJlbCwgam91cm5hbEVudHJ5VGV4dGFyZWEpXG4gICAgbGV0IGVudHJ5QnV0dG9uID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJidXR0b25cIiwge3R5cGU6IFwic3VibWl0XCIsIGlkOiBcImpvdXJuYWxFbnRyeUJ1dHRvblwifSwgXCJSZWNvcmQgSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBtb29kTGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IFwibW9vZFwiLCBpZDogXCJtb29kTGFiZWxcIn0sIFwiTW9vZCBmb3IgdGhlIERheVwiKVxuICAgIGxldCBtb29kT3B0aW9uSGFwcHkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiaGFwcHlcIn0sIFwiSGFwcHlcIilcbiAgICBsZXQgbW9vZE9wdGlvblNhZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJzYWRcIn0sIFwiU2FkXCIpXG4gICAgbGV0IG1vb2RPcHRpb25GcnVzdHJhdGVkID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZydXN0cmF0ZWRcIn0sIFwiRnJ1c3RyYXRlZFwiKVxuICAgIGxldCBtb29kT3B0aW9uRmluZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJmaW5lXCJ9LCBcIkZpbmVcIilcbiAgICBsZXQgbW9vZFNlbGVjdCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwic2VsZWN0XCIsIHtuYW1lOiBcIm1vb2RcIiwgaWQ6IFwibW9vZFwifSwgbnVsbCwgbW9vZE9wdGlvbkZpbmUsIG1vb2RPcHRpb25GcnVzdHJhdGVkLCBtb29kT3B0aW9uSGFwcHksIG1vb2RPcHRpb25TYWQpXG4gICAgbGV0IG1vb2RFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIG1vb2RMYWJlbCwgbW9vZFNlbGVjdClcbiAgICBsZXQgZm9ybSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZm9ybVwiLCB7fSwgbnVsbCwgZGF0ZUVudHJ5LCBhdXRob3JOYW1lRW50cnksIGNvbmNlcHRzQ292ZXJlZEVudHJ5LCBqb3VybmFsRW50cnksIG1vb2RFbnRyeSwgZW50cnlCdXR0b24pXG4gICAgY29uc29sZS5sb2coZm9ybSlcbiAgICBtYW5hZ2VET00uYXBwZW5kRm9ybShmb3JtKVxuICAgIC8vIG1ha2VQYWdlLmFwcGVuZEZvcm0oZm9ybSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlUGFnZSIsIi8vIFZhbGlkYXRlRGF0YS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiB0YWtlIHByb3ZpZGVkIGRhdGEgYW5kIGNoZWNrIGZvciByZXF1aXJlZCBzZWN0aW9uIGNvbXBsZXRpb24sIGN1cnNlIHdvcmRzLCBhbmQgc3BlY2lhbCBjaGFyYWN0ZXJzXG5cblxuY29uc3QgdmFsaWRhdGVKb3VybmFsRW50cnkgPSB7XG4gIGNsZWFyU3RhdHVzOiBmYWxzZSxcblxuICBub0VtcHR5VmFsdWVzOiAoKT0+e1xuICAgIGxldCBmb3JtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuICAgIGNvbnNvbGUubG9nKGZvcm0pXG4gICAgaWYoZm9ybS5jaGVja1ZhbGlkaXR5KCkgPT09IHRydWUpe1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGUgZm9ybSBpcyB2YWxpZFwiKVxuICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyh2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cylcbiAgICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcInBsZWFzZSBmaWxsIG91dCBhbGwgZmllbGRzXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0sXG5cbiAgb25seUFsbG93ZWRDaGFyYWN0ZXJzOiAoc29tZXRoaW5nKT0+e1xuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICBmb3IoY29uc3QgaW5wdXQgaW4gc29tZXRoaW5nKXtcbiAgICAgIGlmKHNvbWV0aGluZ1tpbnB1dF0ubWF0Y2goLyhbLWEtekEtWjAtOSgpe306O10rKS8pKXtcbiAgICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhlIGlucHV0IGhhcyBiZWVuIGFjY2VwdGVkXCIpXG4gICAgICB9IGVsc2V7XG4gICAgICAgIGFsZXJ0KGBZb3VyICR7aW5wdXR9IHN1Ym1pc3Npb24gY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzLiBQbGVhc2Ugb25seSBpbmNsdWRlIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIG9yICgpe307OiBhbmQgcmVzdWJtaXRgKVxuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXNcbiAgfVxufVxuXG4vLyAgIG1heGltdW1Db25jZXB0RW50cnlMZW5ndGg6ICgpPT57XG4vLyAgICAgLy8gUGljayBhIG1heGltdW0gbGVuZ3RoIGZvciBjb25jZXB0cyBmaWVsZCBhbmQgcHJvdmlkZSB2aXN1YWwgZmVlZGJhY2sgaWYgeW91IHR5cGUgaW4gYSBzdHJpbmcgdGhhdCBpcyBsb25nZXIgdGhhbiB0aGF0IG1heGltdW0uXG4vLyAgIH0sXG5cbi8vICAgbm9DdXJzZVdvcmRzOiAoKT0+e1xuLy8gICAgIC8vIFRlc3QgdGhhdCB0aGUgY29uY2VwdCBhbmQgZW50cnkgZmllbGRzIGNvbnRhaW4gbm8gY3Vyc2Ugd29yZHMuIFlvdSBjYW4gdXNlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIHRoYXQuXG4vLyAgIH1cblxuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeVxuIl19
