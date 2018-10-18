const HOSTNAME = 'https://simple-contact-crud.herokuapp.com'
const GET_CONTACTS = HOSTNAME + '/contact'
const CREATE_CONTACT = HOSTNAME + '/contact'

var HttpRequest = require('./HttpRequest')

exports.getContacts = async function () {
  let contacts = await HttpRequest.Get(GET_CONTACTS)

  return contacts
}

exports.createContact = async function (body) {
  let res = await HttpRequest.Post(CREATE_CONTACT, body)

  return res
}