import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, ImageBackground } from 'react-native';

import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//import OverBowledBoard from './OverBowledBoard';
//import BoardDisplayStats from '../Board/BoardDisplayStats';
//import RunsTotal from '../Board/RunsTotal';

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameId } from '../../Reducers/gameId';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateMomentum } from '../../Reducers/momentum';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updateGames } from '../../Reducers/games';


class StatsMain extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
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
    eventID: 0,
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    facingBall: this.props.players.facingBall || 1,
    players: this.props.players.players || [],
    momentum: this.props.momentum.momentum || 0,
    momentumThisOver: this.props.momentum.momentumThisOver || [],
    winningStreak: this.props.playerStats.winningStreak || 0,
    longestStreak: this.props.playerStats.longestStreak || 0,
    highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
    highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
    highestTeamScore: this.props.playerStats.highestTeamScore || 0,
    games: this.props.games.games || [],
  };

  handleChange = ( gameRuns, gameID, firstInningsRuns, players, momentum, playerStats, games ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ firstInningsRuns });
    this.setState({ players });
    this.setState({ momentum });
    this.setState({ playerStats });
    this.setState({ games });
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

componentDidMount() {
  const { currentUser } = firebase.auth()
  this.setState({ currentUser })
}

gameStatsHighIndScore = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;
  const highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;

  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center'}}>Highest Individual Score</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 50, textAlign: 'center'}}>{highestPlayerScore}</Text>
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>({highestPlayerScoreId.player})</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )

}

gameStatsHighTeamScore = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center'}}>Highest Team Score</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 50, textAlign: 'center'}}>{highestTeamScore}</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )

}

indvChalOne = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 50) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge One:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 50+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Good work. A lot more to go!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center'}}>Challenge One: Individual Score of over 50</Text>
    </Row >
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Keep trying!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwo = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 150) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Two:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 150+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Good team beginnings. Try to get higher!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Two:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 150+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>You can do it!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

indvChalThree = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 60) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Three:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 60+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Nice one. Solid. Keep going!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Three:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 60+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>concentrate!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalFour = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 160) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Four:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 160+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Not bad at all. Keep working hard!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Four:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 160+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Keep it up. You'll get there!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}


indvChalFive = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 70) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Five:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 70+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Great Score. Time to go higher still!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Five:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 70+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Wait for the bad delievers. And bang!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalSix = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 170) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Six:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 170+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Big Score. However, you can go bigger.</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Six:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 170+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Just keep at it and you'll find form!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}


indvChalSeven = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 80) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Seven:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 80+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Getting large! Well done.</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Seven:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 80+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Getting big here. Go big or go home!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalEight = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 180) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Eight:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 180+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Great team Effort. Train hard and get even better!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Eight:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 180+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Try find the right tactics for this large score!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}


indvChalNine = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 90) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Nine:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 90+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Oh what a score! Get to the big one next!.</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Nine:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 90+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Nervous 90's. Wait for the right deliveries!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTen = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 190) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Ten:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 190+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Big big score. Not far off the bif 200!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Ten:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 190+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>You're zoning in on the big ones!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

indvChalEleven = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 100) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Eleven:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 100+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>The big one. Congratulations on the ton!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Eleven:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 100+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Not everyone can experieince the joys of a ton... keep working hard!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwelve = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 200) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 250, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twelve:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 200+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>200 on the boards. That's huge!!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 250, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twelve:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 200+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Can you captain an innings to get over to 200?!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

indvChalThirteen = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 110) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Thirteen:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 110+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>GETTING HUGE!. Wow! And i know you can keep improving!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Thirteen:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 110+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Keeping working for a BIG hundred.</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalFourteen = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 210) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Fourteen:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 210+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>210 is a massive total. Lovin' your work!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 250, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Fourteen:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 210+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>You'll need a team all on form to chase 210!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

indvChalFifteen = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 120) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Fifteen:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 120+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>OH! A big one! Like! Like! Like!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Fifteen:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 120+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>You'll be starting to break records to get this score.</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalSixteen = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 220) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Sixteen:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 220+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>220 is out of the park! Champ!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Sixteen:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 220+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Tactics and auto-noutouts required for this big one!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

indvChalSeventeen = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 130) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Seventeen:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 130+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>This is a classy knock! Just class.</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Seventeen:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 130+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Class is needed for a score this big. Absoulute class.</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalEightteen = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 230) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Eightteen:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 230+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>230. Did you get 230? That. is. MASSIVE.</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Eightteen:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 230+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>I'm not gonna lie. You'll need some luck to get this massive score.</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

indvChalNineteen = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 140) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Nineteen:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 140+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Stop it. This is crazy!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Nineteen:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 140+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>To get this you'll go 'bang!' 'bang!' right from ball one.</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwenty = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 240) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twenty:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 240+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>I'm so proud! This is what you get for all your hard work!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twenty:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 240+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Many hours of hard work will be required. Do you have what it takes?</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

indvChalTwentyOne = () => {

  const highestPlayerScore = this.props.playerStats.highestPlayerScore;

  let indvChalOne = false;
  if (highestPlayerScore >= 150) {
    indvChalOne = true;
  }

  if (indvChalOne === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twenty One:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 150+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>GOAT! You're the Greatest Of All Time. Wow, wow, wow, wow!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twenty One:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Individual Score 150+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Can you become the GOAT?</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentyTwo = () => {

  const highestTeamScore = this.props.playerStats.highestTeamScore;

  let teamChalTwo = false;
  if (highestTeamScore >= 250) {
    teamChalTwo = true;
  }

  if (teamChalTwo === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
        <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twenty Two:</Text>
      </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 250+</Text>
      </Row >
      </Col>
        <Row>
          <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
        </Row>
        <Row>
          <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>You have officially become the greatest captain of all time. Retire a legend!</Text>
        </Row>
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Challenge Twenty Two:</Text>
        </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Team Total 250+</Text>
        </Row >
      </Col>
      <Row>
        <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Are you the great cricket captain you think you are? We'll wait and see if you can reach this score...!</Text>
      </Row>
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentyThree = () => {

  const highestPlayerScore = this.props.players.players[1].highestScore;
  const player = this.props.players.players[1].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 100) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentyFour = () => {

  const highestPlayerScore = this.props.players.players[2].highestScore;
  const player = this.props.players.players[2].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 100) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentyFive = () => {

  const highestPlayerScore = this.props.players.players[3].highestScore;
  const player = this.props.players.players[3].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 100) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentySix = () => {

  const highestPlayerScore = this.props.players.players[4].highestScore;
  const player = this.props.players.players[4].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 100) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentySeven = () => {

  const highestPlayerScore = this.props.players.players[5].highestScore;
  const player = this.props.players.players[5].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 100) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 100+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentyEight = () => {

  const highestPlayerScore = this.props.players.players[6].highestScore;
  const player = this.props.players.players[6].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 75) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 75+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 75+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalTwentyNine = () => {

  const highestPlayerScore = this.props.players.players[7].highestScore;
  const player = this.props.players.players[7].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 60) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 60+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 60+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalThirty = () => {

  const highestPlayerScore = this.props.players.players[8].highestScore;
  const player = this.props.players.players[8].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 50) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 50+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 50+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalThirtyOne = () => {

  const highestPlayerScore = this.props.players.players[9].highestScore;
  const player = this.props.players.players[9].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 40) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 40+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 40+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalThirtyTwo = () => {

  const highestPlayerScore = this.props.players.players[10].highestScore;
  const player = this.props.players.players[10].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 30) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 30+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 30+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground>
  )
}

}

teamChalThirtyThree = () => {

  const highestPlayerScore = this.props.players.players[11].highestScore;
  const player = this.props.players.players[11].player;

  console.log(highestPlayerScore);


  let challenge = false;
  if (highestPlayerScore >= 25) {
    challenge = true;
  }

  if (challenge === true) {
    return (
      <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
      <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
      <Col style={{alignItems: 'center', justifyContent: 'center',}}>
      <Row>
        <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
      </Row >
        <Row>
          <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
        </Row>
      </Col>
      <Row>
        <Icon name="ios-checkmark-circle-outline" style={{fontSize: 60, color: '#BDECB6', fontWeight: 600}} />
      </Row>
      <Row>
        <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 25+ in an innings</Text>
      </Row >
      </Col>
      </LinearGradient >
      </ImageBackground>
    )
  }
  else {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Col style={{padding: 10, backgroundColor: '#c471ed', height: 200, alignItems: 'center', justifyContent: 'center',}}>
    <Col style={{alignItems: 'center', justifyContent: 'center',}}>
    <Row>
      <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', height: 35}}>{player}</Text>
    </Row >
      <Row>
        <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>Highest Score: {highestPlayerScore}</Text>
      </Row>
    </Col>
    <Row>
      <Icon name="ios-close-circle-outline" style={{fontSize: 60, color: '#000', fontWeight: 900}} />
    </Row>
    <Row>
      <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>Challenge: 25+ in an innings</Text>
    </Row >
    </Col>
    </LinearGradient >
    </ImageBackground >
  )
}

}

getGameID = (score) => {
//console.log(this.props.games.games);

const { currentUser } = this.state

const { navigation } = this.props;

//const uuidv4 = require('uuid/v4');
uuidv4();
console.log(uuidv4);
console.log(uuidv4());
  console.log(this.props.games.games);
  let gameRunEvents = [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}];
  console.log(this.props.games.games);
  let eventID = 0;
  //this.props.dispatch(updateGameRuns(gameRunEvents, eventID))
  this.setState({
    gameRunEvents: gameRunEvents,
    eventID: eventID,
  }, function () {
    const { gameRunEvents, eventID } = this.state
    this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID ));
  })
  let gameID = uuidv4();
  console.log(gameID);

  let now = new Date();
  let isoString = now.toISOString();
  console.log(isoString);
  const dateTime = isoString.replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '');
  console.log(dateTime);
  const dateTimeInt = parseInt(dateTime);
  console.log(this.props.games.games);
  const games = this.props.games.games;


  console.log(this.props.games.games);
  if (this.props.games.games === undefined || this.props.games.games === null || this.props.games.games.length < 1 || this.props.games.games === []) {
    console.log('add new game hit');
    console.log(games);
    console.log(this.state);
  }

console.log('is this hit here?');


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
.then(this.props.navigation.navigate('SimulateFirstInnings', {
  displayId: dateTimeInt,
  gameID: gameID,
  score: score,
  fromStats: true,
  }))

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
      {this.gameStatsHighIndScore()}
      {this.gameStatsHighTeamScore()}
      {this.indvChalOne()}
      {this.teamChalTwo()}
      {this.indvChalThree()}
      {this.teamChalFour()}
      {this.indvChalFive()}
      {this.teamChalSix()}
      {this.indvChalSeven()}
      {this.teamChalEight()}
      {this.indvChalNine()}
      {this.teamChalTen()}
      {this.indvChalEleven()}
      {this.teamChalTwelve()}
      {this.indvChalThirteen()}
      {this.teamChalFourteen()}
      {this.indvChalFifteen()}
      {this.teamChalSixteen()}
      {this.indvChalSeventeen()}
      {this.teamChalEightteen()}
      {this.indvChalNineteen()}
      {this.teamChalTwenty()}
      {this.indvChalTwentyOne()}
      {this.teamChalTwentyTwo()}
      {this.teamChalTwentyThree()}
      {this.teamChalTwentyFour()}
      {this.teamChalTwentyFive()}
      {this.teamChalTwentySix()}
      {this.teamChalTwentySeven()}
      {this.teamChalTwentyEight()}
      {this.teamChalTwentyNine()}
      {this.teamChalThirty()}
      {this.teamChalThirtyOne()}
      {this.teamChalThirtyTwo()}
      {this.teamChalThirtyThree()}
    </Content >
    <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
    <Row>
      <Col size={1}>
      <Button style={styles.goButton} large success
        onPress={() => this.props.navigation.navigate('HomeApp')} >
        <Text style={styles.goButtonText}>Back to home</Text>
      </Button>
      </Col >
    </Row>
    </Footer >
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
  playerStats: state.playerStats,
  games: state.games,
});

export default connect(mapStateToProps)(StatsMain);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
    },
    linearGradientOpacity: {
      opacity: 0.8,
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
  goInnings: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#12c2e9',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  goInningsText: {
    color: '#fff',
    fontSize: 20,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
});
