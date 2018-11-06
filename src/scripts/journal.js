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
  constructor(props){
    this.date = props.date
    this.name = props.name
    this.concept = props.name
    this.entry = props.entry
    this.mood = props.mood
  }
  singleJournalEntry(){
    return {date: this.date, name: this.name, concept: this.concept, entry: this.entry, mood: this.mood}
  }
  // save(){
  //   return journalEntries.saveJournalEntry(this.singleJournalEntry)
  // }
}

export default JournalEntry