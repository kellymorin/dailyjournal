/*
DAILY JOURNAL 5
In your main JavaScript module (journal.js) add a click event listener to the Record Journal Entry button at the bottom of your form. When the user clicks the button, you need to create a new entry in your API. The HTTP method that you use to create resources is POST. Guidance on syntax is provided below.

Use document.querySelector to select your input fields.
Use the .value property on the input field elements to get the text that you typed/chose.

Using required attribute to ensure no blank entries
No characters other than letters, numbers, (), {}, :, and ;

Now you must use fetch to create your journal entry in the API. The default method is GET, so you've never had to specify and configuration options with your fetch statements before. However, with POST, you need to configure the request.


Add the following validation code to your journal entry form fields.

Pick a maximum length for concepts field and provide visual feedback if you type in a string that is longer than that maximum.
Test that the concept and entry fields contain no curse words. You can use regular expressions for that.


JOURNAL ENTRY 6
The learning objective for this chapter is to use radio buttons, apply your knowledge of event listeners, the filter() method on an array, and the find() method on an array to show journal entries that match a certain mood.

Using <fieldset>, <legend>, <input type="radio">, and <label> HTML components, construct a set of radio buttons for selecting one of the moods. It's important that each of the radio buttons has the same value for the name attribute, but each should a different value for the value attribute.

Before you go to the instruction team for help on this section, make sure you use the Mozilla Developer Network article on radio buttons as a reference first.

Each one of the radio buttons needs to have a click event listener attached to it. When any of them are clicked, then the only articles that should appear are the ones with the corresponding mood.

Now, you could attach the event listeners to each individually. You could also use the document.getElementsByName() method, and a forEach() to add them more dynamically.

To get the selected mood, you need to look at the value property of the radio button that was clicked. When you click on any DOM element, that element becomes the target of the click event. You can access the element, and its value with the code below.

Once you have successfully retrieved the value of ok, happy, or sad based on which radio button was clicked, you need to filter all of the journal entries. The most straightforward way of doing this is to invoke the getJournalEntries() method on your data manager object - which will get all entries - and then use the filter() array method to extract only the entries that have the same mood as the one the user clicked on.

Once you have filtered the entries by mood, invoke the function that renders the HTML representations to the DOM and pass it the filtered array of entries.

CHALLENGE
Cache your journal entries when you retrieve them from the API. Caching is an important part of keeping the World Wide Web flexible and responsive. If a resources, or a collection of resources (e.g. your journal entries) have not changed, then you should not have to make an unnecessary call to your API to get them again for this exercise.

DAILY JOURNAL 7
Replace element.addEventListener("click") with $("selector").click()
Replace document.getElementById("id") with $("#id")
Replace document.querySelector("selector") with $("selector")
Replace element.innerHTML = htmlString with $().html(htmlString)
Replace any code you have to obtain the value property of an input field with the jQuery .val() method.
*/