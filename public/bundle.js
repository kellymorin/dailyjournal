(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import makePage from "./makePage"
const manageDOM = {
  appendForm: form => {
    let formFragment = document.createDocumentFragment(); // let formDiv = document.querySelector("#flexbox")

    formFragment.appendChild(form);
    $("#flexbox").append(formFragment);
    $("form").validate();
  },
  appendEntry: dailyJournalEntries => {
    const $entryDiv = $("#entryLog");
    $entryDiv.empty().append(dailyJournalEntries);
  },
  appendButtons: fieldset => {
    // let buttonSection = document.querySelector("#filterMoodButtons")
    $("#filterMoodButtons").append(fieldset);
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
    $(".radioButton").click(event => {
      let filteredMood = event.target.value;
      console.log(filteredMood);
      filterEntries.restrictEntries(filteredMood);
    });
  },
  restrictEntries: mood => {
    console.log(mood);
    return _data.default.getEntries().then(entries => entries.filter(entry => entry.mood === mood)).then(taco => {
      if (taco.length > 0) {
        console.log("taco", taco);
        taco.map(item => _DOMmanager.default.appendEntry(_entryComponent.default.makeEntryElements(item)));
      } else {
        alert("There are no entries that match your search, please try again");
      }
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

Replace document.querySelector("selector") with $("selector")
Replace element.innerHTML = htmlString with $().html(htmlString)
Replace any code you have to obtain the value property of an input field with the jQuery .val() method.

*/
if (document.readyState === "loading") {
  _makePage.default.initiateForm();

  _data.default.getEntries().then(data => _entriesDOM.default.buildList(data)).then(taco => _DOMmanager.default.appendEntry(taco));

  _makePage.default.createRadioButtons();

  _filterEntries.default.moodSelector();
}

$("#journalEntryButton").click(event => {
  event.preventDefault();
  console.log("the form has been clicked");

  _validatedata.default.noEmptyValues();

  if (_validatedata.default.clearStatus === true) {
    console.log("The status of check 1 has cleared");
    const newEntry = new _journal.default({
      date: $("#journalDate").val(),
      name: $("#authorName").val(),
      concept: $("#conceptsCovered").val(),
      entry: $("#journalEntry").val(),
      mood: $("#mood").val()
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
    let form = $("form"); // form.validate()

    console.log(form);

    if (form.valid() === true) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllcy5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBO0FBQ0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQixDQURrQixDQUVsQjs7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxDQUFDLENBQUMsVUFBRCxDQUFELENBQWMsTUFBZCxDQUFxQixZQUFyQjtBQUNBLElBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLFFBQVY7QUFDRCxHQVBlO0FBUWhCLEVBQUEsV0FBVyxFQUFHLG1CQUFELElBQXVCO0FBQ2xDLFVBQU0sU0FBUyxHQUFFLENBQUMsQ0FBQyxXQUFELENBQWxCO0FBQ0EsSUFBQSxTQUFTLENBQUMsS0FBVixHQUFrQixNQUFsQixDQUF5QixtQkFBekI7QUFDRCxHQVhlO0FBWWhCLEVBQUEsYUFBYSxFQUFHLFFBQUQsSUFBWTtBQUN6QjtBQUNBLElBQUEsQ0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0IsTUFBeEIsQ0FBK0IsUUFBL0I7QUFDRDtBQWZlLENBQWxCO2VBa0JlLFM7Ozs7Ozs7Ozs7O0FDcEJmOzs7Ozs7Ozs7Ozs7OztBQWVB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O0FBQ0EsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDZCQUFaO0FBQ0QsT0FIRCxNQUdNO0FBQ0osUUFBQSxLQUFLLENBQUUsUUFBTyxLQUFNLDZHQUFmLENBQUw7QUFDQSxRQUFBLG9CQUFvQixDQUFDLFdBQXJCLEdBQW1DLEtBQW5DO0FBQ0E7QUFDRDtBQUNGOztBQUNELFdBQU8sb0JBQW9CLENBQUMsV0FBNUI7QUFDRCxHQS9CMEIsQ0FrQzdCO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQTFDNkIsQ0FBN0I7ZUE0Q2Usb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbi8vIGltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5jb25zdCBtYW5hZ2VET00gPSB7XG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgLy8gbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZsZXhib3hcIilcbiAgICBmb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybSlcbiAgICAkKFwiI2ZsZXhib3hcIikuYXBwZW5kKGZvcm1GcmFnbWVudClcbiAgICAkKFwiZm9ybVwiKS52YWxpZGF0ZSgpXG4gIH0sXG4gIGFwcGVuZEVudHJ5OiAoZGFpbHlKb3VybmFsRW50cmllcyk9PntcbiAgICBjb25zdCAkZW50cnlEaXYgPSQoXCIjZW50cnlMb2dcIilcbiAgICAkZW50cnlEaXYuZW1wdHkoKS5hcHBlbmQoZGFpbHlKb3VybmFsRW50cmllcylcbiAgfSxcbiAgYXBwZW5kQnV0dG9uczogKGZpZWxkc2V0KT0+e1xuICAgIC8vIGxldCBidXR0b25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWx0ZXJNb29kQnV0dG9uc1wiKVxuICAgICQoXCIjZmlsdGVyTW9vZEJ1dHRvbnNcIikuYXBwZW5kKGZpZWxkc2V0KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmFnZURPTSIsIi8qXG5cbmRhdGEuanMgLSBNb3ZlIHRoZSBjb2RlIHRoYXQgZGVhbHMgd2l0aCBnZXR0aW5nIHRoZSBkYXRhIGludG8gdGhpcyBmaWxlLlxuXG5EYXRhLmpzOiBHZXQgYW5kIHBvc3QgcmVxdWVzdHMsIG9ubHkgaW50ZXJhY3RzIHdpdGggdGhlIEFQSS8gRGF0YWJhc2UsIHNob3VsZCBub3QgYmUgdXNlZCB0byBjYWxsIGFueSBvdGhlciBmdW5jdGlvbnNcblxuXG5EQUlMWSBKT1VSTkFMIDVcbkltcGxlbWVudCB0aGUgbWV0aG9kIHVzaW5nIGZldGNoIHRvIHBlcmZvcm0gYSBQT1NUIHJlcXVlc3QuXG5JbiBtYWluIG1vZHVsZSwgaW52b2tlIG1ldGhvZCB0byBzYXZlIGVudHJ5LCB0aGVuIGFkZCBpdGVtIHRvIGxvY2FsIGFycmF5LlxuVXBkYXRlIERPTSB3aXRoIHVwZGF0ZWQgYXJyYXkgdmFsdWVzLlxuXG5Xcml0ZSBhIG1ldGhvZCBpbiB5b3VyIEFQSSBtb2R1bGUgdGhhdCBwZXJmb3JtcyBhIFBPU1QgYW5kIGEgR0VULCB0aGVuIHVzZSB0aGF0IG1ldGhvZCBpbiB0aGUgZXZlbnQgbGlzdGVuZXIuXG4qL1xuXG5jb25zdCBqb3VybmFsRW50cmllcyA9IHtcbiAgZ2V0RW50cmllczogKCk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKVxuICAgIC50aGVuKChlbnRyaWVzKSA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSm91cm5hbEVudHJ5OiAoam91cm5hbEVudHJ5KT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoam91cm5hbEVudHJ5KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbEVudHJpZXMiLCIvLyBFbGVtZW50RmFjdG9yeS5qczogTG9vcCBvdmVyIHByb3ZpZGVkIGluZm9ybWF0aW9uIGFuZCBjcmVhdGUgSFRNTCBlbGVtZW50IHRoYXQgY2FuIGJlIGRpc3BsYXllZCBpbiB0aGUgRE9NXG5cbmNvbnN0IG1ha2VFbGVtZW50ID0ge1xuICBlbGVtZW50RmFjdG9yeTogKGVsLCBhdHRyaWJ1dGVzT2JqLCBjb250ZW50LCAuLi5jaGlsZHJlbik9PntcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwpXG4gICAgLy8gU2V0IEF0dHJpYnV0ZXNcbiAgICBmb3IgKGxldCBhdHRyIGluIGF0dHJpYnV0ZXNPYmope1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc09ialthdHRyXSlcbiAgICB9XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQgfHwgbnVsbFxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9KVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgbWFrZUVsZW1lbnQiLCJpbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcblxuLypcbmVudHJpZXNET00uanMgLSBNb3ZlIHRoZSBjb2RlIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIG1vZGlmeWluZyB0aGUgRE9NIGludG8gdGhpcyBmaWxlLlxuKi9cblxuLy8gLy8gSW5zZXJ0IHRoZSBmcmFnbWVudCBpbnRvIHRoZSBET00gYXMgY2hpbGRyZW4gb2YgdGhlIEVudHJ5IExvZyBzZWN0aW9uIGluIGluZGV4Lmh0bWxcblxuXG5jb25zdCBlbnRyaWVzTGlzdCA9IHtcbiAgYnVpbGRMaXN0OiAoKT0+e1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKClcbiAgICAudGhlbigoZW50cmllcyk9PiBlbnRyaWVzLm1hcChlbnRyeSA9PiBidWlsZEVudHJ5Lm1ha2VFbnRyeUVsZW1lbnRzKGVudHJ5KSkpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGVudHJpZXNMaXN0XG4iLCIvKlxuRW50cnlDb21wb25lbnQ6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogTG9vcCBvdmVyIHByb3ZpZGVkIGRhdGEgYW5kIHByb2R1Y2UgSFRNTCB0byBiZSBkaXNwbGF5ZWQgdG8gdGhlIERPTSxcbiovXG5cbmltcG9ydCBtYWtlRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50RmFjdG9yeVwiXG5cblxuY29uc3QgYnVpbGRFbnRyeSA9IHtcbiAgY29tcG9uZW50QXJyYXk6IFtdLFxuXG4gIG1ha2VFbnRyeUVsZW1lbnRzOiAoam91cm5hbEVudHJ5T2JqKT0+e1xuICAgIGxldCBjb25jZXB0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJoM1wiLCB7Y2xhc3M6IFwiam91cm5hbENvbmNlcHRcIn0sIGpvdXJuYWxFbnRyeU9iai5jb25jZXB0KVxuICAgIGxldCBkYXRlID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsRGF0ZVwifSwgam91cm5hbEVudHJ5T2JqLmRhdGUpXG4gICAgbGV0IGF1dGhvciA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbEF1dGhvclwifSwgam91cm5hbEVudHJ5T2JqLm5hbWUpXG4gICAgbGV0IG1vb2QgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxNb29kXCJ9LCBqb3VybmFsRW50cnlPYmoubW9vZClcbiAgICBsZXQgZW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxFbnRyeVwifSwgam91cm5hbEVudHJ5T2JqLmVudHJ5KVxuICAgIGxldCBzaW5nbGVKb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlY3Rpb25cIiwge2NsYXNzOiBcInNpbmdsZUpvdXJuYWxFbnRyeVwifSwgbnVsbCwgY29uY2VwdCwgZGF0ZSwgYXV0aG9yLCBtb29kLCBlbnRyeSlcbiAgICByZXR1cm4gc2luZ2xlSm91cm5hbEVudHJ5XG4gICAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRW50cnlcbiIsImltcG9ydCBidWlsZEVudHJ5IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiXG5pbXBvcnQgZW50cmllc0xpc3QgZnJvbSBcIi4vZW50cmllc0RPTVwiO1xuaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCI7XG5cbmNvbnN0IGZpbHRlckVudHJpZXMgPSB7XG4gIG1vb2RTZWxlY3RvcjogKCkgPT57XG4gICAgJChcIi5yYWRpb0J1dHRvblwiKS5jbGljaygoZXZlbnQpPT57XG4gICAgICBsZXQgZmlsdGVyZWRNb29kID0gZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICBjb25zb2xlLmxvZyhmaWx0ZXJlZE1vb2QpXG4gICAgICBmaWx0ZXJFbnRyaWVzLnJlc3RyaWN0RW50cmllcyhmaWx0ZXJlZE1vb2QpXG4gICAgfSlcbiAgfSxcblxuICByZXN0cmljdEVudHJpZXM6IChtb29kKT0+e1xuICAgIGNvbnNvbGUubG9nKG1vb2QpXG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+ZW50cmllcy5maWx0ZXIoKGVudHJ5KT0+IGVudHJ5Lm1vb2QgPT09IG1vb2QpXG4gICAgKS50aGVuKHRhY28gPT4ge1xuICAgICAgaWYgKHRhY28ubGVuZ3RoID4gMCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFjb1wiLCB0YWNvKVxuICAgICAgICB0YWNvLm1hcChpdGVtID0+IG1hbmFnZURPTS5hcHBlbmRFbnRyeShidWlsZEVudHJ5Lm1ha2VFbnRyeUVsZW1lbnRzKGl0ZW0pKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgYXJlIG5vIGVudHJpZXMgdGhhdCBtYXRjaCB5b3VyIHNlYXJjaCwgcGxlYXNlIHRyeSBhZ2FpblwiKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZpbHRlckVudHJpZXNcblxuIiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuXG5cblxuICAgICAgICAgICAgY29uc3QgY29udGFjdCA9IHtcblxuICAgICAgICAgICAgICBjcmVhdGVDb250YWN0Q2FyZDogKGNvbnRhY3RJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3QubWFrZUNvbnRhY3QoY29udGFjdEluZm8pKTtcbiAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChmcmFnbWVudClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuKi9cbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCJcblxuY2xhc3MgSm91cm5hbEVudHJ5IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHRoaXMuZGF0ZSA9IHByb3BzLmRhdGVcbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lXG4gICAgdGhpcy5jb25jZXB0ID0gcHJvcHMuY29uY2VwdFxuICAgIHRoaXMuZW50cnkgPSBwcm9wcy5lbnRyeVxuICAgIHRoaXMubW9vZCA9IHByb3BzLm1vb2RcbiAgfVxuICBzaW5nbGVKb3VybmFsRW50cnkoKXtcbiAgICByZXR1cm4ge2RhdGU6IHRoaXMuZGF0ZSwgbmFtZTogdGhpcy5uYW1lLCBjb25jZXB0OiB0aGlzLmNvbmNlcHQsIGVudHJ5OiB0aGlzLmVudHJ5LCBtb29kOiB0aGlzLm1vb2R9XG4gIH1cbiAgc2F2ZSgpe1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5zYXZlSm91cm5hbEVudHJ5KHRoaXMuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSm91cm5hbEVudHJ5IiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuSW4geW91ciBtYWluIEphdmFTY3JpcHQgbW9kdWxlIChqb3VybmFsLmpzKSBhZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgUmVjb3JkIEpvdXJuYWwgRW50cnkgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgeW91ciBmb3JtLiBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCB5b3UgbmVlZCB0byBjcmVhdGUgYSBuZXcgZW50cnkgaW4geW91ciBBUEkuIFRoZSBIVFRQIG1ldGhvZCB0aGF0IHlvdSB1c2UgdG8gY3JlYXRlIHJlc291cmNlcyBpcyBQT1NULiBHdWlkYW5jZSBvbiBzeW50YXggaXMgcHJvdmlkZWQgYmVsb3cuXG5cblJlcGxhY2UgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlbGVjdG9yXCIpIHdpdGggJChcInNlbGVjdG9yXCIpXG5SZXBsYWNlIGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbFN0cmluZyB3aXRoICQoKS5odG1sKGh0bWxTdHJpbmcpXG5SZXBsYWNlIGFueSBjb2RlIHlvdSBoYXZlIHRvIG9idGFpbiB0aGUgdmFsdWUgcHJvcGVydHkgb2YgYW4gaW5wdXQgZmllbGQgd2l0aCB0aGUgalF1ZXJ5IC52YWwoKSBtZXRob2QuXG5cbiovXG5cbmltcG9ydCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSBmcm9tIFwiLi92YWxpZGF0ZWRhdGFcIlxuaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL21ha2VQYWdlXCJcbmltcG9ydCBKb3VybmFsRW50cnkgZnJvbSBcIi4vam91cm5hbFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiO1xuaW1wb3J0IGVudHJpZXNMaXN0IGZyb20gXCIuL2VudHJpZXNET01cIjtcbmltcG9ydCBmaWx0ZXJFbnRyaWVzIGZyb20gXCIuL2ZpbHRlckVudHJpZXNcIjtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKXtcbiAgbWFrZVBhZ2UuaW5pdGlhdGVGb3JtKCk7XG4gIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKS50aGVuKChkYXRhKT0+IGVudHJpZXNMaXN0LmJ1aWxkTGlzdChkYXRhKSkudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gIG1ha2VQYWdlLmNyZWF0ZVJhZGlvQnV0dG9ucygpXG4gIGZpbHRlckVudHJpZXMubW9vZFNlbGVjdG9yKCk7XG59XG5cblxuJChcIiNqb3VybmFsRW50cnlCdXR0b25cIikuY2xpY2soKGV2ZW50KT0+e1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnNvbGUubG9nKFwidGhlIGZvcm0gaGFzIGJlZW4gY2xpY2tlZFwiKVxuXG4gIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm5vRW1wdHlWYWx1ZXMoKVxuICBpZih2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9PT0gdHJ1ZSl7XG4gICAgY29uc29sZS5sb2coXCJUaGUgc3RhdHVzIG9mIGNoZWNrIDEgaGFzIGNsZWFyZWRcIilcbiAgICBjb25zdCBuZXdFbnRyeSA9IG5ldyBKb3VybmFsRW50cnkoe1xuICAgICAgZGF0ZTogJChcIiNqb3VybmFsRGF0ZVwiKS52YWwoKSxcbiAgICAgIG5hbWU6ICQoXCIjYXV0aG9yTmFtZVwiKS52YWwoKSxcbiAgICAgIGNvbmNlcHQ6ICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbCgpLFxuICAgICAgZW50cnk6ICQoXCIjam91cm5hbEVudHJ5XCIpLnZhbCgpLFxuICAgICAgbW9vZDogJChcIiNtb29kXCIpLnZhbCgpLFxuICAgIH0pXG4gICAgdmFsaWRhdGVKb3VybmFsRW50cnkub25seUFsbG93ZWRDaGFyYWN0ZXJzKG5ld0VudHJ5LnNpbmdsZUpvdXJuYWxFbnRyeSgpKVxuICAgIGlmKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID09PSB0cnVlKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHN0YXR1cyBvZiBjaGVjayAyIGhhcyBjbGVhcmVkXCIpXG4gICAgICBuZXdFbnRyeS5zYXZlKClcbiAgICAgIC50aGVuKChkYXRhKT0+IGVudHJpZXNMaXN0LmJ1aWxkTGlzdChkYXRhKSlcbiAgICAgIC50aGVuKCh0YWNvKT0+IG1hbmFnZURPTS5hcHBlbmRFbnRyeSh0YWNvKSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJZb3VyIHN1Ym1pc3Npb24gaGFzIGJlZW4gdGVybWluYXRlZCwgcGxlYXNlIHRyeSBhZ2FpblwiKVxuICAgIH1cbiAgfVxufSlcblxuIiwiLy8gTWFrZVBhZ2UuanM6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogSW5pdGlhdGUgZm9ybSBidWlsZCwgY2FsbCBidWlsZCBwYWdlIHdoaWNoIGxvb3BzIG92ZXIgZGF0YSBhbmQgY3JlYXRlcyBpbnB1dCBlbGVtZW50cy4gQ2FsbHMgZWxlbWVudCBmYWN0b3J5IGZ1bmN0aW9uXG5cbmltcG9ydCBtYWtlRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50RmFjdG9yeVwiXG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIlxuXG5jb25zdCBtYWtlUGFnZSA9IHtcbiAgYnVpbGRGb3JtOiAobmFtZSwgdHlwZSwgdGl0bGUpID0+IHtcbiAgICBsZXQgbGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IG5hbWV9LCB0aXRsZSlcbiAgICBsZXQgaW5wdXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImlucHV0XCIsIHt0eXBlOiB0eXBlLCBuYW1lOiBuYW1lLCBpZDogbmFtZSwgcmVxdWlyZWQ6IHRydWV9KVxuICAgIGxldCBmaWVsZHNldCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGxhYmVsLCBpbnB1dClcbiAgICByZXR1cm4gZmllbGRzZXRcbiAgfSxcblxuICBpbml0aWF0ZUZvcm06ICgpID0+IHtcbiAgICBsZXQgZGF0ZUVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiam91cm5hbERhdGVcIiwgXCJkYXRlXCIsIFwiRGF0ZSBvZiBlbnRyeVwiKVxuICAgIGxldCBhdXRob3JOYW1lRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJhdXRob3JOYW1lXCIsIFwidGV4dFwiLCBcIkF1dGhvciBOYW1lXCIpO1xuICAgIGxldCBjb25jZXB0c0NvdmVyZWRFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImNvbmNlcHRzQ292ZXJlZFwiLCBcInRleHRcIiwgXCJDb25jZXB0cyBDb3ZlcmVkXCIpXG4gICAgbGV0IGpvdXJuYWxFbnRyeUxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBcImpvdXJuYWxFbnRyeVwifSwgXCJKb3VybmFsIEVudHJ5XCIpXG4gICAgbGV0IGpvdXJuYWxFbnRyeVRleHRhcmVhID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJ0ZXh0YXJlYVwiLCB7bmFtZTogXCJqb3VybmFsRW50cnlcIiwgaWQ6IFwiam91cm5hbEVudHJ5XCIsIGNvbHM6IFwiNjBcIiwgcm93czogXCIxMFwifSlcbiAgICBsZXQgam91cm5hbEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgam91cm5hbEVudHJ5TGFiZWwsIGpvdXJuYWxFbnRyeVRleHRhcmVhKVxuICAgIGxldCBlbnRyeUJ1dHRvbiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiYnV0dG9uXCIsIHt0eXBlOiBcInN1Ym1pdFwiLCBpZDogXCJqb3VybmFsRW50cnlCdXR0b25cIn0sIFwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIilcbiAgICBsZXQgbW9vZExhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBcIm1vb2RcIiwgaWQ6IFwibW9vZExhYmVsXCJ9LCBcIk1vb2QgZm9yIHRoZSBEYXlcIilcbiAgICBsZXQgbW9vZE9wdGlvbkhhcHB5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImhhcHB5XCJ9LCBcIkhhcHB5XCIpXG4gICAgbGV0IG1vb2RPcHRpb25TYWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwic2FkXCJ9LCBcIlNhZFwiKVxuICAgIGxldCBtb29kT3B0aW9uRnJ1c3RyYXRlZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJmcnVzdHJhdGVkXCJ9LCBcIkZydXN0cmF0ZWRcIilcbiAgICBsZXQgbW9vZE9wdGlvbkZpbmUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZmluZVwifSwgXCJGaW5lXCIpXG4gICAgbGV0IG1vb2RTZWxlY3QgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlbGVjdFwiLCB7bmFtZTogXCJtb29kXCIsIGlkOiBcIm1vb2RcIn0sIG51bGwsIG1vb2RPcHRpb25GaW5lLCBtb29kT3B0aW9uRnJ1c3RyYXRlZCwgbW9vZE9wdGlvbkhhcHB5LCBtb29kT3B0aW9uU2FkKVxuICAgIGxldCBtb29kRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBtb29kTGFiZWwsIG1vb2RTZWxlY3QpXG4gICAgbGV0IGZvcm0gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZvcm1cIiwge30sIG51bGwsIGRhdGVFbnRyeSwgYXV0aG9yTmFtZUVudHJ5LCBjb25jZXB0c0NvdmVyZWRFbnRyeSwgam91cm5hbEVudHJ5LCBtb29kRW50cnksIGVudHJ5QnV0dG9uKVxuICAgIG1hbmFnZURPTS5hcHBlbmRGb3JtKGZvcm0pXG4gIH0sXG4gIGNyZWF0ZVJhZGlvQnV0dG9uczogKCk9PntcbiAgICBsZXQgbW9vZHMgPSBbXCJzYWRcIiwgXCJoYXBweVwiLCBcImZpbmVcIiwgXCJmcnVzdHJhdGVkXCJdXG4gICAgbGV0IGZpZWxkc2V0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbClcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbW9vZHMubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogXCJyYWRpb1wiLCBuYW1lOiBcIm1vb2RcIiwgdmFsdWU6IG1vb2RzW2ldLCBjbGFzczogXCJyYWRpb0J1dHRvblwiLCBpZDogYGZpbHRlci0ke21vb2RzW2ldfWB9KVxuICAgICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBgZmlsdGVyLSR7bW9vZHNbaV19YH0sIG1vb2RzW2ldKVxuICAgICAgbGV0IHdyYXBwZXJEaXYgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImRpdlwiLCB7fSwgbnVsbCwgaW5wdXQsIGxhYmVsKVxuICAgICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQod3JhcHBlckRpdilcbiAgICB9XG4gICAgbWFuYWdlRE9NLmFwcGVuZEJ1dHRvbnMoZmllbGRzZXQpXG4gICAgLy8gcmV0dXJuIGZpZWxkc2V0XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZVBhZ2UiLCIvLyBWYWxpZGF0ZURhdGEuanM6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogdGFrZSBwcm92aWRlZCBkYXRhIGFuZCBjaGVjayBmb3IgcmVxdWlyZWQgc2VjdGlvbiBjb21wbGV0aW9uLCBjdXJzZSB3b3JkcywgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1xuXG5cbmNvbnN0IHZhbGlkYXRlSm91cm5hbEVudHJ5ID0ge1xuICBjbGVhclN0YXR1czogZmFsc2UsXG5cbiAgbm9FbXB0eVZhbHVlczogKCk9PntcbiAgICBsZXQgZm9ybT0gJChcImZvcm1cIilcbiAgICAvLyBmb3JtLnZhbGlkYXRlKClcbiAgICBjb25zb2xlLmxvZyhmb3JtKVxuICAgIGlmKGZvcm0udmFsaWQoKSA9PT0gdHJ1ZSl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGlzIHZhbGlkXCIpXG4gICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzKVxuICAgICAgcmV0dXJuIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwicGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHNcIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSxcblxuICBvbmx5QWxsb3dlZENoYXJhY3RlcnM6IChzb21ldGhpbmcpPT57XG4gICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSBmYWxzZVxuICAgIGZvcihjb25zdCBpbnB1dCBpbiBzb21ldGhpbmcpe1xuICAgICAgaWYoc29tZXRoaW5nW2lucHV0XS5tYXRjaCgvKFstYS16QS1aMC05KCl7fTo7XSspLykpe1xuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgaW5wdXQgaGFzIGJlZW4gYWNjZXB0ZWRcIilcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgYWxlcnQoYFlvdXIgJHtpbnB1dH0gc3VibWlzc2lvbiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMuIFBsZWFzZSBvbmx5IGluY2x1ZGUgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgb3IgKCl7fTs6IGFuZCByZXN1Ym1pdGApXG4gICAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICB9XG59XG5cbi8vICAgbWF4aW11bUNvbmNlcHRFbnRyeUxlbmd0aDogKCk9Pntcbi8vICAgICAvLyBQaWNrIGEgbWF4aW11bSBsZW5ndGggZm9yIGNvbmNlcHRzIGZpZWxkIGFuZCBwcm92aWRlIHZpc3VhbCBmZWVkYmFjayBpZiB5b3UgdHlwZSBpbiBhIHN0cmluZyB0aGF0IGlzIGxvbmdlciB0aGFuIHRoYXQgbWF4aW11bS5cbi8vICAgfSxcblxuLy8gICBub0N1cnNlV29yZHM6ICgpPT57XG4vLyAgICAgLy8gVGVzdCB0aGF0IHRoZSBjb25jZXB0IGFuZCBlbnRyeSBmaWVsZHMgY29udGFpbiBubyBjdXJzZSB3b3Jkcy4gWW91IGNhbiB1c2UgcmVndWxhciBleHByZXNzaW9ucyBmb3IgdGhhdC5cbi8vICAgfVxuXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlSm91cm5hbEVudHJ5XG4iXX0=
