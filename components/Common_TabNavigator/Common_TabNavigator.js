import React, { Component } from 'react'
import { View, Text, Keyboard, StyleSheet, TouchableOpacity, Image } from 'react-native'

class Common_TabNavigator extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: props.navigation.state.routes[props.navigation.state.index].routeName,
      isVisible: true,
      removedIndex: []
    }
    // define the navigation
    this.navigation = props.navigation
    this.routes = this.navigation.state.routes

    this._onItemPress = this._onItemPress.bind(this)
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)

    this.style = {
      // default value
      // component
      height: 50,
      backgroundColor: 'rgba(0,0,0,0)',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      paddingBottom: 0,
      borderRadius: 0,
      borderWidth: 0,
      borderColor: "#adadad",
      // text
      textColor: '#83d37f',
      activeTextColor: '#fff',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 10
    }
    this.itemMenu = {
      activeTab: '',
      list: [{
        contentId: -999,
        txt: '',
        path: '',
        attachedImg: null,
        activeImg: null,
      }]
    }
    this._removingIndex = this._removingIndex.bind(this)
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentDidMount() {
    if (this.props.shouldRemoveIndex) {
      this.props.navigation.setParams({
        removingIndex: this._removingIndex
      })
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextState) != JSON.stringify(this.state)
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.itemMenu) !== JSON.stringify(this.itemMenu)) {
      // do something here
      // console.log('change item data of Home Tab Bar navigation')
    }
    if (JSON.stringify(nextProps.navigation) !== JSON.stringify(this.navigation)) {
      // console.log(this.navigation.state.index);
      if ((nextProps.navigation.state.index) != this.navigation.state.index) {
        this.navigation = nextProps.navigation
        var index = this.navigation.state.index
        this.setState({
          activeTab: this.routes[index].routeName
        })
      }
    }
  }

  _removingIndex(removedIndex) {
    this.setState({
      removedIndex: removedIndex
    })
  }

  _initStyle() {
    // init height
    if (this.props.height && this.props.height != this.style.height) {
      this.style.height = this.props.height
    }
    // init backgroundColor
    if (this.props.backgroundColor && this.props.backgroundColor != this.style.backgroundColor) {
      this.style.backgroundColor = this.props.backgroundColor
    }
    // init marginTop
    if (this.props.marginTop && this.props.marginTop != this.style.marginTop) {
      this.style.marginTop = this.props.marginTop
    }
    // init marginRight
    if (this.props.marginRight && this.props.marginRight != this.style.marginRight) {
      this.style.marginRight = this.props.marginRight
    }
    // init marginBottom
    if (this.props.marginBottom && this.props.marginBottom != this.style.marginBottom) {
      this.style.marginBottom = this.props.marginBottom
    }
    // init marginLeft
    if (this.props.marginLeft && this.props.marginLeft != this.style.marginLeft) {
      this.style.marginLeft = this.props.marginLeft
    }
    // init borderRadius
    if (this.props.borderRadius && this.props.borderRadius != this.style.borderRadius) {
      this.style.borderRadius = this.props.borderRadius
    }
    // init borderWidth
    if (this.props.borderWidth && this.props.borderWidth != this.style.borderWidth) {
      this.style.borderWidth = this.props.borderWidth
    }
    // init borderColor
    if (this.props.borderColor && this.props.borderColor != this.style.borderColor) {
      this.style.borderColor = this.props.borderColor
    }
    // init textColor
    if (this.props.textColor && this.props.textColor != this.style.textColor) {
      this.style.textColor = this.props.textColor
    }
    // init borderColor
    if (this.props.activeTextColor && this.props.activeTextColor != this.style.activeTextColor) {
      this.style.activeTextColor = this.props.activeTextColor
    }
    // init fontFamily
    if (this.props.fontFamily && this.props.fontFamily != this.style.fontFamily) {
      this.style.fontFamily = this.props.fontFamily
    }
    // init fontSize
    if (this.props.fontSize && this.props.fontSize != this.style.fontSize) {
      this.style.fontSize = this.props.fontSize
    }
  }

  _onItemPress(index) {
    if (this.props.navigation) {
      // console.log('[DEBUG]', 'onpress')
      let { state, navigate } = this.props.navigation
      let { routes } = state
      targetRoute = routes[index].routeName
      this.itemMenu.activeTab = targetRoute
      navigate(targetRoute, { date: new Date() })
    }
  }

  _initItemMenu() {
    // init itemMenu
    if (this.props.itemMenu) {
      this.itemMenu = this.props.itemMenu
    }
  }

  _keyboardDidShow(evt) {
    this.setState({
      isVisible: false
    })
  }

  _keyboardDidHide(evt) {
    this.setState({
      isVisible: true
    })
  }

  render() {
    var _renderItem = (item, index) => {
      // catch the active path
      // let isActivePath = (this.state.activeTab === item.path)
      let isActivePath = (this.props.navigation.state.index === index)
      return (
        <TouchableOpacity
          key={index.toString()}
          activeOpacity={1}
          onPress={() => this._onItemPress(index)}>
          <View style={{ height: this.style.height, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              resizeMode={'contain'}
              source={isActivePath ? item.activeImg : item.attachedImg}
              style={{
                width: 0.862 * 16,
                height: 16,
                marginBottom: 3
              }} />
            <Text style={{
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
              color: (isActivePath ? this.style.activeTextColor : this.style.textColor)
            }}>
              {item.txt}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }

    var _renderTab = () => {
      let filteredItem = this.itemMenu.list.filter((item, i) => !this.state.removedIndex.includes(i))
      let comp = filteredItem.map(function (item, index) {
        return _renderItem(item, index)
      })
      return comp
    }

    this._initStyle()
    this._initItemMenu()

    var style = {
      // flex: 1,
      height: this.style.height,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      // paddingBottom: 5,
      backgroundColor: this.style.backgroundColor,
      marginTop: this.style.marginTop,
      marginRight: this.style.marginRight,
      marginBottom: this.style.marginBottom,
      marginLeft: this.style.marginLeft,
      paddingBottom: this.style.paddingBottom,
      borderRadius: this.style.borderRadius,
      borderWidth: this.style.borderWidth,
      borderColor: this.style.borderColor,
    }
    return (
      this.state.isVisible ?
        <View style={[styles.container, style]}>
          {_renderTab()}
        </View> :
        null
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowRadius: 7,
    // shadowOpacity: 1.0
  },
})

export default Common_TabNavigator