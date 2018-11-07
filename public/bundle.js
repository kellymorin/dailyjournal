(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

const elementSymbol = Symbol();

class DOMComponent {
  constructor(type, attributes, ...children) {
    this[elementSymbol] = document.createElement(type);
    /*
        If `attributes` is just a string, it's a simple element with no
        properties - just some text content
    */

    if (typeof attributes === "string") {
      this[elementSymbol].textContent = attributes;
      return this;
    } else if (typeof attributes === "object") {
      this[elementSymbol] = Object.assign(this[elementSymbol], attributes);
    }

    if (children.length) {
      children.forEach(child => {
        // One HTMLElement was passed in
        if (child.element instanceof window.Element) {
          this[elementSymbol].appendChild(child.element); // An array of elements was passed in
        } else if (Array.isArray(child.element)) {
          child.element.forEach(c => this[elementSymbol].appendChild(c)); // String value was passed in, set text content
        } else {
          this[elementSymbol].textContent = child;
        }
      });
    }

    return this;
  }

  get element() {
    return this[elementSymbol];
  }

  render(container) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this[elementSymbol]);
    document.querySelector(container).appendChild(fragment);
  }

}

module.exports = DOMComponent;

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

},{"./data":2,"./entryComponent":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nssDomcomponent = _interopRequireDefault(require("../lib/node_modules/nss-domcomponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
EntryComponent: Single Responsibility: Loop over provided data and produce HTML to be displayed to the DOM,
*/
class newEntry extends _nssDomcomponent.default {
  constructor(attributes, ...children) {
    super("section", attributes, ...children);
  }

}

class p extends _nssDomcomponent.default {
  constructor(attributes, ...children) {
    super("p", attributes, ...children);
  }

}

class H3 extends _nssDomcomponent.default {
  constructor(attributes, ...children) {
    super("h3", attributes, ...children);
  }

}

const buildEntry = {
  makeEntryElements: journalEntryObj => {
    const journalEntry = new newEntry({
      className: "singleJournalEntry"
    }, new H3({
      className: "journalConcept",
      textContent: journalEntryObj.concept
    }), new p({
      className: "journalDate",
      textContent: journalEntryObj.date
    }), new p({
      className: "journalAuthor",
      textContent: journalEntryObj.name
    }), new p({
      className: "journalMood",
      textContent: journalEntryObj.mood
    }), new p({
      className: "journalEntry",
      textContent: journalEntryObj.entry
    })).render("#entryLog");
  } // const buildEntry = {
  // makeEntryElements: (journalEntryObj)=>{
  // let concept = makeElement.elementFactory("h3", {class: "journalConcept"}, journalEntryObj.concept)
  // let date = makeElement.elementFactory("p", {class: "journalDate"}, journalEntryObj.date)
  // let author = makeElement.elementFactory("p", {class: "journalAuthor"}, journalEntryObj.name)
  // let mood = makeElement.elementFactory("p", {class: "journalMood"}, journalEntryObj.mood)
  // let entry = makeElement.elementFactory("p", {class: "journalEntry"}, journalEntryObj.entry)
  // let singleJournalEntry = makeElement.elementFactory("section", {class: "singleJournalEntry"}, null, concept, date, author, mood, entry)
  // return singleJournalEntry
  //     },
  // }

};
var _default = buildEntry;
exports.default = _default;

},{"../lib/node_modules/nss-domcomponent":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

var _data = _interopRequireDefault(require("./data"));

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
      $("#entryLog").empty();
      taco.map(item => _entryComponent.default.makeEntryElements(item));
    });
  }
};
var _default = filterEntries;
exports.default = _default;

},{"./data":2,"./entryComponent":4}],6:[function(require,module,exports){
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

},{"./data":2}],7:[function(require,module,exports){
"use strict";

var _validatedata = _interopRequireDefault(require("./validatedata"));

var _journal = _interopRequireDefault(require("./journal"));

var _data = _interopRequireDefault(require("./data"));

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

var _filterEntries = _interopRequireDefault(require("./filterEntries"));

var _makePage = _interopRequireDefault(require("./makePage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Main.js: Single responsibility: attach event listeners that call behavior at a specific time
*/
if (document.readyState === "loading") {
  _makePage.default.makeForm();

  _makePage.default.makeRadioButtons();

  _data.default.getEntries().then(data => _entriesDOM.default.buildList(data));

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
      newEntry.save().then(data => _entriesDOM.default.buildList(data)); // .then((taco)=> manageDOM.appendEntry(taco))
    } else {
      console.log("Your submission has been terminated, please try again");
    }
  }
});
$("#conceptsCovered").keypress(() => _validatedata.default.maximumConceptEntryLength());

},{"./data":2,"./entriesDOM":3,"./filterEntries":5,"./journal":6,"./makePage":8,"./validatedata":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nssDomcomponent = _interopRequireDefault(require("../lib/node_modules/nss-domcomponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MakePage.js: Single Responsibility: Initiate form build, call build page which loops over data and creates input elements. Calls element factory function
class Form extends _nssDomcomponent.default {
  constructor(attributes, ...children) {
    super("form", attributes, ...children);
  }

}

class Label extends _nssDomcomponent.default {
  constructor(attributes, ...children) {
    super("label", attributes, ...children);
  }

}

class Input extends _nssDomcomponent.default {
  constructor(attributes, ...children) {
    super("input", attributes, ...children);
  }

}

class formInput extends _nssDomcomponent.default {
  constructor(attributes) {
    super("fieldset", {}, new Label({
      for: attributes.name,
      textContent: attributes.text
    }), new Input({
      name: attributes.name,
      id: attributes.name,
      type: attributes.type
    }));
  }

}

const MakePage = {
  makeForm: () => {
    const journalForm = new Form({}, new formInput({
      name: "journalDate",
      type: "date",
      text: "Date of Entry"
    }), new formInput({
      name: "authorName",
      type: "text",
      text: "Author Name"
    }), new formInput({
      name: "conceptsCovered",
      type: "text",
      text: "Concepts Covered"
    }), new _nssDomcomponent.default("fieldset", {}, new Label({
      for: "journalEntry",
      textContent: "JournalEntry"
    }), new _nssDomcomponent.default("textarea", {
      name: "journalEntry",
      id: "journalEntry",
      cols: "60",
      rows: "10"
    })), new _nssDomcomponent.default("fieldset", {}, new Label({
      for: "mood",
      id: "moodLabel",
      textContent: "Mood for the Day"
    }), new _nssDomcomponent.default("select", {
      name: "mood",
      id: "mood"
    }, new _nssDomcomponent.default("option", {
      value: "happy",
      textContent: "Happy"
    }), new _nssDomcomponent.default("option", {
      value: "sad",
      textContent: "Sad"
    }), new _nssDomcomponent.default("option", {
      value: "frustrated",
      textContent: "Frustrated"
    }), new _nssDomcomponent.default("option", {
      value: "fine",
      textContent: "Fine"
    }))), new _nssDomcomponent.default("button", {
      type: "submit",
      id: "journalEntryButton",
      textContent: "Record Journal Entry"
    })).render("#flexbox");
  },
  makeRadioButtons: () => {
    const filterButtons = new _nssDomcomponent.default("fieldset", {}, new Label({
      for: "filter-happy",
      textContent: "Happy"
    }), new _nssDomcomponent.default("input", {
      type: "radio",
      name: "mood",
      value: "happy",
      className: "radioButton",
      id: "filter-happy"
    }), new Label({
      for: "filter-sad",
      textContent: "Sad"
    }), new _nssDomcomponent.default("input", {
      type: "radio",
      name: "mood",
      value: "sad",
      className: "radioButton",
      id: "filter-sad"
    }), new Label({
      for: "filter-frustrated",
      textContent: "Frustrated"
    }), new _nssDomcomponent.default("input", {
      type: "radio",
      name: "mood",
      value: "frustrated",
      className: "radioButton",
      id: "filter-frustrated"
    }), new Label({
      for: "filter-fine",
      textContent: "Fine"
    }), new _nssDomcomponent.default("input", {
      type: "radio",
      name: "mood",
      value: "fine",
      className: "radioButton",
      id: "filter-fine"
    })).render("#filterMoodButtons");
  }
};
var _default = MakePage; //   createRadioButtons: ()=>{
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

exports.default = _default;

},{"../lib/node_modules/nss-domcomponent":1}],9:[function(require,module,exports){
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

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvZGF0YS5qcyIsIi4uL3NjcmlwdHMvZW50cmllc0RPTS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2ZpbHRlckVudHJpZXMuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21ha2VQYWdlLmpzIiwiLi4vc2NyaXB0cy92YWxpZGF0ZWRhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN0QjtBQUNBLFlBQUksS0FBSyxDQUFDLE9BQU4sWUFBeUIsTUFBTSxDQUFDLE9BQXBDLEVBQTZDO0FBQ3pDLGVBQUssYUFBTCxFQUFvQixX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QUEseUJBQXlCLEVBQUUsTUFBSztBQUM5QixRQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixHQUF0QixFQUFuQixDQUQ4QixDQUU5QjtBQUNBO0FBQ0E7O0FBQ0EsUUFBRyxZQUFZLENBQUMsTUFBYixHQUFzQixDQUF6QixFQUEyQjtBQUN6QixNQUFBLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLFFBQXRCLENBQStCLFdBQS9CO0FBQ0Q7QUFDRixHQXJDMEIsQ0F3QzdCO0FBQ0E7QUFDQTtBQUVBOztBQTVDNkIsQ0FBN0I7ZUE4Q2Usb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiLypcbkRhdGEuanM6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogR2V0IGFuZCBwb3N0IHJlcXVlc3RzLCBvbmx5IGludGVyYWN0cyB3aXRoIHRoZSBBUEkvIERhdGFiYXNlLCBzaG91bGQgbm90IGJlIHVzZWQgdG8gY2FsbCBhbnkgb3RoZXIgZnVuY3Rpb25zXG4qL1xuXG5jb25zdCBqb3VybmFsRW50cmllcyA9IHtcbiAgZ2V0RW50cmllczogKCk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiKVxuICAgIC50aGVuKChlbnRyaWVzKSA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSm91cm5hbEVudHJ5OiAoam91cm5hbEVudHJ5KT0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoam91cm5hbEVudHJ5KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgam91cm5hbEVudHJpZXMiLCJpbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIjtcblxuLypcbmVudHJpZXNET00uanMgLSBNb3ZlIHRoZSBjb2RlIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIG1vZGlmeWluZyB0aGUgRE9NIGludG8gdGhpcyBmaWxlLlxuKi9cblxuLy8gLy8gSW5zZXJ0IHRoZSBmcmFnbWVudCBpbnRvIHRoZSBET00gYXMgY2hpbGRyZW4gb2YgdGhlIEVudHJ5IExvZyBzZWN0aW9uIGluIGluZGV4Lmh0bWxcblxuXG5jb25zdCBlbnRyaWVzTGlzdCA9IHtcbiAgYnVpbGRMaXN0OiAoKT0+e1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKClcbiAgICAudGhlbigoZW50cmllcyk9PiBlbnRyaWVzLm1hcChlbnRyeSA9PiBidWlsZEVudHJ5Lm1ha2VFbnRyeUVsZW1lbnRzKGVudHJ5KSkpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGVudHJpZXNMaXN0XG4iLCIvKlxuRW50cnlDb21wb25lbnQ6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogTG9vcCBvdmVyIHByb3ZpZGVkIGRhdGEgYW5kIHByb2R1Y2UgSFRNTCB0byBiZSBkaXNwbGF5ZWQgdG8gdGhlIERPTSxcbiovXG5cbmltcG9ydCBET01Db21wb25lbnQgZnJvbSBcIi4uL2xpYi9ub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudFwiXG5cbmNsYXNzIG5ld0VudHJ5IGV4dGVuZHMgRE9NQ29tcG9uZW50e1xuICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbil7XG4gICAgc3VwZXIoXCJzZWN0aW9uXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxuICB9XG59XG5cbmNsYXNzIHAgZXh0ZW5kcyBET01Db21wb25lbnR7XG4gIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKXtcbiAgICBzdXBlcihcInBcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXG4gIH1cbn1cbmNsYXNzIEgzIGV4dGVuZHMgRE9NQ29tcG9uZW50e1xuICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbil7XG4gICAgc3VwZXIoXCJoM1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcbiAgfVxufVxuXG5cbmNvbnN0IGJ1aWxkRW50cnkgPSB7XG4gIG1ha2VFbnRyeUVsZW1lbnRzOiAoam91cm5hbEVudHJ5T2JqKT0+IHtcbiAgICBjb25zdCBqb3VybmFsRW50cnkgPSBuZXcgbmV3RW50cnkoXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJzaW5nbGVKb3VybmFsRW50cnlcIixcblxuICAgICAgfSxcbiAgICAgIG5ldyBIMyh7XG4gICAgICAgIGNsYXNzTmFtZTogXCJqb3VybmFsQ29uY2VwdFwiLFxuICAgICAgICB0ZXh0Q29udGVudDogam91cm5hbEVudHJ5T2JqLmNvbmNlcHRcbiAgICAgIH0pLFxuICAgICAgbmV3IHAoe1xuICAgICAgICBjbGFzc05hbWU6IFwiam91cm5hbERhdGVcIixcbiAgICAgICAgdGV4dENvbnRlbnQ6IGpvdXJuYWxFbnRyeU9iai5kYXRlXG4gICAgICB9KSxcbiAgICAgIG5ldyBwKHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImpvdXJuYWxBdXRob3JcIixcbiAgICAgICAgdGV4dENvbnRlbnQ6IGpvdXJuYWxFbnRyeU9iai5uYW1lLFxuICAgICAgfSksXG4gICAgICBuZXcgcCh7XG4gICAgICAgIGNsYXNzTmFtZTogXCJqb3VybmFsTW9vZFwiLFxuICAgICAgICB0ZXh0Q29udGVudDogam91cm5hbEVudHJ5T2JqLm1vb2QsXG4gICAgICB9KSxcbiAgICAgIG5ldyBwICh7XG4gICAgICAgIGNsYXNzTmFtZTogXCJqb3VybmFsRW50cnlcIixcbiAgICAgICAgdGV4dENvbnRlbnQ6IGpvdXJuYWxFbnRyeU9iai5lbnRyeVxuICAgICAgfSlcbiAgICApLnJlbmRlcihcIiNlbnRyeUxvZ1wiKVxuICB9XG59XG5cblxuXG4vLyBjb25zdCBidWlsZEVudHJ5ID0ge1xuXG4gIC8vIG1ha2VFbnRyeUVsZW1lbnRzOiAoam91cm5hbEVudHJ5T2JqKT0+e1xuICAgIC8vIGxldCBjb25jZXB0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJoM1wiLCB7Y2xhc3M6IFwiam91cm5hbENvbmNlcHRcIn0sIGpvdXJuYWxFbnRyeU9iai5jb25jZXB0KVxuICAgIC8vIGxldCBkYXRlID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsRGF0ZVwifSwgam91cm5hbEVudHJ5T2JqLmRhdGUpXG4gICAgLy8gbGV0IGF1dGhvciA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbEF1dGhvclwifSwgam91cm5hbEVudHJ5T2JqLm5hbWUpXG4gICAgLy8gbGV0IG1vb2QgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxNb29kXCJ9LCBqb3VybmFsRW50cnlPYmoubW9vZClcbiAgICAvLyBsZXQgZW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxFbnRyeVwifSwgam91cm5hbEVudHJ5T2JqLmVudHJ5KVxuICAgIC8vIGxldCBzaW5nbGVKb3VybmFsRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlY3Rpb25cIiwge2NsYXNzOiBcInNpbmdsZUpvdXJuYWxFbnRyeVwifSwgbnVsbCwgY29uY2VwdCwgZGF0ZSwgYXV0aG9yLCBtb29kLCBlbnRyeSlcbiAgICAvLyByZXR1cm4gc2luZ2xlSm91cm5hbEVudHJ5XG4vLyAgICAgfSxcbi8vIH1cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRW50cnlcbiIsImltcG9ydCBidWlsZEVudHJ5IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiXG5cbmNvbnN0IGZpbHRlckVudHJpZXMgPSB7XG4gIG1vb2RTZWxlY3RvcjogKCkgPT57XG4gICAgJChcIi5yYWRpb0J1dHRvblwiKS5jbGljaygoKT0+e1xuICAgICAgbGV0IGZpbHRlcmVkTW9vZCA9ICgkKFwiaW5wdXQ6Y2hlY2tlZFwiKS52YWwoKSlcbiAgICAgIGZpbHRlckVudHJpZXMucmVzdHJpY3RFbnRyaWVzKGZpbHRlcmVkTW9vZClcbiAgICB9KVxuICB9LFxuXG4gIHJlc3RyaWN0RW50cmllczogKG1vb2QpPT57XG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKVxuICAgIC50aGVuKChlbnRyaWVzKT0+ZW50cmllcy5maWx0ZXIoKGVudHJ5KT0+IGVudHJ5Lm1vb2QgPT09IG1vb2QpXG4gICAgKS50aGVuKHRhY28gPT4ge1xuICAgICAgJChcIiNlbnRyeUxvZ1wiKS5lbXB0eSgpXG4gICAgICB0YWNvLm1hcChpdGVtID0+IGJ1aWxkRW50cnkubWFrZUVudHJ5RWxlbWVudHMoaXRlbSkpXG4gICAgfSlcbiAgICB9XG4gIH1cbmV4cG9ydCBkZWZhdWx0IGZpbHRlckVudHJpZXNcblxuIiwiXG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiXG5cbmNsYXNzIEpvdXJuYWxFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICB0aGlzLmRhdGUgPSBwcm9wcy5kYXRlXG4gICAgdGhpcy5uYW1lID0gcHJvcHMubmFtZVxuICAgIHRoaXMuY29uY2VwdCA9IHByb3BzLmNvbmNlcHRcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHMuZW50cnlcbiAgICB0aGlzLm1vb2QgPSBwcm9wcy5tb29kXG4gIH1cbiAgc2luZ2xlSm91cm5hbEVudHJ5KCl7XG4gICAgcmV0dXJuIHtkYXRlOiB0aGlzLmRhdGUsIG5hbWU6IHRoaXMubmFtZSwgY29uY2VwdDogdGhpcy5jb25jZXB0LCBlbnRyeTogdGhpcy5lbnRyeSwgbW9vZDogdGhpcy5tb29kfVxuICB9XG4gIHNhdmUoKXtcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuc2F2ZUpvdXJuYWxFbnRyeSh0aGlzLnNpbmdsZUpvdXJuYWxFbnRyeSgpKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpvdXJuYWxFbnRyeSIsIi8qXG5NYWluLmpzOiBTaW5nbGUgcmVzcG9uc2liaWxpdHk6IGF0dGFjaCBldmVudCBsaXN0ZW5lcnMgdGhhdCBjYWxsIGJlaGF2aW9yIGF0IGEgc3BlY2lmaWMgdGltZVxuKi9cblxuaW1wb3J0IHZhbGlkYXRlSm91cm5hbEVudHJ5IGZyb20gXCIuL3ZhbGlkYXRlZGF0YVwiXG5pbXBvcnQgSm91cm5hbEVudHJ5IGZyb20gXCIuL2pvdXJuYWxcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgZW50cmllc0xpc3QgZnJvbSBcIi4vZW50cmllc0RPTVwiO1xuaW1wb3J0IGZpbHRlckVudHJpZXMgZnJvbSBcIi4vZmlsdGVyRW50cmllc1wiO1xuaW1wb3J0IE1ha2VQYWdlIGZyb20gXCIuL21ha2VQYWdlXCI7XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIil7XG4gIE1ha2VQYWdlLm1ha2VGb3JtKClcbiAgTWFrZVBhZ2UubWFrZVJhZGlvQnV0dG9ucygpXG4gIGpvdXJuYWxFbnRyaWVzLmdldEVudHJpZXMoKS50aGVuKChkYXRhKT0+IGVudHJpZXNMaXN0LmJ1aWxkTGlzdChkYXRhKSlcbiAgZmlsdGVyRW50cmllcy5tb29kU2VsZWN0b3IoKTtcbn1cblxuXG4kKFwiI2pvdXJuYWxFbnRyeUJ1dHRvblwiKS5jbGljaygoZXZlbnQpPT57XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgY29uc29sZS5sb2coXCJ0aGUgZm9ybSBoYXMgYmVlbiBjbGlja2VkXCIpXG5cbiAgdmFsaWRhdGVKb3VybmFsRW50cnkudmFsaWRhdGVGb3JtKClcbiAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgIGNvbnNvbGUubG9nKFwiVGhlIHN0YXR1cyBvZiBjaGVjayAxIGhhcyBjbGVhcmVkXCIpXG4gICAgY29uc3QgbmV3RW50cnkgPSBuZXcgSm91cm5hbEVudHJ5KHtcbiAgICAgIGRhdGU6ICQoXCIjam91cm5hbERhdGVcIikudmFsKCksXG4gICAgICBuYW1lOiAkKFwiI2F1dGhvck5hbWVcIikudmFsKCksXG4gICAgICBjb25jZXB0OiAkKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWwoKSxcbiAgICAgIGVudHJ5OiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcbiAgICAgIG1vb2Q6ICQoXCIjbW9vZFwiKS52YWwoKSxcbiAgICB9KVxuICAgICQoXCJmb3JtXCIpLnRyaWdnZXIoXCJyZXNldFwiKVxuICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm9ubHlBbGxvd2VkQ2hhcmFjdGVycyhuZXdFbnRyeS5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgICBpZih2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9PT0gdHJ1ZSl7XG4gICAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMiBoYXMgY2xlYXJlZFwiKVxuICAgICAgbmV3RW50cnkuc2F2ZSgpXG4gICAgICAudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpXG4gICAgICAvLyAudGhlbigodGFjbyk9PiBtYW5hZ2VET00uYXBwZW5kRW50cnkodGFjbykpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiWW91ciBzdWJtaXNzaW9uIGhhcyBiZWVuIHRlcm1pbmF0ZWQsIHBsZWFzZSB0cnkgYWdhaW5cIilcbiAgICB9XG4gIH1cbn0pXG5cbiQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLmtleXByZXNzKCgpPT5cbiAgdmFsaWRhdGVKb3VybmFsRW50cnkubWF4aW11bUNvbmNlcHRFbnRyeUxlbmd0aCgpXG4pXG5cbiIsIi8vIE1ha2VQYWdlLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IEluaXRpYXRlIGZvcm0gYnVpbGQsIGNhbGwgYnVpbGQgcGFnZSB3aGljaCBsb29wcyBvdmVyIGRhdGEgYW5kIGNyZWF0ZXMgaW5wdXQgZWxlbWVudHMuIENhbGxzIGVsZW1lbnQgZmFjdG9yeSBmdW5jdGlvblxuXG5pbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxuXG5jbGFzcyBGb3JtIGV4dGVuZHMgRE9NQ29tcG9uZW50e1xuICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbil7XG4gICAgc3VwZXIoXCJmb3JtXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxuICB9XG59XG5cbmNsYXNzIExhYmVsIGV4dGVuZHMgRE9NQ29tcG9uZW50e1xuICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbil7XG4gICAgc3VwZXIoXCJsYWJlbFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcbiAgfVxufVxuXG5jbGFzcyBJbnB1dCBleHRlbmRzIERPTUNvbXBvbmVudHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pe1xuICAgIHN1cGVyKFwiaW5wdXRcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXG4gIH1cbn1cblxuY2xhc3MgZm9ybUlucHV0IGV4dGVuZHMgRE9NQ29tcG9uZW50e1xuICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzKXtcbiAgICBzdXBlcihcImZpZWxkc2V0XCIsIHt9LFxuICAgIG5ldyBMYWJlbCh7XG4gICAgICBmb3I6IGF0dHJpYnV0ZXMubmFtZSxcbiAgICAgIHRleHRDb250ZW50OiBhdHRyaWJ1dGVzLnRleHRcbiAgICB9KSxcbiAgICBuZXcgSW5wdXQoe1xuICAgICAgbmFtZTogYXR0cmlidXRlcy5uYW1lLFxuICAgICAgaWQ6IGF0dHJpYnV0ZXMubmFtZSxcbiAgICAgIHR5cGU6IGF0dHJpYnV0ZXMudHlwZVxuICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmNvbnN0IE1ha2VQYWdlID17XG4gIG1ha2VGb3JtOiAoKT0+e1xuICAgIGNvbnN0IGpvdXJuYWxGb3JtID0gbmV3IEZvcm0oe30sXG4gICAgICBuZXcgZm9ybUlucHV0KHtcbiAgICAgICAgbmFtZTogXCJqb3VybmFsRGF0ZVwiLFxuICAgICAgICB0eXBlOiBcImRhdGVcIixcbiAgICAgICAgdGV4dDogXCJEYXRlIG9mIEVudHJ5XCJcbiAgICAgIH0pLFxuICAgICAgbmV3IGZvcm1JbnB1dCh7XG4gICAgICAgIG5hbWU6IFwiYXV0aG9yTmFtZVwiLFxuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgdGV4dDogXCJBdXRob3IgTmFtZVwiLFxuICAgICAgfSksXG4gICAgICBuZXcgZm9ybUlucHV0KHtcbiAgICAgICAgbmFtZTogXCJjb25jZXB0c0NvdmVyZWRcIixcbiAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgIHRleHQ6IFwiQ29uY2VwdHMgQ292ZXJlZFwiXG4gICAgICB9KSxcbiAgICAgIG5ldyBET01Db21wb25lbnQoXCJmaWVsZHNldFwiLHt9LFxuICAgICAgbmV3IExhYmVsKHtmb3I6IFwiam91cm5hbEVudHJ5XCIsIHRleHRDb250ZW50OiBcIkpvdXJuYWxFbnRyeVwifSksXG4gICAgICBuZXcgRE9NQ29tcG9uZW50KFwidGV4dGFyZWFcIiwge25hbWU6IFwiam91cm5hbEVudHJ5XCIsIGlkOiBcImpvdXJuYWxFbnRyeVwiLCBjb2xzOiBcIjYwXCIsIHJvd3M6IFwiMTBcIn0pXG4gICAgICApLFxuICAgICAgbmV3IERPTUNvbXBvbmVudChcImZpZWxkc2V0XCIsIHt9LFxuICAgICAgICBuZXcgTGFiZWwoe2ZvcjogXCJtb29kXCIsIGlkOiBcIm1vb2RMYWJlbFwiLCB0ZXh0Q29udGVudDogXCJNb29kIGZvciB0aGUgRGF5XCJ9KSxcbiAgICAgICAgbmV3IERPTUNvbXBvbmVudChcInNlbGVjdFwiLHtuYW1lOiBcIm1vb2RcIiwgaWQ6IFwibW9vZFwifSxcbiAgICAgICAgICBuZXcgRE9NQ29tcG9uZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJoYXBweVwiLCB0ZXh0Q29udGVudDogXCJIYXBweVwifSksXG4gICAgICAgICAgbmV3IERPTUNvbXBvbmVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwic2FkXCIsIHRleHRDb250ZW50OiBcIlNhZFwifSksXG4gICAgICAgICAgbmV3IERPTUNvbXBvbmVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiZnJ1c3RyYXRlZFwiLCB0ZXh0Q29udGVudDogXCJGcnVzdHJhdGVkXCJ9KSxcbiAgICAgICAgICBuZXcgRE9NQ29tcG9uZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJmaW5lXCIsIHRleHRDb250ZW50OiBcIkZpbmVcIn0pLFxuICAgICAgICApXG5cbiAgICAgICksXG4gICAgICBuZXcgRE9NQ29tcG9uZW50KFwiYnV0dG9uXCIsIHt0eXBlOiBcInN1Ym1pdFwiLCBpZDogXCJqb3VybmFsRW50cnlCdXR0b25cIiwgdGV4dENvbnRlbnQ6IFwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIn0pXG4gICAgKS5yZW5kZXIoXCIjZmxleGJveFwiKVxuICB9LFxuICBtYWtlUmFkaW9CdXR0b25zOiAoKSA9PntcbiAgICBjb25zdCBmaWx0ZXJCdXR0b25zID0gbmV3IERPTUNvbXBvbmVudChcImZpZWxkc2V0XCIsIHt9LFxuICAgICAgICBuZXcgTGFiZWwoe1xuICAgICAgICAgIGZvcjogXCJmaWx0ZXItaGFwcHlcIixcbiAgICAgICAgICB0ZXh0Q29udGVudDogXCJIYXBweVwiXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgRE9NQ29tcG9uZW50KFwiaW5wdXRcIiwge1xuICAgICAgICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAgICAgICBuYW1lOiBcIm1vb2RcIixcbiAgICAgICAgICB2YWx1ZTogXCJoYXBweVwiLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRpb0J1dHRvblwiLFxuICAgICAgICAgIGlkOiBcImZpbHRlci1oYXBweVwiXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTGFiZWwoe1xuICAgICAgICAgIGZvcjogXCJmaWx0ZXItc2FkXCIsXG4gICAgICAgICAgdGV4dENvbnRlbnQ6IFwiU2FkXCJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBET01Db21wb25lbnQoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxuICAgICAgICAgIG5hbWU6IFwibW9vZFwiLFxuICAgICAgICAgIHZhbHVlOiBcInNhZFwiLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRpb0J1dHRvblwiLFxuICAgICAgICAgIGlkOiBcImZpbHRlci1zYWRcIlxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IExhYmVsKHtcbiAgICAgICAgICBmb3I6IFwiZmlsdGVyLWZydXN0cmF0ZWRcIixcbiAgICAgICAgICB0ZXh0Q29udGVudDogXCJGcnVzdHJhdGVkXCJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBET01Db21wb25lbnQoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxuICAgICAgICAgIG5hbWU6IFwibW9vZFwiLFxuICAgICAgICAgIHZhbHVlOiBcImZydXN0cmF0ZWRcIixcbiAgICAgICAgICBjbGFzc05hbWU6IFwicmFkaW9CdXR0b25cIixcbiAgICAgICAgICBpZDogXCJmaWx0ZXItZnJ1c3RyYXRlZFwiXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgTGFiZWwoe1xuICAgICAgICAgIGZvcjogXCJmaWx0ZXItZmluZVwiLFxuICAgICAgICAgIHRleHRDb250ZW50OiBcIkZpbmVcIlxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IERPTUNvbXBvbmVudChcImlucHV0XCIsIHtcbiAgICAgICAgICB0eXBlOiBcInJhZGlvXCIsXG4gICAgICAgICAgbmFtZTogXCJtb29kXCIsXG4gICAgICAgICAgdmFsdWU6IFwiZmluZVwiLFxuICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRpb0J1dHRvblwiLFxuICAgICAgICAgIGlkOiBcImZpbHRlci1maW5lXCJcbiAgICAgICAgfSlcbiAgICApLnJlbmRlcihcIiNmaWx0ZXJNb29kQnV0dG9uc1wiKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNYWtlUGFnZVxuXG5cblxuXG5cblxuXG5cbi8vICAgY3JlYXRlUmFkaW9CdXR0b25zOiAoKT0+e1xuLy8gICAgIGxldCBtb29kcyA9IFtcInNhZFwiLCBcImhhcHB5XCIsIFwiZmluZVwiLCBcImZydXN0cmF0ZWRcIl1cbi8vICAgICBsZXQgZmllbGRzZXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsKVxuLy8gICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtb29kcy5sZW5ndGg7IGkrKyl7XG4vLyAgICAgICBsZXQgaW5wdXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImlucHV0XCIsIHt0eXBlOiBcInJhZGlvXCIsIG5hbWU6IFwibW9vZFwiLCB2YWx1ZTogbW9vZHNbaV0sIGNsYXNzOiBcInJhZGlvQnV0dG9uXCIsIGlkOiBgZmlsdGVyLSR7bW9vZHNbaV19YH0pXG4vLyAgICAgICBsZXQgbGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IGBmaWx0ZXItJHttb29kc1tpXX1gfSwgbW9vZHNbaV0pXG4vLyAgICAgICBsZXQgd3JhcHBlckRpdiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZGl2XCIsIHt9LCBudWxsLCBpbnB1dCwgbGFiZWwpXG4vLyAgICAgICBmaWVsZHNldC5hcHBlbmRDaGlsZCh3cmFwcGVyRGl2KVxuLy8gICAgIH1cbi8vICAgICBtYW5hZ2VET00uYXBwZW5kUGFnZUl0ZW1zKGZpZWxkc2V0LCBcImZpbHRlck1vb2RCdXR0b25zXCIpXG4vLyAgIH1cbi8vIH1cblxuIiwiLy8gVmFsaWRhdGVEYXRhLmpzOiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IHRha2UgcHJvdmlkZWQgZGF0YSBhbmQgY2hlY2sgZm9yIHJlcXVpcmVkIHNlY3Rpb24gY29tcGxldGlvbiwgY3Vyc2Ugd29yZHMsIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnNcblxuXG5jb25zdCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSA9IHtcbiAgY2xlYXJTdGF0dXM6IGZhbHNlLFxuICB2YWxpZGF0ZUZvcm06ICgpPT57XG4gICAgbGV0IGZvcm0gPSAkKFwiZm9ybVwiKVxuICAgIGNvbnNvbGUubG9nKGZvcm0pXG4gICAgaWYoJChcImZvcm0gPiA6aW5wdXRbcmVxdWlyZWRdOnZpc2libGVcIikudmFsKCkgIT09IFwiXCIpe1xuICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyh2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cylcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJwbGVhc2UgZmlsbCBvdXQgYWxsIGZpZWxkc1wiKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9LFxuXG4gIG9ubHlBbGxvd2VkQ2hhcmFjdGVyczogKHNvbWV0aGluZyk9PntcbiAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IGZhbHNlXG4gICAgZm9yKGNvbnN0IGlucHV0IGluIHNvbWV0aGluZyl7XG4gICAgICBpZihzb21ldGhpbmdbaW5wdXRdLm1hdGNoKC8oWy1hLXpBLVowLTkoKXt9OjtdKykvKSl7XG4gICAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gdHJ1ZVxuICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBpbnB1dCBoYXMgYmVlbiBhY2NlcHRlZFwiKVxuICAgICAgfSBlbHNle1xuICAgICAgICBhbGVydChgWW91ciAke2lucHV0fSBzdWJtaXNzaW9uIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycy4gUGxlYXNlIG9ubHkgaW5jbHVkZSBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyBvciAoKXt9OzogYW5kIHJlc3VibWl0YClcbiAgICAgICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzXG4gIH0sXG5cbiAgbWF4aW11bUNvbmNlcHRFbnRyeUxlbmd0aDogKCkgPT57XG4gICAgbGV0IGNvbmNlcHRWYWx1ZSA9ICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbCgpXG4gICAgLy8gaWYoY29uY2VwdFZhbHVlLmxlbmd0aCA8IDUpe1xuICAgIC8vICAgJChcIiNjb25jZXB0c0NvdmVyZWRcIikucmVtb3ZlQ2xhc3MoXCJtYXhMZW5ndGhcIilcbiAgICAvLyB9IGVsc2VcbiAgICBpZihjb25jZXB0VmFsdWUubGVuZ3RoID4gNSl7XG4gICAgICAkKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS5hZGRDbGFzcyhcIm1heExlbmd0aFwiKVxuICAgIH1cbiAgfVxufVxuXG4vLyAgIG5vQ3Vyc2VXb3JkczogKCk9Pntcbi8vICAgICAvLyBUZXN0IHRoYXQgdGhlIGNvbmNlcHQgYW5kIGVudHJ5IGZpZWxkcyBjb250YWluIG5vIGN1cnNlIHdvcmRzLiBZb3UgY2FuIHVzZSByZWd1bGFyIGV4cHJlc3Npb25zIGZvciB0aGF0LlxuLy8gICB9XG5cbi8vIH1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVKb3VybmFsRW50cnlcbiJdfQ==
