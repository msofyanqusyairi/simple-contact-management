import React, { Component } from 'react';
import { View, Alert,Text } from 'react-native';
import ContactList from '../../components/Contact_List/Contact_List'
import Button from '../../components/Common_Button/Common_Button'
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper'
import FavoritesContactAction from '../../realm/actions/favorites'
import Loading from '../../components/Common_Loading/Common_Loading'

const Requester = require('../../functionHelper/Requester')

export default class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      didMount: false
    }
    this.favContactAction = new FavoritesContactAction()

    this._onPressContact = this._onPressContact.bind(this)
    this._onCreateContact = this._onCreateContact.bind(this)
    this._reload = this._reload.bind(this)
    this._handleDidFocus = this._handleDidFocus.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (JSON.stringify(nextState) != JSON.stringify(this.state))
  }

  async componentDidMount() {
    let fav = this.favContactAction.GetFavoritesContact()
    let contacts = await Requester.getContacts()
    this.setState({
      contacts: contacts.data.filter(contact => fav.includes(contact.id)),
      didMount: true
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
    this.refs.navHelper.navigate('ContactForm', {
      title: 'Create Contact',
      data: {},
      reload: this._reload
    })
  }

  async _reload() {
    let fav = this.favContactAction.GetFavoritesContact()
    let contacts = await Requester.getContacts()
    this.setState({
      contacts: contacts.data.filter(contact => fav.includes(contact.id))
    })
  }

  async _handleDidFocus() {
    let fav = this.favContactAction.GetFavoritesContact()
    let contacts = await Requester.getContacts()
    this.setState({
      contacts: contacts.data.filter(contact => fav.includes(contact.id))
    })
  }

  render() {
    let _renderNoDataView = () => {
      if (this.state.contacts.length == 0) {
        return (
          <View style={{
            marginVertical: 15,
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15
            }}>
              No Favorite Contact
            </Text>
          </View>
        )
      }
    }

    if (!this.state.didMount) return <Loading />
    return (
      <View style={{ flex: 1 }}>
        <NavigationHelper onDidFocus={this._handleDidFocus} ref={'navHelper'} navigation={this.props.navigation} />
        {_renderNoDataView()}
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
