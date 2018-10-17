import React, { Component } from 'react'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { View, Text, Platform } from 'react-native'
import StatusBackground from '../components/StatusBackground/StatusBackground'

/**
 * screen list for staknav
 */
import CreateContact from './CreateContact/CreateContact'

/**
 * screen list for tab
 */
import Favorites from './Favorites/Favorites'
import Recents from './Recents/Recents'
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
    Favorites: { screen: Favorites },
    // Recents: { screen: Recents },
    Contacts: { screen: Contacts }
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
    initialRouteName: 'Favorites',
    lazy: true
  }
)

const StackNav = createStackNavigator({
  Root: { screen: TabNav, navigationOptions: { header: null } },
  CreateContact: { screen: CreateContact }
}, {
    initialRouteName: 'Root',
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#57b752",
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