import React from 'react';

import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button,FooterTab} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateGames } from '../../Reducers/games';
import { updateGamesList } from '../../Reducers/gamesList';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updatePlayers } from '../../Reducers/players';

import { v4 as uuidv4 } from "uuid";

import DisplayGames from '../Game/DisplayGames';
import Game from '../Game/Game';
import GameListWinningStreak from './GameListWinningStreak';
import GameListLongestStreak from './GameListLongestStreak';

class GameList extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth()
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        loading: true,
        gamesDb: [],
        gamesLength: 0,
    };
  }


  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    eventID: 0,
    games: this.props.games.games || [],
    gamesList: this.props.gamesList.gamesList || [],
    winningStreak: this.props.playerStats.winningStreak || 0,
    longestStreak: this.props.playerStats.longestStreak || 0,
    highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
    highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
    highestTeamScore: this.props.playerStats.highestTeamScore || 0,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
  };

  handleChange = ( gameID, gameRuns, games, gamesList, playerStats, players ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ games });
    this.setState({ gamesList });
    this.setState({ playerStats });
    this.setState({ players });
  };

 //state = { currentUser: null }
  //state = { email: '', password: '', errorMessage: null }

  componentDidMount() {
    //console.log(nextProps);
    //this.onLoad();

    console.log(this.props.games.games);
    console.log(this.props.players.facingBall);
    //SplashScreen.hide()
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
    console.log('is this hit right now?');

}

componentWillMount() {
  console.log('is this hit right now #3?');
}

componentWillUnmount() {
    this.unsubscribe();
    console.log('is this hit right now #2?');
}

onDocCollectionUpdate = (documentSnapshot) => {

  let gamesLength = this.state.gamesLength;

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

  let allPlayersNew = this.props.players.players;

  if (allPlayersNew === undefined || allPlayersNew === null || allPlayersNew < 1 || allPlayersNew === []) {

    allPlayersNew = documentSnapshot.data().players

  }

  console.log(allPlayersNew);

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
  }

}


componentDidUpdate(nextProps) {
  console.log(nextProps);
  console.log(nextProps.games.games);
  console.log(this.props.games.games);
  //this.onLoad(nextProps);


}

    /*
    this.setState({
      games: games,
    }, function () {
      const { games } = this.state
      this.props.dispatch(updateGames(this.state.games));
     })


    //this.props.retrieveCurrentUser(this.props.token);
  }

}
*/


onLoad = (nextProps) => {
this.props.navigation.addListener('didFocus', payload => {
  console.log('did focus hit');

  const games = this.props.games.games;

  let sessionId = this.state.sessionId;

  const randOne = Math.random();
  sessionId = sessionId + randOne;
  const sessionIdString = sessionId.toString()

  const gameName = "Game refresh text. " + sessionIdString;
  console.log(gameName);

  let gameNameChange = {
    displayId: sessionId,
    gameId: 1,
    gameName: "Game refresh text.",
    gameResult: 3,
    key: "Hello2",
  }

  let gameDisplayIdIndexCount = 0
  let gameDisplayIdIndexArray = games.map(acc => {
  console.log(acc);
  console.log(acc.displayId);
  if (acc.displayId  === 1) {
    console.log(acc.displayId);
    return gameDisplayIdIndexCount;
  }
  else {
    gameDisplayIdIndexCount++;
    return 'na';
  }
  });

  console.log(gameDisplayIdIndexArray);


  let gameDisplayIdIndex = gameDisplayIdIndexArray.filter( runs => runs != 'na')
  console.log(gameDisplayIdIndex);


  console.log(games);
  games.splice(gameDisplayIdIndex,1,gameNameChange);
  console.log(games);


  this.setState({
  games: games,
  }, function () {
    const { games } = this.state
    this.props.dispatch(updateGames(this.state.games));
  })

  this.setState({
  sessionId: sessionId,
  });




})
}

/*
  console.log('is the GameList listener getting hit?');
  const games = this.props.games.games;

  this.setState({
    games: games,
  }, function () {
    const { games } = this.state
    this.props.dispatch(updateGames(this.state.games));
   })

})
}
*/


addnewGame = () => {
  console.log(this.props.games.games);
  const { currentUser } = this.state

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
    dateTime = isoString.replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '');
    console.log(dateTime);
    const dateTimeInt = parseInt(dateTime);
    console.log(this.state.gamesDb);
    const games = this.state.gamesDb


    console.log(this.props.games.games);
    if (this.props.games.games === undefined || this.props.games.games === null || this.props.games.games.length < 1 || this.props.games.games === []) {
      console.log('add new game hit');
      console.log(games);
      console.log(this.state);

      /*
      this.setState({
        games: games,
      }, function () {
        const { games } = this.state
        this.props.dispatch(updateGames(this.state.games));
      })
      */


    }




  firebase.firestore().collection(currentUser.uid).add({
    gameId: gameID,
    gameName: 'Cricket Strategy Simulator',
    displayId: dateTimeInt,
    gameResult: 0,
  })
  .then(this.setState({
    gameID: gameID,
  }, function () {
    console.log('gameID redux set hit ' + gameID);
    const { gameID } = this.state
    this.props.dispatch(updateGameId(this.state.gameID));
  }))
  /*
  .then(this.setState({
    games: games,
  }, function () {
    console.log('gameID redux set hit ' + games);
    const { games } = this.state
    this.props.dispatch(updateGames(this.state.games));
  }))
  */
  //.then(this.props.navigation.navigate('Game'))
  .then(this.props.navigation.navigate('SimulateFirstInnings', {
    displayId: dateTimeInt,
    gameID: gameID
    }))

}

onCollectionUpdate = (querySnapshot) => {
  console.log(this.props.games.games);
  let games = [];
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
  });

  console.log(games);

  console.log(this.props.games.games);
  this.setState({
    //games
    gamesDb: games,
    loading: false,
 });
 console.log(this.props.games.games);

 if (this.props.games.games === undefined || this.props.games.games === null || this.props.games.games.length < 1) {

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


  gamesLength = games.length;
  console.log(gamesLength);
  this.setState({
    gamesLength: gamesLength,
  })


}


  games = () => {

    console.log(this.state.gamesDb);
    console.log(this.props.games.games);
    console.log(this.props.games.games);

/*
if (this.props.games.games === undefined || this.props.games.games === null || this.props.games.games.length < 1) {

const games = this.state.gamesDb.sort((a, b) => {
      if (a.displayId < b.displayId) return -1;
      if (a.displayId > b.displayId) return 1;
      return 0;
    });

    console.log(games);

    //******** NEED TO ADD Updating the redux games store next *********** //

    return (
      <Col>
      <Row>
      <FlatList
          data={games}
          renderItem={({ item }) => <DisplayGames {...item} navigation={this.props.navigation} />}
        />
      </Row>
    </Col>
    )
  }
  else {
  */
    console.log('redux games hit');
    const games = this.props.games.games.sort((a, b) => {
          if (a.displayId < b.displayId) return -1;
          if (a.displayId > b.displayId) return 1;
          return 0;
        }).reverse();

        console.log(games);

        /*
        return (
          <Col>
          <Row>
          <Text>{games[0].displayId}</Text>
          </Row>
          <Row>
          <FlatList
              data={games}
              renderItem={({ item }) => <DisplayGames {...item} navigation={this.props.navigation} />}
            />
          </Row>
        </Col>
        )
        */

        return (
          <Col>
          <Row>
            <DisplayGames navigation={this.props.navigation} />
          </Row>
        </Col>
        )
      //}

  }

  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon name="sync" style={{fontSize: 24, color: tintColor}} />
    )
  }

  render() {
    const { currentUser } = this.state
    console.log(currentUser);
    console.log(this.state.currentUser);

    if (this.state.loading) {
    return null; // or render a loading icon
  }

  console.log(this.props.games.games);

    return (
    <Container>
    <Header style={styles.headerStyle}>
      <Left size={1}>
        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff', paddingLeft: 20, marginTop: 'auto', marginBottom: 'auto' }} />
      </Left>
      <Col size={1} style={ styles.logoStylingCol }>
      <Image
       source={require('../../assets/4dot6logo-transparent.png')}
       style={{ height: '100%', width: 'auto', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
      />
      </Col>
      <Right size={1} style={styles.colVerticleAlign}>
        </Right>
    </Header>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
    <Content style={{ flex: 1, width: '100%'}}>
      <Grid>
          {this.games()}
      </Grid>
        <View style={styles.containerID}>
        <Text style={styles.textDescID}>
          USER: {currentUser && currentUser.email}
        </Text >
        <Text style={styles.textDescID}>
          UID: {currentUser.uid}!
        </Text>
      </View>
    </Content>
    <Footer style={{ height: 120, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
      <FooterTab>
        <Button
          vertical
          light
          style={{height: '100%'}}
          onPress={() => props.navigation.navigate("CricStratIap")}>
          <Icon name="bowtie" />
          <Text>Stats</Text>
        </Button>
        <Button vertical
        style={styles.largeButtonStartGame}>
             <GameListWinningStreak />
        </Button>
        <Button vertical
        style={{height: '100%'}}>
             <GameListLongestStreak />
        </Button>
        <Button
          vertical
          success
          style={{height: '100%'}}
          onPress={() => this.addnewGame()} >
          <Icon name="headset" />
          <Text>New Game</Text>
        </Button>
      </FooterTab>
    </Footer>
    </LinearGradient>
  </Container>
  );
  }
}


const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  games: state.games,
  gamesList: state.gamesList,
  playerStats: state.playerStats,
  players: state.players,
});

export default connect(mapStateToProps)(GameList);

//export default GameList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerID: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    linearGradient: {
      flex: 1,
      //paddingLeft: 15,
      //paddingRight: 15,
      //borderRadius: 5
    },
    textHeader: {
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textHeaderThreshold: {
      color: '#fff',
      alignItems: 'flex-start',
      width: '90%'
    },
    textDesc: {
      color: '#eee',
      fontWeight: '100',
    },
    textDescID: {
      color: '#eee',
      fontSize: 20,
    },
    textHeaderNumber: {
      color: '#fff',
      fontSize: 40,
      lineHeight: 40,
    },
    colCenter: {
      alignItems: 'center',
    },
    horizontalRule: {
      borderBottomColor: '#fff',
      borderBottomWidth: 0.5,
      width: '100%',
      marginTop: 15,
      marginBottom: 15,
    },
    colVerticleAlign: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    largeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
    largeButtonStartGame: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
      textAlign: 'center',
    },
    buttonText: {
      fontSize: PixelRatio.get() === 1 ? 28 : PixelRatio.get() === 1.5 ? 32 : PixelRatio.get() === 2 ? 36 : 40,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    buttonTextBack: {
      fontSize: 20,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    buttonTextStartGame: {
      fontSize: 20,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '200',
      textAlign: 'center',
    },
    winningStreakText: {
      fontSize: 14,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
    winningStreakNumber: {
      fontSize: 44,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '600',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
    rowPadding :{
      paddingTop: 20,
    },
    rowPaddingStartGame :{
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      textAlign: 'center',
    },
    logoStylingCol :{
      marginBottom: 5,
      marginTop: 5,
      marginLeft: Platform.OS === 'android' ? '17%' : 0,
      justifyContent: 'center'
    },
    headerStyle: {
      height: PixelRatio.get() === 1 ? 45 : PixelRatio.get() === 1.5 ? 50 : PixelRatio.get() === 2 ? 75 : PixelRatio.get() === 3.5 ? 60 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 60 : 75,
      backgroundColor: '#12c2e9',
    },
    horizontalRule: {
      borderTopColor: '#fff',
      borderTopWidth: 0.5,
      width: '100%',
      marginTop: 30,
    },
    ThresholdStyle: {
      fontSize: 40,
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#fff',
      borderBottomColor: '#fff', backgroundColor: 'rgba(204, 204, 204, 0.4)'
    }
});

/*
<Grid>
    <Button rounded large warning style={styles.largeButton}
        onPress={() => this.props.navigation.navigate('Game')} >
        <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Play Game</Text>
      </Button>
</Grid>
*/

/*

<Row size={1}>
  <Col size={1}>
    <Row>
      <Text>Current winning streak:</Text>
    </Row>
    <Row>
      <Text>0</Text>
    </Row>
  </Col>
  <Col size={1}>
    <Row>
      <Text>Longest winning streak:</Text>
    </Row>
    <Row>
      <Text>9</Text>
    </Row>
  </Col>
</Row>

*/

/*
<GameListWinningStreak />
<GameListLongestStreak />
<Col size={3} style={styles.rowPaddingStartGame}>
  <Button rounded large warning style={styles.largeButtonStartGame}
    onPress={() => this.addnewGame()} >
    <Text style={styles.buttonTextBack}>Play!</Text>
  </Button>
</Col>
*/
