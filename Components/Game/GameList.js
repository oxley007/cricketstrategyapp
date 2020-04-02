import React from 'react';

import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';

import { v4 as uuidv4 } from "uuid";

import DisplayGames from '../Game/DisplayGames';
import Game from '../Game/Game';


class GameList extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth()
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        loading: true,
        games: [],
    };
  }


  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    eventID: 0,
    list: [],
    offset: 0,
    limit: 100
  };

  handleChange = ( gameID, gameRuns ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
  };

 //state = { currentUser: null }
  //state = { email: '', password: '', errorMessage: null }

  componentDidMount() {
    //SplashScreen.hide()
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.fetchResult();
}

componentWillUnmount() {
    this.unsubscribe();
}

addnewGame = () => {
  const { currentUser } = this.state

  //const uuidv4 = require('uuid/v4');
  uuidv4();
  console.log(uuidv4);
  console.log(uuidv4());

    let gameRunEvents = [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}];
    let eventID = 0;
    this.props.dispatch(updateGameRuns(gameRunEvents, eventID))
    let gameID = uuidv4();
    console.log(gameID);

    let now = new Date();
    let isoString = now.toISOString();
    console.log(isoString);
    dateTime = isoString.replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '');
    console.log(dateTime);


  firebase.firestore().collection(currentUser.uid).add({
    gameId: gameID,
    gameName: 'Cricket Strategy Simulator',
    displayId: dateTime,
    gameResult: 0,
  })
  .then(this.setState({
    gameID: gameID,
  }, function () {
    console.log('gameID redux set hit ' + gameID);
    const { gameID } = this.state
    this.props.dispatch(updateGameId(this.state.gameID));
  }))
  //.then(this.props.navigation.navigate('Game'))
  .then(this.props.navigation.navigate('SimulateFirstInnings'))

}

onCollectionUpdate = (querySnapshot) => {
  const games = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    const { gameId, gameName, firstInningsRuns, totalRuns, topScore, topScorePlayer, topSecondScore, topSecondScorePlayer, topScoreBalls, topSecondBalls, displayId, totalWickets, gameResult } = doc.data();



    games.push({
      key: doc.id,
      doc, // DocumentSnapshot
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

  this.setState({
    games,
    loading: false,
 });

}


  games = () => {
    //const games = this.state.games.sort( (a, b) => new Date(b.date) - new Date(a.date) )
    //const games = this.state.games.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));

console.log(this.state.games);

/*
  this.state.games.sort(function(a,b){
    console.log('a date ' + a.displayId);
    console.log('b date ' + b.displayId);
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return b.displayId - a.displayId;
})

console.log(this.state.games);
*/

/*
this.state.games.sort(function(a, b) {
  console.log('a date ' + a.date);
  console.log('b date ' + b.date);
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
});
*/
  //console.log(gamesDates);

  // order by ascending


const games = this.state.games.sort((a, b) => {
      if (a.displayId < b.displayId) return -1;
      if (a.displayId > b.displayId) return 1;
      return 0;
    }).reverse();

    console.log(games);

    fetchResult = () => {
        const { offset, limit, list } = this.state;
        fetchModeDateFromAPI(offset, limit).then(res => {
        if (!res.list) return;
        this.setState({
            list: list.concat(res.list),
            offset: offset + 100,
            limit: limit
        });
        });
    };

    //console.log(this.state.games[0].date);
    return (
      <Col>
      <Row>
      <FlatList
          extraData={this.state}
          onEndReached={this.fetchResult}
          onEndReachedThreshold={0.7}
          data={games}
          renderItem={({ item }) => <DisplayGames {...item} />}
        />
      </Row>
    </Col>
    )

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
          <Button rounded large warning style={styles.largeButton}
              onPress={() => this.props.navigation.navigate('Game')} >
              <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Play Game</Text>
            </Button>
      </Grid>
      <Grid>
          {this.games()}
      </Grid>
        <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Text>
          UID: {currentUser.uid}!
        </Text>
      </View>
    </Content>
    <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
      <Button rounded large warning style={styles.largeButton}
        onPress={() => this.addnewGame()} >
        <Text style={styles.buttonTextBack}>Add new game</Text>
      </Button>
    </Footer>
    </LinearGradient>
  </Container>
  );
  }
}


const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
});

export default connect(mapStateToProps)(GameList);

//export default GameList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    rowPadding :{
      paddingTop: 20,
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
