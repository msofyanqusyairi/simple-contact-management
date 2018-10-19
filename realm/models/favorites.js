export class Favorites {
  static schema = {
      name: 'FavoritesContact',
      primaryKey: 'id',
      properties: {
        id: 'string', //primary key
        timestamp: {type: 'int', default: new Date().getTime()}
    }
  }
}
