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
    let params = props.navigation.state.params
    this.state = {
      firstName: params.data.firstName || '',
      lastName: params.data.lastName || '',
      age: params.data.age != undefined ? params.data.age.toString() : '',
      photo: (params.data.photo != 'N/A' && params.data.photo) ?
        params.data.photo :
        'http://www.mhcsa.org.au/wp-content/uploads/2016/08/default-non-user-no-photo-768x768.jpg'
    }
    this.id = params.data.id || ''
    this.role = params.data.role || 'create'

    this._onChangeFirstName = this._onChangeFirstName.bind(this)
    this._onChangeLastName = this._onChangeLastName.bind(this)
    this._onChangeAge = this._onChangeAge.bind(this)
    this._onChoosePhoto = this._onChoosePhoto.bind(this)
    this._setPhoto = this._setPhoto.bind(this)
    this._onSave = this._onSave.bind(this)
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

  async _onSave() {
    let body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      photo: this.state.photo
    }
    if (this.role == 'create') {
      let res = await Requester.createContact(body)
      Alert.alert(res.message)
      if (!res.error) {
        if (this.props.navigation.state.params.reload) {
          this.props.navigation.state.params.reload()
        }
        this.props.navigation.goBack()
      }
    }
    else {
      let res = await Requester.updateContact(body, this.id)
      Alert.alert(res.message)
      if (!res.error) {
        if (this.props.navigation.state.params.reload && this.props.navigation.state.params.reloadDetail) {
          this.props.navigation.state.params.reload()
          this.props.navigation.state.params.reloadDetail()
        }
        this.props.navigation.goBack()
      }
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
          value={this.state.firstName}
          title={'First Name'}
          onChangeText={this._onChangeFirstName} />
        <TextInput
          value={this.state.lastName}
          title={'Last Name'}
          onChangeText={this._onChangeLastName} />
        <TextInput
          value={this.state.age}
          keyboardType={'number-pad'}
          title={'Age'}
          onChangeText={this._onChangeAge} />
        <View
          style={{
            alignItems: 'center'
          }}>
          <Button
            onPress={this._onSave}
            text={this.role == 'create' ? 'create' : 'update'}
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
