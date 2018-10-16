import React, { Component } from 'react'
import {
  NavigationActions,
  StackActions,
  NavigationEvents
} from 'react-navigation'

export default class Common_NavigatioHelper extends Component {
  constructor(props) {
    super(props)
    this.navigation = props.navigation

    this._onWillFocus = this._onWillFocus.bind(this)
    this._onDidFocus = this._onDidFocus.bind(this)
    this._onWillBlur = this._onWillBlur.bind(this)
    this._onDidBlur = this._onDidBlur.bind(this)
  }

  navigate(screen, params) {
    this.navigation.navigate(screen, params)
  }

  navigateToNewStack(routeName) {
    this.navigation.dispatch(StackActions.reset({
      index: 0, key: null, actions: [NavigationActions.navigate({ routeName: routeName })]
    }))
  }

  _onWillFocus(payload) {
    if (this.props.onWillFocus) {
      this.props.onWillFocus(payload)
    }
  }

  _onDidFocus(payload) {
    if (this.props.onDidFocus) {
      this.props.onDidFocus(payload)
    }
  }

  _onWillBlur(payload) {
    if (this.props.onWillBlur) {
      this.props.onWillBlur(payload)
    }
  }

  _onDidBlur(payload) {
    if (this.props.onDidBlur) {
      this.props.onDidBlur(payload)
    }
  }

  render() {
    return (
      <NavigationEvents
        onWillFocus={this._onWillFocus}
        onDidFocus={this._onDidFocus}
        onWillBlur={this._onWillBlur}
        onDidBlur={this._onDidBlur}
      />
    )
  }
}