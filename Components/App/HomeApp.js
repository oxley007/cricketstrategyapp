import React, {
  Component
} from 'react';
import { StyleSheet, Text, View, PixelRatio, Platform, ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
//import { LinearGradient } from 'expo';
//import Button from '../Button/Button.js';
//import Display from '../Display/Display.js';
import Add from '../Add/Add.js';
import Overs from '../Overs/Overs.js';
import Wickets from '../Wickets/Wickets.js';
import Stats from '../Stats/Stats.js';
import HeaderDisplay from '../HeaderComponents/HeaderDisplay.js';
import DisplayGames from '../Game/DisplayGames';
import GameListWinningStreak from './GameListWinningStreak';
import GameListLongestStreak from './GameListLongestStreak';
import { updateToggle } from '../../Reducers/toggle';
//import Purchase from '../inAppPurchase/inAppPurchase.js';

/*
Stops the splash screen white file_cache_consistency_checks
*/
import SplashScreen from 'react-native-splash-screen';
import { WebView } from 'react-native-webview';
import { v4 as uuidv4 } from "uuid";

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateGames } from '../../Reducers/games';
import { updateGamesList } from '../../Reducers/gamesList';
import { updatePlayers } from '../../Reducers/players';
import { updateWideCount } from '../../Reducers/wideCount';
import { updateGameId } from '../../Reducers/gameId';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Footer, Body, Content, Left, Icon, Button } from 'native-base';

import BallCalc from '../../Util/BallCalc.js';
import BallDiff from '../../Util/BallDiff.js';

// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  headerStyle: {
    height: PixelRatio.get() === 1 ? 45 : PixelRatio.get() === 1.5 ? 50 : PixelRatio.get() === 2 ? 75 : PixelRatio.get() === 3.5 ? 60 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 60 : 75,
    backgroundColor: '#12c2e9',
  },
  footerStyle: {
    height: PixelRatio.get() === 1 ? 75 : PixelRatio.get() === 1.5 ? 95 : PixelRatio.get() === 2 ? 100 : PixelRatio.get() === 3.5 ? 120 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 100 : 150,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  largeButtonLoad: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    height: 200,
  },
  xButton: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonTextBackLoad: {
    fontSize: 30,
    color: '#fff',
    marginTop: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    fontWeight: '300',
  },
  buttonTextBackLoadSmall: {
    fontSize: 20,
    color: '#fff',
    marginRight: 'auto',
    marginLeft: 'auto',
    fontWeight: '200',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '200',
      textAlign: 'center',
  },
  linearGradientBg: {
    opacity: 0.9,
     borderRadius: 15
  },
  horizontalRule: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
});

class HomeApp extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth()
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        loading: false,
        getGames: false,
        loadFlag: false,
        loadHome: true,
    };
  }

  state = {
    gameRunEvents: [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    games: this.props.games.games || [],
    gamesList: this.props.gamesList.gamesList || [],
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    widecount: this.props.widecount.widecount || 0,
    gameID: this.props.gameID.gameID || '0',
    togglePremium: this.props.toggle.togglePremium || true,
    toggleHomeLoad: this.props.toggle.toggleHomeLoad || true,
  };

  handleChange = ( gameRuns, games, gamesList, players, widecount, gameID, toggle ) => {
    this.setState({ gameRuns });
    this.setState({ games });
    this.setState({ gamesList });
    this.setState({ players });
    this.setState({ widecount });
    this.setState({ gameID });
    this.setState({ toggle });
  };

  componentDidMount() {

        SplashScreen.hide();
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
        console.log('is this hit right now?');
    }

    onDocCollectionUpdate = (documentSnapshot) => {


      let gamesLength = this.state.gamesLength;

      /*
      console.log(gamesLength);
      if (gamesLength <= 2) {
        gamesLength = 3;
        this.setState({
          gamesLength: gamesLength,
        })
        console.log('hit should nav to AddPlayers.');
        const { navigation } = this.props;
        this.props.navigation.navigate('GameAddPlayers');
        console.log('shouldnt get hit.');
      }
      else {
      */
      let allPlayersNew = this.props.players.players;

      if (allPlayersNew === undefined || allPlayersNew === null || allPlayersNew < 1 || allPlayersNew === []) {

        allPlayersNew = documentSnapshot.data().players

        console.log(allPlayersNew + ' allPlayersNew === undefined');
        if (allPlayersNew === undefined || allPlayersNew === null || allPlayersNew < 1 || allPlayersNew === []) {
          console.log('no players in DB');
          const { navigation } = this.props;
          this.props.navigation.navigate('GameAddPlayers');
          console.log('shouldnt get hit.');
        }

      }

      console.log(allPlayersNew + ' allPlayersNew here..');

      /*
      this.ref.doc("players").update({
        players: allPlayersNew,
        facingBall: 1,
      });
      */


      this.setState({
        players: allPlayersNew,
        facingBall: 1,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })

      console.log(this.props.players.players);

      //}

    }

    onCollectionUpdate = (querySnapshot) => {
      console.log(this.props.games.games + ' onCollectionUpdate inital games state redux.');
      let games = [];

      if (this.props.games.games === undefined || this.props.games.games === null || this.props.games.games.length < 1) {

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const { gameId, gameName, firstInningsRuns, totalRuns, topScore, topScorePlayer, topSecondScore, topSecondScorePlayer, topScoreBalls, topSecondBalls, displayId, totalWickets, gameResult } = doc.data();

        games.push({
          key: doc.id,
          //doc, // DocumentSnapshot
          gameId,
          gameName,
          firstInningsRuns,
          totalRuns,
          topScore,
          topScorePlayer,
          topSecondScore,
          topSecondScorePlayer,
          topScoreBalls,
          topSecondBalls,
          displayId,
          totalWickets,
          gameResult,
        });
      })

      games = games.sort((a, b) => {
            if (a.displayId < b.displayId) return -1;
            if (a.displayId > b.displayId) return 1;
            return 0;
          });


      this.setState({
        games: games,
      }, function () {
        const { games } = this.state
        this.props.dispatch(updateGames(this.state.games));
       })

    }
    else {
      games = this.props.games.games;

      const gamesLength = games.length;
      console.log(gamesLength);
      this.setState({
        gamesLength: gamesLength,
      })

      console.log(gamesLength);

      const gamesLengthNew = gamesLength - 1;

      console.log(gamesLengthNew);

    let countGames = 0;


    games = games.map(acc => {
    console.log(acc);
    console.log(acc.gameResult + ' gameResult 1');
    console.log(countGames + ' countGames 1');
    if (acc.gameResult === 0 && countGames === 0) {
      console.log(acc.gameResult + ' gameResult 2');
      countGames++
      return {displayId: acc.displayId, firstInningsRuns: acc.firstInningsRuns, gameId: acc.gameId, gameName: acc.gameName, gameResult: 3, gameRunEvents: acc.gameRunEvents, players: acc.players, key: acc.key, topScore: acc.topScore, topScoreBalls: acc.topScoreBalls, topScorePlayer: acc.topScorePlayer, topSecondBalls: acc.topSecondBalls, topSecondScore: acc.topSecondScore, topSecondScorePlayer: acc.topSecondScorePlayer, totalRuns: acc.totalRuns, totalWickets: acc.totalWickets, keyId: acc.keyId};
    }
    else {
      countGames++
      return acc;
    }
    });

    this.setState({
      games: games,
    }, function () {
      const { games } = this.state
      this.props.dispatch(updateGames(this.state.games));
     })
    }



      console.log(games + ' new home page games.');

      console.log(this.props.games.games + ' onCollectionUpdate inital games state redux 2.');
      this.setState({
        //games
        gamesDb: games,
        loading: false,
     });

     console.log(this.props.games.games + ' check to see if updated.');


      this.setState({
        loadFlag: true,
      })

      this.setState({
        loading: false,
      })

      this.setState({
        getGames: false,
      })

      this.setState({
        loadHome: false,
      })

    }

  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon name="home" style={{fontSize: 24, color: tintColor}} />
    )
  }

goToNewGame = () => {

  console.log(this.props.games.games);
  //const { currentUser } = this.state

  //const uuidv4 = require('uuid/v4');
  uuidv4();
  console.log(uuidv4);
  console.log(uuidv4());
    console.log(this.props.games.games);
    let gameRunEvents = [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}];
    console.log(this.props.games.games);
    let eventID = 0;
    this.props.dispatch(updateGameRuns(gameRunEvents, eventID))
    let gameID = uuidv4();
    console.log(gameID);

    let now = new Date();
    let isoString = now.toISOString();
    console.log(isoString);
    const dateTime = isoString.replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '');
    console.log(dateTime);
    const dateTimeInt = parseInt(dateTime);
    console.log(this.state.gamesDb);
    const games = this.state.gamesDb

    console.log(gameID);
    console.log(dateTimeInt);

    const { navigation } = this.props;

  this.setState({
    gameID: gameID,
  }, function () {
    console.log('gameID redux set hit ' + gameID);
    const { gameID } = this.state
    this.props.dispatch(updateGameId(this.state.gameID));
  })


  this.setState({
    togglePremium: true,
    toggleHomeLoad: true,
  }, function () {
    const { togglePremium, toggleHomeLoad } = this.state
    this.props.dispatch(updateToggle(this.state.togglePremium, this.state.toggleHomeLoad));
  })


    this.props.navigation.navigate('SimulateFirstInnings', {
      displayId: dateTimeInt,
      gameID: gameID
      })

}


  goToGameList = () => {

    this.setState({
      loading: true,
    })

    this.setState({
      getGames: true,
    })


    console.log('goto Fame List hie.');

    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.refPlayers.onSnapshot(this.onDocCollectionUpdate)







    //const { navigation } = this.props;
    //this.props.navigation.navigate('StatsMain');

    console.log('goto Fame List hie 2.');

    //const { navigation } = this.props;
    //this.props.navigation.navigate('GameList');
  }

  closeWelcome = () => {

      this.setState({
      widecount: 1,
      }, function () {
        const { widecount } = this.state
        this.props.dispatch(updateWideCount(this.state.widecount));
      })

  }

  getWelcome = () => {

    const displayWelcome = this.props.widecount.widecount;

    if (displayWelcome === 1) {
      //display nohting.
    }
    else {
    return (
    <Col style={{backgroundColor: '#fff', borderRadius: 15, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, opacity: 0.8, marginTop: 10}}>
    <Row>
      <Col size={9}>
          <Text style={{color: '#c471ed', fontSize: 30, marginBottom: 10}}>Welcome!</Text>
      </Col>
      <Col size={1}>
          <Button style={styles.xButton}
          onPress={() => this.closeWelcome()}>
            <Text style={{color: '#c471ed', fontSize: 30}}>x</Text>
          </Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <Text style={{color: '#333', fontSize: 20, marginBottom: 5}}>The aim of the game:</Text>
        <Text style={{color: '#333', marginBottom: 10}}>Use your cricket knowledge to build a strategy to chase down a score. You need to make crucial decisions at the end of each over - you must decide one of the following options:</Text>
        <Text style={{color: '#333', marginLeft: 10, marginBottom: 5}}><Text style={{fontWeight: '500', fontSize: 20}}>a)</Text> Bat aggressive and hit big (with the risk of losing wickets).</Text>
        <Text style={{color: '#333', marginLeft: 10, marginBottom: 5}}><Text style={{fontWeight: '500', fontSize: 20}}>b)</Text> Bat sensibly by pushing the ball around and waiting for the bad ball.</Text>
        <Text style={{color: '#333', marginLeft: 10, marginBottom: 10}}><Text style={{fontWeight: '500', fontSize: 20}}>c)</Text> Bat defensively to build momentum before hitting big later in the innings.</Text>
        <Text style={{color: '#333', marginBottom: 10}}>Your cricket knowledge and experience will be tested with our cricket strategy simulator. Good luck!</Text>
      </Col>
    </Row>
  </Col>
  )
  }
  }

  getNewGameButton = () => {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 15}} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientBg}>
          <Button large style={styles.largeButtonLoad}
          onPress={() => this.goToNewGame()}>
          <Col>
            <Row>
            <Text style={styles.buttonTextBackLoad}>New Game...</Text>
            </Row>
            <Row>
            <Text style={styles.buttonTextBackLoadSmall}>Start a new game</Text>
            </Row>
            </Col>
          </Button>
        </LinearGradient>
      </ImageBackground>

  )
  }

/*
  getGameButton = () => {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-web.png`)} imageStyle={{ borderRadius: 15}} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientBg}>
          <Button large style={styles.largeButtonLoad}
          onPress={() => this.goToGameList()}>
          <Col>
            <Row>
            <Text style={styles.buttonTextBackLoad}>Load Games...</Text>
            </Row>
            <Row>
            <Text style={styles.buttonTextBackLoadSmall}>View previous games</Text>
            </Row>
            </Col>
          </Button>
        </LinearGradient>
      </ImageBackground>

  )
  }
  */

  getStatsButton = () => {
    const { navigation } = this.props;

    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} imageStyle={{ borderRadius: 15}} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientBg}>
          <Button large style={styles.largeButtonLoad}
          onPress={() => this.props.navigation.navigate('StatsMain')}>
          <Col>
            <Row>
            <Text style={styles.buttonTextBackLoad}>Stats & Goals</Text>
            </Row>
            <Row>
            <Text style={styles.buttonTextBackLoadSmall}>View games stats & goal challenges</Text>
            </Row>
            </Col>
          </Button>
        </LinearGradient>
      </ImageBackground>

  )
  }

  getGames = () => {

    console.log('Process games here, then navigate.' );

    this.setState({
      loading: false,
    })

  }

  getGamesNew = () => {
    //do somehtin here.

    console.log('do something here.');




  }

  getDisplay = () => {

    const loading = this.state.loading;
    const getGames = this.state.getGames;
    const loadFlag = this.state.loadFlag;

    if (loading === true && getGames === false) {
      return (
        <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          style={{ color: '#fff', height: 200, width: 'auto' }}
          size="large"
          color="#fff"
        />
        <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...</Text>
        <WebView
          onLoad={() => this.getGames()}
          style={{ height: 0 }}
        />
        </Col>
      )

      console.log('does this get hit?');

    }
    if (loading === true && getGames === true) {
      return (
        <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          style={{ color: '#fff', height: 200, width: 'auto' }}
          size="large"
          color="#fff"
        />
        <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...</Text>
        <WebView
          onLoad={() => this.getGamesNew()}
          style={{ height: 0 }}
        />
        </Col>
      )

      console.log('does this get hit?');

    }
    if (loading === false && getGames === false && loadFlag === true) {

      this.setState({
        loadFlag: false,
      })

      const games = this.props.games.games;

      const { navigation } = this.props;
      this.props.navigation.navigate('GameListingsNew', {
        games: games,
        });
      //this.props.navigation.navigate('GameListNew');


    }
    else {
    return (

      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
        <Content style={{ flex: 1, width: '100%'}}>
          {this.getWelcome()}
          <Col style={{backgroundColor: '#fff', borderRadius: 15, opacity: 0.8, marginTop: 10}}>
            {this.getNewGameButton()}
          </Col>
          <Col>
            <Row>
              <GameListWinningStreak />
              <GameListLongestStreak />
              </Row>
          </Col>
        <Col style={{backgroundColor: '#fff', borderRadius: 15, opacity: 0.8, marginTop: 10}}>
          {this.getStatsButton()}
        </Col>
        <Col style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.horizontalRule} />
          <Text style={{fontSize: 30, color: '#fff'}}>Previous Games:</Text>
          <View style={styles.horizontalRule} />
        </Col>
        <Col style={{backgroundColor: '#fff', borderRadius: 15, opacity: 0.8, marginTop: 10}}>
        {this.games()}
        </Col>
      </Content>
    </LinearGradient>
    )
  }

  }

  games = () => {

    const { navigation } = this.props;
    /*
    const gamesParam = navigation.getParam('games', []);

    console.log('redux games hit games listings!');
    const games = gamesParam.sort((a, b) => {
          if (a.displayId < b.displayId) return -1;
          if (a.displayId > b.displayId) return 1;
          return 0;
        }).reverse();
        */

        const games = this.props.games.games;

        return (
          <Col >
          <Row>
            <DisplayGames navigation={this.props.navigation} games={games} />
          </Row >
        </Col>
        )
      //}

  }

  getHomeLoad = () => {

    const loadHome = this.state.loadHome;

    if (loadHome === true) {
      return (
        <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          style={{ color: '#fff', height: 200, width: 'auto' }}
          size="large"
          color="#fff"
        />
        <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...</Text>
        </Col>
      )
    }

  }

render() {
  return (
      <Container>
      {this.getHomeLoad()}
      <Header style={styles.headerStyle}>
      <Row>
      <Col size={0.6}>
        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff', paddingLeft: 20, marginTop: 'auto', marginBottom: 'auto' }}/>
      </Col >
        <HeaderDisplay navigation={this.props.navigation} />
        </Row>
      </Header>
        {this.getDisplay()}

    </Container>
          );
        }
      }

      const mapStateToProps = state => ({
        gameRuns: state.gameRuns,
        games: state.games,
        gamesList: state.gamesList,
        players: state.players,
        widecount: state.widecount,
        gameID: state.gameID,
        toggle: state.toggle,
      });


export default connect(mapStateToProps)(HomeApp);
