import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button, Tab, Tabs } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

import { connect } from "react-redux";

import { updateRuns } from '../../Reducers/runs';
import { updateOver } from '../../Reducers/over';
import { updateBatterRuns } from '../../Reducers/batterRuns';
import { updateGameId } from '../../Reducers/gameId';
import { updateGames } from '../../Reducers/games';
import { updatePlayers } from '../../Reducers/players';
import { updateToggle } from '../../Reducers/toggle';

import GameDisplayRuns from './GameDisplayRuns';
import DisplayScorecard from '../Game/DisplayScorecard';
import GameDisplayTotalRuns from '../Game/GameDisplayTotalRuns';
import RunsPerBall from '../Board/RunsPerBall';
import BoardDisplayTopAttack from '../Board/BoardDisplayTopAttack';

import Board from '../Board/Board';


class Game extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: false,
        scorecard: [],
        docID: '',
        scorecardTest: [{gameId: 111, title: 'AO', runs: 100, complete: 0}],
        visible: true,
    };
  }

  state = {
    batterRuns: this.props.batterRuns.batterRuns || 0,
    gameID: this.props.gameID.gameID || '0',
    games: this.props.games.games || [],
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    togglePremium: this.props.toggle.togglePremium || true,
    toggleHomeLoad: this.props.toggle.toggleHomeLoad || true,
    toggleHomeLoadTwo: this.props.toggle.toggleHomeLoadTwo || true,
  };

  handleChange = ( batterRuns, gameID, games, players, toggle ) => {
    this.setState({ batterRuns });
    this.setState({ gameID });
    this.setState({ games });
    this.setState({ players });
    this.setState({ toggle });
  };

  componentDidMount() {
    console.log(this.props.games.games);
    console.log('gameMain componentDidMount');
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
    this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  const scorecard = [];
  querySnapshot.forEach((doc) => {
    const { gameId, title, runs, complete } = doc.data();

    scorecard.push({
      key: doc.id,
      doc, // DocumentSnapshot
      gameId,
      title,
      runs,
      complete,
    });
  });

  this.setState({
    scorecard,
    loading: false,
 });

 this.hideSpinner();

 console.log(this.state.scorecard);
}

  updateTextInput(value) {
      this.setState({ textInput: value });
  }

  updateTextInputBatter() {
    let batterName = this.state.textInput
    this.setState({ textInputBatter: batterName });

    this.setState({
      textInput: '',
    });
  }

  hideSpinner = () => {
    console.log('hit lead 2?' );
    this.setState({
      togglePremium: false,
      toggleHomeLoad: false,
      toggleHomeLoadTwo: false,
    }, function () {
      const { togglePremium, toggleHomeLoad, toggleHomeLoadTwo } = this.state
      this.props.dispatch(updateToggle(this.state.togglePremium, this.state.toggleHomeLoad, this.state.toggleHomeLoadTwo));
    })
  }

  scorecardList = () => {
    console.log(this.state.scorecard.item );
    return (
      <Col >
      <Row >
    <ScrollView>
      <Text>Scorecard:</Text>
    </ScrollView>
    </Row>
      <Row>
      {this.checkGameResult()}
      <FlatList
          data={this.state.scorecardTest}
          renderItem={({ item }) => <DisplayScorecard {...item} />}
        />
      </Row>
    </Col>
    )

  }

  checkGameResult = () => {
    console.log(this.props.games.games[0].gameResult);
    if (this.props.games.games[0].gameResult === 0) {
          console.log('hello!!');
    }
  }

  runsTotal = () => {
    console.log(this.state.scorecard.item );
    return (
      <Col>
      <Row>
    <ScrollView>
      <Text>Total:</Text>
    </ScrollView>
    </Row >
      <Row>
      <FlatList
          data={this.state.scorecard}
          renderItem={({ item }) => <GameDisplayTotalRuns {...item} />}
        />
      </Row>
      <Row><Text>GameID: {this.props.gameID.gameID}</Text></Row>
    </Col>
    )

  }

  addRuns() {
    const { currentUser } = this.state;

    let totalRuns = this.props.batterRuns.batterRuns;
    console.log(totalRuns);

    let totalRunsNumber = Number(totalRuns);
    console.log(totalRunsNumber);

    let gameId = this.props.gameID.gameID;


  this.ref.add({
    title: this.state.textInputBatter,
    runs: totalRuns,
    gameId: gameId,
    gameRunEvents: [],
  });
  totalRuns = 0;
  console.log(totalRuns);

  const doc = this.ref.doc()
  //const db = firebase.firestore();
  //const ref = db.collection(currentUser.uid).doc();
  //const id = ref.id;
  console.log(doc);
  console.log(doc.id);
  let docID = doc.id;
  this.setState({ docID: docID })

  this.setState({
    batterRuns: totalRuns,
  }, function () {
    const { batterRuns } = this.state
    this.props.dispatch(updateBatterRuns(this.state.batterRuns));
  })

  this.setState({
    textInput: '',
    textInputBatter: '',
  });
}

/*
  testRuns = () => {
    return (
      <Col>
      <Row>
        {this.scorecardList()}
      </Row>
      <Row>
      <TextInput
      placeholder={'Batsman Name'}
    value={this.state.textInput}
    onChangeText={(text) => this.updateTextInput(text)}
      />
      </Row>
      <Row>
      <Button rounded large warning
    disabled={!this.state.textInput.length}
    onPress={() => this.updateTextInputBatter()}
      style={styles.largeButton}>
          <Text>Add Batsman</Text>
        </Button>
      </Row>
      <Row>
      <Text>{this.state.textInputBatter}</Text>
      </Row>
      <Row>
      <Button rounded large warning
    disabled={!this.state.textInputBatter.length}
    onPress={() => this.addRuns()}
      style={styles.largeButton}>
          <Text>Wicket! (Add to DB)</Text>
        </Button>
      </Row>
      <Row>
        {this.runsTotal()}
      </Row>
    </Col>
    )

  }
  */

  getBoardDisplayTopAttack = () => {

    const players = this.props.players.players;
    const facingBall = this.props.players.facingBall;

    let countCurrentBatter = 0;
    let aggBoardValue = 0;

    const playerFacingRunsArray = players.map(player => {
      console.log(player.batterFlag);
      console.log(player.id);
      console.log(player.aggBoard);
      console.log(player.player);

      if (player.batterFlag === 0 && facingBall === 1 && countCurrentBatter === 0) {
        countCurrentBatter++
        console.log(countCurrentBatter);
        aggBoardValue = player.aggBoard
      }
      else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 0) {
        countCurrentBatter = countCurrentBatter + 2;
      }
      else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 2) {
        aggBoardValue = player.aggBoard
      }
          console.log(aggBoardValue);

    });

    console.log(aggBoardValue);

    return (<BoardDisplayTopAttack style={{paddingLeft: 15, paddingRight: 15}} aggBoardValue={aggBoardValue} overPageFlag={false} />)
  }

  getView = () => {
    if (this.state.loading === true) {
      <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        style={{ color: '#fff', height: 200, width: 'auto' }}
        size="large"
        color="#fff"
      />
      <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...4</Text >

      </Col >
    }
    else {
    return (
      <Col>
    <ImageBackground source={require(`../../assets/4dot6-sky-for-board.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 3, y: 2}} end={{x: 0, y: 0}}
      locations={[0,0.9,0.9]} colors={['#c471ed', '#12c2e9']} style={styles.linearGradientTwo}>
        <Content style={{ flex: 1, width: '100%', backgroundColor: 'rgba(18, 194, 233,1)'}}>

              {this.getBoardDisplayTopAttack()}
              <RunsPerBall />


        </Content>
        </LinearGradient>
      </ImageBackground>


    <Footer style={styles.footerStyle}>
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
        <Board navigation={this.props.navigation} continueGameArray={this.props.continueGameArray} />
      </ImageBackground>
    </Footer>
    </Col>
  )
}
  }

  hideSpinner() {
    console.log('when is this hit hideSpinnder?');
this.setState({ loading: false });
}

getWebView = () => {
if (this.props.toggle.toggleHomeLoad === true) {

  return (
    <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator
      style={{ color: '#fff', height: 200, width: 'auto' }}
      size="large"
      color="#fff"
    />
    <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...6</Text >

    </Col >
  )
}
else {
  return (
    <Text>Hello!</Text>
  )
}
}

  render() {
    /*
    if (this.state.loading) {
    return null; // or render a loading icon
  }
  */

  console.log(this.props.toggle.toggleHomeLoad + ' this one here to cehk noe ok9');

  const test = true;

    return (
    <Container style={{height: '100%', flex: 1, justifyContent: 'flex-end'}}>


    {this.getView()}


  </Container>
  );
  }
}

/*
<WebView
  onLoad={() => this.getWebView()}
  style={{ height: 0 }}
/>
*/

const mapStateToProps = state => ({
  batterRuns: state.batterRuns,
  gameID: state.gameID,
  games: state.games,
  players: state.players,
  toggle: state.toggle,
});

export default connect(mapStateToProps)(Game);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
    },
    linearGradientTwo: {
      flex: 1,
      opacity: 0.9,
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
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    footerStyle: {
      height: 225,
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0
    }
});
