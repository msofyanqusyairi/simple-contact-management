import React, { Component } from 'react'
import {
  View,
  FlatList
} from 'react-native'
import ContactListItem from '../Contact_ListItem/Contact_ListItem'

export default class Contact_List extends Component {
  constructor(props) {
    super(props)

    this.items = []

    this._onPressItem = this._onPressItem.bind(this)
  }

  _init() {
    if (this.props.items != undefined && JSON.stringify(this.props.items) != JSON.stringify(this.items)) {
      this.items = this.props.items
    }
  }

  _onPressItem(item) {
    if (this.props.onPressItem) {
      this.props.onPressItem(item)
    }
  }

  render() {
    this._init()

    let _renderItem = ({ item, index }) => {
      return (
        <ContactListItem
          item={item}
          onPress={this._onPressItem} />
      )
    }

    let _renderSeparator = () => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderColor: '#e2e2e2',
            borderWidth: 0.5,
            paddingHorizontal: 20,
            marginVertical: 15
          }}
        />
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.items}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={_renderSeparator}
          ListFooterComponent={() => (<View style={{ height: 130 }} />)}
        />
      </View>
    )
  }
}