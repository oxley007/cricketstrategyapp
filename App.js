/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import {
      createStackNavigator,
      createAppContainer,
    } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
//import LoginScreen from './Components/App/LoginScreen.js';
//import Scorebook from './Components/App/Scorebook.js';
//import ResetHome from './Components/App/ResetHome.js';
//import FeedbackHome from './Components/App/FeedbackHome.js';
//import ProHome from './Components/App/ProHome.js';
//import FinishTransaction from './Components/App/FinishTransaction.js';
//import Settings from './Components/App/Settings.js';
import GameListNew from './Components/App/GameList.js';
import Loading from './Components/App/Loading.js';
import SignUp from './Components/App/SignUp.js';
import Login from './Components/App/Login.js';
import SignOut from './Components/App/SignOut.js';
import Game from './Components/Game/Game.js';
import SimulateFirstInnings from './Components/Game/SimulateFirstInnings.js';
import OverBowled from './Components/GameOverBowled/OverBowled.js';
import WicketCheck from './Components/GameWicketCheck/WicketCheck.js';
import WicketOut from './Components/GameWicketCheck/WicketOut.js';
import WicketNotOut from './Components/GameWicketCheck/WicketNotOut.js';
import TooCloseToCall from './Components/GameWicketCheck/TooCloseToCall.js';
import Scorebook from './Components/App/Scorebook.js';
import Main from './Components/App/Main.js';
import GameAddPlayers from './Components/GameAddPlayers/GameAddPlayers.js';
import GameAddPreBuiltTeam from './Components/GameAddPlayers/GameAddPreBuiltTeam.js';
import HitRuns from './Components/Board/HitRuns.js';
import CricStratIap from './Components/Iap/CricStrat_Iap.js';
import IapTrue from './Components/Iap/IapTrue.js';

//import HeaderDisplay from './Components/HeaderComponents/HeaderDisplay.js';
import {Header,Left,Right,Icon} from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

/*
const { width } = Dimensions.get('window');
*/

class Hidden extends React.Component {
  render() {
    return null;
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#12c2e9' }}>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('./assets/4dot6-logo-500px.png')} style={{height: 120, width: 120, borderRadius: 60, borderColor: '#fff', borderWidth:4}} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
  );

const RootStack = createDrawerNavigator(
  {
    Loading: {
      screen: Loading,
    },
    Login: {
      screen: Login,
    },
    HitRuns: {
      screen: HitRuns,
    },
    CricStratIap: {
      screen: CricStratIap,
    },
    IapTrue: {
      screen: IapTrue,
    },
    SignUp: {
      screen: SignUp,
    },
    SimulateFirstInnings: {
      screen: SimulateFirstInnings,
    },
    GameAddPlayers: {
      screen: GameAddPlayers,
    },
    GameListNew: {
      screen: GameListNew,
    },
    SignOut: {
      screen: SignOut,
    },
    Game: {
      screen: Game,
    },
    OverBowled: {
      screen: OverBowled,
    },
    WicketCheck: {
      screen: WicketCheck,
    },
    WicketOut: {
      screen: WicketOut,
    },
    WicketNotOut: {
      screen: WicketNotOut,
    },
    TooCloseToCall: {
      screen: TooCloseToCall,
    },
    GameAddPreBuiltTeam: {
      screen: GameAddPreBuiltTeam,
    }
  },
  {
    contentComponent: CustomDrawerComponent,
    //drawerWidth: width,
    contentOptions: {
      activeTintColor: '#fff'
    }
  }
);


  const App = createAppContainer(RootStack);

  export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12c2e9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
});
