import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import ContactList from '../../components/Contact_List/Contact_List'
import Button from '../../components/Common_Button/Common_Button'
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper'
import FavoritesContactAction from '../../realm/actions/favorites'

const Requester = require('../../functionHelper/Requester')

export default class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
    this.favContactAction = new FavoritesContactAction()

    this._onPressContact = this._onPressContact.bind(this)
    this._onCreateContact = this._onCreateContact.bind(this)
    this._reload = this._reload.bind(this)
  }

  async componentDidMount() {
    let fav = this.favContactAction.GetFavoritesContact()
    let contacts = await Requester.getContacts()
    this.setState({
      contacts: contacts.data.filter(contact => fav.includes(contact.id))
    })
  }

  _onPressContact(item) {
    this.refs.navHelper.navigate('ContactDetail', {
      data: {
        id: item.id
      },
      reload: this._reload
    })
  }

  _onCreateContact() {
    this.refs.navHelper.navigate('CreateContact', {
      data: {},
      reload: this._reload
    })
  }

  async _reload() {
    let contacts = await Requester.getContacts()
    this.setState({
      contacts: contacts.data
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationHelper ref={'navHelper'} navigation={this.props.navigation} />
        <ContactList
          items={this.state.contacts}
          onPressItem={this._onPressContact} />
        <View style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 40,
          width: '100%'
        }}>
          <Button
            text={'create a new contact'}
            style={{
              borderRadius: 10,
              width: '90%'
            }}
            onPress={this._onCreateContact} />
        </View>
      </View>
    );
  }
}
