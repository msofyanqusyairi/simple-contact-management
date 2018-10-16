import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={[{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
      }, this.props.style]}>
        <ActivityIndicator
          animating size='large'
          style={{
            height: 80
          }}
        />
      </View>
    )
  }
}
