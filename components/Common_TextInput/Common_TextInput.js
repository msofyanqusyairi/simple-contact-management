import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput
} from 'react-native'

export default class Common_TextInput extends Component {
  constructor(props) {
    super(props)

    this.containerStyle = {
      backgroundColor: 'rgba(0,0,0,0)',
    }
    this.titleTextStyle = {
      marginVertical: 10,
      fontSize: 13,
      color: '#949394',
      fontFamily: 'Poppins-Regular'
    }
    this.textInputStyle = {
      borderBottomWidth: 0.5,
      borderBottomColor: '#949394',
      height: 30,
      padding: 0,
    }
    this.textStyle = {
      fontSize: 13,
      fontFamily: 'Poppins-Regular'
    }
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.value != this.props.value)
  }

  render() {
    return (
      <View
        style={[this.containerStyle, this.props.style]}>
        {
          this.props.title ?
            (
              <Text style={[this.titleTextStyle, this.props.titleTextStyle]}>
                {this.props.title}
              </Text>
            ) : null
        }
        <TextInput
          {...this.props}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          style={[this.textInputStyle, this.textStyle, this.props.textInputStyle]}
        />
      </View>
    )
  }
}