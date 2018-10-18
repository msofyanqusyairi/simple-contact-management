import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('screen').width

export default class ChoosePhoto extends Component {
  constructor(props) {
    super(props)

    this.images = [
      'http://www.mhcsa.org.au/wp-content/uploads/2016/08/default-non-user-no-photo-768x768.jpg',
      'https://www.publicdomainpictures.net/pictures/170000/t2/avatar-3-1463711715VRV.jpg',
      'https://www.publicdomainpictures.net/pictures/170000/t2/funny-face-i.jpg',
      'https://www.publicdomainpictures.net/pictures/170000/t2/frankenstein-ii.jpg',
      'https://www.publicdomainpictures.net/pictures/270000/t2/avatar-people-person-business-u-15354603894rE.jpg',
      'https://www.publicdomainpictures.net/pictures/270000/t2/avatar-people-person-business-u-1535458547orO.jpg',
      'https://www.publicdomainpictures.net/pictures/270000/t2/avatar-people-person-business-u.jpg'
    ]

    this._onPress = this._onPress.bind(this)
  }

  _onPress(photo) {
    if (this.props.navigation.state.params.setPhoto) {
      this.props.navigation.state.params.setPhoto(photo)
      this.props.navigation.goBack()
    }
  }

  render() {
    let _renderImage = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this._onPress(item, index)}>
          <View>
            <Image
              style={{ width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 2 }}
              source={{ uri: item }} />
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <FlatList
          numColumns={2}
          data={this.images}
          renderItem={_renderImage}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}