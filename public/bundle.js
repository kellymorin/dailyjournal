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

    console.log(form);

    _DOMmanager.default.appendForm(form); // makePage.appendForm(form)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllcy5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBO0FBQ0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQjtBQUNBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQWQ7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtBQUNELEdBTmU7QUFPaEIsRUFBQSxXQUFXLEVBQUcsbUJBQUQsSUFBdUI7QUFDbEMsVUFBTSxTQUFTLEdBQUUsQ0FBQyxDQUFDLFdBQUQsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLE1BQWxCLENBQXlCLG1CQUF6QjtBQUNEO0FBVmUsQ0FBbEI7ZUFhZSxTOzs7Ozs7Ozs7OztBQ2ZmOzs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU0sY0FBYyxHQUFHO0FBQ3JCLEVBQUEsVUFBVSxFQUFFLE1BQUk7QUFDZCxXQUFPLEtBQUssQ0FBQywrQkFBRCxDQUFMLENBQ04sSUFETSxDQUNBLE9BQUQsSUFBYSxPQUFPLENBQUMsSUFBUixFQURaLENB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QUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNkJBQVo7QUFDRCxPQUhELE1BR007QUFDSixRQUFBLEtBQUssQ0FBRSxRQUFPLEtBQU0sNkdBQWYsQ0FBTDtBQUNBLFFBQUEsb0JBQW9CLENBQUMsV0FBckIsR0FBbUMsS0FBbkM7QUFDQTtBQUNEO0FBQ0Y7O0FBQ0QsV0FBTyxvQkFBb0IsQ0FBQyxXQUE1QjtBQUNELEdBOUIwQixDQWlDN0I7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBekM2QixDQUE3QjtlQTJDZSxvQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuLy8gaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL21ha2VQYWdlXCJcbmNvbnN0IG1hbmFnZURPTSA9IHtcbiAgYXBwZW5kRm9ybTogKGZvcm0pPT57XG4gICAgbGV0IGZvcm1GcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBsZXQgZm9ybURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmxleGJveFwiKVxuICAgIGZvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChmb3JtKVxuICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoZm9ybUZyYWdtZW50KVxuICB9LFxuICBhcHBlbmRFbnRyeTogKGRhaWx5Sm91cm5hbEVudHJpZXMpPT57XG4gICAgY29uc3QgJGVudHJ5RGl2ID0kKFwiI2VudHJ5TG9nXCIpXG4gICAgJGVudHJ5RGl2LmVtcHR5KCkuYXBwZW5kKGRhaWx5Sm91cm5hbEVudHJpZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFuYWdlRE9NIiwiLypcblxuZGF0YS5qcyAtIE1vdmUgdGhlIGNvZGUgdGhhdCBkZWFscyB3aXRoIGdldHRpbmcgdGhlIGRhdGEgaW50byB0aGlzIGZpbGUuXG5cbkRhdGEuanM6IEdldCBhbmQgcG9zdCByZXF1ZXN0cywgb25seSBpbnRlcmFjdHMgd2l0aCB0aGUgQVBJLyBEYXRhYmFzZSwgc2hvdWxkIG5vdCBiZSB1c2VkIHRvIGNhbGwgYW55IG90aGVyIGZ1bmN0aW9uc1xuXG5cbkRBSUxZIEpPVVJOQUwgNVxuSW1wbGVtZW50IHRoZSBtZXRob2QgdXNpbmcgZmV0Y2ggdG8gcGVyZm9ybSBhIFBPU1QgcmVxdWVzdC5cbkluIG1haW4gbW9kdWxlLCBpbnZva2UgbWV0aG9kIHRvIHNhdmUgZW50cnksIHRoZW4gYWRkIGl0ZW0gdG8gbG9jYWwgYXJyYXkuXG5VcGRhdGUgRE9NIHdpdGggdXBkYXRlZCBhcnJheSB2YWx1ZXMuXG5cbldyaXRlIGEgbWV0aG9kIGluIHlvdXIgQVBJIG1vZHVsZSB0aGF0IHBlcmZvcm1zIGEgUE9TVCBhbmQgYSBHRVQsIHRoZW4gdXNlIHRoYXQgbWV0aG9kIGluIHRoZSBldmVudCBsaXN0ZW5lci5cbiovXG5cbmNvbnN0IGpvdXJuYWxFbnRyaWVzID0ge1xuICBnZXRFbnRyaWVzOiAoKT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXG4gICAgLnRoZW4oKGVudHJpZXMpID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVKb3VybmFsRW50cnk6IChqb3VybmFsRW50cnkpPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShqb3VybmFsRW50cnkpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRW50cmllcyIsIi8vIEVsZW1lbnRGYWN0b3J5LmpzOiBMb29wIG92ZXIgcHJvdmlkZWQgaW5mb3JtYXRpb24gYW5kIGNyZWF0ZSBIVE1MIGVsZW1lbnQgdGhhdCBjYW4gYmUgZGlzcGxheWVkIGluIHRoZSBET01cblxuY29uc3QgbWFrZUVsZW1lbnQgPSB7XG4gIGVsZW1lbnRGYWN0b3J5OiAoZWwsIGF0dHJpYnV0ZXNPYmosIGNvbnRlbnQsIC4uLmNoaWxkcmVuKT0+e1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcbiAgICAvLyBTZXQgQXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlc09iail7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzT2JqW2F0dHJdKVxuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudCB8fCBudWxsXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBtYWtlRWxlbWVudCIsImltcG9ydCBidWlsZEVudHJ5IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiO1xuXG4vKlxuZW50cmllc0RPTS5qcyAtIE1vdmUgdGhlIGNvZGUgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgbW9kaWZ5aW5nIHRoZSBET00gaW50byB0aGlzIGZpbGUuXG4qL1xuXG4vLyAvLyBJbnNlcnQgdGhlIGZyYWdtZW50IGludG8gdGhlIERPTSBhcyBjaGlsZHJlbiBvZiB0aGUgRW50cnkgTG9nIHNlY3Rpb24gaW4gaW5kZXguaHRtbFxuXG5cbmNvbnN0IGVudHJpZXNMaXN0ID0ge1xuICBidWlsZExpc3Q6ICgpPT57XG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+IGVudHJpZXMubWFwKGVudHJ5ID0+IGJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoZW50cnkpKSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZW50cmllc0xpc3RcbiIsIi8qXG5FbnRyeUNvbXBvbmVudDogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBMb29wIG92ZXIgcHJvdmlkZWQgZGF0YSBhbmQgcHJvZHVjZSBIVE1MIHRvIGJlIGRpc3BsYXllZCB0byB0aGUgRE9NLFxuKi9cblxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcblxuXG5jb25zdCBidWlsZEVudHJ5ID0ge1xuICBjb21wb25lbnRBcnJheTogW10sXG5cbiAgbWFrZUVudHJ5RWxlbWVudHM6IChqb3VybmFsRW50cnlPYmopPT57XG4gICAgbGV0IGNvbmNlcHQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImgzXCIsIHtjbGFzczogXCJqb3VybmFsQ29uY2VwdFwifSwgam91cm5hbEVudHJ5T2JqLmNvbmNlcHQpXG4gICAgbGV0IGRhdGUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxEYXRlXCJ9LCBqb3VybmFsRW50cnlPYmouZGF0ZSlcbiAgICBsZXQgYXV0aG9yID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsQXV0aG9yXCJ9LCBqb3VybmFsRW50cnlPYmoubmFtZSlcbiAgICBsZXQgbW9vZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbE1vb2RcIn0sIGpvdXJuYWxFbnRyeU9iai5tb29kKVxuICAgIGxldCBlbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbEVudHJ5XCJ9LCBqb3VybmFsRW50cnlPYmouZW50cnkpXG4gICAgbGV0IHNpbmdsZUpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwic2VjdGlvblwiLCB7Y2xhc3M6IFwic2luZ2xlSm91cm5hbEVudHJ5XCJ9LCBudWxsLCBjb25jZXB0LCBkYXRlLCBhdXRob3IsIG1vb2QsIGVudHJ5KVxuICAgIHJldHVybiBzaW5nbGVKb3VybmFsRW50cnlcbiAgICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFbnRyeVxuIiwiaW1wb3J0IGJ1aWxkRW50cnkgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCJcbmltcG9ydCBlbnRyaWVzTGlzdCBmcm9tIFwiLi9lbnRyaWVzRE9NXCI7XG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcblxuY29uc3QgZmlsdGVyRW50cmllcyA9IHtcbiAgbW9vZFNlbGVjdG9yOiAoKSA9PntcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhZGlvQnV0dG9uXCIpLmZvckVhY2goYnV0dG9uPT57XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgICAgICAgbGV0IGZpbHRlcmVkTW9vZCA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zb2xlLmxvZyhmaWx0ZXJlZE1vb2QpXG4gICAgICAgIGZpbHRlckVudHJpZXMucmVzdHJpY3RFbnRyaWVzKGZpbHRlcmVkTW9vZClcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkTW9vZFxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICByZXN0cmljdEVudHJpZXM6IChtb29kKT0+e1xuICAgIGNvbnNvbGUubG9nKG1vb2QpXG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+ZW50cmllcy5maWx0ZXIoKGVudHJ5KT0+IGVudHJ5Lm1vb2QgPT09IG1vb2QpXG4gICAgKS50aGVuKHRhY28gPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJ0YWNvXCIsIHRhY28pXG4gICAgICB0YWNvLm1hcChpdGVtID0+IGJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoaXRlbSkpXG4gICAgICBtYW5hZ2VET00uYXBwZW5kRW50cnkoKTtcbiAgICB9KVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJFbnRyaWVzXG5cbiIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcblxuXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG5cbiAgICAgICAgICAgICAgY3JlYXRlQ29udGFjdENhcmQ6IChjb250YWN0SW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGNvbnRhY3RJbmZvKSk7XG4gICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5hZGRUb0xpc3QoZnJhZ21lbnQpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiovXG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiXG5cbmNsYXNzIEpvdXJuYWxFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICB0aGlzLmRhdGUgPSBwcm9wcy5kYXRlXG4gICAgdGhpcy5uYW1lID0gcHJvcHMubmFtZVxuICAgIHRoaXMuY29uY2VwdCA9IHByb3BzLmNvbmNlcHRcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHMuZW50cnlcbiAgICB0aGlzLm1vb2QgPSBwcm9wcy5tb29kXG4gIH1cbiAgc2luZ2xlSm91cm5hbEVudHJ5KCl7XG4gICAgcmV0dXJuIHtkYXRlOiB0aGlzLmRhdGUsIG5hbWU6IHRoaXMubmFtZSwgY29uY2VwdDogdGhpcy5jb25jZXB0LCBlbnRyeTogdGhpcy5lbnRyeSwgbW9vZDogdGhpcy5tb29kfVxuICB9XG4gIHNhdmUoKXtcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuc2F2ZUpvdXJuYWxFbnRyeSh0aGlzLnNpbmdsZUpvdXJuYWxFbnRyeSgpKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpvdXJuYWxFbnRyeSIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcbkluIHlvdXIgbWFpbiBKYXZhU2NyaXB0IG1vZHVsZSAoam91cm5hbC5qcykgYWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIFJlY29yZCBKb3VybmFsIEVudHJ5IGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHlvdXIgZm9ybS4gV2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGJ1dHRvbiwgeW91IG5lZWQgdG8gY3JlYXRlIGEgbmV3IGVudHJ5IGluIHlvdXIgQVBJLiBUaGUgSFRUUCBtZXRob2QgdGhhdCB5b3UgdXNlIHRvIGNyZWF0ZSByZXNvdXJjZXMgaXMgUE9TVC4gR3VpZGFuY2Ugb24gc3ludGF4IGlzIHByb3ZpZGVkIGJlbG93LlxuXG4qL1xuXG5pbXBvcnQgdmFsaWRhdGVKb3VybmFsRW50cnkgZnJvbSBcIi4vdmFsaWRhdGVkYXRhXCJcbmltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5pbXBvcnQgSm91cm5hbEVudHJ5IGZyb20gXCIuL2pvdXJuYWxcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcbmltcG9ydCBlbnRyaWVzTGlzdCBmcm9tIFwiLi9lbnRyaWVzRE9NXCI7XG5pbXBvcnQgZmlsdGVyRW50cmllcyBmcm9tIFwiLi9maWx0ZXJFbnRyaWVzXCI7XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIil7XG4gIG1ha2VQYWdlLmluaXRpYXRlRm9ybSgpO1xuICBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKCkudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpLnRoZW4oKHRhY28pPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KHRhY28pKVxuICBmaWx0ZXJFbnRyaWVzLm1vb2RTZWxlY3RvcigpO1xufVxuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT57XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgY29uc29sZS5sb2coXCJ0aGUgZm9ybSBoYXMgYmVlbiBjbGlja2VkXCIpXG5cbiAgdmFsaWRhdGVKb3VybmFsRW50cnkubm9FbXB0eVZhbHVlcygpXG4gIGlmKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID09PSB0cnVlKXtcbiAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMSBoYXMgY2xlYXJlZFwiKVxuICAgIGNvbnN0IG5ld0VudHJ5ID0gbmV3IEpvdXJuYWxFbnRyeSh7XG4gICAgICBkYXRlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxEYXRlXCIpLnZhbHVlLFxuICAgICAgbmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdXRob3JOYW1lXCIpLnZhbHVlLFxuICAgICAgY29uY2VwdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWUsXG4gICAgICBlbnRyeTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikudmFsdWUsXG4gICAgICBtb29kOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikudmFsdWUsXG4gICAgfSlcbiAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5vbmx5QWxsb3dlZENoYXJhY3RlcnMobmV3RW50cnkuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gICAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgc3RhdHVzIG9mIGNoZWNrIDIgaGFzIGNsZWFyZWRcIilcbiAgICAgIG5ld0VudHJ5LnNhdmUoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4gZW50cmllc0xpc3QuYnVpbGRMaXN0KGRhdGEpKVxuICAgICAgLnRoZW4oKHRhY28pPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KHRhY28pKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdXIgc3VibWlzc2lvbiBoYXMgYmVlbiB0ZXJtaW5hdGVkLCBwbGVhc2UgdHJ5IGFnYWluXCIpXG4gICAgfVxuICB9XG59KVxuXG4iLCIvLyBNYWtlUGFnZS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBJbml0aWF0ZSBmb3JtIGJ1aWxkLCBjYWxsIGJ1aWxkIHBhZ2Ugd2hpY2ggbG9vcHMgb3ZlciBkYXRhIGFuZCBjcmVhdGVzIGlucHV0IGVsZW1lbnRzLiBDYWxscyBlbGVtZW50IGZhY3RvcnkgZnVuY3Rpb25cblxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiXG5cbmNvbnN0IG1ha2VQYWdlID0ge1xuICBidWlsZEZvcm06IChuYW1lLCB0eXBlLCB0aXRsZSkgPT4ge1xuICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogbmFtZX0sIHRpdGxlKVxuICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IHR5cGUsIG5hbWU6IG5hbWUsIGlkOiBuYW1lLCByZXF1aXJlZDogdHJ1ZX0pXG4gICAgbGV0IGZpZWxkc2V0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbGFiZWwsIGlucHV0KVxuICAgIHJldHVybiBmaWVsZHNldFxuICB9LFxuXG4gIGluaXRpYXRlRm9ybTogKCkgPT4ge1xuICAgIGxldCBkYXRlRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJqb3VybmFsRGF0ZVwiLCBcImRhdGVcIiwgXCJEYXRlIG9mIGVudHJ5XCIpXG4gICAgbGV0IGF1dGhvck5hbWVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImF1dGhvck5hbWVcIiwgXCJ0ZXh0XCIsIFwiQXV0aG9yIE5hbWVcIik7XG4gICAgbGV0IGNvbmNlcHRzQ292ZXJlZEVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiY29uY2VwdHNDb3ZlcmVkXCIsIFwidGV4dFwiLCBcIkNvbmNlcHRzIENvdmVyZWRcIilcbiAgICBsZXQgam91cm5hbEVudHJ5TGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IFwiam91cm5hbEVudHJ5XCJ9LCBcIkpvdXJuYWwgRW50cnlcIilcbiAgICBsZXQgam91cm5hbEVudHJ5VGV4dGFyZWEgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInRleHRhcmVhXCIsIHtuYW1lOiBcImpvdXJuYWxFbnRyeVwiLCBpZDogXCJqb3VybmFsRW50cnlcIiwgY29sczogXCI2MFwiLCByb3dzOiBcIjEwXCJ9KVxuICAgIGxldCBqb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBqb3VybmFsRW50cnlMYWJlbCwgam91cm5hbEVudHJ5VGV4dGFyZWEpXG4gICAgbGV0IGVudHJ5QnV0dG9uID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJidXR0b25cIiwge3R5cGU6IFwic3VibWl0XCIsIGlkOiBcImpvdXJuYWxFbnRyeUJ1dHRvblwifSwgXCJSZWNvcmQgSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBtb29kTGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IFwibW9vZFwiLCBpZDogXCJtb29kTGFiZWxcIn0sIFwiTW9vZCBmb3IgdGhlIERheVwiKVxuICAgIGxldCBtb29kT3B0aW9uSGFwcHkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiaGFwcHlcIn0sIFwiSGFwcHlcIilcbiAgICBsZXQgbW9vZE9wdGlvblNhZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJzYWRcIn0sIFwiU2FkXCIpXG4gICAgbGV0IG1vb2RPcHRpb25GcnVzdHJhdGVkID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZydXN0cmF0ZWRcIn0sIFwiRnJ1c3RyYXRlZFwiKVxuICAgIGxldCBtb29kT3B0aW9uRmluZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJmaW5lXCJ9LCBcIkZpbmVcIilcbiAgICBsZXQgbW9vZFNlbGVjdCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwic2VsZWN0XCIsIHtuYW1lOiBcIm1vb2RcIiwgaWQ6IFwibW9vZFwifSwgbnVsbCwgbW9vZE9wdGlvbkZpbmUsIG1vb2RPcHRpb25GcnVzdHJhdGVkLCBtb29kT3B0aW9uSGFwcHksIG1vb2RPcHRpb25TYWQpXG4gICAgbGV0IG1vb2RFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIG1vb2RMYWJlbCwgbW9vZFNlbGVjdClcbiAgICBsZXQgZm9ybSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZm9ybVwiLCB7fSwgbnVsbCwgZGF0ZUVudHJ5LCBhdXRob3JOYW1lRW50cnksIGNvbmNlcHRzQ292ZXJlZEVudHJ5LCBqb3VybmFsRW50cnksIG1vb2RFbnRyeSwgZW50cnlCdXR0b24pXG4gICAgY29uc29sZS5sb2coZm9ybSlcbiAgICBtYW5hZ2VET00uYXBwZW5kRm9ybShmb3JtKVxuICAgIC8vIG1ha2VQYWdlLmFwcGVuZEZvcm0oZm9ybSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlUGFnZSIsIi8vIFZhbGlkYXRlRGF0YS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiB0YWtlIHByb3ZpZGVkIGRhdGEgYW5kIGNoZWNrIGZvciByZXF1aXJlZCBzZWN0aW9uIGNvbXBsZXRpb24sIGN1cnNlIHdvcmRzLCBhbmQgc3BlY2lhbCBjaGFyYWN0ZXJzXG5cblxuY29uc3QgdmFsaWRhdGVKb3VybmFsRW50cnkgPSB7XG4gIGNsZWFyU3RhdHVzOiBmYWxzZSxcblxuICBub0VtcHR5VmFsdWVzOiAoKT0+e1xuICAgIGxldCBmb3JtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuICAgIGNvbnNvbGUubG9nKGZvcm0pXG4gICAgaWYoZm9ybS5jaGVja1ZhbGlkaXR5KCkgPT09IHRydWUpe1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGUgZm9ybSBpcyB2YWxpZFwiKVxuICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyh2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cylcbiAgICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcInBsZWFzZSBmaWxsIG91dCBhbGwgZmllbGRzXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0sXG5cbiAgb25seUFsbG93ZWRDaGFyYWN0ZXJzOiAoc29tZXRoaW5nKT0+e1xuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICBmb3IoY29uc3QgaW5wdXQgaW4gc29tZXRoaW5nKXtcbiAgICAgIGlmKHNvbWV0aGluZ1tpbnB1dF0ubWF0Y2goLyhbLWEtekEtWjAtOSgpe306O10rKS8pKXtcbiAgICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhlIGlucHV0IGhhcyBiZWVuIGFjY2VwdGVkXCIpXG4gICAgICB9IGVsc2V7XG4gICAgICAgIGFsZXJ0KGBZb3VyICR7aW5wdXR9IHN1Ym1pc3Npb24gY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzLiBQbGVhc2Ugb25seSBpbmNsdWRlIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIG9yICgpe307OiBhbmQgcmVzdWJtaXRgKVxuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXNcbiAgfVxufVxuXG4vLyAgIG1heGltdW1Db25jZXB0RW50cnlMZW5ndGg6ICgpPT57XG4vLyAgICAgLy8gUGljayBhIG1heGltdW0gbGVuZ3RoIGZvciBjb25jZXB0cyBmaWVsZCBhbmQgcHJvdmlkZSB2aXN1YWwgZmVlZGJhY2sgaWYgeW91IHR5cGUgaW4gYSBzdHJpbmcgdGhhdCBpcyBsb25nZXIgdGhhbiB0aGF0IG1heGltdW0uXG4vLyAgIH0sXG5cbi8vICAgbm9DdXJzZVdvcmRzOiAoKT0+e1xuLy8gICAgIC8vIFRlc3QgdGhhdCB0aGUgY29uY2VwdCBhbmQgZW50cnkgZmllbGRzIGNvbnRhaW4gbm8gY3Vyc2Ugd29yZHMuIFlvdSBjYW4gdXNlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIHRoYXQuXG4vLyAgIH1cblxuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeVxuIl19
