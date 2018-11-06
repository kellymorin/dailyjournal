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
  appendEntry: singleJournalEntry => {
    let entryDiv = document.querySelector(".entryLog"); // if (entryDiv.innerHTML === " "){

    let elementFragment = document.createDocumentFragment();
    elementFragment.appendChild(singleJournalEntry);
    entryDiv.appendChild(elementFragment); // }
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

var _DOMmanager = _interopRequireDefault(require("./DOMmanager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
EntryComponent: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,
*/
const buildEntry = {
  componentArray: [],
  singleJournalEntry: _elementFactory.default.elementFactory("section", {
    class: "journalSubmission"
  }),
  makeEntryElements: journalObj => {
    let type = ["h3", "p", "p", "p", "p"];
    let content = [journalObj.concept, journalObj.date, journalObj.name, journalObj.mood, journalObj.entry];
    let clazz = ["journalConcept", "journalDate", "journalAuthor", "journalMood", "journalEntry"];

    for (let i = 0; i < type.length; i++) {
      let element = _elementFactory.default.elementFactory(type[i], {
        class: clazz[i]
      }, content[i]);

      buildEntry.componentArray.push(element);
    }

    buildEntry.wrapEntryElement();
  },
  wrapEntryElement: () => {
    for (const item in buildEntry.componentArray) {
      buildEntry.singleJournalEntry.appendChild(buildEntry.componentArray[item]);
    }

    _DOMmanager.default.appendEntry(buildEntry.singleJournalEntry);
  }
};
var _default = buildEntry;
exports.default = _default;

},{"./DOMmanager":1,"./elementFactory":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    this.concept = props.name;
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
  } // save(){
  //   return journalEntries.saveJournalEntry(this.singleJournalEntry)
  // }


}

var _default = JournalEntry;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

var _validatedata = _interopRequireDefault(require("./validatedata"));

var _makePage = _interopRequireDefault(require("./makePage"));

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

var _journal = _interopRequireDefault(require("./journal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
DAILY JOURNAL 5
In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

*/
if (document.readyState === "loading") {
  _makePage.default.initiateForm();
}

let journal = [{
  concept: "something",
  date: "10/21/2018",
  name: "Kelly",
  mood: "happy",
  entry: "We learned some really difficult things today."
}, {
  concept: "santa",
  date: "10/28/2018",
  name: "Kelly",
  mood: "sad",
  entry: "Why santa no here yet?"
}];
journal.forEach(journal => _entryComponent.default.makeEntryElements(journal)); // const form = document.querySelector("form")
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
    console.log(newEntry.mood);
    console.log(newEntry.singleJournalEntry());

    _validatedata.default.onlyAllowedCharacters(newEntry.singleJournalEntry());
  }
}); // const entry = new journalEntry({
//   date: document.querySelector("#journalDate").value,
//   name: document.querySelector("#authorName").value,
//   concept: document.querySelector("#conceptsCovered").value,
//   entry: document.querySelector("#journalEntry").value,
//   mood: document.querySelector("#mood").value
// })
// console.log(entry)
// export default entry
// validateJournalEntry.onlyAllowedCharacters(entry)
// journalEntry.save()
// .then((data)=> {
//   console.log("new contact saved", data)
//   return getEntries()
// })
//     // NEED TO FINALIZE/UPDATE THIS
//     .then(entriesList => render("contact-list", entriesList))
//   }
// }

},{"./entryComponent":3,"./journal":4,"./makePage":6,"./validatedata":7}],6:[function(require,module,exports){
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

},{"./DOMmanager":1,"./elementFactory":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import captureInput from "./createEntry";
// ValidateData.js: Single Responsibility: take provided data and check for required section completion, curse words, and special characters
// import form from "./main"
// // import entry from "./main"
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
    }
  },
  onlyAllowedCharacters: something => {
    for (const input in something) {
      console.log("entry input", something[input]);

      if (something[input].match(/^([a-zA-Z0-9 _-]+)$/)) {
        console.log("the input has been accepted");
      } else {
        console.log("the input is invalid");
      }
    }
  } //     // No characters other than letters, numbers, (), {}, :, and ;
  //   },
  //   maximumConceptEntryLength: ()=>{
  //     // Pick a maximum length for concepts field and provide visual feedback if you type in a string that is longer than that maximum.
  //   },
  //   noCurseWords: ()=>{
  //     // Test that the concept and entry fields contain no curse words. You can use regular expressions for that.
  //   }
  // }

};
var _default = validateJournalEntry;
exports.default = _default;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9lbnRyeUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWFrZVBhZ2UuanMiLCIuLi9zY3JpcHRzL3ZhbGlkYXRlZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBO0FBR0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQjtBQUNBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFVBQXZCLENBQWQ7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtBQUNELEdBTmU7QUFPaEIsRUFBQSxXQUFXLEVBQUcsa0JBQUQsSUFBc0I7QUFDakMsUUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBZixDQURpQyxDQUVqQzs7QUFDRSxRQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBdEI7QUFDQSxJQUFBLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixrQkFBNUI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLGVBQXJCLEVBTCtCLENBTWpDO0FBQ0Q7QUFkZSxDQUFsQjtlQWlCZSxTOzs7Ozs7Ozs7O0FDckJmO0FBRUEsTUFBTSxXQUFXLEdBQUc7QUFDbEIsRUFBQSxjQUFjLEVBQUUsQ0FBQyxFQUFELEVBQUssYUFBTCxFQUFvQixPQUFwQixFQUE2QixHQUFHLFFBQWhDLEtBQTJDO0FBQ3pELFFBQUksT0FB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ZUF3Q2Usb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbi8vIGltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5cblxuY29uc3QgbWFuYWdlRE9NID0ge1xuICBhcHBlbmRGb3JtOiAoZm9ybSk9PntcbiAgICBsZXQgZm9ybUZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGxldCBmb3JtRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmbGV4Ym94XCIpXG4gICAgZm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm0pXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChmb3JtRnJhZ21lbnQpXG4gIH0sXG4gIGFwcGVuZEVudHJ5OiAoc2luZ2xlSm91cm5hbEVudHJ5KT0+e1xuICAgIGxldCBlbnRyeURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIilcbiAgICAvLyBpZiAoZW50cnlEaXYuaW5uZXJIVE1MID09PSBcIiBcIil7XG4gICAgICBsZXQgZWxlbWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgZWxlbWVudEZyYWdtZW50LmFwcGVuZENoaWxkKHNpbmdsZUpvdXJuYWxFbnRyeSlcbiAgICAgIGVudHJ5RGl2LmFwcGVuZENoaWxkKGVsZW1lbnRGcmFnbWVudClcbiAgICAvLyB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFuYWdlRE9NIiwiLy8gRWxlbWVudEZhY3RvcnkuanM6IExvb3Agb3ZlciBwcm92aWRlZCBpbmZvcm1hdGlvbiBhbmQgY3JlYXRlIEhUTUwgZWxlbWVudCB0aGF0IGNhbiBiZSBkaXNwbGF5ZWQgaW4gdGhlIERPTVxuXG5jb25zdCBtYWtlRWxlbWVudCA9IHtcbiAgZWxlbWVudEZhY3Rvcnk6IChlbCwgYXR0cmlidXRlc09iaiwgY29udGVudCwgLi4uY2hpbGRyZW4pPT57XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKVxuICAgIC8vIFNldCBBdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgYXR0ciBpbiBhdHRyaWJ1dGVzT2JqKXtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNPYmpbYXR0cl0pXG4gICAgfVxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50IHx8IG51bGxcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfSlcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VFbGVtZW50IiwiLypcbkVudHJ5Q29tcG9uZW50OiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IExvb3Agb3ZlciBwcm92aWRlZCBkYXRhIGFuZCBwcm9kdWNlIEhUTUwgdG8gYmUgZGlzcGxheWVkIHRvIHRoZSBET00sXG4qL1xuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCI7XG5cblxuY29uc3QgYnVpbGRFbnRyeSA9IHtcbiAgY29tcG9uZW50QXJyYXk6IFtdLFxuICBzaW5nbGVKb3VybmFsRW50cnk6IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwic2VjdGlvblwiLCB7Y2xhc3M6IFwiam91cm5hbFN1Ym1pc3Npb25cIn0pLFxuXG4gIG1ha2VFbnRyeUVsZW1lbnRzOiAoam91cm5hbE9iaik9PntcbiAgICBsZXQgdHlwZSA9IFtcImgzXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiXVxuICAgIGxldCBjb250ZW50ID0gW2pvdXJuYWxPYmouY29uY2VwdCwgam91cm5hbE9iai5kYXRlLCBqb3VybmFsT2JqLm5hbWUsIGpvdXJuYWxPYmoubW9vZCwgam91cm5hbE9iai5lbnRyeV1cbiAgICBsZXQgY2xhenogPSBbXCJqb3VybmFsQ29uY2VwdFwiLCBcImpvdXJuYWxEYXRlXCIsIFwiam91cm5hbEF1dGhvclwiLCBcImpvdXJuYWxNb29kXCIsIFwiam91cm5hbEVudHJ5XCJdXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHR5cGUubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGVsZW1lbnQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeSh0eXBlW2ldLCB7Y2xhc3M6IGNsYXp6W2ldfSwgY29udGVudFtpXSlcbiAgICAgIGJ1aWxkRW50cnkuY29tcG9uZW50QXJyYXkucHVzaChlbGVtZW50KVxuICAgIH1cbiAgICBidWlsZEVudHJ5LndyYXBFbnRyeUVsZW1lbnQoKVxuICB9LFxuXG4gIHdyYXBFbnRyeUVsZW1lbnQ6ICgpPT57XG4gICAgZm9yKGNvbnN0IGl0ZW0gaW4gYnVpbGRFbnRyeS5jb21wb25lbnRBcnJheSl7XG4gICAgICBidWlsZEVudHJ5LnNpbmdsZUpvdXJuYWxFbnRyeS5hcHBlbmRDaGlsZChidWlsZEVudHJ5LmNvbXBvbmVudEFycmF5W2l0ZW1dKVxuICAgIH1cbiAgICBtYW5hZ2VET00uYXBwZW5kRW50cnkoYnVpbGRFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRW50cnlcbiIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcblxuXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG5cbiAgICAgICAgICAgICAgY3JlYXRlQ29udGFjdENhcmQ6IChjb250YWN0SW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGNvbnRhY3RJbmZvKSk7XG4gICAgICAgICAgICAgICAgICBjb250YWN0TGlzdC5hZGRUb0xpc3QoZnJhZ21lbnQpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiovXG5cblxuY2xhc3MgSm91cm5hbEVudHJ5IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHRoaXMuZGF0ZSA9IHByb3BzLmRhdGVcbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lXG4gICAgdGhpcy5jb25jZXB0ID0gcHJvcHMubmFtZVxuICAgIHRoaXMuZW50cnkgPSBwcm9wcy5lbnRyeVxuICAgIHRoaXMubW9vZCA9IHByb3BzLm1vb2RcbiAgfVxuICBzaW5nbGVKb3VybmFsRW50cnkoKXtcbiAgICByZXR1cm4ge2RhdGU6IHRoaXMuZGF0ZSwgbmFtZTogdGhpcy5uYW1lLCBjb25jZXB0OiB0aGlzLmNvbmNlcHQsIGVudHJ5OiB0aGlzLmVudHJ5LCBtb29kOiB0aGlzLm1vb2R9XG4gIH1cbiAgLy8gc2F2ZSgpe1xuICAvLyAgIHJldHVybiBqb3VybmFsRW50cmllcy5zYXZlSm91cm5hbEVudHJ5KHRoaXMuc2luZ2xlSm91cm5hbEVudHJ5KVxuICAvLyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpvdXJuYWxFbnRyeSIsIi8qXG5EQUlMWSBKT1VSTkFMIDVcbkluIHlvdXIgbWFpbiBKYXZhU2NyaXB0IG1vZHVsZSAoam91cm5hbC5qcykgYWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIFJlY29yZCBKb3VybmFsIEVudHJ5IGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHlvdXIgZm9ybS4gV2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGJ1dHRvbiwgeW91IG5lZWQgdG8gY3JlYXRlIGEgbmV3IGVudHJ5IGluIHlvdXIgQVBJLiBUaGUgSFRUUCBtZXRob2QgdGhhdCB5b3UgdXNlIHRvIGNyZWF0ZSByZXNvdXJjZXMgaXMgUE9TVC4gR3VpZGFuY2Ugb24gc3ludGF4IGlzIHByb3ZpZGVkIGJlbG93LlxuXG4qL1xuXG5pbXBvcnQgdmFsaWRhdGVKb3VybmFsRW50cnkgZnJvbSBcIi4vdmFsaWRhdGVkYXRhXCJcbmltcG9ydCBtYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiXG5pbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXG5pbXBvcnQgSm91cm5hbEVudHJ5IGZyb20gXCIuL2pvdXJuYWxcIjtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKXtcbiAgbWFrZVBhZ2UuaW5pdGlhdGVGb3JtKCk7XG59XG5cbmxldCBqb3VybmFsID0gW3tcbiAgY29uY2VwdDogXCJzb21ldGhpbmdcIixcbiAgZGF0ZTogXCIxMC8yMS8yMDE4XCIsXG4gIG5hbWU6IFwiS2VsbHlcIixcbiAgbW9vZDogXCJoYXBweVwiLFxuICBlbnRyeTogXCJXZSBsZWFybmVkIHNvbWUgcmVhbGx5IGRpZmZpY3VsdCB0aGluZ3MgdG9kYXkuXCJcbn0sXG57XG4gIGNvbmNlcHQ6IFwic2FudGFcIixcbiAgZGF0ZTogXCIxMC8yOC8yMDE4XCIsXG4gIG5hbWU6IFwiS2VsbHlcIixcbiAgbW9vZDogXCJzYWRcIixcbiAgZW50cnk6IFwiV2h5IHNhbnRhIG5vIGhlcmUgeWV0P1wiXG59XG5cbl1cblxuam91cm5hbC5mb3JFYWNoKChqb3VybmFsKT0+YnVpbGRFbnRyeS5tYWtlRW50cnlFbGVtZW50cyhqb3VybmFsKSlcblxuXG5cbi8vIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuLy8gZXhwb3J0IGRlZmF1bHQgZm9ybVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeUJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KT0+e1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnNvbGUubG9nKFwidGhlIGZvcm0gaGFzIGJlZW4gY2xpY2tlZFwiKVxuXG4gIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm5vRW1wdHlWYWx1ZXMoKVxuICBpZih2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9PT0gdHJ1ZSl7XG4gICAgY29uc29sZS5sb2coXCJUaGUgc3RhdHVzIG9mIGNoZWNrIDEgaGFzIGNsZWFyZWRcIilcbiAgICBjb25zdCBuZXdFbnRyeSA9IG5ldyBKb3VybmFsRW50cnkoe1xuICAgICAgZGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRGF0ZVwiKS52YWx1ZSxcbiAgICAgIG5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXV0aG9yTmFtZVwiKS52YWx1ZSxcbiAgICAgIGNvbmNlcHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbHVlLFxuICAgICAgZW50cnk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5XCIpLnZhbHVlLFxuICAgICAgbW9vZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29kXCIpLnZhbHVlLFxuICAgIH0pXG4gICAgY29uc29sZS5sb2cobmV3RW50cnkubW9vZClcbiAgICBjb25zb2xlLmxvZyhuZXdFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5vbmx5QWxsb3dlZENoYXJhY3RlcnMobmV3RW50cnkuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gIH1cbn0pXG5cbiAgLy8gY29uc3QgZW50cnkgPSBuZXcgam91cm5hbEVudHJ5KHtcbiAgLy8gICBkYXRlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxEYXRlXCIpLnZhbHVlLFxuICAvLyAgIG5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXV0aG9yTmFtZVwiKS52YWx1ZSxcbiAgLy8gICBjb25jZXB0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWx1ZSxcbiAgLy8gICBlbnRyeTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikudmFsdWUsXG4gIC8vICAgbW9vZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29kXCIpLnZhbHVlXG4gIC8vIH0pXG4gIC8vIGNvbnNvbGUubG9nKGVudHJ5KVxuICAvLyBleHBvcnQgZGVmYXVsdCBlbnRyeVxuICAvLyB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5vbmx5QWxsb3dlZENoYXJhY3RlcnMoZW50cnkpXG4gIC8vIGpvdXJuYWxFbnRyeS5zYXZlKClcbiAgLy8gLnRoZW4oKGRhdGEpPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2coXCJuZXcgY29udGFjdCBzYXZlZFwiLCBkYXRhKVxuICAgIC8vICAgcmV0dXJuIGdldEVudHJpZXMoKVxuICAvLyB9KVxuICAvLyAgICAgLy8gTkVFRCBUTyBGSU5BTElaRS9VUERBVEUgVEhJU1xuICAvLyAgICAgLnRoZW4oZW50cmllc0xpc3QgPT4gcmVuZGVyKFwiY29udGFjdC1saXN0XCIsIGVudHJpZXNMaXN0KSlcbiAgLy8gICB9XG4gIC8vIH1cbiIsIi8vIE1ha2VQYWdlLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IEluaXRpYXRlIGZvcm0gYnVpbGQsIGNhbGwgYnVpbGQgcGFnZSB3aGljaCBsb29wcyBvdmVyIGRhdGEgYW5kIGNyZWF0ZXMgaW5wdXQgZWxlbWVudHMuIENhbGxzIGVsZW1lbnQgZmFjdG9yeSBmdW5jdGlvblxuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuaW1wb3J0IG1hbmFnZURPTSBmcm9tIFwiLi9ET01tYW5hZ2VyXCJcblxuY29uc3QgbWFrZVBhZ2UgPSB7XG4gIGJ1aWxkRm9ybTogKG5hbWUsIHR5cGUsIHRpdGxlKSA9PiB7XG4gICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBuYW1lfSwgdGl0bGUpXG4gICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogdHlwZSwgbmFtZTogbmFtZSwgaWQ6IG5hbWUsIHJlcXVpcmVkOiB0cnVlfSlcbiAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBsYWJlbCwgaW5wdXQpXG4gICAgcmV0dXJuIGZpZWxkc2V0XG4gIH0sXG5cbiAgaW5pdGlhdGVGb3JtOiAoKSA9PiB7XG4gICAgbGV0IGRhdGVFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImpvdXJuYWxEYXRlXCIsIFwiZGF0ZVwiLCBcIkRhdGUgb2YgZW50cnlcIilcbiAgICBsZXQgYXV0aG9yTmFtZUVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiYXV0aG9yTmFtZVwiLCBcInRleHRcIiwgXCJBdXRob3IgTmFtZVwiKTtcbiAgICBsZXQgY29uY2VwdHNDb3ZlcmVkRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJjb25jZXB0c0NvdmVyZWRcIiwgXCJ0ZXh0XCIsIFwiQ29uY2VwdHMgQ292ZXJlZFwiKVxuICAgIGxldCBqb3VybmFsRW50cnlMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJqb3VybmFsRW50cnlcIn0sIFwiSm91cm5hbCBFbnRyeVwiKVxuICAgIGxldCBqb3VybmFsRW50cnlUZXh0YXJlYSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwidGV4dGFyZWFcIiwge25hbWU6IFwiam91cm5hbEVudHJ5XCIsIGlkOiBcImpvdXJuYWxFbnRyeVwiLCBjb2xzOiBcIjYwXCIsIHJvd3M6IFwiMTBcIn0pXG4gICAgbGV0IGpvdXJuYWxFbnRyeSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGpvdXJuYWxFbnRyeUxhYmVsLCBqb3VybmFsRW50cnlUZXh0YXJlYSlcbiAgICBsZXQgZW50cnlCdXR0b24gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImJ1dHRvblwiLCB7dHlwZTogXCJzdWJtaXRcIiwgaWQ6IFwiam91cm5hbEVudHJ5QnV0dG9uXCJ9LCBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCIpXG4gICAgbGV0IG1vb2RMYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogXCJtb29kXCIsIGlkOiBcIm1vb2RMYWJlbFwifSwgXCJNb29kIGZvciB0aGUgRGF5XCIpXG4gICAgbGV0IG1vb2RPcHRpb25IYXBweSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJoYXBweVwifSwgXCJIYXBweVwiKVxuICAgIGxldCBtb29kT3B0aW9uU2FkID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcInNhZFwifSwgXCJTYWRcIilcbiAgICBsZXQgbW9vZE9wdGlvbkZydXN0cmF0ZWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZnJ1c3RyYXRlZFwifSwgXCJGcnVzdHJhdGVkXCIpXG4gICAgbGV0IG1vb2RPcHRpb25GaW5lID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZpbmVcIn0sIFwiRmluZVwiKVxuICAgIGxldCBtb29kU2VsZWN0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWxlY3RcIiwge25hbWU6IFwibW9vZFwiLCBpZDogXCJtb29kXCJ9LCBudWxsLCBtb29kT3B0aW9uRmluZSwgbW9vZE9wdGlvbkZydXN0cmF0ZWQsIG1vb2RPcHRpb25IYXBweSwgbW9vZE9wdGlvblNhZClcbiAgICBsZXQgbW9vZEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbW9vZExhYmVsLCBtb29kU2VsZWN0KVxuICAgIGxldCBmb3JtID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmb3JtXCIsIHt9LCBudWxsLCBkYXRlRW50cnksIGF1dGhvck5hbWVFbnRyeSwgY29uY2VwdHNDb3ZlcmVkRW50cnksIGpvdXJuYWxFbnRyeSwgbW9vZEVudHJ5LCBlbnRyeUJ1dHRvbilcbiAgICBjb25zb2xlLmxvZyhmb3JtKVxuICAgIG1hbmFnZURPTS5hcHBlbmRGb3JtKGZvcm0pXG4gICAgLy8gbWFrZVBhZ2UuYXBwZW5kRm9ybShmb3JtKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIiwiLy8gaW1wb3J0IGNhcHR1cmVJbnB1dCBmcm9tIFwiLi9jcmVhdGVFbnRyeVwiO1xuXG4vLyBWYWxpZGF0ZURhdGEuanM6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogdGFrZSBwcm92aWRlZCBkYXRhIGFuZCBjaGVjayBmb3IgcmVxdWlyZWQgc2VjdGlvbiBjb21wbGV0aW9uLCBjdXJzZSB3b3JkcywgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1xuXG4vLyBpbXBvcnQgZm9ybSBmcm9tIFwiLi9tYWluXCJcbi8vIC8vIGltcG9ydCBlbnRyeSBmcm9tIFwiLi9tYWluXCJcblxuY29uc3QgdmFsaWRhdGVKb3VybmFsRW50cnkgPSB7XG4gIGNsZWFyU3RhdHVzOiBmYWxzZSxcblxuICBub0VtcHR5VmFsdWVzOiAoKT0+e1xuICAgIGxldCBmb3JtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuICAgIGNvbnNvbGUubG9nKGZvcm0pXG4gICAgaWYoZm9ybS5jaGVja1ZhbGlkaXR5KCkgPT09IHRydWUpe1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGUgZm9ybSBpcyB2YWxpZFwiKVxuICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyh2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cylcbiAgICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcInBsZWFzZSBmaWxsIG91dCBhbGwgZmllbGRzXCIpXG4gICAgfVxuICB9LFxuXG4gIG9ubHlBbGxvd2VkQ2hhcmFjdGVyczogKHNvbWV0aGluZyk9PntcbiAgICBmb3IoY29uc3QgaW5wdXQgaW4gc29tZXRoaW5nKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiZW50cnkgaW5wdXRcIiwgc29tZXRoaW5nW2lucHV0XSlcbiAgICAgIGlmKHNvbWV0aGluZ1tpbnB1dF0ubWF0Y2goL14oW2EtekEtWjAtOSBfLV0rKSQvKSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhlIGlucHV0IGhhcyBiZWVuIGFjY2VwdGVkXCIpXG4gICAgICB9IGVsc2V7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhlIGlucHV0IGlzIGludmFsaWRcIilcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8vICAgICAvLyBObyBjaGFyYWN0ZXJzIG90aGVyIHRoYW4gbGV0dGVycywgbnVtYmVycywgKCksIHt9LCA6LCBhbmQgO1xuLy8gICB9LFxuXG4vLyAgIG1heGltdW1Db25jZXB0RW50cnlMZW5ndGg6ICgpPT57XG4vLyAgICAgLy8gUGljayBhIG1heGltdW0gbGVuZ3RoIGZvciBjb25jZXB0cyBmaWVsZCBhbmQgcHJvdmlkZSB2aXN1YWwgZmVlZGJhY2sgaWYgeW91IHR5cGUgaW4gYSBzdHJpbmcgdGhhdCBpcyBsb25nZXIgdGhhbiB0aGF0IG1heGltdW0uXG4vLyAgIH0sXG5cbi8vICAgbm9DdXJzZVdvcmRzOiAoKT0+e1xuLy8gICAgIC8vIFRlc3QgdGhhdCB0aGUgY29uY2VwdCBhbmQgZW50cnkgZmllbGRzIGNvbnRhaW4gbm8gY3Vyc2Ugd29yZHMuIFlvdSBjYW4gdXNlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIHRoYXQuXG4vLyAgIH1cblxuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeVxuIl19
