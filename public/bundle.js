(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
DAILY JOURNAL 5
Create a module that defines a function for building the form fields dynamically instead of them being hard-coded in the HTML.





DAILY JOURNAL 8
And your dom/DOMManagerjs component could look something like this.

import EntryFactory from "./dom/entryComponentFactory"

const entriesContainer = document.querySelector(".entryLog")

class DOMManager {
    renderEntries (entries) {
        entriesContainer.textContent = ""

        for (entry of entries) {
            const entryComponent = EntryFactory.create(entry)
            entriesContainer.innerHTML += entryComponent
        }
    }
}

const entryDOMManager = new DOMManager()

export default entryDOMManager

Performance: The entriesContainer variable is defined at the module level instead of in the renderEntries() function. Why? It is for performance. If it was defined in the renderEntries() function, then each time the method is called, the DOM would have to be queried to obtain a reference to the element with a class of entryLog.

Vocabulary: The code above shows an example of the Singleton Pattern since the module exports a single instance of the DOMManager class. Every other module will use that single instance.

Vocabulary: The code above creates a closure around the entriesContainer module variable.
*/
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
      id: "mood"
    });

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

    makePage.appendForm(form);
  },
  appendForm: form => {
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#flexbox");
    formFragment.appendChild(form);
    formDiv.appendChild(formFragment);
  }
};
var _default = makePage;
exports.default = _default;

},{"./elementFactory":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import makePage from "./DOMmanager"
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

var _DOMmanager = _interopRequireDefault(require("./DOMmanager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
DAILY JOURNAL 8
Here's an example of what main.js could look like. Again, this is just an example. Your code does not need to look like this. You will build your own modules and give them names that make sense to you.

import DataManager from "./data/dataManager"
import DOMManager from "./dom/domManager"

DataManager.getJournalEntries().then(DOMManager.renderEntries)
*/
if (document.readyState === "loading") {
  _DOMmanager.default.initiateForm();
}

},{"./DOMmanager":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RPTW1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ3FDQTs7OztBQXJDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUNBLE1BQU0sUUFBUSxHQUFHO0FBQ2YsRUFBQSxTQUFTLEVBQUUsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLEtBQWIsS0FBdUI7QUFDaEMsUUFBSSxLQUFLLEdBQUcsd0JBQVksY0FBWixDQUEyQixPQUEzQixFQUFvQztBQUFDLE1BQUEsR0FBRyxFQUFFO0FBQU4sS0FBcEMsRUFBaUQsS0FBakQsQ0FBWjs7QUFDQSxRQUFJLEtBQUssR0FBRyx3QkFBWSxjQUFaLENBQTJCLE9BQTNCLEVBQW9DO0FBQUMsTUFBQSxJQUFJLEVBQUUsSUFBUDtBQUFhLE1BQUEsSUFBSSxFQUFFLElBQW5CO0FBQXlCLE1BQUEsRUFBRSxFQUFFLElBQTdCO0FBQW1DLE1BQUEsUUFBUSxFQUFFO0FBQTdDLEtBQXBDLENBQVo7O0FBQ0EsUUFBSSxRQUFRLEdBQUcsd0JBQVksY0FBWixDQUEyQixVQUEzQixFQUF1QyxFQUF2QyxFQUEyQyxJQUEzQyxFQUFpRCxLQUFqRCxFQUF3RCxLQUF4RCxDQUFmOztBQUNBLFdBQU8sUUFBUDtBQUNELEdBTmM7QUFRZixFQUFBLFlBQVksRUFBRSxNQUFNO0FBQ2xCLFFBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFULENBQW1CLGFBQW5CLEVBQWtDLE1BQWxDLEVBQTBDLGVBQTFDLENBQWhCO0FBQ0EsUUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLFNBQVQsQ0FBbUIsWUFBbkIsRUFBaUMsTUFBakMsRUFBeUMsYUFBekMsQ0FBdEI7QUFDQSxRQUFJLG9CQUFvQixHQUFHLFFBQVEs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LGNBQWMsRUFBRSxDQUFDLEVBQUQsRUFBSyxhQUFMLEVBQW9CLE9BQXBCLEVBQTZCLEdBQUcsUUFBaEMsS0FBMkM7QUFDekQsUUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsRUFBdkIsQ0FBZCxDQUR5RCxDQUV6RDs7QUFDQSxTQUFLLElBQUksSUFBVCxJQUFpQixhQUFqQixFQUErQjtBQUM3QixNQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLElBQXJCLEVBQTJCLGFBQWEsQ0FBQyxJQUFELENBQXhDO0FBQ0Q7O0FBQ0QsSUFBQSxPQUFPLENBQUMsV0FBUixHQUFzQixPQUFPLElBQUksSUFBakM7QUFDQSxJQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN4QixNQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLEtBQXBCO0FBQ0QsS0FGRDtBQUdBLFdBQU8sT0FBUDtBQUNEO0FBWmtCLENBQXBCO2VBY2MsVzs7Ozs7O0FDTmY7Ozs7QUFWQTs7Ozs7Ozs7O0FBWUEsSUFBSSxRQUFRLENBQUMsVUFBVCxLQUF3QixTQUE1QixFQUFzQztBQUNwQyxzQkFBUyxZQUFUO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuREFJTFkgSk9VUk5BTCA1XG5DcmVhdGUgYSBtb2R1bGUgdGhhdCBkZWZpbmVzIGEgZnVuY3Rpb24gZm9yIGJ1aWxkaW5nIHRoZSBmb3JtIGZpZWxkcyBkeW5hbWljYWxseSBpbnN0ZWFkIG9mIHRoZW0gYmVpbmcgaGFyZC1jb2RlZCBpbiB0aGUgSFRNTC5cblxuXG5cblxuXG5EQUlMWSBKT1VSTkFMIDhcbkFuZCB5b3VyIGRvbS9ET01NYW5hZ2VyanMgY29tcG9uZW50IGNvdWxkIGxvb2sgc29tZXRoaW5nIGxpa2UgdGhpcy5cblxuaW1wb3J0IEVudHJ5RmFjdG9yeSBmcm9tIFwiLi9kb20vZW50cnlDb21wb25lbnRGYWN0b3J5XCJcblxuY29uc3QgZW50cmllc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIilcblxuY2xhc3MgRE9NTWFuYWdlciB7XG4gICAgcmVuZGVyRW50cmllcyAoZW50cmllcykge1xuICAgICAgICBlbnRyaWVzQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIlxuXG4gICAgICAgIGZvciAoZW50cnkgb2YgZW50cmllcykge1xuICAgICAgICAgICAgY29uc3QgZW50cnlDb21wb25lbnQgPSBFbnRyeUZhY3RvcnkuY3JlYXRlKGVudHJ5KVxuICAgICAgICAgICAgZW50cmllc0NvbnRhaW5lci5pbm5lckhUTUwgKz0gZW50cnlDb21wb25lbnRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgZW50cnlET01NYW5hZ2VyID0gbmV3IERPTU1hbmFnZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBlbnRyeURPTU1hbmFnZXJcblxuUGVyZm9ybWFuY2U6IFRoZSBlbnRyaWVzQ29udGFpbmVyIHZhcmlhYmxlIGlzIGRlZmluZWQgYXQgdGhlIG1vZHVsZSBsZXZlbCBpbnN0ZWFkIG9mIGluIHRoZSByZW5kZXJFbnRyaWVzKCkgZnVuY3Rpb24uIFdoeT8gSXQgaXMgZm9yIHBlcmZvcm1hbmNlLiBJZiBpdCB3YXMgZGVmaW5lZCBpbiB0aGUgcmVuZGVyRW50cmllcygpIGZ1bmN0aW9uLCB0aGVuIGVhY2ggdGltZSB0aGUgbWV0aG9kIGlzIGNhbGxlZCwgdGhlIERPTSB3b3VsZCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IHdpdGggYSBjbGFzcyBvZiBlbnRyeUxvZy5cblxuVm9jYWJ1bGFyeTogVGhlIGNvZGUgYWJvdmUgc2hvd3MgYW4gZXhhbXBsZSBvZiB0aGUgU2luZ2xldG9uIFBhdHRlcm4gc2luY2UgdGhlIG1vZHVsZSBleHBvcnRzIGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBET01NYW5hZ2VyIGNsYXNzLiBFdmVyeSBvdGhlciBtb2R1bGUgd2lsbCB1c2UgdGhhdCBzaW5nbGUgaW5zdGFuY2UuXG5cblZvY2FidWxhcnk6IFRoZSBjb2RlIGFib3ZlIGNyZWF0ZXMgYSBjbG9zdXJlIGFyb3VuZCB0aGUgZW50cmllc0NvbnRhaW5lciBtb2R1bGUgdmFyaWFibGUuXG4qL1xuXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuXG5jb25zdCBtYWtlUGFnZSA9IHtcbiAgYnVpbGRGb3JtOiAobmFtZSwgdHlwZSwgdGl0bGUpID0+IHtcbiAgICBsZXQgbGFiZWwgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImxhYmVsXCIsIHtmb3I6IG5hbWV9LCB0aXRsZSlcbiAgICBsZXQgaW5wdXQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImlucHV0XCIsIHt0eXBlOiB0eXBlLCBuYW1lOiBuYW1lLCBpZDogbmFtZSwgcmVxdWlyZWQ6IHRydWV9KVxuICAgIGxldCBmaWVsZHNldCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiZmllbGRzZXRcIiwge30sIG51bGwsIGxhYmVsLCBpbnB1dClcbiAgICByZXR1cm4gZmllbGRzZXRcbiAgfSxcblxuICBpbml0aWF0ZUZvcm06ICgpID0+IHtcbiAgICBsZXQgZGF0ZUVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiam91cm5hbERhdGVcIiwgXCJkYXRlXCIsIFwiRGF0ZSBvZiBlbnRyeVwiKVxuICAgIGxldCBhdXRob3JOYW1lRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJhdXRob3JOYW1lXCIsIFwidGV4dFwiLCBcIkF1dGhvciBOYW1lXCIpO1xuICAgIGxldCBjb25jZXB0c0NvdmVyZWRFbnRyeSA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImNvbmNlcHRzQ292ZXJlZFwiLCBcInRleHRcIiwgXCJDb25jZXB0cyBDb3ZlcmVkXCIpXG4gICAgbGV0IGpvdXJuYWxFbnRyeUxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBcImpvdXJuYWxFbnRyeVwifSwgXCJKb3VybmFsIEVudHJ5XCIpXG4gICAgbGV0IGpvdXJuYWxFbnRyeVRleHRhcmVhID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJ0ZXh0YXJlYVwiLCB7bmFtZTogXCJqb3VybmFsRW50cnlcIiwgaWQ6IFwiam91cm5hbEVudHJ5XCIsIGNvbHM6IFwiNjBcIiwgcm93czogXCIxMFwifSlcbiAgICBsZXQgam91cm5hbEVudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgam91cm5hbEVudHJ5TGFiZWwsIGpvdXJuYWxFbnRyeVRleHRhcmVhKVxuICAgIGxldCBlbnRyeUJ1dHRvbiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiYnV0dG9uXCIsIHt0eXBlOiBcInN1Ym1pdFwiLCBpZDogXCJqb3VybmFsRW50cnlCdXR0b25cIn0sIFwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIilcbiAgICBsZXQgbW9vZExhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBcIm1vb2RcIiwgaWQ6IFwibW9vZFwifSlcbiAgICBsZXQgbW9vZE9wdGlvbkhhcHB5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJvcHRpb25cIiwge3ZhbHVlOiBcImhhcHB5XCJ9LCBcIkhhcHB5XCIpXG4gICAgbGV0IG1vb2RPcHRpb25TYWQgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwic2FkXCJ9LCBcIlNhZFwiKVxuICAgIGxldCBtb29kT3B0aW9uRnJ1c3RyYXRlZCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwib3B0aW9uXCIsIHt2YWx1ZTogXCJmcnVzdHJhdGVkXCJ9LCBcIkZydXN0cmF0ZWRcIilcbiAgICBsZXQgbW9vZE9wdGlvbkZpbmUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcIm9wdGlvblwiLCB7dmFsdWU6IFwiZmluZVwifSwgXCJGaW5lXCIpXG4gICAgbGV0IG1vb2RTZWxlY3QgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInNlbGVjdFwiLCB7bmFtZTogXCJtb29kXCIsIGlkOiBcIm1vb2RcIn0sIG51bGwsIG1vb2RPcHRpb25GaW5lLCBtb29kT3B0aW9uRnJ1c3RyYXRlZCwgbW9vZE9wdGlvbkhhcHB5LCBtb29kT3B0aW9uU2FkKVxuICAgIGxldCBtb29kRW50cnkgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZpZWxkc2V0XCIsIHt9LCBudWxsLCBtb29kTGFiZWwsIG1vb2RTZWxlY3QpXG4gICAgbGV0IGZvcm0gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZvcm1cIiwge30sIG51bGwsIGRhdGVFbnRyeSwgYXV0aG9yTmFtZUVudHJ5LCBjb25jZXB0c0NvdmVyZWRFbnRyeSwgam91cm5hbEVudHJ5LCBtb29kRW50cnksIGVudHJ5QnV0dG9uKVxuICAgIG1ha2VQYWdlLmFwcGVuZEZvcm0oZm9ybSlcbiAgfSxcblxuICBhcHBlbmRGb3JtOiAoZm9ybSk9PntcbiAgICBsZXQgZm9ybUZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGxldCBmb3JtRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmbGV4Ym94XCIpXG4gICAgZm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm0pXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChmb3JtRnJhZ21lbnQpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIiwiLy8gaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL0RPTW1hbmFnZXJcIlxuXG4gY29uc3QgbWFrZUVsZW1lbnQgPSB7XG4gIGVsZW1lbnRGYWN0b3J5OiAoZWwsIGF0dHJpYnV0ZXNPYmosIGNvbnRlbnQsIC4uLmNoaWxkcmVuKT0+e1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcbiAgICAvLyBTZXQgQXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlc09iail7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzT2JqW2F0dHJdKVxuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudCB8fCBudWxsXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBtYWtlRWxlbWVudCIsIi8qXG5EQUlMWSBKT1VSTkFMIDhcbkhlcmUncyBhbiBleGFtcGxlIG9mIHdoYXQgbWFpbi5qcyBjb3VsZCBsb29rIGxpa2UuIEFnYWluLCB0aGlzIGlzIGp1c3QgYW4gZXhhbXBsZS4gWW91ciBjb2RlIGRvZXMgbm90IG5lZWQgdG8gbG9vayBsaWtlIHRoaXMuIFlvdSB3aWxsIGJ1aWxkIHlvdXIgb3duIG1vZHVsZXMgYW5kIGdpdmUgdGhlbSBuYW1lcyB0aGF0IG1ha2Ugc2Vuc2UgdG8geW91LlxuXG5pbXBvcnQgRGF0YU1hbmFnZXIgZnJvbSBcIi4vZGF0YS9kYXRhTWFuYWdlclwiXG5pbXBvcnQgRE9NTWFuYWdlciBmcm9tIFwiLi9kb20vZG9tTWFuYWdlclwiXG5cbkRhdGFNYW5hZ2VyLmdldEpvdXJuYWxFbnRyaWVzKCkudGhlbihET01NYW5hZ2VyLnJlbmRlckVudHJpZXMpXG4qL1xuXG5pbXBvcnQgbWFrZVBhZ2UgZnJvbSBcIi4vRE9NbWFuYWdlclwiXG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIil7XG4gIG1ha2VQYWdlLmluaXRpYXRlRm9ybSgpO1xufSJdfQ==
