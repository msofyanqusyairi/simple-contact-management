import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import TextInput from '../../components/Common_TextInput/Common_TextInput'
import Button from '../../components/Common_Button/Common_Button'
import Avatar from '../../components/Common_AvatarIcon/Common_AvatarIcon'
import NavigationHelper from '../../components/Common_NavigationHelper/Common_NavigationHelper'

var Requester = require('../../functionHelper/Requester')

export default class CreateContact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      photo: 'http://www.mhcsa.org.au/wp-content/uploads/2016/08/default-non-user-no-photo-768x768.jpg'
    }

    this._onChangeFirstName = this._onChangeFirstName.bind(this)
    this._onChangeLastName = this._onChangeLastName.bind(this)
    this._onChangeAge = this._onChangeAge.bind(this)
    this._onChoosePhoto = this._onChoosePhoto.bind(this)
    this._setPhoto = this._setPhoto.bind(this)
    this._onCreate = this._onCreate.bind(this)
  }

  _onChangeFirstName(text) {
    this.setState({
      firstName: text
    })
  }

  _onChangeLastName(text) {
    this.setState({
      lastName: text
    })
  }

  _onChangeAge(text) {
    this.setState({
      age: text
    })
  }

  _onChoosePhoto(photo) {
    this.refs.navHelper.navigate('ChoosePhoto', {
      data: {
        photo: photo
      },
      setPhoto: this._setPhoto
    })
  }

  _setPhoto(photo) {
    this.setState({
      photo: photo
    })
  }

  async _onCreate() {
    let body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      photo: this.state.photo
    }
    let res = await Requester.createContact(body)
    Alert.alert(res.message)
    if (!res.error) {
      if (this.props.navigation.state.params.reload) {
        this.props.navigation.state.params.reload()
      }
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <NavigationHelper ref={'navHelper'} navigation={this.props.navigation} />
        <View style={{ alignItems: 'center' }}>
          <Avatar
            width={100}
            height={100}
            image={{ uri: this.state.photo }}
            onPress={this._onChoosePhoto}
          />
        </View>
        <TextInput
          title={'First Name'}
          onChangeText={this._onChangeFirstName} />
        <TextInput
          title={'Last Name'}
          onChangeText={this._onChangeLastName} />
        <TextInput
          keyboardType={'number-pad'}
          title={'Age'}
          onChangeText={this._onChangeAge} />
        <View
          style={{
            alignItems: 'center'
          }}>
          <Button
            onPress={this._onCreate}
            text={'create'}
            style={{
              // borderWidth: 1,
              // borderColor: '#e2e2e2',
              backgroundColor: 'blue',
              borderRadius: 10,
              width: '90%'
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
