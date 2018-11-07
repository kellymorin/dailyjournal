(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const manageDOM = {
  appendPageItems: (element, selector) => {
    $(`#${selector}`).append(element);
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
Data.js: Single Responsibility: Get and post requests, only interacts with the API/ Database, should not be used to call any other functions
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

const filterEntries = {
  moodSelector: () => {
    $(".radioButton").click(() => {
      let filteredMood = $("input:checked").val();
      filterEntries.restrictEntries(filteredMood);
    });
  },
  restrictEntries: mood => {
    return _data.default.getEntries().then(entries => entries.filter(entry => entry.mood === mood)).then(taco => {
      if (taco.length > 0) {
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
Main.js: Single responsibility: attach event listeners that call behavior at a specific time
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
    $("form").trigger("reset");

    _validatedata.default.onlyAllowedCharacters(newEntry.singleJournalEntry());

    if (_validatedata.default.clearStatus === true) {
      console.log("The status of check 2 has cleared");
      newEntry.save().then(data => _entriesDOM.default.buildList(data)).then(taco => _DOMmanager.default.appendEntry(taco));
    } else {
      console.log("Your submission has been terminated, please try again");
    }
  }
});
$("#conceptsCovered").keypress(() => _validatedata.default.maximumConceptEntryLength());

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

    let moodOptionCreator = () => {
      let moodOptions = ["Happy", "Sad", "Frustrated", "Fine"];
      moodOptions.forEach(option => {
        let moodSelections = _elementFactory.default.elementFactory("option", {
          value: option.toLowerCase()
        }, option);

        return moodSelections;
      });

      let moodSelect = _elementFactory.default.elementFactory("select", {
        name: "mood",
        id: "mood"
      }, null, moodSelections);

      return moodSelect; // moodSelect.appendChild(moodSelections)
    }; // let moodOptionHappy = makeElement.elementFactory("option", {value: "happy"}, "Happy")
    // let moodOptionSad = makeElement.elementFactory("option", {value: "sad"}, "Sad")
    // let moodOptionFrustrated = makeElement.elementFactory("option", {value: "frustrated"}, "Frustrated")
    // let moodOptionFine = makeElement.elementFactory("option", {value: "fine"}, "Fine")
    // let moodSelect = makeElement.elementFactory("select", {name: "mood", id: "mood"}, null, moodOptionFine, moodOptionFrustrated, moodOptionHappy, moodOptionSad)


    let moodEntry = _elementFactory.default.elementFactory("fieldset", {}, null, moodLabel, moodOptionCreator()); // moodSelect)


    let form = _elementFactory.default.elementFactory("form", {}, null, dateEntry, authorNameEntry, conceptsCoveredEntry, journalEntry, moodEntry, entryButton);

    _DOMmanager.default.appendPageItems(form, "flexbox");
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

    _DOMmanager.default.appendPageItems(fieldset, "filterMoodButtons");
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
  },
  maximumConceptEntryLength: () => {
    let conceptValue = $("#conceptsCovered").val(); // if(conceptValue.length < 5){
    //   $("#conceptsCovered").removeClass("maxLength")
    // } else

    if (conceptValue.length > 5) {
      $("#conceptsCovered").addClass("maxLength");
    }
  } //   noCurseWords: ()=>{
  //     // Test that the concept and entry fields contain no curse words. You can use regular expressions for that.
  //   }
  // }

};
var _default = validateJournalEntry;
exports.default = _default;

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyaWVzRE9NLmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllcy5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLE1BQU0sU0FBUyxHQUFHO0FBQ2hCLEVBQUEsZUFBZSxFQUFFLENBQUMsT0FBRCxFQUFVLFFBQVYsS0FBc0I7QUFDckMsSUFBQSxDQUFDLENBQUUsSUFBRyxRQUFTLEVBQWQsQ0FBRCxDQUFrQixNQUFsQixDQUF5QixPQUF6QjtBQUNELEdBSGU7QUFJaEIsRUFBQSxXQUFXLEVBQUcsbUJBQUQsSUFBdUI7QUFDbEMsVUFBTSxTQUFTLEdBQUUsQ0FBQyxDQUFDLFdBQUQsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxLQUFWLEdBQWtCLE1BQWxCLENBQXlCLG1CQUF6QjtBQUNEO0FBUGUsQ0FBbEI7ZUFVZSxTOzs7Ozs7Ozs7OztBQ1hmOzs7QUFJQSxNQUFNLGNBQWMsR0FBRztBQUNyQixFQUFBLFVBQVUsRUFBRSxNQUFJO0FBQ2QsV0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDQSxPQUFELElBQWEsT0FBTyxDQUFDLElBQVIsRUFEWixDQUFQO0FBRUQsR0FKb0I7QUFNckIsRUFBQSxnQkFBZ0IsRUFBRyxZQUFELElBQWdCO0FBQ2hDLFdBQU8sS0FBSyxDQUFDLCtCQUFELEVBQWtDO0FBQzVDLE1BQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDLE1BQUEsT0FBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQsT0FGbUM7QUFLNUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxZQUFmO0FBTHNDLEtBQWxDLENBQVo7QUFPRDtBQWRvQixDQUF2QjtlQWlCZSxjOzs7Ozs7Ozs7O0FDckJmO0FBRUEsTUFBTSxXQUFXLEdBQUc7QUFDbEIsRUFBQSxjQUFjLEVBQUUsQ0FBQyxFQUFELEVBQUssYUFBTCxFQUFvQixPQUFwQixFQUE2QixHQUFHLFFBQWhDLEtBQTJDO0FBQ3pELFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEVBQXZCLENBQWQsQ0FEeUQsQ0FFekQ7O0FBQ0EsU0FBSyxJQUFJLElBQVQsSUFBaUIsYUFBakIsRUFBK0I7QUFDN0IsTUFBQSxPQUFPLENBQUMsWUFBUixDQUFxQixJQUFyQixFQUEyQixhQUFhLENBQUMsSUFBRCxDQUF4QztBQUNEOztBQUNELElBQUEsT0FBTyxDQUFDLFdBQVIsR0FBc0IsT0FBTyxJQUFJLElBQWpDO0FBQ0EsSUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixLQUFLLElBQUk7QUFDeEIsTUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixLQUFwQjtBQUNELEtBRkQ7QUFHQSxXQUFPLE9BQVA7QUFDRDtBQVppQixDQUFwQjtlQWNlLFc7Ozs7Ozs7Ozs7O0FDaEJmOztBQUNBOzs7O0FBRUE7OztBQUlBO0FBR0EsTUFBTSxXQUFXLEdBQUc7QUFDbEIsRUFBQSxTQUFTLEVBQUUsTUFBSTtBQUNiLFdBQU8sY0FBZSxVQUFmLEdBQ04sSUFETSxDQUNBLE9BQUQsSUFBWSxPQUFPLENBQUMsR0FBUixDQUFZLEtBQUssSUFBSSx3QkFBVyxpQkFBWCxDQUE2QixLQUE3QixDQUFyQixDQURYLENBQVA7QUFFRDtBQUppQixDQUFwQjtlQU1lLFc7Ozs7Ozs7Ozs7O0FDWmY7Ozs7QUFKQTs7O0FBT0EsTUFBTSxVQUFVLEdBQUc7QUFFakIsRUFBQSxpQkFBaUIsRUFBRyxlQUFELElBQW1CO0FBQ3BDLFFBQUksT0FBTyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUM7QUFBQyxNQUFBLEtBQUssRUFBRTtBQUFSLEtBQWpDLEVBQTRELGVBQWUsQ0FBQyxPQUE1RSxDQUFkOztBQUNBLFFBQUksSUFBSSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEtBQUssRUFBRTtBQUFSLEtBQWhDLEVBQXdELGVBQWUsQ0FBQyxJQUF4RSxDQUFYOztBQUNBLFFBQUksTUFBTSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEtBQUssRUFBRTtBQUFSLEtBQWhDLEVBQTBELGVBQWUsQ0FBQyxJQUExRSxDQUFiOztBQUNBLFFBQUksSUFBSSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEtBQUssRUFBRTtBQUFSLEtBQWhDLEVBQXdELGVBQWUsQ0FBQyxJQUF4RSxDQUFYOztBQUNBLFFBQUksS0FBSyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEtBQUssRUFBRTtBQUFSLEtBQWhDLEVBQXlELGVBQWUsQ0FBQyxLQUF6RSxDQUFaOztBQUNBLFFBQUksa0JBQWtCLEdBQUcsd0JBQVksY0FBWixDQUEyQixTQUEzQixFQUFzQztBQUFDLE1BQUEsS0FBSyxFQUFFO0FBQVIsS0FBdEMsRUFBcUUsSUFBckUsRUFBMkUsT0FBM0UsRUFBb0YsSUFBcEYsRUFBMEYsTUFBMUYsRUFBa0csSUFBbEcsRUFBd0csS0FBeEcsQ0FBekI7O0FBQ0EsV0FBTyxrQkFBUDtBQUNDO0FBVmMsQ0FBbkI7ZUFZZSxVOzs7Ozs7Ozs7OztBQ25CZjs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sYUFBYSxHQUFHO0FBQ3BCLEVBQUEsWUFBWSxFQUFFLE1BQUs7QUFDakIsSUFBQSxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEtBQWxCLENBQXdCLE1BQUk7QUFDMUIsVUFBSSxZQUFZLEdBQUksQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixFQUFwQjtBQUNBLE1BQUEsYUFBYSxDQUFDLGVBQWQsQ0FBOEIsWUFBOUI7QUFDRCxLQUhEO0FBSUQsR0FObUI7QUFRcEIsRUFBQSxlQUFlLEVBQUcsSUFBRCxJQUFRO0FBQ3ZCLFdBQU8sY0FBZSxVQUFmLEdBQ04sSUFETSxDQUNBLE9BQUQsSUFBVyxPQUFPLENBQUMsTUFBUixDQUFnQixLQUFELElBQVUsS0FBSyxDQUFDLElBQU4sS0FBZSxJQUF4QyxDQURWLEVBRUwsSUFGSyxDQUVBLElBQUksSUFBSTtBQUNiLFVBQUksSUFBSSxDQUFDLE1BQUwsR0FBYyxDQUFsQixFQUFvQjtBQUNsQixRQUFBLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBSSxJQUFJLG9CQUFVLFdBQVYsQ0FBc0Isd0JBQVcsaUJBQVgsQ0FBNkIsSUFBN0IsQ0FBdEIsQ0FBakI7QUFDRCxPQUZELE1BRU87QUFDTCxRQUFBLEtBQUssQ0FBQywrREFBRCxDQUFMO0FBQ0Q7QUFDRixLQVJNLENBQVA7QUFTRDtBQWxCbUIsQ0FBdEI7ZUFvQmUsYTs7Ozs7Ozs7Ozs7QUN2QmY7Ozs7QUFFQSxNQUFNLFlBQU4sQ0FBbUI7QUFDakIsRUFBQSxXQUFXLENBQUMsS0FBRCxFQUFPO0FBQ2hCLFNBQUssSUFBTCxHQUFZLEtBQUssQ0FBQyxJQUFsQjtBQUNBLFNBQUssSUFBTCxHQUFZLEtBQUssQ0FBQyxJQUFsQjtBQUNBLFNBQUssT0FBTCxHQUFlLEtBQUssQ0FBQyxPQUFyQjtBQUNBLFNBQUssS0FBTCxHQUFhLEtBQUssQ0FBQyxLQUFuQjtBQUNBLFNBQUssSUFBTCxHQUFZLEtBQUssQ0FBQyxJQUFsQjtBQUNEOztBQUNELEVBQUEsa0JBQWtCLEdBQUU7QUFDbEIsV0FBTztBQUFDLE1BQUEsSUFBSSxFQUFFLEtBQUssSUFBWjtBQUFrQixNQUFBLElBQUksRUFBRSxLQUFLLElBQTdCO0FBQW1DLE1BQUEsT0FBTyxFQUFFLEtBQUssT0FBakQ7QUFBMEQsTUFBQSxLQUFLLEVBQUUsS0FBSyxLQUF0RTtBQUE2RSxNQUFBLElBQUksRUFBRSxLQUFLO0FBQXhGLEtBQVA7QUFDRDs7QUFDRCxFQUFBLElBQUksR0FBRTtBQUNKLFdBQU8sY0FBZSxnQkFBZixDQUFnQyxLQUFLLGtCQUFMLEVBQWhDLENBQVA7QUFDRDs7QUFiZ0I7O2VBZ0JKLFk7Ozs7OztBQ2ZmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBVkE7OztBQVlBLElBQUksUUFBUSxDQUFDLFVBQVQsS0FBd0IsU0FBNUIsRUFBc0M7QUFDcEMsb0JBQVMsWUFBVDs7QUFDQSxnQkFBZSxVQUFmLEdBQTRCLElBQTVCLENBQWtDLElBQUQsSUFBUyxvQkFBWSxTQUFaLENBQXNCLElBQXRCLENBQTFDLEVBQXVFLElBQXZFLENBQTZFLElBQUQsSUFBUyxvQkFBVSxXQUFWLENBQXNCLElBQXRCLENBQXJGOztBQUNBLG9CQUFTLGtCQUFUOztBQUNBLHlCQUFjLFlBQWQ7QUFDRDs7QUFHRCxDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QixLQUF6QixDQUFnQyxLQUFELElBQVM7QUFDdEMsRUFBQSxLQUFLLENBQUMsY0FBTjtBQUNBLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwyQkFBWjs7QUFFQSx3QkFBcUIsWUFBckI7O0FBQ0EsTUFBRyxzQkFBcUIsV0FBckIsS0FBcUMsSUFBeEMsRUFBNkM7QUFDM0MsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLG1DQUFaO0FBQ0EsVUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBSixDQUFpQjtBQUNoQyxNQUFBLElBQUksRUFBRSxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEdBQWxCLEVBRDBCO0FBRWhDLE1BQUEsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsR0FBakIsRUFGMEI7QUFHaEMsTUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsR0FBdEIsRUFIdUI7QUFJaEMsTUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixFQUp5QjtBQUtoQyxNQUFBLElBQUksRUFBRSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsR0FBWDtBQUwwQixLQUFqQixDQUFqQjtBQU9BLElBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLE9BQVYsQ0FBa0IsT0FBbEI7O0FBQ0EsMEJBQXFCLHFCQUFyQixDQUEyQyxRQUFRLENBQUMsa0JBQVQsRUFBM0M7O0FBQ0EsUUFBRyxzQkFBcUIsV0FBckIsS0FBcUMsSUFBeEMsRUFBNkM7QUFDM0MsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLG1DQUFaO0FBQ0EsTUFBQSxRQUFRLENBQUMsSUFBVCxHQUNDLElBREQsQ0FDTyxJQUFELElBQVMsb0JBQVksU0FBWixDQUFzQixJQUF0QixDQURmLEVBRUMsSUFGRCxDQUVPLElBQUQsSUFBUyxvQkFBVSxXQUFWLENBQXNCLElBQXRCLENBRmY7QUFHRCxLQUxELE1BS087QUFDTCxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksdURBQVo7QUFDRDtBQUNGO0FBQ0YsQ0F6QkQ7QUEyQkEsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsUUFBdEIsQ0FBK0IsTUFDN0Isc0JBQXFCLHlCQUFyQixFQURGOzs7Ozs7Ozs7O0FDN0NBOztBQUNBOzs7O0FBSEE7QUFLQSxNQUFNLFFBQVEsR0FBRztBQUNmLEVBQUEsU0FBUyxFQUFFLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxLQUFiLEtBQXVCO0FBQ2hDLFFBQUksS0FBSyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsT0FBM0IsRUFBb0M7QUFBQyxNQUFBLEdBQUcsRUFBRTtBQUFOLEtBQXBDLEVBQWlELEtBQWpELENBQVo7O0FBQ0EsUUFBSSxLQUFLLEdBQUcsd0JBQVksY0FBWixDQUEyQixPQUEzQixFQUFvQztBQUFDLE1BQUEsSUFBSSxFQUFFLElBQVA7QUFBYSxNQUFBLElBQUksRUFBRSxJQUFuQjtBQUF5QixNQUFBLEVBQUUsRUFBRSxJQUE3QjtBQUFtQyxNQUFBLFFBQVEsRUFBRTtBQUE3QyxLQUFwQyxDQUFaOztBQUNBLFFBQUksUUFBUSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsVUFBM0IsRUFBdUMsRUFBdkMsRUFBMkMsSUFBM0MsRUFBaUQsS0FBakQsRUFBd0QsS0FBeEQsQ0FBZjs7QUFDQSxXQUFPLFFBQVA7QUFDRCxHQU5jO0FBUWYsRUFBQSxZQUFZLEVBQUUsTUFBTTtBQUNsQixRQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBVCxDQUFtQixhQUFuQixFQUFrQyxNQUFsQyxFQUEwQyxlQUExQyxDQUFoQjtBQUNBLFFBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxTQUFULENBQW1CLFlBQW5CLEVBQWlDLE1BQWpDLEVBQXlDLGFBQXpDLENBQXRCO0FBQ0EsUUFBSSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsU0FBVCxDQUFtQixpQkFBbkIsRUFBc0MsTUFBdEMsRUFBOEMsa0JBQTlDLENBQTNCOztBQUNBLFFBQUksaUJBQWlCLEdBQUcsd0JBQVksY0FBWixDQUEyQixPQUEzQixFQUFvQztBQUFDLE1BQUEsR0FBRyxFQUFFO0FBQU4sS0FBcEMsRUFBMkQsZUFBM0QsQ0FBeEI7O0FBQ0EsUUFBSSxvQkFBb0IsR0FBRyx3QkFBWSxjQUFaLENBQTJCLFVBQTNCLEVBQXVDO0FBQUMsTUFBQSxJQUFJLEVBQUUsY0FBUDtBQUF1QixNQUFBLEVBQUUsRUFBRSxjQUEzQjtBQUEyQyxNQUFBLElBQUksRUFBRSxJQUFqRDtBQUF1RCxNQUFBLElBQUksRUFBRTtBQUE3RCxLQUF2QyxDQUEzQjs7QUFDQSxRQUFJLFlBQVksR0FBRyx3QkFBWSxjQUFaLENBQTJCLFVBQTNCLEVBQXVDLEVBQXZDLEVBQTJDLElBQTNDLEVBQWlELGlCQUFqRCxFQUFvRSxvQkFBcEUsQ0FBbkI7O0FBQ0EsUUFBSSxXQUFXLEdBQUcsd0JBQVksY0FBWixDQUEyQixRQUEzQixFQUFxQztBQUFDLE1BQUEsSUFBSSxFQUFFLFFBQVA7QUFBaUIsTUFBQSxFQUFFLEVBQUU7QUFBckIsS0FBckMsRUFBaUYsc0JBQWpGLENBQWxCOztBQUNBLFFBQUksU0FBUyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsT0FBM0IsRUFBb0M7QUFBQyxNQUFBLEdBQUcsRUFBRSxNQUFOO0FBQWMsTUFBQSxFQUFFLEVBQUU7QUFBbEIsS0FBcEMsRUFBb0Usa0JBQXBFLENBQWhCOztBQUNBLFFBQUksaUJBQWlCLEdBQUcsTUFBSTtBQUMxQixVQUFJLFdBQVcsR0FBRyxDQUFDLE9BQUQsRUFBVSxLQUFWLEVBQWlCLFlBQWpCLEVBQStCLE1BQS9CLENBQWxCO0FBQ0EsTUFBQSxXQUFXLENBQUMsT0FBWixDQUFxQixNQUFELElBQVU7QUFDNUIsWUFBSSxjQUFjLEdBQUcsd0JBQVksY0FBWixDQUEyQixRQUEzQixFQUFxQztBQUFDLFVBQUEsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFQO0FBQVIsU0FBckMsRUFBb0UsTUFBcEUsQ0FBckI7O0FBQ0EsZUFBTyxjQUFQO0FBQ0QsT0FIRDs7QUFJQSxVQUFJLFVBQVUsR0FBRyx3QkFBWSxjQUFaLENBQTJCLFFBQTNCLEVBQXFDO0FBQUMsUUFBQSxJQUFJLEVBQUUsTUFBUDtBQUFlLFFBQUEsRUFBRSxFQUFFO0FBQW5CLE9BQXJDLEVBQWlFLElBQWpFLEVBQXVFLGNBQXZFLENBQWpCOztBQUNBLGFBQU8sVUFBUCxDQVAwQixDQVExQjtBQUNELEtBVEQsQ0FUa0IsQ0FtQmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFFBQUksU0FBUyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsVUFBM0IsRUFBdUMsRUFBdkMsRUFBMkMsSUFBM0MsRUFBaUQsU0FBakQsRUFBNEQsaUJBQWlCLEVBQTdFLENBQWhCLENBeEJrQixDQXlCbEI7OztBQUNBLFFBQUksSUFBSSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsTUFBM0IsRUFBbUMsRUFBbkMsRUFBdUMsSUFBdkMsRUFBNkMsU0FBN0MsRUFBd0QsZUFBeEQsRUFBeUUsb0JBQXpFLEVBQStGLFlBQS9GLEVBQTZHLFNBQTdHLEVBQXdILFdBQXhILENBQVg7O0FBQ0Esd0JBQVUsZUFBVixDQUEwQixJQUExQixFQUFnQyxTQUFoQztBQUNELEdBcENjO0FBcUNmLEVBQUEsa0JBQWtCLEVBQUUsTUFBSTtBQUN0QixRQUFJLEtBQUssR0FBRyxDQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLE1BQWpCLEVBQXlCLFlBQXpCLENBQVo7O0FBQ0EsUUFBSSxRQUFRLEdBQUcsd0JBQVksY0FBWixDQUEyQixVQUEzQixFQUF1QyxFQUF2QyxFQUEyQyxJQUEzQyxDQUFmOztBQUNBLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBWixFQUFlLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBekIsRUFBaUMsQ0FBQyxFQUFsQyxFQUFxQztBQUNuQyxVQUFJLEtBQUssR0FBRyx3QkFBWSxjQUFaLENBQTJCLE9BQTNCLEVBQW9DO0FBQUMsUUFBQSxJQUFJLEVBQUUsT0FBUDtBQUFnQixRQUFBLElBQUksRUFBRSxNQUF0QjtBQUE4QixRQUFBLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBRCxDQUExQztBQUErQyxRQUFBLEtBQUssRUFBRSxhQUF0RDtBQUFxRSxRQUFBLEVBQUUsRUFBRyxVQUFTLEtBQUssQ0FBQyxDQUFELENBQUk7QUFBNUYsT0FBcEMsQ0FBWjs7QUFDQSxVQUFJLEtBQUssR0FBRyx3QkFBWSxjQUFaLENBQTJCLE9BQTNCLEVBQW9DO0FBQUMsUUFBQSxHQUFHLEVBQUcsVUFBUyxLQUFLLENBQUMsQ0FBRCxDQUFJO0FBQXpCLE9BQXBDLEVBQWlFLEtBQUssQ0FBQyxDQUFELENBQXRFLENBQVo7O0FBQ0EsVUFBSSxVQUFVLEdBQUcsd0JBQVksY0FBWixDQUEyQixLQUEzQixFQUFrQyxFQUFsQyxFQUFzQyxJQUF0QyxFQUE0QyxLQUE1QyxFQUFtRCxLQUFuRCxDQUFqQjs7QUFDQSxNQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFVBQXJCO0FBQ0Q7O0FBQ0Qsd0JBQVUsZUFBVixDQUEwQixRQUExQixFQUFvQyxtQkFBcEM7QUFDRDtBQS9DYyxDQUFqQjtlQWtEZSxROzs7Ozs7Ozs7O0FDdkRmO0FBR0EsTUFBTSxvQkFBb0IsR0FBRztBQUMzQixFQUFBLFdBQVcsRUFBRSxLQURjO0FBRTNCLEVBQUEsWUFBWSxFQUFFLE1BQUk7QUFDaEIsUUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FBWjtBQUNBLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaOztBQUNBLFFBQUcsQ0FBQyxDQUFDLGlDQUFELENBQUQsQ0FBcUMsR0FBckMsT0FBK0MsRUFBbEQsRUFBcUQ7QUFDbkQsTUFBQSxvQkFBb0IsQ0FBQyxXQUFyQixHQUFtQyxJQUFuQztBQUNBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBb0IsQ0FBQyxXQUFqQztBQUNELEtBSEQsTUFHTztBQUNMLE1BQUEsS0FBSyxDQUFDLDRCQUFELENBQUw7QUFDQTtBQUNEO0FBQ0YsR0FaMEI7QUFjM0IsRUFBQSxxQkFBcUIsRUFBRyxTQUFELElBQWE7QUFDbEMsSUFBQSxvQkFBb0IsQ0FBQyxXQUFyQixHQUFtQyxLQUFuQzs7QUFDQSxTQUFJLE1BQU0sS0FBVixJQUFtQixTQUFuQixFQUE2QjtBQUMzQixVQUFHLFNBQVMsQ0FBQyxLQUFELENBQVQsQ0FBaUIsS0FBakIsQ0FBdUIsdUJBQXZCLENBQUgsRUFBbUQ7QUFDakQsUUFBQSxvQkFBb0IsQ0FBQyxXQUFyQixHQUFtQyxJQUFuQztBQUNBLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw2QkFBWjtBQUNELE9BSEQsTUFHTTtBQUNKLFFBQUEsS0FBSyxDQUFFLFFBQU8sS0FBTSw2R0FBZixDQUFMO0FBQ0EsUUFBQSxvQkFBb0IsQ0FBQyxXQUFyQixHQUFtQyxLQUFuQztBQUNBO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPLG9CQUFvQixDQUFDLFdBQTVCO0FBQ0QsR0EzQjBCO0FBNkIzQixFQUFBLHlCQUF5QixFQUFFLE1BQUs7QUFDOUIsUUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsR0FBdEIsRUFBbkIsQ0FEOEIsQ0FFOUI7QUFDQTtBQUNBOztBQUNBLFFBQUcsWUFBWSxDQUFDLE1BQWIsR0FBc0IsQ0FBekIsRUFBMkI7QUFDekIsTUFBQSxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixRQUF0QixDQUErQixXQUEvQjtBQUNEO0FBQ0YsR0FyQzBCLENBd0M3QjtBQUNBO0FBQ0E7QUFFQTs7QUE1QzZCLENBQTdCO2VBOENlLG9CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5jb25zdCBtYW5hZ2VET00gPSB7XG4gIGFwcGVuZFBhZ2VJdGVtczogKGVsZW1lbnQsIHNlbGVjdG9yKT0+IHtcbiAgICAkKGAjJHtzZWxlY3Rvcn1gKS5hcHBlbmQoZWxlbWVudClcbiAgfSxcbiAgYXBwZW5kRW50cnk6IChkYWlseUpvdXJuYWxFbnRyaWVzKT0+e1xuICAgIGNvbnN0ICRlbnRyeURpdiA9JChcIiNlbnRyeUxvZ1wiKVxuICAgICRlbnRyeURpdi5lbXB0eSgpLmFwcGVuZChkYWlseUpvdXJuYWxFbnRyaWVzKVxuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBtYW5hZ2VET00iLCIvKlxuRGF0YS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBHZXQgYW5kIHBvc3QgcmVxdWVzdHMsIG9ubHkgaW50ZXJhY3RzIHdpdGggdGhlIEFQSS8gRGF0YWJhc2UsIHNob3VsZCBub3QgYmUgdXNlZCB0byBjYWxsIGFueSBvdGhlciBmdW5jdGlvbnNcbiovXG5cbmNvbnN0IGpvdXJuYWxFbnRyaWVzID0ge1xuICBnZXRFbnRyaWVzOiAoKT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXG4gICAgLnRoZW4oKGVudHJpZXMpID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVKb3VybmFsRW50cnk6IChqb3VybmFsRW50cnkpPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShqb3VybmFsRW50cnkpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsRW50cmllcyIsIi8vIEVsZW1lbnRGYWN0b3J5LmpzOiBMb29wIG92ZXIgcHJvdmlkZWQgaW5mb3JtYXRpb24gYW5kIGNyZWF0ZSBIVE1MIGVsZW1lbnQgdGhhdCBjYW4gYmUgZGlzcGxheWVkIGluIHRoZSBET01cblxuY29uc3QgbWFrZUVsZW1lbnQgPSB7XG4gIGVsZW1lbnRGYWN0b3J5OiAoZWwsIGF0dHJpYnV0ZXNPYmosIGNvbnRlbnQsIC4uLmNoaWxkcmVuKT0+e1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcbiAgICAvLyBTZXQgQXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlc09iail7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzT2JqW2F0dHJdKVxuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudCB8fCBudWxsXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBtYWtlRWxlbWVudCIsImltcG9ydCBidWlsZEVudHJ5IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiO1xuXG4vKlxuZW50cmllc0RPTS5qcyAtIE1vdmUgdGhlIGNvZGUgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgbW9kaWZ5aW5nIHRoZSBET00gaW50byB0aGlzIGZpbGUuXG4qL1xuXG4vLyAvLyBJbnNlcnQgdGhlIGZyYWdtZW50IGludG8gdGhlIERPTSBhcyBjaGlsZHJlbiBvZiB0aGUgRW50cnkgTG9nIHNlY3Rpb24gaW4gaW5kZXguaHRtbFxuXG5cbmNvbnN0IGVudHJpZXNMaXN0ID0ge1xuICBidWlsZExpc3Q6ICgpPT57XG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+IGVudHJpZXMubWFwKGVudHJ5ID0+IGJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoZW50cnkpKSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZW50cmllc0xpc3RcbiIsIi8qXG5FbnRyeUNvbXBvbmVudDogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBMb29wIG92ZXIgcHJvdmlkZWQgZGF0YSBhbmQgcHJvZHVjZSBIVE1MIHRvIGJlIGRpc3BsYXllZCB0byB0aGUgRE9NLFxuKi9cblxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcblxuXG5jb25zdCBidWlsZEVudHJ5ID0ge1xuXG4gIG1ha2VFbnRyeUVsZW1lbnRzOiAoam91cm5hbEVudHJ5T2JqKT0+e1xuICAgIGxldCBjb25jZXB0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJoM1wiLCB7Y2xhc3M6IFwiam91cm5hbENvbmNlcHRcIn0sIGpvdXJuYWxFbnRyeU9iai5jb25jZXB0KVxuICAgIGxldCBkYXRlID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsRGF0ZVwifSwgam91cm5hbEVudHJ5T2JqLmRhdGUpXG4gICAgbGV0IGF1dGhvciA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbEF1dGhvclwifSwgam91cm5hbEVudHJ5T2JqLm5hbWUpXG4gICAgbGV0IG1vb2QgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxNb29kXCJ9LCBqb3VybmFsRW50cnlPYmoubW9vZClcbiAgICBsZXQgZW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxFbnRyeVwifSwgam91cm5hbEVudHJ5T2JqLmVudHJ5KVxuICAgIGxldCBzaW5nbGVKb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlY3Rpb25cIiwge2NsYXNzOiBcInNpbmdsZUpvdXJuYWxFbnRyeVwifSwgbnVsbCwgY29uY2VwdCwgZGF0ZSwgYXV0aG9yLCBtb29kLCBlbnRyeSlcbiAgICByZXR1cm4gc2luZ2xlSm91cm5hbEVudHJ5XG4gICAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRW50cnlcbiIsImltcG9ydCBidWlsZEVudHJ5IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiXG5pbXBvcnQgbWFuYWdlRE9NIGZyb20gXCIuL0RPTW1hbmFnZXJcIjtcblxuY29uc3QgZmlsdGVyRW50cmllcyA9IHtcbiAgbW9vZFNlbGVjdG9yOiAoKSA9PntcbiAgICAkKFwiLnJhZGlvQnV0dG9uXCIpLmNsaWNrKCgpPT57XG4gICAgICBsZXQgZmlsdGVyZWRNb29kID0gKCQoXCJpbnB1dDpjaGVja2VkXCIpLnZhbCgpKVxuICAgICAgZmlsdGVyRW50cmllcy5yZXN0cmljdEVudHJpZXMoZmlsdGVyZWRNb29kKVxuICAgIH0pXG4gIH0sXG5cbiAgcmVzdHJpY3RFbnRyaWVzOiAobW9vZCk9PntcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuZ2V0RW50cmllcygpXG4gICAgLnRoZW4oKGVudHJpZXMpPT5lbnRyaWVzLmZpbHRlcigoZW50cnkpPT4gZW50cnkubW9vZCA9PT0gbW9vZClcbiAgICApLnRoZW4odGFjbyA9PiB7XG4gICAgICBpZiAodGFjby5sZW5ndGggPiAwKXtcbiAgICAgICAgdGFjby5tYXAoaXRlbSA9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkoYnVpbGRFbnRyeS5tYWtlRW50cnlFbGVtZW50cyhpdGVtKSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChcIlRoZXJlIGFyZSBubyBlbnRyaWVzIHRoYXQgbWF0Y2ggeW91ciBzZWFyY2gsIHBsZWFzZSB0cnkgYWdhaW5cIilcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJFbnRyaWVzXG5cbiIsIlxuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIlxuXG5jbGFzcyBKb3VybmFsRW50cnkge1xuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgdGhpcy5kYXRlID0gcHJvcHMuZGF0ZVxuICAgIHRoaXMubmFtZSA9IHByb3BzLm5hbWVcbiAgICB0aGlzLmNvbmNlcHQgPSBwcm9wcy5jb25jZXB0XG4gICAgdGhpcy5lbnRyeSA9IHByb3BzLmVudHJ5XG4gICAgdGhpcy5tb29kID0gcHJvcHMubW9vZFxuICB9XG4gIHNpbmdsZUpvdXJuYWxFbnRyeSgpe1xuICAgIHJldHVybiB7ZGF0ZTogdGhpcy5kYXRlLCBuYW1lOiB0aGlzLm5hbWUsIGNvbmNlcHQ6IHRoaXMuY29uY2VwdCwgZW50cnk6IHRoaXMuZW50cnksIG1vb2Q6IHRoaXMubW9vZH1cbiAgfVxuICBzYXZlKCl7XG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLnNhdmVKb3VybmFsRW50cnkodGhpcy5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBKb3VybmFsRW50cnkiLCIvKlxuTWFpbi5qczogU2luZ2xlIHJlc3BvbnNpYmlsaXR5OiBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRoYXQgY2FsbCBiZWhhdmlvciBhdCBhIHNwZWNpZmljIHRpbWVcbiovXG5cbmltcG9ydCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSBmcm9tIFwiLi92YWxpZGF0ZWRhdGFcIlxuaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL21ha2VQYWdlXCJcbmltcG9ydCBKb3VybmFsRW50cnkgZnJvbSBcIi4vam91cm5hbFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiO1xuaW1wb3J0IGVudHJpZXNMaXN0IGZyb20gXCIuL2VudHJpZXNET01cIjtcbmltcG9ydCBmaWx0ZXJFbnRyaWVzIGZyb20gXCIuL2ZpbHRlckVudHJpZXNcIjtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKXtcbiAgbWFrZVBhZ2UuaW5pdGlhdGVGb3JtKCk7XG4gIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKS50aGVuKChkYXRhKT0+IGVudHJpZXNMaXN0LmJ1aWxkTGlzdChkYXRhKSkudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gIG1ha2VQYWdlLmNyZWF0ZVJhZGlvQnV0dG9ucygpXG4gIGZpbHRlckVudHJpZXMubW9vZFNlbGVjdG9yKCk7XG59XG5cblxuJChcIiNqb3VybmFsRW50cnlCdXR0b25cIikuY2xpY2soKGV2ZW50KT0+e1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnNvbGUubG9nKFwidGhlIGZvcm0gaGFzIGJlZW4gY2xpY2tlZFwiKVxuXG4gIHZhbGlkYXRlSm91cm5hbEVudHJ5LnZhbGlkYXRlRm9ybSgpXG4gIGlmKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID09PSB0cnVlKXtcbiAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMSBoYXMgY2xlYXJlZFwiKVxuICAgIGNvbnN0IG5ld0VudHJ5ID0gbmV3IEpvdXJuYWxFbnRyeSh7XG4gICAgICBkYXRlOiAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpLFxuICAgICAgbmFtZTogJChcIiNhdXRob3JOYW1lXCIpLnZhbCgpLFxuICAgICAgY29uY2VwdDogJChcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsKCksXG4gICAgICBlbnRyeTogJChcIiNqb3VybmFsRW50cnlcIikudmFsKCksXG4gICAgICBtb29kOiAkKFwiI21vb2RcIikudmFsKCksXG4gICAgfSlcbiAgICAkKFwiZm9ybVwiKS50cmlnZ2VyKFwicmVzZXRcIilcbiAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5vbmx5QWxsb3dlZENoYXJhY3RlcnMobmV3RW50cnkuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gICAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgc3RhdHVzIG9mIGNoZWNrIDIgaGFzIGNsZWFyZWRcIilcbiAgICAgIG5ld0VudHJ5LnNhdmUoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4gZW50cmllc0xpc3QuYnVpbGRMaXN0KGRhdGEpKVxuICAgICAgLnRoZW4oKHRhY28pPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KHRhY28pKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdXIgc3VibWlzc2lvbiBoYXMgYmVlbiB0ZXJtaW5hdGVkLCBwbGVhc2UgdHJ5IGFnYWluXCIpXG4gICAgfVxuICB9XG59KVxuXG4kKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS5rZXlwcmVzcygoKT0+XG4gIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm1heGltdW1Db25jZXB0RW50cnlMZW5ndGgoKVxuKVxuXG4iLCIvLyBNYWtlUGFnZS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBJbml0aWF0ZSBmb3JtIGJ1aWxkLCBjYWxsIGJ1aWxkIHBhZ2Ugd2hpY2ggbG9vcHMgb3ZlciBkYXRhIGFuZCBjcmVhdGVzIGlucHV0IGVsZW1lbnRzLiBDYWxscyBlbGVtZW50IGZhY3RvcnkgZnVuY3Rpb25cblxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcbmltcG9ydCBtYW5hZ2VET00gZnJvbSBcIi4vRE9NbWFuYWdlclwiXG5cbmNvbnN0IG1ha2VQYWdlID0ge1xuICBidWlsZEZvcm06IChuYW1lLCB0eXBlLCB0aXRsZSkgPT4ge1xuICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogbmFtZX0sIHRpdGxlKVxuICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IHR5cGUsIG5hbWU6IG5hbWUsIGlkOiBuYW1lLCByZXF1aXJlZDogdHJ1ZX0pXG4gICAgbGV0IGZpZWxkc2V0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbGFiZWwsIGlucHV0KVxuICAgIHJldHVybiBmaWVsZHNldFxuICB9LFxuXG4gIGluaXRpYXRlRm9ybTogKCkgPT4ge1xuICAgIGxldCBkYXRlRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJqb3VybmFsRGF0ZVwiLCBcImRhdGVcIiwgXCJEYXRlIG9mIGVudHJ5XCIpXG4gICAgbGV0IGF1dGhvck5hbWVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImF1dGhvck5hbWVcIiwgXCJ0ZXh0XCIsIFwiQXV0aG9yIE5hbWVcIik7XG4gICAgbGV0IGNvbmNlcHRzQ292ZXJlZEVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiY29uY2VwdHNDb3ZlcmVkXCIsIFwidGV4dFwiLCBcIkNvbmNlcHRzIENvdmVyZWRcIilcbiAgICBsZXQgam91cm5hbEVudHJ5TGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IFwiam91cm5hbEVudHJ5XCJ9LCBcIkpvdXJuYWwgRW50cnlcIilcbiAgICBsZXQgam91cm5hbEVudHJ5VGV4dGFyZWEgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInRleHRhcmVhXCIsIHtuYW1lOiBcImpvdXJuYWxFbnRyeVwiLCBpZDogXCJqb3VybmFsRW50cnlcIiwgY29sczogXCI2MFwiLCByb3dzOiBcIjEwXCJ9KVxuICAgIGxldCBqb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBqb3VybmFsRW50cnlMYWJlbCwgam91cm5hbEVudHJ5VGV4dGFyZWEpXG4gICAgbGV0IGVudHJ5QnV0dG9uID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJidXR0b25cIiwge3R5cGU6IFwic3VibWl0XCIsIGlkOiBcImpvdXJuYWxFbnRyeUJ1dHRvblwifSwgXCJSZWNvcmQgSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBtb29kTGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IFwibW9vZFwiLCBpZDogXCJtb29kTGFiZWxcIn0sIFwiTW9vZCBmb3IgdGhlIERheVwiKVxuICAgIGxldCBtb29kT3B0aW9uQ3JlYXRvciA9ICgpPT57XG4gICAgICBsZXQgbW9vZE9wdGlvbnMgPSBbXCJIYXBweVwiLCBcIlNhZFwiLCBcIkZydXN0cmF0ZWRcIiwgXCJGaW5lXCJdXG4gICAgICBtb29kT3B0aW9ucy5mb3JFYWNoKChvcHRpb24pPT57XG4gICAgICAgIGxldCBtb29kU2VsZWN0aW9ucyA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogb3B0aW9uLnRvTG93ZXJDYXNlKCl9LCBvcHRpb24pXG4gICAgICAgIHJldHVybiBtb29kU2VsZWN0aW9uc1xuICAgICAgfSlcbiAgICAgIGxldCBtb29kU2VsZWN0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWxlY3RcIiwge25hbWU6IFwibW9vZFwiLCBpZDogXCJtb29kXCJ9LCBudWxsLCBtb29kU2VsZWN0aW9ucylcbiAgICAgIHJldHVybiBtb29kU2VsZWN0XG4gICAgICAvLyBtb29kU2VsZWN0LmFwcGVuZENoaWxkKG1vb2RTZWxlY3Rpb25zKVxuICAgIH1cbiAgICAvLyBsZXQgbW9vZE9wdGlvbkhhcHB5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImhhcHB5XCJ9LCBcIkhhcHB5XCIpXG4gICAgLy8gbGV0IG1vb2RPcHRpb25TYWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwic2FkXCJ9LCBcIlNhZFwiKVxuICAgIC8vIGxldCBtb29kT3B0aW9uRnJ1c3RyYXRlZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJmcnVzdHJhdGVkXCJ9LCBcIkZydXN0cmF0ZWRcIilcbiAgICAvLyBsZXQgbW9vZE9wdGlvbkZpbmUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZmluZVwifSwgXCJGaW5lXCIpXG4gICAgLy8gbGV0IG1vb2RTZWxlY3QgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlbGVjdFwiLCB7bmFtZTogXCJtb29kXCIsIGlkOiBcIm1vb2RcIn0sIG51bGwsIG1vb2RPcHRpb25GaW5lLCBtb29kT3B0aW9uRnJ1c3RyYXRlZCwgbW9vZE9wdGlvbkhhcHB5LCBtb29kT3B0aW9uU2FkKVxuICAgIGxldCBtb29kRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBtb29kTGFiZWwsIG1vb2RPcHRpb25DcmVhdG9yKCkpXG4gICAgLy8gbW9vZFNlbGVjdClcbiAgICBsZXQgZm9ybSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZm9ybVwiLCB7fSwgbnVsbCwgZGF0ZUVudHJ5LCBhdXRob3JOYW1lRW50cnksIGNvbmNlcHRzQ292ZXJlZEVudHJ5LCBqb3VybmFsRW50cnksIG1vb2RFbnRyeSwgZW50cnlCdXR0b24pXG4gICAgbWFuYWdlRE9NLmFwcGVuZFBhZ2VJdGVtcyhmb3JtLCBcImZsZXhib3hcIilcbiAgfSxcbiAgY3JlYXRlUmFkaW9CdXR0b25zOiAoKT0+e1xuICAgIGxldCBtb29kcyA9IFtcInNhZFwiLCBcImhhcHB5XCIsIFwiZmluZVwiLCBcImZydXN0cmF0ZWRcIl1cbiAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsKVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtb29kcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgaW5wdXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImlucHV0XCIsIHt0eXBlOiBcInJhZGlvXCIsIG5hbWU6IFwibW9vZFwiLCB2YWx1ZTogbW9vZHNbaV0sIGNsYXNzOiBcInJhZGlvQnV0dG9uXCIsIGlkOiBgZmlsdGVyLSR7bW9vZHNbaV19YH0pXG4gICAgICBsZXQgbGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IGBmaWx0ZXItJHttb29kc1tpXX1gfSwgbW9vZHNbaV0pXG4gICAgICBsZXQgd3JhcHBlckRpdiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZGl2XCIsIHt9LCBudWxsLCBpbnB1dCwgbGFiZWwpXG4gICAgICBmaWVsZHNldC5hcHBlbmRDaGlsZCh3cmFwcGVyRGl2KVxuICAgIH1cbiAgICBtYW5hZ2VET00uYXBwZW5kUGFnZUl0ZW1zKGZpZWxkc2V0LCBcImZpbHRlck1vb2RCdXR0b25zXCIpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZVBhZ2UiLCIvLyBWYWxpZGF0ZURhdGEuanM6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogdGFrZSBwcm92aWRlZCBkYXRhIGFuZCBjaGVjayBmb3IgcmVxdWlyZWQgc2VjdGlvbiBjb21wbGV0aW9uLCBjdXJzZSB3b3JkcywgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1xuXG5cbmNvbnN0IHZhbGlkYXRlSm91cm5hbEVudHJ5ID0ge1xuICBjbGVhclN0YXR1czogZmFsc2UsXG4gIHZhbGlkYXRlRm9ybTogKCk9PntcbiAgICBsZXQgZm9ybSA9ICQoXCJmb3JtXCIpXG4gICAgY29uc29sZS5sb2coZm9ybSlcbiAgICBpZigkKFwiZm9ybSA+IDppbnB1dFtyZXF1aXJlZF06dmlzaWJsZVwiKS52YWwoKSAhPT0gXCJcIil7XG4gICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcInBsZWFzZSBmaWxsIG91dCBhbGwgZmllbGRzXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0sXG5cbiAgb25seUFsbG93ZWRDaGFyYWN0ZXJzOiAoc29tZXRoaW5nKT0+e1xuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICBmb3IoY29uc3QgaW5wdXQgaW4gc29tZXRoaW5nKXtcbiAgICAgIGlmKHNvbWV0aGluZ1tpbnB1dF0ubWF0Y2goLyhbLWEtekEtWjAtOSgpe306O10rKS8pKXtcbiAgICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhlIGlucHV0IGhhcyBiZWVuIGFjY2VwdGVkXCIpXG4gICAgICB9IGVsc2V7XG4gICAgICAgIGFsZXJ0KGBZb3VyICR7aW5wdXR9IHN1Ym1pc3Npb24gY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzLiBQbGVhc2Ugb25seSBpbmNsdWRlIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIG9yICgpe307OiBhbmQgcmVzdWJtaXRgKVxuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXNcbiAgfSxcblxuICBtYXhpbXVtQ29uY2VwdEVudHJ5TGVuZ3RoOiAoKSA9PntcbiAgICBsZXQgY29uY2VwdFZhbHVlID0gJChcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsKClcbiAgICAvLyBpZihjb25jZXB0VmFsdWUubGVuZ3RoIDwgNSl7XG4gICAgLy8gICAkKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS5yZW1vdmVDbGFzcyhcIm1heExlbmd0aFwiKVxuICAgIC8vIH0gZWxzZVxuICAgIGlmKGNvbmNlcHRWYWx1ZS5sZW5ndGggPiA1KXtcbiAgICAgICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLmFkZENsYXNzKFwibWF4TGVuZ3RoXCIpXG4gICAgfVxuICB9XG59XG5cbi8vICAgbm9DdXJzZVdvcmRzOiAoKT0+e1xuLy8gICAgIC8vIFRlc3QgdGhhdCB0aGUgY29uY2VwdCBhbmQgZW50cnkgZmllbGRzIGNvbnRhaW4gbm8gY3Vyc2Ugd29yZHMuIFlvdSBjYW4gdXNlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIHRoYXQuXG4vLyAgIH1cblxuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeVxuIl19
