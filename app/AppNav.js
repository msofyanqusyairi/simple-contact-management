import React, { Component } from 'react'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { View, Text, Platform } from 'react-native'
import StatusBackground from '../components/StatusBackground/StatusBackground'

/**
 * screen list for staknav
 */
import CreateContact from './CreateContact/CreateContact'
import ChoosePhoto from './ChoosePhoto/ChoosePhoto'
import ContactDetail from './ContactDetail/ContactDetail'

/**
 * screen list for tab
 */
import Favorites from './Favorites/Favorites'
import Contacts from './Contacts/Contacts'

/**
 * import all icon tabnav
 */


import LandingTabNavigator from '../components/Common_TabNavigator/Common_TabNavigator'

// const itemMenu = {
//   list: [
//     // {
//     //   contentId: 1,
//     //   txt: 'HOME',
//     //   path: 'Home',
//     //   attachedImg: HomeIcon,
//     //   activeImg: HomeIconActive,
//     // },
//   ]
// }

const TabNav = createMaterialTopTabNavigator(
  {
    Contacts: { screen: Contacts },
    Favorites: { screen: Favorites },
    // Recents: { screen: Recents },
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
      },
      style: {
        backgroundColor: '#6B52AD',
      },
      tabStyle: {
        paddingTop: (Platform.OS === 'ios') ? 50 : 0
      }
    },
    initialRouteName: 'Contacts',
    lazy: true
  }
)

const StackNav = createStackNavigator({
  Root: { screen: TabNav, navigationOptions: { header: null } },
  CreateContact: { screen: CreateContact },
  ChoosePhoto: { screen: ChoosePhoto },
  ContactDetail: { screen: ContactDetail }
}, {
    initialRouteName: 'Root',
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#6B52AD',
        height: 60,
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
        elevation: 0
      },
      headerBackTitle: null,
      headerTintColor: "white",
      headerTitleStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16
      },
    },
    cardStyle: {
      backgroundColor: "white"
    },
  })

export default class NavWrapper extends Component {
  render() {
    return (
      <StackNav />
    )
  }
}