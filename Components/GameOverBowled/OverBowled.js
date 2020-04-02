import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions } from 'react-native';

import { connect } from "react-redux";

import OverBowledBoard from './OverBowledBoard';
import BoardDisplayStats from '../Board/BoardDisplayStats';
import RunsTotal from '../Board/RunsTotal';

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameId } from '../../Reducers/gameId';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateMomentum } from '../../Reducers/momentum';


class OverBowled extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
    };
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    facingBall: this.props.players.facingBall || 1,
    players: this.props.players.players || [],
    momentum: this.props.momentum.momentum || 0,
    momentumThisOver: this.props.momentum.momentumThisOver || [],
  };

  handleChange = ( gameRuns, gameID, firstInningsRuns, players, momentum ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ firstInningsRuns });
    this.setState({ players });
    this.setState({ momentum });
  };
/*
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
    this.unsubscribe();
}
*/

gameNavigateBack = () => {

  const players = this.props.players.players;

  let playerOneName = '';
  let playerTwoName = '';
  let playerOneAgg = 0;
  let playerTwoAgg = 0;
  let flag = 0;
  players.map(player => {
    if (player.batterFlag === 0 && flag === 0) {
      playerOneName = player.player;
      playerOneAgg = player.aggBoard;
      flag++
    }
    else if (player.batterFlag === 0 && flag === 1) {
      playerTwoName = player.player;
      playerTwoAgg = player.aggBoard;
    }
    else {
      //nothing.
    }

  });

  if (playerTwoAgg === 0 && playerOneAgg === 0) {
    alert("To continue please set an aggression value (Agressive / Medium / Defensive) for " + playerOneName + " and " + playerTwoName + "." )
  }
  else if (playerOneAgg === 0) {
    alert("To continue please set an aggression value (Agressive / Medium / Defensive) for " + playerOneName + "." )
  }
  else if (playerTwoAgg === 0) {
    alert("To continue please set an aggression value (Agressive / Medium / Defensive) for " + playerTwoName + "." )
  }
  else {

  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  console.log(gameRunEvents);
  let gameRunEventsLength = gameRunEvents.length;
  console.log(gameRunEventsLength);
  gameRunEventsLength--;
  const runs = gameRunEvents[gameRunEventsLength].runsValue;
  console.log(runs);

  let facingBall = this.props.players.facingBall;
  console.log(facingBall);

  if (facingBall === 1 && (runs === 1 || runs === 3)) {
    facingBall = 1;
  }
  else if (facingBall === 2 && (runs === 1 || runs === 3)) {
      facingBall = 2;
  }
  else if (facingBall === 1 && (runs === 0 || runs === 2 || runs === 4 || runs === 6 )) {
    facingBall = 2;
  }
  else {
    facingBall = 1;
  }

  let allPlayers = this.props.players.players;

  this.setState({
    players: allPlayers,
    facingBall: facingBall,
  }, function () {
    const { players, facingBall } = this.state
    this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
  })

  const momentum = this.props.momentum.momentum;

  this.setState({
    momentum: momentum,
    momentumPrevOver: 0,
    momentumThisOver: [],
  }, function () {
    const { momentum, momentumPrevOver, momentumThisOver } = this.state
    this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
  })

  this.props.navigation.navigate('Game')
  }

}




  render() {
    const firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;

    const { navigation } = this.props;
    const momentumEndOfOverRRR = navigation.getParam('momentumEndOfOverRRR', false);

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
      <OverBowledBoard momentumEndOfOverRRR={momentumEndOfOverRRR} />
    </Content>
    <Footer style={{ height: 50, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
    <Row>
      <Col size={1}>
      <Button style={styles.goButton} large success
        onPress={() => this.gameNavigateBack()} >
        <Text style={styles.goButtonText}>Play!</Text>
      </Button>
      </Col>
      <Col size={2} style={{backgroundColor: '#c471ed'}}>
        <RunsTotal overPageFlag={true} />
      </Col>
      <BoardDisplayStats firstInningsRuns={firstInningsRuns} overBoardFlag={true} />
    </Row>
    </Footer>
    </LinearGradient>
  </Container>
  );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  gameID: state.gameID,
  firstInningsRuns: state.firstInningsRuns,
  players: state.players,
  momentum: state.momentum,
});

export default connect(mapStateToProps)(OverBowled);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
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
    goButton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#77dd77',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});
