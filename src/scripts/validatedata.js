// ValidateData.js: Single Responsibility: take provided data and check for required section completion, curse words, and special characters


const validateJournalEntry = {
  clearStatus: false,
  validateForm: ()=>{
    let form = $("form")
    console.log(form)
    if($("form > :input[required]:visible").val() !== ""){
      validateJournalEntry.clearStatus = true
      console.log(validateJournalEntry.clearStatus)
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
  },

  maximumConceptEntryLength: () =>{
    let conceptValue = $("#conceptsCovered").val()
    // if(conceptValue.length < 5){
    //   $("#conceptsCovered").removeClass("maxLength")
    // } else
    if(conceptValue.length > 5){
      $("#conceptsCovered").addClass("maxLength")
    }
  }
}

//   noCurseWords: ()=>{
//     // Test that the concept and entry fields contain no curse words. You can use regular expressions for that.
//   }

// }

export default validateJournalEntry
