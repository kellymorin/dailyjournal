// import captureInput from "./createEntry";

// ValidateData.js: Single Responsibility: take provided data and check for required section completion, curse words, and special characters

// import form from "./main"
// // import entry from "./main"

const validateJournalEntry = {
  clearStatus: false,

  noEmptyValues: ()=>{
    let form= document.querySelector("form")
    console.log(form)
    if(form.checkValidity() === true){
      // console.log("the form is valid")
      validateJournalEntry.clearStatus = true
      console.log(validateJournalEntry.clearStatus)
      return validateJournalEntry.clearStatus
    } else {
      alert("please fill out all fields")
    }
  },

  onlyAllowedCharacters: (something)=>{
    for(const input in something){
      console.log("entry input", something[input])
      if(something[input].match(/^([a-zA-Z0-9 _-]+)$/)){
        console.log("the input has been accepted")
      } else{
        console.log("the input is invalid")
      }
    }
  }
}
//     // No characters other than letters, numbers, (), {}, :, and ;
//   },

//   maximumConceptEntryLength: ()=>{
//     // Pick a maximum length for concepts field and provide visual feedback if you type in a string that is longer than that maximum.
//   },

//   noCurseWords: ()=>{
//     // Test that the concept and entry fields contain no curse words. You can use regular expressions for that.
//   }

// }

export default validateJournalEntry
