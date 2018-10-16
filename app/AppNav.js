import React, { Component } from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { View, Text } from 'react-native'

/**
 * screen list for staknav
 */
import HomeLanding from './HomeLanding/HomeLanding'

/**
 * screen list for tab
 */

/**
 * import all icon tabnav
 */

import LandingTabNavigator from '../components/Common_TabNavigator/Common_TabNavigator'

const itemMenu = {
  list: [
    // {
    //   contentId: 1,
    //   txt: 'HOME',
    //   path: 'Home',
    //   attachedImg: HomeIcon,
    //   activeImg: HomeIconActive,
    // },
  ]
}

// const TabNav = createBottomTabNavigator(
//   {},
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarComponent: (({ navigation }) =>
//         <LandingTabNavigator
//           backgroundColor={'#57b752'}
//           itemMenu={itemMenu}
//           navigation={navigation}
//         />)
//     }),
//     initialRouteName: 'Home',
//     lazy: true
//   }
// )

const StackNav = createStackNavigator({
  // Root: { screen: TabNav, navigationOptions: { header: null } },
  HomeLanding: { screen: HomeLanding },
}, {
    initialRouteName: 'HomeLanding',
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