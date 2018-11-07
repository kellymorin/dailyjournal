(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import validateJournalEntry from "./validatedata";
// import makePage from "./makePage"
const manageDOM = {
  appendForm: form => {
    let formFragment = document.createDocumentFragment(); // let formDiv = document.querySelector("#flexbox")

    formFragment.appendChild(form);
    $("#flexbox").append(formFragment); // validateJournalEntry.validateForm()
    // $("form").validate()
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
  // componentArray: [],
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

var _DOMmanager = _interopRequireDefault(require("./DOMmanager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import entriesList from "./entriesDOM";
const filterEntries = {
  moodSelector: () => {
    $(".radioButton").click(event => {
      let filteredMood = $("input:checked").val();
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

},{"./DOMmanager":1,"./data":2,"./entryComponent":5}],7:[function(require,module,exports){
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

$("#journalEntryButton").click(event => {
  event.preventDefault();
  console.log("the form has been clicked"); // validateJournalEntry.noEmptyValues()

  _validatedata.default.validateForm();

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
  validateForm: () => {
    let form = $("form");
    console.log(form);

    if ($("form > :input[required]:visible").val() !== "") {
      validateJournalEntry.clearStatus = true;
      console.log(validateJournalEntry.clearStatus);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllcy5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBRUE7QUFDQSxNQUFNLFNBQVMsR0FBRztBQUNoQixFQUFBLFVBQVUsRUFBRyxJQUFELElBQVE7QUFDbEIsUUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLHNCQUFULEVBQW5CLENBRGtCLENBRWxCOztBQUNBLElBQUEsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsSUFBekI7QUFDQSxJQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxNQUFkLENBQXFCLFlBQXJCLEVBSmtCLENBS2xCO0FBQ0E7QUFDRCxHQVJlO0FBU2hCLEVBQUEsV0FBVyxFQUFHLG1CQUFELElBQXVCO0FBQ2xDLFVBQU0sU0FBUyxHQUFFLENBQUMsQ0FBQyxXQUFELENBQWxCO0FBQ0EsSUFBQSxTQUFTLENBQUMsS0FBVixHQUFrQixNQUFsQixDQUF5QixtQkFBekI7QUFDRCxHQVplO0FBYWhCLEVBQUEsYUFBYSxFQUFHLFFBQUQsSUFBWTtBQUN6QjtBQUNBLElBQUEsQ0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0IsTUFBeEIsQ0FBK0IsUUFBL0I7QUFDRDtBQWhCZSxDQUFsQjtlQW1CZSxTOzs7Ozs7Ozs7OztBQ3RCZjs7Ozs7Ozs7Ozs7Ozs7QUFlQSxNQUFNLGNBQWMsR0FBRztB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QUdNO0FBQ0osUUFBQSxLQUFLLENBQUUsUUFBTyxLQUFNLDZHQUFmLENBQUw7QUFDQSxRQUFBLG9CQUFvQixDQUFDLFdBQXJCLEdBQW1DLEtBQW5DO0FBQ0E7QUFDRDtBQUNGOztBQUNELFdBQU8sb0JBQW9CLENBQUMsV0FBNUI7QUFDRCxHQTNCMEIsQ0E4QjdCO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQXRDNkIsQ0FBN0I7ZUF3Q2Usb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBpbXBvcnQgdmFsaWRhdGVKb3VybmFsRW50cnkgZnJvbSBcIi4vdmFsaWRhdGVkYXRhXCI7XG5cbi8vIGltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5jb25zdCBtYW5hZ2VET00gPSB7XG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgLy8gbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZsZXhib3hcIilcbiAgICBmb3JtRnJhZ21lbnQuYXBwZW5kQ2hpbGQoZm9ybSlcbiAgICAkKFwiI2ZsZXhib3hcIikuYXBwZW5kKGZvcm1GcmFnbWVudClcbiAgICAvLyB2YWxpZGF0ZUpvdXJuYWxFbnRyeS52YWxpZGF0ZUZvcm0oKVxuICAgIC8vICQoXCJmb3JtXCIpLnZhbGlkYXRlKClcbiAgfSxcbiAgYXBwZW5kRW50cnk6IChkYWlseUpvdXJuYWxFbnRyaWVzKT0+e1xuICAgIGNvbnN0ICRlbnRyeURpdiA9JChcIiNlbnRyeUxvZ1wiKVxuICAgICRlbnRyeURpdi5lbXB0eSgpLmFwcGVuZChkYWlseUpvdXJuYWxFbnRyaWVzKVxuICB9LFxuICBhcHBlbmRCdXR0b25zOiAoZmllbGRzZXQpPT57XG4gICAgLy8gbGV0IGJ1dHRvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpbHRlck1vb2RCdXR0b25zXCIpXG4gICAgJChcIiNmaWx0ZXJNb29kQnV0dG9uc1wiKS5hcHBlbmQoZmllbGRzZXQpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFuYWdlRE9NIiwiLypcblxuZGF0YS5qcyAtIE1vdmUgdGhlIGNvZGUgdGhhdCBkZWFscyB3aXRoIGdldHRpbmcgdGhlIGRhdGEgaW50byB0aGlzIGZpbGUuXG5cbkRhdGEuanM6IEdldCBhbmQgcG9zdCByZXF1ZXN0cywgb25seSBpbnRlcmFjdHMgd2l0aCB0aGUgQVBJLyBEYXRhYmFzZSwgc2hvdWxkIG5vdCBiZSB1c2VkIHRvIGNhbGwgYW55IG90aGVyIGZ1bmN0aW9uc1xuXG5cbkRBSUxZIEpPVVJOQUwgNVxuSW1wbGVtZW50IHRoZSBtZXRob2QgdXNpbmcgZmV0Y2ggdG8gcGVyZm9ybSBhIFBPU1QgcmVxdWVzdC5cbkluIG1haW4gbW9kdWxlLCBpbnZva2UgbWV0aG9kIHRvIHNhdmUgZW50cnksIHRoZW4gYWRkIGl0ZW0gdG8gbG9jYWwgYXJyYXkuXG5VcGRhdGUgRE9NIHdpdGggdXBkYXRlZCBhcnJheSB2YWx1ZXMuXG5cbldyaXRlIGEgbWV0aG9kIGluIHlvdXIgQVBJIG1vZHVsZSB0aGF0IHBlcmZvcm1zIGEgUE9TVCBhbmQgYSBHRVQsIHRoZW4gdXNlIHRoYXQgbWV0aG9kIGluIHRoZSBldmVudCBsaXN0ZW5lci5cbiovXG5cbmNvbnN0IGpvdXJuYWxFbnRyaWVzID0ge1xuICBnZXRFbnRyaWVzOiAoKT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXG4gICAgLnRoZW4oKGVudHJpZXMpID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVKb3VybmFsRW50cnk6IChqb3VybmFsRW50cnkpPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShqb3VybmFsRW50cnkpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRW50cmllcyIsIi8vIEVsZW1lbnRGYWN0b3J5LmpzOiBMb29wIG92ZXIgcHJvdmlkZWQgaW5mb3JtYXRpb24gYW5kIGNyZWF0ZSBIVE1MIGVsZW1lbnQgdGhhdCBjYW4gYmUgZGlzcGxheWVkIGluIHRoZSBET01cblxuY29uc3QgbWFrZUVsZW1lbnQgPSB7XG4gIGVsZW1lbnRGYWN0b3J5OiAoZWwsIGF0dHJpYnV0ZXNPYmosIGNvbnRlbnQsIC4uLmNoaWxkcmVuKT0+e1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcbiAgICAvLyBTZXQgQXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlc09iail7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzT2JqW2F0dHJdKVxuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudCB8fCBudWxsXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBtYWtlRWxlbWVudCIsImltcG9ydCBidWlsZEVudHJ5IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiO1xuXG4vKlxuZW50cmllc0RPTS5qcyAtIE1vdmUgdGhlIGNvZGUgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgbW9kaWZ5aW5nIHRoZSBET00gaW50byB0aGlzIGZpbGUuXG4qL1xuXG4vLyAvLyBJbnNlcnQgdGhlIGZyYWdtZW50IGludG8gdGhlIERPTSBhcyBjaGlsZHJlbiBvZiB0aGUgRW50cnkgTG9nIHNlY3Rpb24gaW4gaW5kZXguaHRtbFxuXG5cbmNvbnN0IGVudHJpZXNMaXN0ID0ge1xuICBidWlsZExpc3Q6ICgpPT57XG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+IGVudHJpZXMubWFwKGVudHJ5ID0+IGJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoZW50cnkpKSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZW50cmllc0xpc3RcbiIsIi8qXG5FbnRyeUNvbXBvbmVudDogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBMb29wIG92ZXIgcHJvdmlkZWQgZGF0YSBhbmQgcHJvZHVjZSBIVE1MIHRvIGJlIGRpc3BsYXllZCB0byB0aGUgRE9NLFxuKi9cblxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcblxuXG5jb25zdCBidWlsZEVudHJ5ID0ge1xuICAvLyBjb21wb25lbnRBcnJheTogW10sXG5cbiAgbWFrZUVudHJ5RWxlbWVudHM6IChqb3VybmFsRW50cnlPYmopPT57XG4gICAgbGV0IGNvbmNlcHQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImgzXCIsIHtjbGFzczogXCJqb3VybmFsQ29uY2VwdFwifSwgam91cm5hbEVudHJ5T2JqLmNvbmNlcHQpXG4gICAgbGV0IGRhdGUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxEYXRlXCJ9LCBqb3VybmFsRW50cnlPYmouZGF0ZSlcbiAgICBsZXQgYXV0aG9yID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsQXV0aG9yXCJ9LCBqb3VybmFsRW50cnlPYmoubmFtZSlcbiAgICBsZXQgbW9vZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbE1vb2RcIn0sIGpvdXJuYWxFbnRyeU9iai5tb29kKVxuICAgIGxldCBlbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbEVudHJ5XCJ9LCBqb3VybmFsRW50cnlPYmouZW50cnkpXG4gICAgbGV0IHNpbmdsZUpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwic2VjdGlvblwiLCB7Y2xhc3M6IFwic2luZ2xlSm91cm5hbEVudHJ5XCJ9LCBudWxsLCBjb25jZXB0LCBkYXRlLCBhdXRob3IsIG1vb2QsIGVudHJ5KVxuICAgIHJldHVybiBzaW5nbGVKb3VybmFsRW50cnlcbiAgICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFbnRyeVxuIiwiaW1wb3J0IGJ1aWxkRW50cnkgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCJcbi8vIGltcG9ydCBlbnRyaWVzTGlzdCBmcm9tIFwiLi9lbnRyaWVzRE9NXCI7XG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcblxuY29uc3QgZmlsdGVyRW50cmllcyA9IHtcbiAgbW9vZFNlbGVjdG9yOiAoKSA9PntcbiAgICAkKFwiLnJhZGlvQnV0dG9uXCIpLmNsaWNrKChldmVudCk9PntcbiAgICAgIGxldCBmaWx0ZXJlZE1vb2QgPSAoJChcImlucHV0OmNoZWNrZWRcIikudmFsKCkpXG4gICAgICBjb25zb2xlLmxvZyhmaWx0ZXJlZE1vb2QpXG4gICAgICBmaWx0ZXJFbnRyaWVzLnJlc3RyaWN0RW50cmllcyhmaWx0ZXJlZE1vb2QpXG4gICAgfSlcbiAgfSxcblxuICByZXN0cmljdEVudHJpZXM6IChtb29kKT0+e1xuICAgIGNvbnNvbGUubG9nKG1vb2QpXG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+ZW50cmllcy5maWx0ZXIoKGVudHJ5KT0+IGVudHJ5Lm1vb2QgPT09IG1vb2QpXG4gICAgKS50aGVuKHRhY28gPT4ge1xuICAgICAgaWYgKHRhY28ubGVuZ3RoID4gMCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFjb1wiLCB0YWNvKVxuICAgICAgICB0YWNvLm1hcChpdGVtID0+IG1hbmFnZURPTS5hcHBlbmRFbnRyeShidWlsZEVudHJ5Lm1ha2VFbnRyeUVsZW1lbnRzKGl0ZW0pKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgYXJlIG5vIGVudHJpZXMgdGhhdCBtYXRjaCB5b3VyIHNlYXJjaCwgcGxlYXNlIHRyeSBhZ2FpblwiKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZpbHRlckVudHJpZXNcblxuIiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuXG5cblxuICAgICAgICAgICAgY29uc3QgY29udGFjdCA9IHtcblxuICAgICAgICAgICAgICBjcmVhdGVDb250YWN0Q2FyZDogKGNvbnRhY3RJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3QubWFrZUNvbnRhY3QoY29udGFjdEluZm8pKTtcbiAgICAgICAgICAgICAgICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChmcmFnbWVudClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuKi9cbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCJcblxuY2xhc3MgSm91cm5hbEVudHJ5IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHRoaXMuZGF0ZSA9IHByb3BzLmRhdGVcbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lXG4gICAgdGhpcy5jb25jZXB0ID0gcHJvcHMuY29uY2VwdFxuICAgIHRoaXMuZW50cnkgPSBwcm9wcy5lbnRyeVxuICAgIHRoaXMubW9vZCA9IHByb3BzLm1vb2RcbiAgfVxuICBzaW5nbGVKb3VybmFsRW50cnkoKXtcbiAgICByZXR1cm4ge2RhdGU6IHRoaXMuZGF0ZSwgbmFtZTogdGhpcy5uYW1lLCBjb25jZXB0OiB0aGlzLmNvbmNlcHQsIGVudHJ5OiB0aGlzLmVudHJ5LCBtb29kOiB0aGlzLm1vb2R9XG4gIH1cbiAgc2F2ZSgpe1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5zYXZlSm91cm5hbEVudHJ5KHRoaXMuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSm91cm5hbEVudHJ5IiwiLypcbkRBSUxZIEpPVVJOQUwgNVxuSW4geW91ciBtYWluIEphdmFTY3JpcHQgbW9kdWxlIChqb3VybmFsLmpzKSBhZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgUmVjb3JkIEpvdXJuYWwgRW50cnkgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgeW91ciBmb3JtLiBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCB5b3UgbmVlZCB0byBjcmVhdGUgYSBuZXcgZW50cnkgaW4geW91ciBBUEkuIFRoZSBIVFRQIG1ldGhvZCB0aGF0IHlvdSB1c2UgdG8gY3JlYXRlIHJlc291cmNlcyBpcyBQT1NULiBHdWlkYW5jZSBvbiBzeW50YXggaXMgcHJvdmlkZWQgYmVsb3cuXG5cblxuXG4qL1xuXG5pbXBvcnQgdmFsaWRhdGVKb3VybmFsRW50cnkgZnJvbSBcIi4vdmFsaWRhdGVkYXRhXCJcbmltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5pbXBvcnQgSm91cm5hbEVudHJ5IGZyb20gXCIuL2pvdXJuYWxcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcbmltcG9ydCBlbnRyaWVzTGlzdCBmcm9tIFwiLi9lbnRyaWVzRE9NXCI7XG5pbXBvcnQgZmlsdGVyRW50cmllcyBmcm9tIFwiLi9maWx0ZXJFbnRyaWVzXCI7XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIil7XG4gIG1ha2VQYWdlLmluaXRpYXRlRm9ybSgpO1xuICBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKCkudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpLnRoZW4oKHRhY28pPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KHRhY28pKVxuICBtYWtlUGFnZS5jcmVhdGVSYWRpb0J1dHRvbnMoKVxuICBmaWx0ZXJFbnRyaWVzLm1vb2RTZWxlY3RvcigpO1xufVxuXG5cbiQoXCIjam91cm5hbEVudHJ5QnV0dG9uXCIpLmNsaWNrKChldmVudCk9PntcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBjb25zb2xlLmxvZyhcInRoZSBmb3JtIGhhcyBiZWVuIGNsaWNrZWRcIilcblxuICAvLyB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5ub0VtcHR5VmFsdWVzKClcbiAgdmFsaWRhdGVKb3VybmFsRW50cnkudmFsaWRhdGVGb3JtKClcbiAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKFwiVGhlIHN0YXR1cyBvZiBjaGVjayAxIGhhcyBjbGVhcmVkXCIpXG4gICAgY29uc3QgbmV3RW50cnkgPSBuZXcgSm91cm5hbEVudHJ5KHtcbiAgICAgIGRhdGU6ICQoXCIjam91cm5hbERhdGVcIikudmFsKCksXG4gICAgICBuYW1lOiAkKFwiI2F1dGhvck5hbWVcIikudmFsKCksXG4gICAgICBjb25jZXB0OiAkKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWwoKSxcbiAgICAgIGVudHJ5OiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcbiAgICAgIG1vb2Q6ICQoXCIjbW9vZFwiKS52YWwoKSxcbiAgICB9KVxuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm9ubHlBbGxvd2VkQ2hhcmFjdGVycyhuZXdFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgICBpZih2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9PT0gdHJ1ZSl7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMiBoYXMgY2xlYXJlZFwiKVxuICAgICAgbmV3RW50cnkuc2F2ZSgpXG4gICAgICAudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpXG4gICAgICAudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91ciBzdWJtaXNzaW9uIGhhcyBiZWVuIHRlcm1pbmF0ZWQsIHBsZWFzZSB0cnkgYWdhaW5cIilcbiAgICB9XG4gIH1cbn0pXG5cbiIsIi8vIE1ha2VQYWdlLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IEluaXRpYXRlIGZvcm0gYnVpbGQsIGNhbGwgYnVpbGQgcGFnZSB3aGljaCBsb29wcyBvdmVyIGRhdGEgYW5kIGNyZWF0ZXMgaW5wdXQgZWxlbWVudHMuIENhbGxzIGVsZW1lbnQgZmFjdG9yeSBmdW5jdGlvblxuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCJcblxuY29uc3QgbWFrZVBhZ2UgPSB7XG4gIGJ1aWxkRm9ybTogKG5hbWUsIHR5cGUsIHRpdGxlKSA9PiB7XG4gICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBuYW1lfSwgdGl0bGUpXG4gICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogdHlwZSwgbmFtZTogbmFtZSwgaWQ6IG5hbWUsIHJlcXVpcmVkOiB0cnVlfSlcbiAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBsYWJlbCwgaW5wdXQpXG4gICAgcmV0dXJuIGZpZWxkc2V0XG4gIH0sXG5cbiAgaW5pdGlhdGVGb3JtOiAoKSA9PiB7XG4gICAgbGV0IGRhdGVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImpvdXJuYWxEYXRlXCIsIFwiZGF0ZVwiLCBcIkRhdGUgb2YgZW50cnlcIilcbiAgICBsZXQgYXV0aG9yTmFtZUVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiYXV0aG9yTmFtZVwiLCBcInRleHRcIiwgXCJBdXRob3IgTmFtZVwiKTtcbiAgICBsZXQgY29uY2VwdHNDb3ZlcmVkRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJjb25jZXB0c0NvdmVyZWRcIiwgXCJ0ZXh0XCIsIFwiQ29uY2VwdHMgQ292ZXJlZFwiKVxuICAgIGxldCBqb3VybmFsRW50cnlMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJqb3VybmFsRW50cnlcIn0sIFwiSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBqb3VybmFsRW50cnlUZXh0YXJlYSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwidGV4dGFyZWFcIiwge25hbWU6IFwiam91cm5hbEVudHJ5XCIsIGlkOiBcImpvdXJuYWxFbnRyeVwiLCBjb2xzOiBcIjYwXCIsIHJvd3M6IFwiMTBcIn0pXG4gICAgbGV0IGpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGpvdXJuYWxFbnRyeUxhYmVsLCBqb3VybmFsRW50cnlUZXh0YXJlYSlcbiAgICBsZXQgZW50cnlCdXR0b24gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImJ1dHRvblwiLCB7dHlwZTogXCJzdWJtaXRcIiwgaWQ6IFwiam91cm5hbEVudHJ5QnV0dG9uXCJ9LCBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCIpXG4gICAgbGV0IG1vb2RMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJtb29kXCIsIGlkOiBcIm1vb2RMYWJlbFwifSwgXCJNb29kIGZvciB0aGUgRGF5XCIpXG4gICAgbGV0IG1vb2RPcHRpb25IYXBweSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJoYXBweVwifSwgXCJIYXBweVwiKVxuICAgIGxldCBtb29kT3B0aW9uU2FkID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcInNhZFwifSwgXCJTYWRcIilcbiAgICBsZXQgbW9vZE9wdGlvbkZydXN0cmF0ZWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZnJ1c3RyYXRlZFwifSwgXCJGcnVzdHJhdGVkXCIpXG4gICAgbGV0IG1vb2RPcHRpb25GaW5lID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZpbmVcIn0sIFwiRmluZVwiKVxuICAgIGxldCBtb29kU2VsZWN0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWxlY3RcIiwge25hbWU6IFwibW9vZFwiLCBpZDogXCJtb29kXCJ9LCBudWxsLCBtb29kT3B0aW9uRmluZSwgbW9vZE9wdGlvbkZydXN0cmF0ZWQsIG1vb2RPcHRpb25IYXBweSwgbW9vZE9wdGlvblNhZClcbiAgICBsZXQgbW9vZEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbW9vZExhYmVsLCBtb29kU2VsZWN0KVxuICAgIGxldCBmb3JtID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmb3JtXCIsIHt9LCBudWxsLCBkYXRlRW50cnksIGF1dGhvck5hbWVFbnRyeSwgY29uY2VwdHNDb3ZlcmVkRW50cnksIGpvdXJuYWxFbnRyeSwgbW9vZEVudHJ5LCBlbnRyeUJ1dHRvbilcbiAgICBtYW5hZ2VET00uYXBwZW5kRm9ybShmb3JtKVxuICB9LFxuICBjcmVhdGVSYWRpb0J1dHRvbnM6ICgpPT57XG4gICAgbGV0IG1vb2RzID0gW1wic2FkXCIsIFwiaGFwcHlcIiwgXCJmaW5lXCIsIFwiZnJ1c3RyYXRlZFwiXVxuICAgIGxldCBmaWVsZHNldCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwpXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG1vb2RzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwicmFkaW9cIiwgbmFtZTogXCJtb29kXCIsIHZhbHVlOiBtb29kc1tpXSwgY2xhc3M6IFwicmFkaW9CdXR0b25cIiwgaWQ6IGBmaWx0ZXItJHttb29kc1tpXX1gfSlcbiAgICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogYGZpbHRlci0ke21vb2RzW2ldfWB9LCBtb29kc1tpXSlcbiAgICAgIGxldCB3cmFwcGVyRGl2ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJkaXZcIiwge30sIG51bGwsIGlucHV0LCBsYWJlbClcbiAgICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKHdyYXBwZXJEaXYpXG4gICAgfVxuICAgIG1hbmFnZURPTS5hcHBlbmRCdXR0b25zKGZpZWxkc2V0KVxuICAgIC8vIHJldHVybiBmaWVsZHNldFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIiwiLy8gVmFsaWRhdGVEYXRhLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IHRha2UgcHJvdmlkZWQgZGF0YSBhbmQgY2hlY2sgZm9yIHJlcXVpcmVkIHNlY3Rpb24gY29tcGxldGlvbiwgY3Vyc2Ugd29yZHMsIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuXG5jb25zdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSA9IHtcbiAgY2xlYXJTdGF0dXM6IGZhbHNlLFxuICB2YWxpZGF0ZUZvcm06ICgpPT57XG4gICAgbGV0IGZvcm0gPSAkKFwiZm9ybVwiKVxuICAgIGNvbnNvbGUubG9nKGZvcm0pXG4gICAgaWYoJChcImZvcm0gPiA6aW5wdXRbcmVxdWlyZWRdOnZpc2libGVcIikudmFsKCkgIT09IFwiXCIpe1xuICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyh2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cylcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJwbGVhc2UgZmlsbCBvdXQgYWxsIGZpZWxkc1wiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9LFxuXG4gIG9ubHlBbGxvd2VkQ2hhcmFjdGVyczogKHNvbWV0aGluZyk9PntcbiAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IGZhbHNlXG4gICAgZm9yKGNvbnN0IGlucHV0IGluIHNvbWV0aGluZyl7XG4gICAgICBpZihzb21ldGhpbmdbaW5wdXRdLm1hdGNoKC8oWy1hLXpBLVowLTkoKXt9OjtdKykvKSl7XG4gICAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gdHJ1ZVxuICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBpbnB1dCBoYXMgYmVlbiBhY2NlcHRlZFwiKVxuICAgICAgfSBlbHNle1xuICAgICAgICBhbGVydChgWW91ciAke2lucHV0fSBzdWJtaXNzaW9uIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycy4gUGxlYXNlIG9ubHkgaW5jbHVkZSBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyBvciAoKXt9OzogYW5kIHJlc3VibWl0YClcbiAgICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzXG4gIH1cbn1cblxuLy8gICBtYXhpbXVtQ29uY2VwdEVudHJ5TGVuZ3RoOiAoKT0+e1xuLy8gICAgIC8vIFBpY2sgYSBtYXhpbXVtIGxlbmd0aCBmb3IgY29uY2VwdHMgZmllbGQgYW5kIHByb3ZpZGUgdmlzdWFsIGZlZWRiYWNrIGlmIHlvdSB0eXBlIGluIGEgc3RyaW5nIHRoYXQgaXMgbG9uZ2VyIHRoYW4gdGhhdCBtYXhpbXVtLlxuLy8gICB9LFxuXG4vLyAgIG5vQ3Vyc2VXb3JkczogKCk9Pntcbi8vICAgICAvLyBUZXN0IHRoYXQgdGhlIGNvbmNlcHQgYW5kIGVudHJ5IGZpZWxkcyBjb250YWluIG5vIGN1cnNlIHdvcmRzLiBZb3UgY2FuIHVzZSByZWd1bGFyIGV4cHJlc3Npb25zIGZvciB0aGF0LlxuLy8gICB9XG5cbi8vIH1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVKb3VybmFsRW50cnlcbiJdfQ==
