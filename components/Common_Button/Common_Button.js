import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export default class Common_Button extends Component {
  constructor(props) {
    super(props)

    this.containerStyle = {
      width: '100%',
      height: 50,
      backgroundColor: '#57b752',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5
    }

    this.textStyle = {
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
      color: '#fff'
    }

    this.text = 'Button'

    this._onPress = this._onPress.bind(this)
  }

  _init() {
    if (this.props.text != undefined && this.props.text != this.text) {
      this.text = this.props.text
    }
  }

  _onPress() {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    this._init()

    return (
      <TouchableOpacity
        style={[this.containerStyle, this.props.style]}
        activeOpacity={1}
        onPress={this._onPress}>
        <View>
          {this.props.children ?
            this.props.children :
            (
              <Text style={[this.textStyle, this.props.textStyle]}>{this.text}</Text>
            )
          }
        </View>
      </TouchableOpacity>
    )
  }
}