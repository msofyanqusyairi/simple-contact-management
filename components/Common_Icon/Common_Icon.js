import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'

export default class Common_Icon extends Component {
  constructor(props) {
    super(props)
    this.width = 29
    this.height = 29
    this.resizeMode = 'contain'
    this.source = null
    this.style = {
      alignItems: 'center',
      justifyContent: 'center'
    }

    this._onPress = this._onPress.bind(this)
  }

  // shouldComponentUpdate(nextProps) {
  //   return ((nextProps.source != this.props.source) || (JSON.stringify(nextProps.source) != JSON.stringify(this.props.source)))
  // }

  _init() {
    if (this.props.width != undefined && this.props.width != this.width) {
      this.width = this.props.width
    }
    if (this.props.height != undefined && this.props.height != this.height) {
      this.height = this.props.height
    }
    if (this.props.resizeMode != undefined && this.props.resizeMode != this.resizeMode) {
      this.resizeMode = this.props.resizeMode
    }
    if (this.props.source != undefined && this.props.source != this.source) {
      this.source = this.props.source
    }
  }

  _onPress() {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    this._init()

    if (this.props.onPress) {
      return (
        <View>
          <TouchableOpacity
            style={[this.style, this.props.style]}
            activeOpacity={1}
            onPress={this._onPress}>
            <Image
              style={{ width: this.width, height: this.height }}
              resizeMode={this.resizeMode}
              source={this.source} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={[this.style, this.props.style]}>
        <View>
          <Image
            style={{ width: this.width, height: this.height }}
            resizeMode={this.resizeMode}
            source={this.source} />
        </View>
      </View>
    )
  }
}