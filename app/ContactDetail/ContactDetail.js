import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import TextInput from '../../components/Common_TextInput/Common_TextInput'
import Button from '../../components/Common_Button/Common_Button'
import Avatar from '../../components/Common_AvatarIcon/Common_AvatarIcon'
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper'
import FavoritesContactAction from '../../realm/actions/favorites'
import Loading from '../../components/Common_Loading/Common_Loading'

var Requester = require('../../functionHelper/Requester')

export default class ContactDetail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Contact Detail'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      contactDetail: {},
      isFavorite: false,
      didMount: false
    }
    this.id = this.props.navigation.state.params.data.id
    this.favContactAction = new FavoritesContactAction()

    this._onEdit = this._onEdit.bind(this)
    this._onDelete = this._onDelete.bind(this)
    this._reload = this._reload.bind(this)
    this._onPressFavorite = this._onPressFavorite.bind(this)
  }

  async componentDidMount() {
    let res = await Requester.getContact(this.id)
    let fav = this.favContactAction.GetFavoritesContact()
    this.setState({
      contactDetail: res.data,
      isFavorite: fav.includes(this.id),
      didMount: true
    })
  }

  _onEdit() {
    this.refs.navHelper.navigate('ContactForm', {
      title: 'Edit Contact',
      data: {
        role: 'edit',
        id: this.state.contactDetail.id,
        ...this.state.contactDetail
      },
      reload: this.props.navigation.state.params.reload,
      reloadDetail: this._reload
    })
  }

  async _onDelete() {
    Alert.alert(
      "Delete Contact",
      "are you sure want to delete this contact ?",
      [
        {
          text: 'yes', onPress: async () => {
            let res = await Requester.deleteContact(this.state.contactDetail.id)
            if (!res.error & res.statusCode != 400 && res.statusCode != 500) {
              this.props.navigation.state.params.reload()
              setTimeout(() => {
                this.refs.navHelper.navigateToNewStack('Root')
              }, 500)
            }
            else {
              Alert.alert(res.message)
            }
          }, style: 'default'
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: true }
    )
  }

  async _reload() {
    let res = await Requester.getContact(this.id)
    this.setState({
      contactDetail: res.data
    })
  }

  async _onPressFavorite() {
    if (!this.state.isFavorite)
      this.favContactAction.AddFavoritesContact(this.state.contactDetail.id)
    else
      this.favContactAction.RemoveFavoritesContact(this.state.contactDetail.id)

    let res = await Requester.getContact(this.id)
    let fav = this.favContactAction.GetFavoritesContact()
    this.setState({
      contactDetail: res.data,
      isFavorite: fav.includes(this.id)
    })
  }

  render() {
    if (!this.state.didMount) return <Loading />
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <NavigationHelper ref={'navHelper'} navigation={this.props.navigation} />
        <View style={{ alignItems: 'center' }}>
          <Avatar
            width={100}
            height={100}
            image={{ uri: (this.state.contactDetail.photo != 'N/A' && this.state.contactDetail.photo) ? this.state.contactDetail.photo : 'http://www.mhcsa.org.au/wp-content/uploads/2016/08/default-non-user-no-photo-768x768.jpg' }}
            onPress={this._onChoosePhoto}
          />
          <Text style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 17
          }}>
            {`${this.state.contactDetail.firstName} ${this.state.contactDetail.lastName}`}
          </Text>
          <Text style={{
            fontFamily: 'Poppins-Medium',
            color: '#03b515',
            fontSize: 13
          }}>
            {`Age: ${this.state.contactDetail.age}`}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center'
          }}>
          <Button
            onPress={this._onPressFavorite}
            text={this.state.isFavorite ? 'unfavorite' : 'favorite'}
            style={{
              // borderWidth: 1,
              // borderColor: '#e2e2e2',
              backgroundColor: 'green',
              borderRadius: 10,
              width: '90%',
              marginVertical: 5
            }}
          // textStyle={{
          //   color: 'blue'
          // }}
          />
          <Button
            onPress={this._onEdit}
            text={'edit'}
            style={{
              // borderWidth: 1,
              // borderColor: '#e2e2e2',
              backgroundColor: '#5f7cef',
              borderRadius: 10,
              width: '90%',
              marginVertical: 5
            }}
          // textStyle={{
          //   color: 'blue'
          // }}
          />
          <Button
            onPress={this._onDelete}
            text={'delete'}
            style={{
              // borderWidth: 1,
              // borderColor: '#e2e2e2',
              backgroundColor: '#f9095d',
              borderRadius: 10,
              width: '90%',
              marginVertical: 5
            }}
          // textStyle={{
          //   color: 'blue'
          // }}
          />
        </View>
      </View>
    );
  }
}
