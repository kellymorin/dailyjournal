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
    return fetch("http://localhost:8088/entries?_expand=mood").then(entries => entries.json());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvZGF0YS5qcyIsIi4uL3NjcmlwdHMvZW50cmllc0RPTS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2ZpbHRlckVudHJpZXMuanMiLCIuLi9zY3JpcHRzL2pvdXJuYWwuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21ha2VQYWdlLmpzIiwiLi4vc2NyaXB0cy92YWxpZGF0ZWRhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN0QjtBQUNBLFlBQUksS0FBSyxDQUFDLE9BQU4sWUFBeUIsTUFBTSxDQUFDLE9BQXBDLEVBQTZDO0FBQ3pDLGVBQUssYUFBTCxFQUFvQixX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QUEseUJBQXlCLEVBQUUsTUFBSztBQUM5QixRQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixHQUF0QixFQUFuQixDQUQ4QixDQUU5QjtBQUNBO0FBQ0E7O0FBQ0EsUUFBRyxZQUFZLENBQUMsTUFBYixHQUFzQixDQUF6QixFQUEyQjtBQUN6QixNQUFBLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLFFBQXRCLENBQStCLFdBQS9CO0FBQ0Q7QUFDRixHQXJDMEIsQ0F3QzdCO0FBQ0E7QUFDQTtBQUVBOztBQTVDNkIsQ0FBN0I7ZUE4Q2Usb0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiLypcbkRhdGEuanM6IFNpbmdsZSBSZXNwb25zaWJpbGl0eTogR2V0IGFuZCBwb3N0IHJlcXVlc3RzLCBvbmx5IGludGVyYWN0cyB3aXRoIHRoZSBBUEkvIERhdGFiYXNlLCBzaG91bGQgbm90IGJlIHVzZWQgdG8gY2FsbCBhbnkgb3RoZXIgZnVuY3Rpb25zXG4qL1xuXG5jb25zdCBqb3VybmFsRW50cmllcyA9IHtcbiAgZ2V0RW50cmllczogKCk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcz9fZXhwYW5kPW1vb2RcIilcbiAgICAudGhlbigoZW50cmllcykgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUpvdXJuYWxFbnRyeTogKGpvdXJuYWxFbnRyeSk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGpvdXJuYWxFbnRyeSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxFbnRyaWVzIiwiaW1wb3J0IGJ1aWxkRW50cnkgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIjtcbmltcG9ydCBqb3VybmFsRW50cmllcyBmcm9tIFwiLi9kYXRhXCI7XG5cbi8qXG5lbnRyaWVzRE9NLmpzIC0gTW92ZSB0aGUgY29kZSB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBtb2RpZnlpbmcgdGhlIERPTSBpbnRvIHRoaXMgZmlsZS5cbiovXG5cbi8vIC8vIEluc2VydCB0aGUgZnJhZ21lbnQgaW50byB0aGUgRE9NIGFzIGNoaWxkcmVuIG9mIHRoZSBFbnRyeSBMb2cgc2VjdGlvbiBpbiBpbmRleC5odG1sXG5cblxuY29uc3QgZW50cmllc0xpc3QgPSB7XG4gIGJ1aWxkTGlzdDogKCk9PntcbiAgICByZXR1cm4gam91cm5hbEVudHJpZXMuZ2V0RW50cmllcygpXG4gICAgLnRoZW4oKGVudHJpZXMpPT4gZW50cmllcy5tYXAoZW50cnkgPT4gYnVpbGRFbnRyeS5tYWtlRW50cnlFbGVtZW50cyhlbnRyeSkpKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBlbnRyaWVzTGlzdFxuIiwiLypcbkVudHJ5Q29tcG9uZW50OiBTaW5nbGUgUmVzcG9uc2liaWxpdHk6IExvb3Agb3ZlciBwcm92aWRlZCBkYXRhIGFuZCBwcm9kdWNlIEhUTUwgdG8gYmUgZGlzcGxheWVkIHRvIHRoZSBET00sXG4qL1xuXG5pbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxuXG5jbGFzcyBuZXdFbnRyeSBleHRlbmRzIERPTUNvbXBvbmVudHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pe1xuICAgIHN1cGVyKFwic2VjdGlvblwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcbiAgfVxufVxuXG5jbGFzcyBwIGV4dGVuZHMgRE9NQ29tcG9uZW50e1xuICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbil7XG4gICAgc3VwZXIoXCJwXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxuICB9XG59XG5jbGFzcyBIMyBleHRlbmRzIERPTUNvbXBvbmVudHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pe1xuICAgIHN1cGVyKFwiaDNcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXG4gIH1cbn1cblxuXG5jb25zdCBidWlsZEVudHJ5ID0ge1xuICBtYWtlRW50cnlFbGVtZW50czogKGpvdXJuYWxFbnRyeU9iaik9PiB7XG4gICAgY29uc3Qgam91cm5hbEVudHJ5ID0gbmV3IG5ld0VudHJ5KFxuICAgICAge1xuICAgICAgICBjbGFzc05hbWU6IFwic2luZ2xlSm91cm5hbEVudHJ5XCIsXG5cbiAgICAgIH0sXG4gICAgICBuZXcgSDMoe1xuICAgICAgICBjbGFzc05hbWU6IFwiam91cm5hbENvbmNlcHRcIixcbiAgICAgICAgdGV4dENvbnRlbnQ6IGpvdXJuYWxFbnRyeU9iai5jb25jZXB0XG4gICAgICB9KSxcbiAgICAgIG5ldyBwKHtcbiAgICAgICAgY2xhc3NOYW1lOiBcImpvdXJuYWxEYXRlXCIsXG4gICAgICAgIHRleHRDb250ZW50OiBqb3VybmFsRW50cnlPYmouZGF0ZVxuICAgICAgfSksXG4gICAgICBuZXcgcCh7XG4gICAgICAgIGNsYXNzTmFtZTogXCJqb3VybmFsQXV0aG9yXCIsXG4gICAgICAgIHRleHRDb250ZW50OiBqb3VybmFsRW50cnlPYmoubmFtZSxcbiAgICAgIH0pLFxuICAgICAgbmV3IHAoe1xuICAgICAgICBjbGFzc05hbWU6IFwiam91cm5hbE1vb2RcIixcbiAgICAgICAgdGV4dENvbnRlbnQ6IGpvdXJuYWxFbnRyeU9iai5tb29kLFxuICAgICAgfSksXG4gICAgICBuZXcgcCAoe1xuICAgICAgICBjbGFzc05hbWU6IFwiam91cm5hbEVudHJ5XCIsXG4gICAgICAgIHRleHRDb250ZW50OiBqb3VybmFsRW50cnlPYmouZW50cnlcbiAgICAgIH0pXG4gICAgKS5yZW5kZXIoXCIjZW50cnlMb2dcIilcbiAgfVxufVxuXG5cblxuLy8gY29uc3QgYnVpbGRFbnRyeSA9IHtcblxuICAvLyBtYWtlRW50cnlFbGVtZW50czogKGpvdXJuYWxFbnRyeU9iaik9PntcbiAgICAvLyBsZXQgY29uY2VwdCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaDNcIiwge2NsYXNzOiBcImpvdXJuYWxDb25jZXB0XCJ9LCBqb3VybmFsRW50cnlPYmouY29uY2VwdClcbiAgICAvLyBsZXQgZGF0ZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7Y2xhc3M6IFwiam91cm5hbERhdGVcIn0sIGpvdXJuYWxFbnRyeU9iai5kYXRlKVxuICAgIC8vIGxldCBhdXRob3IgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2NsYXNzOiBcImpvdXJuYWxBdXRob3JcIn0sIGpvdXJuYWxFbnRyeU9iai5uYW1lKVxuICAgIC8vIGxldCBtb29kID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsTW9vZFwifSwgam91cm5hbEVudHJ5T2JqLm1vb2QpXG4gICAgLy8gbGV0IGVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtjbGFzczogXCJqb3VybmFsRW50cnlcIn0sIGpvdXJuYWxFbnRyeU9iai5lbnRyeSlcbiAgICAvLyBsZXQgc2luZ2xlSm91cm5hbEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJzZWN0aW9uXCIsIHtjbGFzczogXCJzaW5nbGVKb3VybmFsRW50cnlcIn0sIG51bGwsIGNvbmNlcHQsIGRhdGUsIGF1dGhvciwgbW9vZCwgZW50cnkpXG4gICAgLy8gcmV0dXJuIHNpbmdsZUpvdXJuYWxFbnRyeVxuLy8gICAgIH0sXG4vLyB9XG5leHBvcnQgZGVmYXVsdCBidWlsZEVudHJ5XG4iLCJpbXBvcnQgYnVpbGRFbnRyeSBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiO1xuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIlxuXG5jb25zdCBmaWx0ZXJFbnRyaWVzID0ge1xuICBtb29kU2VsZWN0b3I6ICgpID0+e1xuICAgICQoXCIucmFkaW9CdXR0b25cIikuY2xpY2soKCk9PntcbiAgICAgIGxldCBmaWx0ZXJlZE1vb2QgPSAoJChcImlucHV0OmNoZWNrZWRcIikudmFsKCkpXG4gICAgICBmaWx0ZXJFbnRyaWVzLnJlc3RyaWN0RW50cmllcyhmaWx0ZXJlZE1vb2QpXG4gICAgfSlcbiAgfSxcblxuICByZXN0cmljdEVudHJpZXM6IChtb29kKT0+e1xuICAgIHJldHVybiBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKClcbiAgICAudGhlbigoZW50cmllcyk9PmVudHJpZXMuZmlsdGVyKChlbnRyeSk9PiBlbnRyeS5tb29kID09PSBtb29kKVxuICAgICkudGhlbih0YWNvID0+IHtcbiAgICAgICQoXCIjZW50cnlMb2dcIikuZW1wdHkoKVxuICAgICAgdGFjby5tYXAoaXRlbSA9PiBidWlsZEVudHJ5Lm1ha2VFbnRyeUVsZW1lbnRzKGl0ZW0pKVxuICAgIH0pXG4gICAgfVxuICB9XG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJFbnRyaWVzXG5cbiIsIlxuaW1wb3J0IGpvdXJuYWxFbnRyaWVzIGZyb20gXCIuL2RhdGFcIlxuXG5jbGFzcyBKb3VybmFsRW50cnkge1xuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgdGhpcy5kYXRlID0gcHJvcHMuZGF0ZVxuICAgIHRoaXMubmFtZSA9IHByb3BzLm5hbWVcbiAgICB0aGlzLmNvbmNlcHQgPSBwcm9wcy5jb25jZXB0XG4gICAgdGhpcy5lbnRyeSA9IHByb3BzLmVudHJ5XG4gICAgdGhpcy5tb29kID0gcHJvcHMubW9vZFxuICB9XG4gIHNpbmdsZUpvdXJuYWxFbnRyeSgpe1xuICAgIHJldHVybiB7ZGF0ZTogdGhpcy5kYXRlLCBuYW1lOiB0aGlzLm5hbWUsIGNvbmNlcHQ6IHRoaXMuY29uY2VwdCwgZW50cnk6IHRoaXMuZW50cnksIG1vb2Q6IHRoaXMubW9vZH1cbiAgfVxuICBzYXZlKCl7XG4gICAgcmV0dXJuIGpvdXJuYWxFbnRyaWVzLnNhdmVKb3VybmFsRW50cnkodGhpcy5zaW5nbGVKb3VybmFsRW50cnkoKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBKb3VybmFsRW50cnkiLCIvKlxuTWFpbi5qczogU2luZ2xlIHJlc3BvbnNpYmlsaXR5OiBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRoYXQgY2FsbCBiZWhhdmlvciBhdCBhIHNwZWNpZmljIHRpbWVcbiovXG5cbmltcG9ydCB2YWxpZGF0ZUpvdXJuYWxFbnRyeSBmcm9tIFwiLi92YWxpZGF0ZWRhdGFcIlxuaW1wb3J0IEpvdXJuYWxFbnRyeSBmcm9tIFwiLi9qb3VybmFsXCI7XG5pbXBvcnQgam91cm5hbEVudHJpZXMgZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IGVudHJpZXNMaXN0IGZyb20gXCIuL2VudHJpZXNET01cIjtcbmltcG9ydCBmaWx0ZXJFbnRyaWVzIGZyb20gXCIuL2ZpbHRlckVudHJpZXNcIjtcbmltcG9ydCBNYWtlUGFnZSBmcm9tIFwiLi9tYWtlUGFnZVwiO1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpe1xuICBNYWtlUGFnZS5tYWtlRm9ybSgpXG4gIE1ha2VQYWdlLm1ha2VSYWRpb0J1dHRvbnMoKVxuICBqb3VybmFsRW50cmllcy5nZXRFbnRyaWVzKCkudGhlbigoZGF0YSk9PiBlbnRyaWVzTGlzdC5idWlsZExpc3QoZGF0YSkpXG4gIGZpbHRlckVudHJpZXMubW9vZFNlbGVjdG9yKCk7XG59XG5cblxuJChcIiNqb3VybmFsRW50cnlCdXR0b25cIikuY2xpY2soKGV2ZW50KT0+e1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIGNvbnNvbGUubG9nKFwidGhlIGZvcm0gaGFzIGJlZW4gY2xpY2tlZFwiKVxuXG4gIHZhbGlkYXRlSm91cm5hbEVudHJ5LnZhbGlkYXRlRm9ybSgpXG4gIGlmKHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID09PSB0cnVlKXtcbiAgICBjb25zb2xlLmxvZyhcIlRoZSBzdGF0dXMgb2YgY2hlY2sgMSBoYXMgY2xlYXJlZFwiKVxuICAgIGNvbnN0IG5ld0VudHJ5ID0gbmV3IEpvdXJuYWxFbnRyeSh7XG4gICAgICBkYXRlOiAkKFwiI2pvdXJuYWxEYXRlXCIpLnZhbCgpLFxuICAgICAgbmFtZTogJChcIiNhdXRob3JOYW1lXCIpLnZhbCgpLFxuICAgICAgY29uY2VwdDogJChcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsKCksXG4gICAgICBlbnRyeTogJChcIiNqb3VybmFsRW50cnlcIikudmFsKCksXG4gICAgICBtb29kOiAkKFwiI21vb2RcIikudmFsKCksXG4gICAgfSlcbiAgICAkKFwiZm9ybVwiKS50cmlnZ2VyKFwicmVzZXRcIilcbiAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5vbmx5QWxsb3dlZENoYXJhY3RlcnMobmV3RW50cnkuc2luZ2xlSm91cm5hbEVudHJ5KCkpXG4gICAgaWYodmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPT09IHRydWUpe1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgc3RhdHVzIG9mIGNoZWNrIDIgaGFzIGNsZWFyZWRcIilcbiAgICAgIG5ld0VudHJ5LnNhdmUoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4gZW50cmllc0xpc3QuYnVpbGRMaXN0KGRhdGEpKVxuICAgICAgLy8gLnRoZW4oKHRhY28pPT4gbWFuYWdlRE9NLmFwcGVuZEVudHJ5KHRhY28pKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIllvdXIgc3VibWlzc2lvbiBoYXMgYmVlbiB0ZXJtaW5hdGVkLCBwbGVhc2UgdHJ5IGFnYWluXCIpXG4gICAgfVxuICB9XG59KVxuXG4kKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS5rZXlwcmVzcygoKT0+XG4gIHZhbGlkYXRlSm91cm5hbEVudHJ5Lm1heGltdW1Db25jZXB0RW50cnlMZW5ndGgoKVxuKVxuXG4iLCIvLyBNYWtlUGFnZS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiBJbml0aWF0ZSBmb3JtIGJ1aWxkLCBjYWxsIGJ1aWxkIHBhZ2Ugd2hpY2ggbG9vcHMgb3ZlciBkYXRhIGFuZCBjcmVhdGVzIGlucHV0IGVsZW1lbnRzLiBDYWxscyBlbGVtZW50IGZhY3RvcnkgZnVuY3Rpb25cblxuaW1wb3J0IERPTUNvbXBvbmVudCBmcm9tIFwiLi4vbGliL25vZGVfbW9kdWxlcy9uc3MtZG9tY29tcG9uZW50XCJcblxuY2xhc3MgRm9ybSBleHRlbmRzIERPTUNvbXBvbmVudHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pe1xuICAgIHN1cGVyKFwiZm9ybVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcbiAgfVxufVxuXG5jbGFzcyBMYWJlbCBleHRlbmRzIERPTUNvbXBvbmVudHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pe1xuICAgIHN1cGVyKFwibGFiZWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXG4gIH1cbn1cblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBET01Db21wb25lbnR7XG4gIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKXtcbiAgICBzdXBlcihcImlucHV0XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxuICB9XG59XG5cbmNsYXNzIGZvcm1JbnB1dCBleHRlbmRzIERPTUNvbXBvbmVudHtcbiAgY29uc3RydWN0b3IoYXR0cmlidXRlcyl7XG4gICAgc3VwZXIoXCJmaWVsZHNldFwiLCB7fSxcbiAgICBuZXcgTGFiZWwoe1xuICAgICAgZm9yOiBhdHRyaWJ1dGVzLm5hbWUsXG4gICAgICB0ZXh0Q29udGVudDogYXR0cmlidXRlcy50ZXh0XG4gICAgfSksXG4gICAgbmV3IElucHV0KHtcbiAgICAgIG5hbWU6IGF0dHJpYnV0ZXMubmFtZSxcbiAgICAgIGlkOiBhdHRyaWJ1dGVzLm5hbWUsXG4gICAgICB0eXBlOiBhdHRyaWJ1dGVzLnR5cGVcbiAgICB9KVxuICAgIClcbiAgfVxufVxuXG5jb25zdCBNYWtlUGFnZSA9e1xuICBtYWtlRm9ybTogKCk9PntcbiAgICBjb25zdCBqb3VybmFsRm9ybSA9IG5ldyBGb3JtKHt9LFxuICAgICAgbmV3IGZvcm1JbnB1dCh7XG4gICAgICAgIG5hbWU6IFwiam91cm5hbERhdGVcIixcbiAgICAgICAgdHlwZTogXCJkYXRlXCIsXG4gICAgICAgIHRleHQ6IFwiRGF0ZSBvZiBFbnRyeVwiXG4gICAgICB9KSxcbiAgICAgIG5ldyBmb3JtSW5wdXQoe1xuICAgICAgICBuYW1lOiBcImF1dGhvck5hbWVcIixcbiAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgIHRleHQ6IFwiQXV0aG9yIE5hbWVcIixcbiAgICAgIH0pLFxuICAgICAgbmV3IGZvcm1JbnB1dCh7XG4gICAgICAgIG5hbWU6IFwiY29uY2VwdHNDb3ZlcmVkXCIsXG4gICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICB0ZXh0OiBcIkNvbmNlcHRzIENvdmVyZWRcIlxuICAgICAgfSksXG4gICAgICBuZXcgRE9NQ29tcG9uZW50KFwiZmllbGRzZXRcIix7fSxcbiAgICAgIG5ldyBMYWJlbCh7Zm9yOiBcImpvdXJuYWxFbnRyeVwiLCB0ZXh0Q29udGVudDogXCJKb3VybmFsRW50cnlcIn0pLFxuICAgICAgbmV3IERPTUNvbXBvbmVudChcInRleHRhcmVhXCIsIHtuYW1lOiBcImpvdXJuYWxFbnRyeVwiLCBpZDogXCJqb3VybmFsRW50cnlcIiwgY29sczogXCI2MFwiLCByb3dzOiBcIjEwXCJ9KVxuICAgICAgKSxcbiAgICAgIG5ldyBET01Db21wb25lbnQoXCJmaWVsZHNldFwiLCB7fSxcbiAgICAgICAgbmV3IExhYmVsKHtmb3I6IFwibW9vZFwiLCBpZDogXCJtb29kTGFiZWxcIiwgdGV4dENvbnRlbnQ6IFwiTW9vZCBmb3IgdGhlIERheVwifSksXG4gICAgICAgIG5ldyBET01Db21wb25lbnQoXCJzZWxlY3RcIix7bmFtZTogXCJtb29kXCIsIGlkOiBcIm1vb2RcIn0sXG4gICAgICAgICAgbmV3IERPTUNvbXBvbmVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiaGFwcHlcIiwgdGV4dENvbnRlbnQ6IFwiSGFwcHlcIn0pLFxuICAgICAgICAgIG5ldyBET01Db21wb25lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcInNhZFwiLCB0ZXh0Q29udGVudDogXCJTYWRcIn0pLFxuICAgICAgICAgIG5ldyBET01Db21wb25lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBcImZydXN0cmF0ZWRcIiwgdGV4dENvbnRlbnQ6IFwiRnJ1c3RyYXRlZFwifSksXG4gICAgICAgICAgbmV3IERPTUNvbXBvbmVudChcIm9wdGlvblwiLCB7dmFsdWU6IFwiZmluZVwiLCB0ZXh0Q29udGVudDogXCJGaW5lXCJ9KSxcbiAgICAgICAgKVxuXG4gICAgICApLFxuICAgICAgbmV3IERPTUNvbXBvbmVudChcImJ1dHRvblwiLCB7dHlwZTogXCJzdWJtaXRcIiwgaWQ6IFwiam91cm5hbEVudHJ5QnV0dG9uXCIsIHRleHRDb250ZW50OiBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCJ9KVxuICAgICkucmVuZGVyKFwiI2ZsZXhib3hcIilcbiAgfSxcbiAgbWFrZVJhZGlvQnV0dG9uczogKCkgPT57XG4gICAgY29uc3QgZmlsdGVyQnV0dG9ucyA9IG5ldyBET01Db21wb25lbnQoXCJmaWVsZHNldFwiLCB7fSxcbiAgICAgICAgbmV3IExhYmVsKHtcbiAgICAgICAgICBmb3I6IFwiZmlsdGVyLWhhcHB5XCIsXG4gICAgICAgICAgdGV4dENvbnRlbnQ6IFwiSGFwcHlcIlxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IERPTUNvbXBvbmVudChcImlucHV0XCIsIHtcbiAgICAgICAgICB0eXBlOiBcInJhZGlvXCIsXG4gICAgICAgICAgbmFtZTogXCJtb29kXCIsXG4gICAgICAgICAgdmFsdWU6IFwiaGFwcHlcIixcbiAgICAgICAgICBjbGFzc05hbWU6IFwicmFkaW9CdXR0b25cIixcbiAgICAgICAgICBpZDogXCJmaWx0ZXItaGFwcHlcIlxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IExhYmVsKHtcbiAgICAgICAgICBmb3I6IFwiZmlsdGVyLXNhZFwiLFxuICAgICAgICAgIHRleHRDb250ZW50OiBcIlNhZFwiXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgRE9NQ29tcG9uZW50KFwiaW5wdXRcIiwge1xuICAgICAgICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAgICAgICBuYW1lOiBcIm1vb2RcIixcbiAgICAgICAgICB2YWx1ZTogXCJzYWRcIixcbiAgICAgICAgICBjbGFzc05hbWU6IFwicmFkaW9CdXR0b25cIixcbiAgICAgICAgICBpZDogXCJmaWx0ZXItc2FkXCJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBMYWJlbCh7XG4gICAgICAgICAgZm9yOiBcImZpbHRlci1mcnVzdHJhdGVkXCIsXG4gICAgICAgICAgdGV4dENvbnRlbnQ6IFwiRnJ1c3RyYXRlZFwiXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgRE9NQ29tcG9uZW50KFwiaW5wdXRcIiwge1xuICAgICAgICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAgICAgICBuYW1lOiBcIm1vb2RcIixcbiAgICAgICAgICB2YWx1ZTogXCJmcnVzdHJhdGVkXCIsXG4gICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGlvQnV0dG9uXCIsXG4gICAgICAgICAgaWQ6IFwiZmlsdGVyLWZydXN0cmF0ZWRcIlxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IExhYmVsKHtcbiAgICAgICAgICBmb3I6IFwiZmlsdGVyLWZpbmVcIixcbiAgICAgICAgICB0ZXh0Q29udGVudDogXCJGaW5lXCJcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBET01Db21wb25lbnQoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxuICAgICAgICAgIG5hbWU6IFwibW9vZFwiLFxuICAgICAgICAgIHZhbHVlOiBcImZpbmVcIixcbiAgICAgICAgICBjbGFzc05hbWU6IFwicmFkaW9CdXR0b25cIixcbiAgICAgICAgICBpZDogXCJmaWx0ZXItZmluZVwiXG4gICAgICAgIH0pXG4gICAgKS5yZW5kZXIoXCIjZmlsdGVyTW9vZEJ1dHRvbnNcIilcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTWFrZVBhZ2VcblxuXG5cblxuXG5cblxuXG4vLyAgIGNyZWF0ZVJhZGlvQnV0dG9uczogKCk9Pntcbi8vICAgICBsZXQgbW9vZHMgPSBbXCJzYWRcIiwgXCJoYXBweVwiLCBcImZpbmVcIiwgXCJmcnVzdHJhdGVkXCJdXG4vLyAgICAgbGV0IGZpZWxkc2V0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbClcbi8vICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbW9vZHMubGVuZ3RoOyBpKyspe1xuLy8gICAgICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogXCJyYWRpb1wiLCBuYW1lOiBcIm1vb2RcIiwgdmFsdWU6IG1vb2RzW2ldLCBjbGFzczogXCJyYWRpb0J1dHRvblwiLCBpZDogYGZpbHRlci0ke21vb2RzW2ldfWB9KVxuLy8gICAgICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBgZmlsdGVyLSR7bW9vZHNbaV19YH0sIG1vb2RzW2ldKVxuLy8gICAgICAgbGV0IHdyYXBwZXJEaXYgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImRpdlwiLCB7fSwgbnVsbCwgaW5wdXQsIGxhYmVsKVxuLy8gICAgICAgZmllbGRzZXQuYXBwZW5kQ2hpbGQod3JhcHBlckRpdilcbi8vICAgICB9XG4vLyAgICAgbWFuYWdlRE9NLmFwcGVuZFBhZ2VJdGVtcyhmaWVsZHNldCwgXCJmaWx0ZXJNb29kQnV0dG9uc1wiKVxuLy8gICB9XG4vLyB9XG5cbiIsIi8vIFZhbGlkYXRlRGF0YS5qczogU2luZ2xlIFJlc3BvbnNpYmlsaXR5OiB0YWtlIHByb3ZpZGVkIGRhdGEgYW5kIGNoZWNrIGZvciByZXF1aXJlZCBzZWN0aW9uIGNvbXBsZXRpb24sIGN1cnNlIHdvcmRzLCBhbmQgc3BlY2lhbCBjaGFyYWN0ZXJzXG5cblxuY29uc3QgdmFsaWRhdGVKb3VybmFsRW50cnkgPSB7XG4gIGNsZWFyU3RhdHVzOiBmYWxzZSxcbiAgdmFsaWRhdGVGb3JtOiAoKT0+e1xuICAgIGxldCBmb3JtID0gJChcImZvcm1cIilcbiAgICBjb25zb2xlLmxvZyhmb3JtKVxuICAgIGlmKCQoXCJmb3JtID4gOmlucHV0W3JlcXVpcmVkXTp2aXNpYmxlXCIpLnZhbCgpICE9PSBcIlwiKXtcbiAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2codmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwicGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHNcIilcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSxcblxuICBvbmx5QWxsb3dlZENoYXJhY3RlcnM6IChzb21ldGhpbmcpPT57XG4gICAgdmFsaWRhdGVKb3VybmFsRW50cnkuY2xlYXJTdGF0dXMgPSBmYWxzZVxuICAgIGZvcihjb25zdCBpbnB1dCBpbiBzb21ldGhpbmcpe1xuICAgICAgaWYoc29tZXRoaW5nW2lucHV0XS5tYXRjaCgvKFstYS16QS1aMC05KCl7fTo7XSspLykpe1xuICAgICAgICB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1cyA9IHRydWVcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgaW5wdXQgaGFzIGJlZW4gYWNjZXB0ZWRcIilcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgYWxlcnQoYFlvdXIgJHtpbnB1dH0gc3VibWlzc2lvbiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMuIFBsZWFzZSBvbmx5IGluY2x1ZGUgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgb3IgKCl7fTs6IGFuZCByZXN1Ym1pdGApXG4gICAgICAgIHZhbGlkYXRlSm91cm5hbEVudHJ5LmNsZWFyU3RhdHVzID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0ZUpvdXJuYWxFbnRyeS5jbGVhclN0YXR1c1xuICB9LFxuXG4gIG1heGltdW1Db25jZXB0RW50cnlMZW5ndGg6ICgpID0+e1xuICAgIGxldCBjb25jZXB0VmFsdWUgPSAkKFwiI2NvbmNlcHRzQ292ZXJlZFwiKS52YWwoKVxuICAgIC8vIGlmKGNvbmNlcHRWYWx1ZS5sZW5ndGggPCA1KXtcbiAgICAvLyAgICQoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnJlbW92ZUNsYXNzKFwibWF4TGVuZ3RoXCIpXG4gICAgLy8gfSBlbHNlXG4gICAgaWYoY29uY2VwdFZhbHVlLmxlbmd0aCA+IDUpe1xuICAgICAgJChcIiNjb25jZXB0c0NvdmVyZWRcIikuYWRkQ2xhc3MoXCJtYXhMZW5ndGhcIilcbiAgICB9XG4gIH1cbn1cblxuLy8gICBub0N1cnNlV29yZHM6ICgpPT57XG4vLyAgICAgLy8gVGVzdCB0aGF0IHRoZSBjb25jZXB0IGFuZCBlbnRyeSBmaWVsZHMgY29udGFpbiBubyBjdXJzZSB3b3Jkcy4gWW91IGNhbiB1c2UgcmVndWxhciBleHByZXNzaW9ucyBmb3IgdGhhdC5cbi8vICAgfVxuXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlSm91cm5hbEVudHJ5XG4iXX0=
