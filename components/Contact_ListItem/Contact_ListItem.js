import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Avatar from '../Common_AvatarIcon/Common_AvatarIcon'

export default class Contact_ListItem extends Component {
  constructor(props) {
    super(props)

    this.item = {}

    this._onPress = this._onPress.bind(this)
  }

  _init() {
    if (this.props.item != undefined && JSON.stringify(this.props.item) != JSON.stringify(this.item)) {
      this.item = this.props.item
    }
  }

  _onPress() {
    if (this.props.onPress) {
      this.props.onPress(this.item)
    }
  }

  render() {
    this._init()

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this._onPress}>
        <View>
          <Avatar
            height={70}
            width={70}
            image={{ uri: (this.item.photo != 'N/A' && this.item.photo) ? this.item.photo : 'http://www.mhcsa.org.au/wp-content/uploads/2016/08/default-non-user-no-photo-768x768.jpg' }} />
          <Text>
            {`${this.item.firstName} ${this.item.lastName}`}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}