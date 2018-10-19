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
      contactDetail: {}
    }
    this.id = this.props.navigation.state.params.data.id

    this._onEdit = this._onEdit.bind(this)
    this._onDelete = this._onDelete.bind(this)
    this._reload = this._reload.bind(this)
  }

  async componentDidMount() {
    let res = await Requester.getContact(this.id)
    this.setState({
      contactDetail: res.data
    })
  }

  _onEdit() {
    this.refs.navHelper.navigate('CreateContact', {
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

  render() {
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
            fontFamily: 'Poppins-Regular'
          }}>
            {`${this.state.contactDetail.firstName} ${this.state.contactDetail.lastName}`}
          </Text>
        </View>
        <Text style={{
          fontFamily: 'Poppins-Regular'
        }}>
          {`Age: ${this.state.contactDetail.age}`}
        </Text>
        <View
          style={{
            alignItems: 'center'
          }}>
          <Button
            onPress={this._onEdit}
            text={'edit'}
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
          <Button
            onPress={this._onDelete}
            text={'delete'}
            style={{
              // borderWidth: 1,
              // borderColor: '#e2e2e2',
              backgroundColor: 'red',
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
