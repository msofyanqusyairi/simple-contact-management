const HOSTNAME = 'https://simple-contact-crud.herokuapp.com'
const GET_CONTACTS = HOSTNAME + '/contact'

var HttpRequest = require('./HttpRequest')

exports.getContacts = async function () {
  let contacts = await HttpRequest.Get(GET_CONTACTS)

  return contacts
}