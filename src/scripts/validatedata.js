

const validateJournalEntry = {
  // form: document.querySelector("form"),

  noEmptyValues: (form)=>{
    if(form.checkValidity() === true){
      // MOVE ON TO NEXT CHECK
    }
    // ELSE, THROW AN ERROR
  },

  onlyAllowedCharacters: ()=>{
    // No characters other than letters, numbers, (), {}, :, and ;
  },

  maximumConceptEntryLength: ()=>{
    // Pick a maximum length for concepts field and provide visual feedback if you type in a string that is longer than that maximum.
  },

  noCurseWords: ()=>{
    // Test that the concept and entry fields contain no curse words. You can use regular expressions for that.
  }

}
