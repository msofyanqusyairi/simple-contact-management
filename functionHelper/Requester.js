const HOSTNAME = 'https://simple-contact-crud.herokuapp.com'
const API_CONTACTS = HOSTNAME + '/contact'

var HttpRequest = require('./HttpRequest')

exports.getContacts = async function () {
  let res = await HttpRequest.Get(API_CONTACTS)

  return res
}

exports.createContact = async function (body) {
  let res = await HttpRequest.Post(API_CONTACTS, body)

  return res
}

exports.getContact = async function (id) {
  let res = await HttpRequest.Get(API_CONTACTS + `/${id}`)

  return res
}

exports.updateContact = async function (body, id) {
  let res = await HttpRequest.Put(API_CONTACTS + `/${id}`, body)

  return res
}

exports.deleteContact = async function (id) {
  let res = await HttpRequest.Delete(API_CONTACTS + `/${id}`)

  return res
}