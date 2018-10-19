var Realm = require('realm')
import { Favorites } from '../models/favorites'

export default class FavoritesContactAction {
  constructor() {
    this.schemaName = 'FavoritesContact'
  }

  OpenRealmSchema() {
    this.realm = new Realm({
      schema: [Favorites]
    })
  }

  CloseRealmSchema() {
    this.realm.close();
  }

  GetFavoritesContact() {
    let ids = []
    this.OpenRealmSchema()
    let contacts = Array.from(this.realm.objects(this.schemaName))
    contacts.map(contact => {
      ids.push(contact.id)
    })
    this.CloseRealmSchema()
    return ids
  }

  AddFavoritesContact(id) {
    try {
      this.OpenRealmSchema()
      console.log('masuk')
      this.realm.write(() => {
        this.realm.create(this.schemaName, { id: id });
        console.log('add success')
      });
      this.CloseRealmSchema()
    } catch (e) {
      console.log("Error on creation", e);
    }
  }

  RemoveFavoritesContact(id) {
    this.OpenRealmSchema()
    let contacts = this.realm.objects(this.schemaName).filtered(`id="${id}"`)
    this.realm.write(() =>
      this.realm.delete(contacts)
    )
    this.CloseRealmSchema()
  }
}