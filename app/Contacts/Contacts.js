import React, { Component } from 'react';
import { View } from 'react-native';

const Requester = require('../../functionHelper/Requester')

export default class Contacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  async componentDidMount() {
    let contacts = await Requester.getContacts()
    this.setState({
      contacts: contacts.data
    })
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}
