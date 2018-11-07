// ValidateData.js: Single Responsibility: take provided data and check for required section completion, curse words, and special characters


const validateJournalEntry = {
  clearStatus: false,

  noEmptyValues: ()=>{
    let form= $("form")
    // form.validate()
    console.log(form)
    if(form.valid() === true){
      // console.log("the form is valid")
      validateJournalEntry.clearStatus = true
      console.log(validateJournalEntry.clearStatus)
      return validateJournalEntry.clearStatus
    } else {
      alert("please fill out all fields")
      return
    }
  },

  onlyAllowedCharacters: (something)=>{
    validateJournalEntry.clearStatus = false
    for(const input in something){
      if(something[input].match(/([-a-zA-Z0-9(){}:;]+)/)){
        validateJournalEntry.clearStatus = true
        console.log("the input has been accepted")
      } else{
        alert(`Your ${input} submission contains invalid characters. Please only include alphanumeric characters or (){};: and resubmit`)
        validateJournalEntry.clearStatus = false
        return
      }
    }
    return validateJournalEntry.clearStatus
  }
}

//   maximumConceptEntryLength: ()=>{
//     // Pick a maximum length for concepts field and provide visual feedback if you type in a string that is longer than that maximum.
//   },

//   noCurseWords: ()=>{
//     // Test that the concept and entry fields contain no curse words. You can use regular expressions for that.
//   }

// }

export default validateJournalEntry
