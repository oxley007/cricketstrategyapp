import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList, TouchableHighlight, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button,FooterTab} from 'native-base';
import { WebView } from 'react-native-webview';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateGames } from '../../Reducers/games';
import { updateGamesList } from '../../Reducers/gamesList';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updateGameCards } from '../../Reducers/gameCards';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateMomentum } from '../../Reducers/momentum';
import { updateAutoNotOut } from '../../Reducers/autoNotOut';
import { updateToggle } from '../../Reducers/toggle';
import { updatePlayerRuns } from '../../Reducers/playerRuns';

import RunsTotal from './RunsTotal';
import Loader from '../App/Loader';
import DisplayCurrentBatters from './DisplayCurrentBatters'
import RequiredRunRate from './RequiredRunRate';
import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';
import BoardDisplayStats from './BoardDisplayStats';
//import GameStats from '../../Util/GameStats.js';


class Board extends React.PureComponent {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    //this.id = firebase.firestore.FieldPath.documentId();
    this.state = {
        loading: true,
        random: 0,
        games: [],
        rImage: '',
        rImageTwo: '',
        cardOne: 100,
        cardTwo: 100,
        randomClick: 2,
        incrementer: null,
        //players: [],
        //facingBall: 0,
        firstInningsRuns: 0,
        facingBall: 1,
        isLoading: true,
        loadingWinGameTotalRuns: true,
        loadingBoard: true,
    };
    this.rImages = [require('./random/a-hearts.png'),require('./random/2-hearts.png'),require('./random/3-hearts.png'),require('./random/4-hearts.png'),require('./random/5-hearts.png'),require('./random/6-hearts.png'),require('./random/7-hearts.png'),require('./random/a-diamonds.png'),require('./random/2-diamonds.png'),require('./random/3-diamonds.png'),require('./random/4-diamonds.png'),require('./random/5-diamonds.png'),require('./random/6-diamonds.png'),require('./random/7-diamonds.png'),require('./random/a-spades.png'),require('./random/2-spades.png'),require('./random/3-spades.png'),require('./random/4-spades.png'),require('./random/5-spades.png'),require('./random/6-spades.png'),require('./random/7-spades.png'),require('./random/a-clubs.png'),require('./random/2-clubs.png'),require('./random/3-clubs.png'),require('./random/4-clubs.png'),require('./random/5-clubs.png'),require('./random/6-clubs.png'),require('./random/7-clubs.png')]
  }

state = {
  gameID: this.props.gameID.gameID || '0',
  keyID: this.props.gameID.keyID || '0',
  gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
  eventID: this.props.gameRuns.eventID || 0,
  overBowled: this.props.gameRuns.overBowled || false,
  ball: this.props.ball.ball || 0,
  over: this.props.ball.over || 0,
  players: this.props.players.players || [],
  facingBall: this.props.players.facingBall || 1,
  games: this.props.games.games || [],
  gamesList: this.props.gamesList.gamesList || [],
  firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
  winningStreak: this.props.playerStats.winningStreak || 0,
  longestStreak: this.props.playerStats.longestStreak || 0,
  highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
  highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
  highestTeamScore: this.props.playerStats.highestTeamScore || 0,
  cardOne: this.props.gameCards.cardOne || 100,
  cardTwo: this.props.gameCards.cardTwo || 100,
  runs: this.props.gameCards.runs || 100,
  wicketEvent: this.props.gameCards.wicketEvent || false,
  teamPlayers: this.props.teamPlayers.teamPlayers || [],
  momentum: this.props.momentum.momentum || 0,
  momentumPrevOver: this.props.momentum.momentumPrevOver || 0,
  momentumThisOver: this.props.momentum.momentumThisOver || [],
  autoNotOut: this.props.autoNotOut.autoNotOut || 5,
  togglePremium: this.props.toggle.togglePremium || true,
  toggleHomeLoad: this.props.toggle.toggleHomeLoad || true,
  playerRuns: this.props.playerRuns.wickets || 0,
  playerRuns: this.props.playerRuns.totalRuns || 0,
};

handleChange = ( gameID, gameRuns, ball, players, games, gamesList, firstInningsRuns, playerStats, gameCards, teamPlayers, momentum, autoNotOut, toggle, playerRuns ) => {
  this.setState({ gameID });
  this.setState({ gameRuns });
  this.setState({ ball });
  this.setState({ players });
  this.setState({ games });
  this.setState({ gamesList });
  this.setState({ firstInningsRuns });
  this.setState({ playerStats });
  this.setState({ gameCards });
  this.setState({ teamPlayers });
  this.setState({ momentum });
  this.setState({ autoNotOut });
  this.setState({ toggle });
  this.setState({ playerRuns });
};

incrementer = () => {
  console.log(this.state.incrementer);
  let incrementer = null;
  console.log(incrementer);
  this.setState({incrementer: incrementer});
}


componentDidMount() {
  console.log(this.props.games.games);
  console.log(this.props.players.facingBall);
  console.log('board componentDidMount');

  const { currentUser } = firebase.auth()
  this.setState({ currentUser })
  console.log(this.props.players.facingBall);
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  console.log(this.props.players.facingBall);
  const facingBall = this.props.players.facingBall;
  this.setState({ facingBall: facingBall });
  this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
  console.log('firstinnings hit next');
  const { navigation } = this.props;
  const gameId = navigation.getParam('gameId', 0);
  console.log(gameId + ' = gamId');
  //this.getFirstInningsRuns();

}

componentWillUnmount() {
  this.unsubscribe();
  clearInterval(this.interval);
}

onDocCollectionUpdate = (documentSnapshot) => {
  console.log(this.state.facingBall);
    const players = [];
    let sum = a => a.reduce((acc, item) => acc + item);
  console.log(documentSnapshot);
  console.log(documentSnapshot.data());
  console.log(documentSnapshot.data().players);
  let gameRunEvents = this.props.gameRuns.gameRunEvents;

  console.log(this.props.ball.ball);

  let ball = 0;

  /*
  let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
  let ballTotal = legitBall[0];
  console.log(ballTotal);

  ball = sum(ballTotal.map(acc => Number(acc)));
  console.log(ball);
  */

  ball = gameRunEvents.length;
  ball--

  let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
  const over = totalBallDiff[0];
   ball = totalBallDiff[1];
  console.log(ball + ' + ' + over);

  console.log(this.props.players.players);
  console.log(this.props.players.facingBall);
  console.log(facingBall);


  let allPlayers = this.props.players.players;
  //let facingBall = this.state.facingBall;
  let facingBall = this.props.players.facingBall;

  console.log(allPlayers);
  console.log(facingBall);

  if (ball <= 0 && over <= 0) {
    console.log(ball + ' + ' + over);
    allPlayers = documentSnapshot.data().players;
    facingBall = 1;
  }

  console.log(allPlayers);

  if (allPlayers === [] || allPlayers === undefined || allPlayers === null || allPlayers.length < 1) {
    console.log('allplays null hit?');
    allPlayers = documentSnapshot.data().players;
  }
  else {
    console.log('else all players from redux.');
    allPlayers = this.props.players.players;
  }

/*
  if (facingBall === undefined) {
    console.log('facingBall null hit?');
    //facingBall = documentSnapshot.data().facingBall;
    //console.log();
  }
  else {
    console.log('else all players from redux.');
    facingBall = this.props.players.facingBall;
  }
  */

  console.log(allPlayers);

  //Get total wickets
  //const facingBall = this.props.players.facingBall;

  let id = 0;
  let batterFlag = 2;
  console.log(ball + ' is ball' + over + ' is over');
  if (ball === 0 && over === 0) {
  allPlayers.map(player => {
    console.log(player + ' when is this one hit????');



    if (id === 1 || id === 2) {
      batterFlag = 0;
    }
    else {
      batterFlag = 2;
    }

    players.push({
      id,
      batterFlag,
      player
    });
    console.log(players);
    id++

    });


    //this.setState({ players: players });
    //console.log(this.state.players);
  }

  console.log(players);
  console.log(facingBall);

  this.setState({
    players: allPlayers,
    facingBall: facingBall,
  }, function () {
    const { players, facingBall } = this.state
    this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
  })

  /*
  const gameRunEventsArray = this.props.gameRuns.gameRunEvents;
  const gameRunEventsLength = gameRunEventsArray.length;

  console.log(this.props.playerRuns.totalRuns + ' totalRuns at end of onDocCollectionUpdate ');
  console.log(this.props.playerRuns.wickets + ' wickets at end of onDocCollectionUpdate.');
  console.log(this.props.firstInningsRuns.firstInningsRuns + ' first innings runs at end of onDocCollectionUpdate');
  console.log(this.props.ball.ball + ' ball at end of onDocCollectionUpdate');
  console.log(gameRunEventsLength + ' game events length at end of onDocCollectionUpdate');

    console.log(this.state.loadingWinGameTotalRuns);
    if ((this.props.playerRuns.totalRuns > this.props.firstInningsRuns.firstInningsRuns) || (this.props.playerRuns.wickets >= 10) || (gameRunEventsLength >= 121)) {
    this.setState({loadingWinGameTotalRuns: false})
    }
    else {
      //this.setState({loadingWinGameTotalRuns: true})
    }

    console.log(this.state.loadingWinGameTotalRuns + ' how about this for loadingWinGameTotalRuns?');
    */

    /*
    this.setState({
      togglePremium: false,
      toggleHomeLoad: false,
    }, function () {
      const { togglePremium, toggleHomeLoad } = this.state
      this.props.dispatch(updateToggle(this.state.togglePremium, this.state.toggleHomeLoad));
    })
    */

    this.hideSpinner();

  console.log('finished onDocCollectionUpdate');

  }

/*
componentDidUpdate() {
  //generate random integer between 0 and rImages.length
  if (this.state.randomClick === false) {
  var randomInt = Math.floor(Math.random() * this.rImages.length)
  console.log(randomInt);
  var rImage = this.rImages[randomInt]
  return (
    <Row style={{height: 100}}>
    <Image style={styles.cardDisplay} source={rImage}/>
  </Row>
  )
  //this.setState({ rImage: rImage });
}
else {
  //something.
}
}
*/

onCollectionUpdate = (querySnapshot) => {
  console.log('onCollectionUpdate hit');
  console.log(this.props.games.games);
  const games = this.props.games.games;
  querySnapshot.forEach((doc) => {
    const { gameId, gameName, firstInningsRuns } = doc.data();

/*
    games.push({
      key: doc.id,
      doc, // DocumentSnapshot
      gameId,
      gameName,
      firstInningsRuns,
    });
  });


  this.setState({
    games,
    loading: false,
 });
 */

 });

/*
 console.log('get First Innings Runs');
 console.log(games);
const gameId = this.props.gameID.gameID
let firstInningsRuns = games.map(acc => {
 console.log(acc);
 if (acc.gameId  === gameId) {
   console.log(acc.firstInningsRuns);
   return acc.firstInningsRuns;
 }
 });
 */

/*
 console.log(firstInningsRuns);
 this.setState({firstInningsRuns: firstInningsRuns});
*/


}


  handleCards = () => {
    ReactNativeHapticFeedback.trigger('notificationSuccess', true);
    const randomClick = this.state.randomClick
    if (randomClick === 2) {
    clearInterval(this.incrementer)
    this.setState({ randomClick: 0 });
    let secValue = 100;

    let gameRunEvents = this.props.gameRuns.gameRunEvents;
    let sum = a => a.reduce((acc, item) => acc + item);

  //----------calculate overs
  let ball = 0;

  /*
  let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
  let ballTotal = legitBall[0];
  console.log(ballTotal);

  ball = sum(ballTotal.map(acc => Number(acc)));
  console.log(ball);
  */

  ball = gameRunEvents.length;
  ball--

    this.setState({
      cardOne: 100,
      cardTwo: 100,
    }, function () {
      const { cardOne, cardTwo } = this.state
      this.props.dispatch(updateGameCards(this.state.cardOne, this.state.cardTwo));
    })


    //this.incrementer = null;
    //if (this.state.randomClick === false) {
    //var randomInt = Math.floor(Math.random() * this.rImages.length)
    //console.log(randomInt);
    //var rImage = this.rImages[randomInt]
    //this.setState({ rImage: rImage });


    this.incrementer = setInterval( () => {
      if (this.state.randomClick === 0) {
    var randomInt = Math.floor(Math.random() * this.rImages.length)
    console.log(randomInt);
    this.setState({
      cardOne: randomInt,
    })
    var rImage = this.rImages[randomInt]
        this.setState({
          rImage: rImage,
        }
      )}
      if (this.state.randomClick === 1) {
        //if (ball > 1 && ball < 119) {
        var randomInt = Math.floor(Math.random() * this.rImages.length)
        console.log(randomInt);
        this.setState({
          cardTwo: randomInt,
        })
        var rImageTwo = this.rImages[randomInt]
            this.setState({
              rImageTwo: rImageTwo,
            }
          )
        /*}
        else {

          let randomInt = Math.floor(Math.random() * this.rImages.length)
          const cardOne = this.state.cardOne;
          if ((cardOne === 1 && randomInt === 4) || (cardOne === 1 && randomInt === 1)) {
            randomInt === 7;
          }
          else if ((cardOne === 2 && randomInt === 2) || (cardOne === 2 && randomInt === 5)) {
            randomInt === 3;
          }
          else if ((cardOne === 3 && randomInt === 2) || (cardOne === 3 && randomInt === 3)) {
            randomInt === 1;
          }
          else if ((cardOne === 4 && randomInt === 4) || (cardOne === 4 && randomInt === 3)) {
            randomInt === 7;
          }
          else if ((cardOne === 5 && randomInt === 5) || (cardOne === 5 && randomInt === 7)) {
            randomInt === 2;
          }
          else if ((cardOne === 6 && randomInt === 6) || (cardOne === 6 && randomInt === 4)) {
            randomInt === 2;
          }
          else if ((cardOne === 7 && randomInt === 6) || (cardOne === 7 && randomInt === 7)) {
            randomInt === 5;
          }

          console.log(randomInt);
          this.setState({
            cardTwo: randomInt,
          })
          var rImageTwo = this.rImages[randomInt]
              this.setState({
                rImageTwo: rImageTwo,
              }
            )
        }*/
        }
      }, secValue);
    }
  }

  handleStopCardsOne = () => {
    ReactNativeHapticFeedback.trigger('notificationSuccess', true);
    const randomClick = this.state.randomClick
    if (randomClick === 0) {
    this.setState({ randomClick: 1 });
    }
    else {
      //don notrhing.
    }

    const cardOne = this.state.cardOne;

    this.setState({
      cardOne: cardOne,
      cardTwo: 100,
      runs: 100,
      wicketEvent: false,
    }, function () {
      const { cardOne, cardTwo, runs, wicketEvent } = this.state
      this.props.dispatch(updateGameCards(this.state.cardOne, this.state.cardTwo, this.state.runs, this.state.wicketEvent));
    })

  }

  displayRequiredRunRate() {
    let gameRunEvents = this.props.gameRuns.gameRunEvents;
    let sum = a => a.reduce((acc, item) => acc + item);

  //----------calculate overs
  let ball = 0;

  /*
  let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
  let ballTotal = legitBall[0];
  console.log(ballTotal);

  ball = sum(ballTotal.map(acc => Number(acc)));
  console.log(ball);
  */

  ball = gameRunEvents.length;
  ball--

  const ballsRemaining = 120 - ball;


  //Calculate the total runs to go
  //let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
  //console.log(totalRuns);

  const totalRuns = this.props.playerRuns.totalRuns;

  let runsRequired = this.props.firstInningsRuns.firstInningsRuns - totalRuns;
  console.log(runsRequired);

  const requiredRunRate = (runsRequired / ballsRemaining) * 6;
  console.log(requiredRunRate);

  /*workout required run rate:
  console.log(numberOverValue);
  let runRate = totalRuns / numberOverValue;
  console.log(runRate);
  */


    const requiredRunRateOneDecimal = parseFloat(requiredRunRate).toFixed(1);
    return [requiredRunRateOneDecimal];

  }

  getDisplayRunsTotal() {

    let gameRunEvents = this.props.gameRuns.gameRunEvents;

    let sum = a => a.reduce((acc, item) => acc + item);
    let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
    console.log(totalRuns);

    //Get total wickets
    let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
    let totalWickets = getWicketCount[0];
    console.log(totalWickets);

    this.setState({
      wickets: totalWickets,
      totalRuns: totalRuns,
    }, function () {
      const { wickets, totalRuns } = this.state
      this.props.dispatch(updatePlayerRuns(this.state.wickets, this.state.totalRuns));
    })

    console.log(this.props.playerRuns.wickets + ' .playerRuns.wickets');
    console.log(this.props.playerRuns.totalRuns + ' .playerRuns.totalRuns');

    //----------calculate overs
    let over = this.props.ball.over;
    let ball = 0;

    /*
    let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
    let ballTotal = legitBall[0];

    ball = sum(ballTotal.map(acc => Number(acc)));
    */

    ball = gameRunEvents.length;
    ball--

    let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
    let totalOver = totalBallDiff[0];

    let totalBall = totalBallDiff[1];
    //---------- end of calularte overs

    return [totalRuns, totalWickets, totalOver, totalBall]
  }

    handleStopCards = () => {
      ReactNativeHapticFeedback.trigger('notificationSuccess', true);
      const randomClick = this.state.randomClick
      if (randomClick === 1) {
      this.setState({ randomClick: 2 });
      var cardOne = this.state.cardOne;
      console.log(cardOne);
      let cardTwo = this.state.cardTwo;

      let gameRunEvents = this.props.gameRuns.gameRunEvents;

      let gameRunEventsLength = gameRunEvents.length;
      //gameRunEventsLength++

      console.log(gameRunEventsLength + ' gameRunEventsLength');

      console.log(cardTwo + ' card two before if.');

      if (gameRunEventsLength === 1 || gameRunEventsLength === '1' || gameRunEventsLength >= 120 || gameRunEventsLength === '120') {
      if (((cardOne === 0 || cardOne === 7 || cardOne === 13 || cardOne === 21) && (cardTwo === 3 || cardTwo === 10 || cardTwo === 17 || cardTwo === 24 )) || ((cardOne === 0 || cardOne === 7 || cardOne === 13 || cardOne === 21) && (cardTwo === 0 || cardTwo === 7 || cardTwo === 13 || cardTwo === 21))) {
        cardTwo === 6;
      }
      else if (((cardOne === 1 || cardOne === 8 || cardOne === 15 || cardOne === 22) && (cardTwo === 1 || cardTwo === 8 || cardTwo === 15 || cardTwo === 22)) || ((cardOne === 1 || cardOne === 8 || cardOne === 15 || cardOne === 22) && (cardTwo === 4 || cardTwo === 11 || cardTwo === 18 || cardTwo === 25))) {
        cardTwo === 16;
      }
      else if (((cardOne === 2 || cardOne === 9 ||  cardOne === 16 || cardOne === 23) && (cardTwo === 1 || cardTwo === 8 || cardTwo === 15 || cardTwo === 22 )) || ((cardOne === 2 || cardOne === 9 ||  cardOne === 16 || cardOne === 23) && (cardTwo === 2 || cardTwo === 9 ||  cardTwo === 16 || cardTwo === 23))) {
        cardTwo === 21;
      }
      else if (((cardOne === 3 || cardOne === 10 || cardOne === 17 || cardOne === 24) && (cardTwo === 3 || cardTwo === 10 || cardTwo === 17 || cardTwo === 24)) || ((cardOne === 3 || cardOne === 10 || cardOne === 17 || cardOne === 24) && (cardTwo === 2 || cardTwo === 9 ||  cardTwo === 16 || cardTwo === 23))) {
        cardTwo === 27;
      }
      else if (((cardOne === 4 || cardOne === 11 || cardOne === 18 || cardOne === 25) && (cardTwo === 4 || cardTwo === 11 || cardTwo === 18 || cardTwo === 25)) || ((cardOne === 4 || cardOne === 11 || cardOne === 18 || cardOne === 25) && (cardTwo === 6 || cardTwo === 13 || cardTwo === 20 || cardTwo === 27))) {
        cardTwo === 1;
      }
      else if (((cardOne === 5 || cardOne === 12 || cardOne === 19 || cardOne === 26) && (cardTwo === 5 || cardTwo === 12 || cardTwo === 19 || cardTwo === 26)) || ((cardOne === 5 || cardOne === 12 || cardOne === 19 || cardOne === 26) && (cardTwo === 3 || cardTwo === 10 || cardTwo === 17 || cardTwo === 24))) {
        cardTwo === 15;
      }
      else if (((cardOne === 6 || cardOne === 13 || cardOne === 20 || cardOne === 27) && (cardTwo === 5 || cardTwo === 12 || cardTwo === 19 || cardTwo === 26)) || ((cardOne === 6 || cardOne === 13 || cardOne === 20 || cardOne === 27) && (cardTwo === 6 || cardTwo === 13 || cardTwo === 20 || cardTwo === 27))) {
        cardTwo === 18;
      }
      }

        console.log(cardTwo + '   card two after if.');


      const players =  this.props.players.players;
      let facingBall = this.props.players.facingBall;
      let autoNotOut = this.props.autoNotOut.autoNotOut;
      const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);
      const aceAce = battingStrikeRateArray[0];
      const twoTwo = battingStrikeRateArray[1];
      let aceWicket = false;
      let twoWicket = false;
      let threeWicket = false;
      let fourWicket = false;
      let fiveWicket = false;
      let sixWicket = false;
      let sevenWicket = false;

      if (aceAce === "W") {
        aceWicket = true;
      }

      if (twoTwo === "W") {
        twoWicket = true;
      }

      const runRateValue = this.displayRequiredRunRate();
      const runRate = runRateValue[0];
      console.log(runRate);

      const display = this.getDisplayRunsTotal();
      const wickets = display[1];
      console.log(wickets);

      const getPressureScore = CardBoard.getPressureScore(runRate, wickets);
      console.log(getPressureScore[0]);
      const pressureScore = getPressureScore[0];
      console.log(pressureScore);

      let momentum = this.props.momentum.momentum;

      const getPressureScorePercentage = CardBoard.getMomentumScore(momentum);
      const threeThree = getPressureScorePercentage[0];
      const fourFour = getPressureScorePercentage[1];
      const fiveFive = getPressureScorePercentage[2];

      if (threeThree === "W") {
        threeWicket = true;
      }

      if (fourFour === "W") {
        fourWicket = true;
      }

      if (fiveFive === "W") {
        fiveWicket = true;
      }

      const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
      console.log(getFormScore);
      const formScoreOne = getFormScore[0];
      const formScoreTwo = getFormScore[1];

      if (facingBall === 1) {
        formScore = formScoreOne;
      }
      else {
        formScore = formScoreTwo;
      }
      console.log(formScore);

      const getFormScoreRuns = CardBoard.getFormScoreRuns(formScore, players, facingBall);
      const sixSix = getFormScoreRuns[0];
      const sevenSeven = getFormScoreRuns[1];
      const batterId = getFormScoreRuns[2];
      const aggBoard = getFormScoreRuns[3];

      if (sixSix === "W") {
        sixWicket = true;
      }

      if (sevenSeven === "W") {
        sevenWicket = true;
      }

      let boardRuns = CardBoard.getBoardRuns(cardOne, cardTwo, aceAce, aceWicket, twoTwo, twoWicket, threeThree, threeWicket, fourFour, fourWicket, fiveFive, fiveWicket, sixSix, sixWicket, sevenSeven, sevenWicket, batterId, aggBoard);
      let runs = boardRuns[0];
      let wicketEvent = boardRuns[1];
      console.log(runs);
      const gameId = this.props.gameID.gameID
      console.log(gameId);
      let games = this.props.games.games;
      console.log(games);
      let keyID = this.props.gameID.keyID;
      console.log(keyID);

      /* Get Player Stats */
      console.log(this.props.playerStats.winningStreak);
      console.log(this.props.playerStats.longestStreak);
      let winningStreak = this.props.playerStats.winningStreak;
      let longestStreak = this.props.playerStats.longestStreak;
      //let winningStreak = 0;
      //let longestStreak = 0;

      const { currentUser } = this.state;
      console.log(currentUser);
      console.log(currentUser.uid);
      //this.setState({ currentUser })

      //const cardTwo = this.state.cardTwo;
      this.setState({
        cardOne: 100,
        cardTwo: cardTwo,
        runs: runs,
        wicketEvent: wicketEvent,
      }, function () {
        const { cardOne, cardTwo, runs, wicketEvent } = this.state
        this.props.dispatch(updateGameCards(this.state.cardOne, this.state.cardTwo, this.state.runs, this.state.wicketEvent));
      })

      const { navigation } = this.props;
      const displayId = navigation.getParam('displayId', 111000);

      if (displayId === 111000) {
        let now = new Date();
        let isoString = now.toISOString();
        console.log(isoString);
        dateTime = isoString.replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '');
        console.log(dateTime);
        const dateTimeInt = parseInt(dateTime);
        displayId = dateTimeInt;
      }

      let indexOfGameNumber = 0;
      let indexOfGamePreFiltered = this.props.games.games.map(acc => {
        console.log(indexOfGameNumber);
        console.log(acc);
        if (acc.displayId  === displayId) {
          console.log(acc.firstInningsRuns);
          return indexOfGameNumber;
        }
        else {
          indexOfGameNumber++;
          return 'na';
        }
        //indexOfGameNumber++;
        });

        console.log(indexOfGamePreFiltered);

        const indexOfGame = indexOfGamePreFiltered.filter(t=>t != 'na');
        console.log(indexOfGame);
        console.log(indexOfGame[0]);


        let sum = a => a.reduce((acc, item) => acc + item);

        this.setState({ random: runs });

        let eventID = this.props.gameRuns.eventID;
        eventID++
        console.log(eventID);


        //let gameRunEvents = this.props.gameRuns.gameRunEvents;
        console.log(gameRunEvents);

        let ballCount = gameRunEvents.map(acc => {
          console.log(acc);
          return 1;
      });
      let ball = sum(ballCount.map(acc => Number(acc)));

        console.log(ball);

        //************ workout who's batting ****************//
        console.log(this.props.players.players);
        let batters = this.props.players.players
        console.log(batters);

        let findCurrentBatters = batters.map(acc => {
          console.log(acc);
          if (acc.batterFlag === 0) {
            console.log(acc.batterFlag);
            return {id: [acc.id]};
          }
            else {
              console.log(acc.batterFlag);
              return {id: [100]};
            }
          });
        console.log(findCurrentBatters);

        let idBatter = 0;
        let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)
        console.log(currentBatters);

        let idBatterOne = currentBatters[0].id;
        console.log(idBatterOne);
        let idBatterTwo = currentBatters[1].id
        console.log(idBatterTwo);

        let idBatterOneNumber = Number(idBatterOne);
        console.log(idBatterOneNumber);
        let idBatterTwoNumber = Number(idBatterTwo);
        console.log(idBatterTwoNumber);

        //worout who is facing.
        //let facingBall = this.props.players.facingBall;
        if (ball <= 1) {
          facingBall = 1;
        }
        else {
          //nothing
        }



        try {
        console.log(facingBall);
      } catch (error) {
      facingBall = 1;
      }

      let facingBatter = 0;

        if (facingBall === 1) {
          facingBatter = idBatterOneNumber;
        }
        else {
          facingBatter = idBatterTwoNumber;
        }

        if (wicketEvent != true ) {
        gameRunEvents.push({eventID: eventID, runsValue: runs, ball: ball, runsType: 'runs', wicketEvent: wicketEvent, batterID: facingBatter, bowlerID: 0});
        console.log(gameRunEvents);
        }

        //let totalRuns = this.props.playerRuns.totalRuns;
        //const firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
        //const firstInningsTotalGap = firstInningsRuns - totalRuns

        //Calculate the total runs
        //console.log(firstInningsTotalGap + ' firstInningsTotalGap');
        //console.log(firstInningsRuns + ' firstInningsRuns');
        //console.log(totalRuns + ' totalRuns');
        //if (firstInningsTotalGap <= 12 ) {
          //console.log('firstInningsTotalGap hit.');
          let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

          let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
          let totalWickets = getWicketCount[0];
          console.log(totalWickets);

          this.setState({
            wickets: totalWickets,
            totalRuns: totalRuns,
          }, function () {
            const { wickets, totalRuns } = this.state
            this.props.dispatch(updatePlayerRuns(this.state.wickets, this.state.totalRuns));
          })
        //}
        //else {
          //totalRuns = this.props.playerRuns.totalRuns;
        //}
        //let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
        //console.log(totalRuns);

        if (ball === 6 || ball === 12 || ball === 18 || ball === 24 || ball === 30 || ball === 36 || ball ===42 || ball === 48 ||
        ball === 54 || ball === 60 || ball === 66 || ball === 72 || ball === 78 || ball === 84 || ball === 90 || ball === 96 ||
        ball === 102 || ball === 108 || ball === 114 || ball === 120) {
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
        } else {
          if (runs === 1 || runs === 3) {
            if (facingBall === 1) {
              facingBall = 2;
            }
            else {
              facingBall = 1;
            }
        }
      }
        console.log(facingBall);
        //this.setState({facingBall: facingBall});

        //handle wicket event to remove batsman.
        //Get total wickets


        //if (wicketEvent === true || runs === 6 || runs === '6' || runs === 4 || runs === '4' ) {
          if (wicketEvent === true && totalWickets < 10) {

            console.log(players + ' players wicket');
            console.log(facingBall + ' players wicket');

            this.setState({
              players: players,
              facingBall: facingBall,
            }, function () {
              const { players, facingBall } = this.state
              this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
            })

            console.log('wicket event true!!');
          setTimeout(() => {
            this.props.navigation.navigate('WicketCheck', {
              displayId: displayId,
            });
          }, 1000);  //1000 milliseconds
          }
          else {
            console.log('wicket event false!');

            console.log(this.props.players.players);
            //let momentum = this.props.momentum.momentum;
            console.log(momentum);
            let momentumThisOver = this.props.momentum.momentumThisOver;
            //let momentumThisOver = [];
            console.log(momentumThisOver);

            const getMomentum = CardBoard.getMomentum(gameRunEvents, momentum);
            const momentumThisBall = getMomentum[0];
            console.log(momentumThisBall);

            if (momentumThisBall >= 1) {
            momentumThisOver.push(momentumThisBall);
            }

            console.log(momentumThisOver);

            momentum = momentum + momentumThisBall;
            console.log(momentum);

            //add momentum to redux.
            this.setState({
              momentum: momentum,
              momentumPrevOver: 0,
              momentumThisOver: momentumThisOver,
            }, function () {
              const { momentum, momentumPrevOver, momentumThisOver } = this.state
              this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
            })


      let allPlayers = this.props.players.players;

      console.log(allPlayers);

      console.log(allPlayers);
      console.log(facingBall);
      this.setState({
        players: allPlayers,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })

      console.log(this.props.players.players);
      console.log(this.props.players.facingBall);

        console.log('we hitting check over bowled?');
        //Get the reunEvents from Redux.

        //----------calculate overs
        ball = 0;

        /*
        let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
        let ballTotal = legitBall[0];
        console.log(ballTotal);

        ball = sum(ballTotal.map(acc => Number(acc)));
        console.log(ball);
        */

        ball = gameRunEvents.length;
        ball--

        let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
        let totalBall = totalBallDiff[1];
        let totalOver = totalBallDiff[0];
        console.log(totalBall);
        console.log(totalOver);
        let numberBallValue = 0;

        //Get First Innings Runs
        const { navigation } = this.props;
        let firstInningsRuns = navigation.getParam('firstInningsRuns', 0);
        console.log(firstInningsRuns);

        if (firstInningsRuns === 0) {
          firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
        }
        else {
          //do nohthing.
        }

        console.log(totalRuns + ' check the total runs here.');
        console.log(this.props.toggle.togglePremium + ' check toggle premium here.');

        if (totalBall === 0 && totalOver > 0 && wicketEvent != true && totalRuns <= firstInningsRuns && totalOver < 20) {
          let eventID = this.props.gameRuns.eventID;
          numberBallValue = Number(6);
          //this.props.dispatch(updateGameRuns(gameRunEvents, eventID, true))

          console.log(gameRunEvents);
          this.setState({
            gameRunEvents: gameRunEvents,
            eventID: eventID,
            overBowled: true,
          }, function () {
            const { gameRunEvents, eventID, overBowled } = this.state
            this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
          })

          if (totalRuns === 0) {
            //do nohting.
          }
          else {
            let filtered = '';
            if (keyID === '0' || keyID === undefined) {
              filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
              console.log(filtered);

              this.setState({
                keyID: filtered,
                gameID: gameId,
              }, function () {
                const { keyID, gameID } = this.state
                this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
              })
            }
            else {
              filtered = gameId;
            }

            //filtered[0] = filtered;

            console.log('ball and over more than 0.');
            console.log(allPlayers);
            console.log(gameRunEvents);
          let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
          console.log(highestScorers);
          let battersHighestScore = highestScorers[0];
          let battersNameHighestScore = highestScorers[1];
          let highestScoreBallCount = highestScorers[2];
          let battersSecondHighestScore = highestScorers[3];
          let battersNameSecondHighestScore = highestScorers[4];
          let secondHighestScoreBallCount = highestScorers[5];


          let gameStart = {
            displayId: displayId,
            firstInningsRuns: firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 0,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered,
            topScore: battersHighestScore,
            topScoreBalls: highestScoreBallCount,
            topScorePlayer: battersNameHighestScore,
            topSecondScore: battersSecondHighestScore,
            topSecondBalls: secondHighestScoreBallCount,
            topSecondScorePlayer: battersNameSecondHighestScore,
            totalRuns: totalRuns,
            totalWickets: totalWickets,
          }

          console.log(gameStart);


          let gameDisplayIdIndexCount = 0
          let gameDisplayIdIndexArray = games.map(acc => {
          console.log(acc);
          console.log(acc.displayId);
          if (acc.displayId  === displayId) {
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
          games.splice(gameDisplayIdIndex,1,gameStart);

          this.setState({
          games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })

          console.log(this.props.games.games);

          }

          //Calculate momentum.
          console.log(runRate);

          let momentum = this.props.momentum.momentum;
          console.log(momentum);
          let momentumThisOver = this.props.momentum.momentumThisOver;

          const momentumEndOfOver = CardBoard.getMomentumEndOfOver(runRate, gameRunEvents, momentum);
          const momentumEndOfOverTotal = momentumEndOfOver[0];
          const momentumEndOfOverRRR = momentumEndOfOver[1];
          console.log(momentumEndOfOverTotal);
          console.log(momentumEndOfOverRRR);
          console.log(momentum);

          if (momentumEndOfOverRRR === true) {
            console.log('true hit');
            momentum = momentum + momentumEndOfOverTotal;
          }
          else {
            console.log('false hit');
            momentum = momentum - momentumEndOfOverTotal;
          }

          console.log(momentum);

          momentumThisOver.push(momentumEndOfOverTotal);

          this.setState({
            momentum: momentum,
            momentumPrevOver: 0,
            momentumThisOver: momentumThisOver,
          }, function () {
            const { momentum, momentumPrevOver, momentumThisOver } = this.state
            this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
          })

         setTimeout(() => {
        this.props.navigation.navigate('OverBowled', {
          requiredRunRate: runRate,
          momentumEndOfOverRRR: momentumEndOfOverRRR,
          fromWicket: false,
        });
    }, 2000);  //5000 milliseconds

        }
        else if (totalWickets >= 10 || totalRuns > firstInningsRuns || totalOver >= 20) {
            //totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
            this.getGameResult(totalWickets, totalRuns, firstInningsRuns, totalOver);

        }
        else {

          //Re-Calculate the total runs after update
          console.log(gameRunEvents);
          //gameRunEvents = this.props.gameRuns.gameRunEvents;
          //console.log(gameRunEvents);
          const totalRunsRefresh = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
          console.log(totalRunsRefresh);

          console.log('naviagte not hit');
          this.setState({
            gameRunEvents: gameRunEvents,
            eventID: eventID,
            overBowled: false,
          }, function () {
            const { gameRunEvents, eventID, overBowled } = this.state
            this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
          })

          let filtered = '';
          if (keyID === '0' || keyID === undefined) {
            filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
            console.log(filtered);

            this.setState({
              keyID: filtered,
              gameID: gameId,
            }, function () {
              const { keyID, gameID } = this.state
              this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
            })
          }
          else {
            console.log(gameId);
            filtered = gameId;
            console.log(filtered);
          }

          //filtered[0] = filtered;

          console.log('ball and over more than 0.');
          console.log(allPlayers);
          console.log(gameRunEvents);
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        console.log(highestScorers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];

        console.log(filtered);
        console.log(filtered[0]);
        console.log(totalRuns);
        console.log(totalRunsRefresh);

        let gameBall = {
          displayId: displayId,
          firstInningsRuns: firstInningsRuns,
          gameId: gameId,
          gameName: "Cricket Strategy Sim",
          gameResult: 0,
          players: allPlayers,
          gameRunEvents: gameRunEvents,
          key: filtered[0],
          topScore: battersHighestScore,
          topScoreBalls: highestScoreBallCount,
          topScorePlayer: battersNameHighestScore,
          topSecondScore: battersSecondHighestScore,
          topSecondBalls: secondHighestScoreBallCount,
          topSecondScorePlayer: battersNameSecondHighestScore,
          totalRuns: totalRunsRefresh,
          totalWickets: totalWickets,
        }

              console.log(gameBall);


            let gameDisplayIdIndexCount = 0
            let gameDisplayIdIndexArray = games.map(acc => {
              console.log(acc);
              console.log(acc.displayId);
              if (acc.displayId  === displayId) {
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
            games.splice(gameDisplayIdIndex,1,gameBall);

            this.setState({
              games: games,
        }, function () {
          const { games } = this.state
          this.props.dispatch(updateGames(this.state.games));
        })

        console.log(this.props.games.games);
      // }


        }
        let numberOverValue = Number(totalOver);
      }
      }
      else {
        //do nothing.
      }
    }

    /*
    getFirstInningsRuns = () => {

      const { navigation } = this.props;
      const firstInningsRuns = navigation.getParam('firstInningsRuns', 0);

      firstInningsRuns

      console.log('getFirstInningsRuns hit');
      console.log(this.state.games);
    const gameId = this.props.gameID.gameID
    let firstInningsRuns = this.state.games.map(acc => {
      console.log(acc);
      if (acc.gameId  === gameId) {
        console.log(acc.firstInningsRuns);
        return acc.firstInningsRuns;
      }
      });

      console.log(firstInningsRuns);
      this.setState({firstInningsRuns: firstInningsRuns});
    }
    */

    getGameResult = (totalWickets, totalRuns, firstInningsRuns, totalOver) => {
      let sum = a => a.reduce((acc, item) => acc + item);
      console.log('naviagte not hit');
      //Re-Calculate the total runs after update
      const gameRunEvents = this.props.gameRuns.gameRunEvents;
      const totalRunsRefresh = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
      console.log(totalRunsRefresh);

      let eventID = this.props.gameRuns.eventID;
      let keyID = this.props.gameID.keyID;
      const gameId = this.props.gameID.gameID
      let winningStreak = this.props.playerStats.winningStreak;
      let longestStreak = this.props.playerStats.longestStreak;
      let autoNotOut = this.props.autoNotOut.autoNotOut;
      const games = this.props.games.games;

      const { navigation } = this.props;
      const displayId = navigation.getParam('displayId', 111000);

      let batters = this.props.players.players
      console.log(batters);

      let findCurrentBatters = batters.map(acc => {
        console.log(acc);
        if (acc.batterFlag === 0) {
          console.log(acc.batterFlag);
          return {id: [acc.id]};
        }
          else {
            console.log(acc.batterFlag);
            return {id: [100]};
          }
        });
      console.log(findCurrentBatters);

      let idBatter = 0;
      let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)
      console.log(currentBatters);

      console.log(gameRunEvents);
      this.setState({
        gameRunEvents: gameRunEvents,
        eventID: eventID,
        overBowled: false,
      }, function () {
        const { gameRunEvents, eventID, overBowled } = this.state
        this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
      })

      let filtered = '';
      if (keyID === '0' || keyID === undefined) {
        filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        console.log(filtered);

        this.setState({
          keyID: filtered,
          gameID: gameId,
        }, function () {
          const { keyID, gameID } = this.state
          this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
        })
      }
      else {
        filtered = gameId;
        console.log(filtered);
      }

      //filtered[0] = filtered;

      let allPlayers =  this.props.players.players;

      console.log('ball and over more than 0.');
      console.log(allPlayers);
      console.log(gameRunEvents);
    let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
    console.log(highestScorers);
    let battersHighestScore = highestScorers[0];
    let battersNameHighestScore = highestScorers[1];
    let highestScoreBallCount = highestScorers[2];
    let battersSecondHighestScore = highestScorers[3];
    let battersNameSecondHighestScore = highestScorers[4];
    let secondHighestScoreBallCount = highestScorers[5];

    let highestPlayerScore = this.props.playerStats.highestPlayerScore;
    let highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;
    let count = 0;
    let batterRuns = 0;
    let batterRunsOne = 0;
    let batterRunsTwo = 0;

    allPlayers.map(player => {

      if (player.batterFlag === 0) {

        let batterRunsCount = gameRunEvents.map(acc => {
          console.log(acc);
          if (acc.batterID === player.id) {
            console.log(acc.runsValue);
            return [acc.runsValue];
          }
          else {
              console.log(acc.runsValue);
              return 0;
            }
          });

          console.log(batterRunsCount);

          count++

          if (count === 1) {
          batterRunsOne = sum(batterRunsCount.map(acc => Number(acc)));
        }
        else {
          batterRunsTwo = sum(batterRunsCount.map(acc => Number(acc)));
        }

        console.log(batterRunsOne + ' batterRunsOne');
        console.log(batterRunsTwo + ' batterRunsTwo');

        if (batterRunsOne > batterRunsTwo) {
          batterRuns = batterRunsOne;
        }
        else {
          batterRuns = batterRunsTwo;
        }

          console.log(batterRuns);

          if (batterRuns > highestPlayerScore) {
            highestPlayerScore = batterRuns;
            highestPlayerScoreId = player;
          }

          console.log(highestPlayerScore);
          console.log(highestPlayerScoreId);
      }
  })

  const teamScore = this.props.playerStats.highestTeamScore;
  let highestTeamScore = 0;

  console.log(totalRuns);
  console.log(teamScore + ' teamScore');

  if (totalRuns > teamScore) {
    highestTeamScore = totalRuns
  }
  else {
    highestTeamScore = teamScore
  }

    if (totalRuns > firstInningsRuns) {

    winningStreak++
    if (winningStreak > longestStreak) {
      longestStreak = winningStreak
    }
    else {
      //nothing.
    }

      if (winningStreak === 5) {
        autoNotOut = autoNotOut + 2;
      }
      else if (winningStreak === 10) {
        autoNotOut = autoNotOut + 3;
      }
      else if (winningStreak === 20) {
        autoNotOut = autoNotOut + 4;
      }
      else if (winningStreak === 50) {
        autoNotOut = autoNotOut + 5;
      }
      else if (winningStreak === 100) {
        autoNotOut = autoNotOut + 10;
      }
      else if (winningStreak === 200) {
        autoNotOut = autoNotOut + 30;
      }
      else if (winningStreak === 500) {
        autoNotOut = autoNotOut + 100;
      }
      else {
      //nothing.
      }
  }

    console.log(gameRunEvents);
    console.log(firstInningsRuns);
    console.log(totalRuns);

    //let game = [];
    if (totalRuns > firstInningsRuns ) {
      let game = {
        displayId: displayId,
        firstInningsRuns: firstInningsRuns,
        gameId: gameId,
        gameName: "Cricket Strategy Sim",
        gameResult: 1,
        players: allPlayers,
        gameRunEvents: gameRunEvents,
        key: filtered[0],
        topScore: battersHighestScore,
        topScoreBalls: highestScoreBallCount,
        topScorePlayer: battersNameHighestScore,
        topSecondScore: battersSecondHighestScore,
        topSecondBalls: secondHighestScoreBallCount,
        topSecondScorePlayer: battersNameSecondHighestScore,
        totalRuns: totalRunsRefresh,
        totalWickets: totalWickets,
        winningStreak: winningStreak,
      }

      console.log(gameRunEvents);
      console.log(totalRunsRefresh);
      console.log(allPlayers);
      console.log(battersHighestScore);
      console.log(battersNameHighestScore);
      console.log(highestScoreBallCount);
      console.log(battersSecondHighestScore);
      console.log(battersNameSecondHighestScore);
      console.log(secondHighestScoreBallCount);
      console.log(totalWickets);
      console.log(1);

      if (battersSecondHighestScore[0][0] === undefined || battersSecondHighestScore[0][0] <0 || battersSecondHighestScore[0][0] === null) {
        battersSecondHighestScore[0][0] = 0;
      }

      this.ref.doc(filtered[0]).update({
          gameRunEvents: gameRunEvents,
          totalRuns: totalRunsRefresh,
          players: allPlayers,
          topScore: battersHighestScore[0][0],
          topScorePlayer: battersNameHighestScore[0].player,
          topScoreBalls: highestScoreBallCount,
          topSecondScore: battersSecondHighestScore[0][0],
          topSecondScorePlayer: battersNameSecondHighestScore[0].player,
          topSecondBalls: secondHighestScoreBallCount,
          totalWickets: totalWickets,
          gameResult: 2,
          winningStreak: winningStreak,
      });

      this.ref.doc("playerStats").update({
        winningStreak: winningStreak,
        longestStreak: longestStreak,
        highestPlayerScore: highestPlayerScore,
        highestPlayerScoreId: highestPlayerScoreId,
        highestTeamScore: highestTeamScore,
        autoNotOut: autoNotOut,
      });

      /*
      this.ref.doc(filtered).update({
        displayId: 111,
        firstInningsRuns: this.state.firstInningsRuns,
        gameId: gameId,
        gameName: "Cricket Strategy Sim",
        gameResult: 1,
        players: allPlayers,
        gameRunEvents: gameRunEvents,
        key: filtered,
        topScore: battersHighestScore,
        topScoreBalls: highestScoreBallCount,
        topScorePlayer: battersNameHighestScore,
        topSecondScore: battersSecondHighestScore,
        topSecondBalls: secondHighestScoreBallCount,
        topSecondScorePlayer: battersNameSecondHighestScore,
        totalRuns: totalRuns,
        totalWickets: totalWickets,
      });
      */
    }
    else {

      winningStreak = 0;

      console.log('lost so do the following...');
      let game = {
        displayId: displayId,
        firstInningsRuns: firstInningsRuns,
        gameId: gameId,
        gameName: "Cricket Strategy Sim",
        gameResult: 1,
        players: allPlayers,
        gameRunEvents: gameRunEvents,
        key: filtered[0],
        topScore: battersHighestScore[0][0],
        topScorePlayer: battersNameHighestScore[0].player,
        topScoreBalls: highestScoreBallCount,
        topSecondScore: battersSecondHighestScore[0][0],
        topSecondScorePlayer: battersNameSecondHighestScore[0].player,
        topSecondBalls: secondHighestScoreBallCount,
        totalRuns: totalRunsRefresh,
        totalWickets: totalWickets,
        winningStreak: winningStreak,
      }
      this.ref.doc(filtered[0]).update({
          gameRunEvents: gameRunEvents,
          totalRuns: totalRunsRefresh,
          players: allPlayers,
          topScore: battersHighestScore[0][0],
          topScorePlayer: battersNameHighestScore[0].player,
          topScoreBalls: highestScoreBallCount,
          topSecondScore: battersSecondHighestScore[0][0],
          topSecondScorePlayer: battersNameSecondHighestScore[0].player,
          topSecondBalls: secondHighestScoreBallCount,
          totalWickets: totalWickets,
          gameResult: 1,
          winningStreak: winningStreak,
      });

      //const highestPlayerScore = this.props.playerStats.highestPlayerScore;
      //const highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;

      this.ref.doc("playerStats").update({
        winningStreak: winningStreak,
        longestStreak: longestStreak,
        highestPlayerScore: highestPlayerScore,
        highestPlayerScoreId: highestPlayerScoreId,
        highestTeamScore: highestTeamScore,
        autoNotOut: autoNotOut,
      });




      /*
      this.ref.doc(filtered).update({
        displayId: 111,
        firstInningsRuns: this.state.firstInningsRuns,
        gameId: gameId,
        gameName: "Cricket Strategy Sim",
        gameResult: 2,
        players: allPlayers,
        gameRunEvents: gameRunEvents,
        key: filtered,
        topScore: battersHighestScore,
        topScoreBalls: highestScoreBallCount,
        topScorePlayer: battersNameHighestScore,
        topSecondScore: battersSecondHighestScore,
        topSecondBalls: secondHighestScoreBallCount,
        topSecondScorePlayer: battersNameSecondHighestScore,
        totalRuns: totalRuns,
        totalWickets: totalWickets,
      });
      */
    }

    let gameResult = 0
    if (totalRuns > firstInningsRuns) {
      gameResult = 2;
    }
    else {
      gameResult = 1;
    }

    let gameComplete = {
      displayId: displayId,
      firstInningsRuns: firstInningsRuns,
      gameId: gameId,
      gameName: "Cricket Strategy Sim",
      gameResult: gameResult,
      players: allPlayers,
      gameRunEvents: gameRunEvents,
      key: filtered[0],
      topScore: battersHighestScore[0][0],
      topScorePlayer: battersNameHighestScore[0].player,
      topScoreBalls: highestScoreBallCount,
      topSecondScore: battersSecondHighestScore[0][0],
      topSecondScorePlayer: battersNameSecondHighestScore[0].player,
      topSecondBalls: secondHighestScoreBallCount,
      totalRuns: totalRunsRefresh,
      totalWickets: totalWickets,
    }

    console.log(gameComplete);


    let gameDisplayIdIndexCount = 0
    let gameDisplayIdIndexArray = games.map(acc => {
    console.log(acc);
    console.log(acc.displayId);
    if (acc.displayId  === displayId) {
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
    games.splice(gameDisplayIdIndex,1,gameComplete);

    this.setState({
    games: games,
    }, function () {
      const { games } = this.state
      this.props.dispatch(updateGames(this.state.games));
    })

    console.log(this.props.games.games);

    console.log(winningStreak + ' winningStreak board');
    console.log(longestStreak + ' longestStreak board');

    //const highestPlayerScore = this.props.playerStats.highestPlayerScore;
    //const highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;

    this.setState({
    winningStreak: winningStreak,
    longestStreak: longestStreak,
    highestPlayerScore: highestPlayerScore,
    highestPlayerScoreId: highestPlayerScoreId,
    highestTeamScore: highestTeamScore,
    }, function () {
      const { winningStreak, longestStreak, highestPlayerScore, highestPlayerScoreId, highestTeamScore } = this.state
      this.props.dispatch(updatePlayerStats(this.state.winningStreak, this.state.longestStreak, this.state.highestPlayerScore, this.state.highestPlayerScoreId, this.state.highestTeamScore));
    })

    this.setState({
      autoNotOut: autoNotOut,
    }, function () {
      const { autoNotOut } = this.state
      this.props.dispatch(updateAutoNotOut(this.state.autoNotOut));
    })

    console.log(this.props.playerStats.winningStreak);
    console.log(this.props.playerStats.longestStreak);

    //Add not out batsman runs here to player's Form attribute.
    //let playerIDHighestScore = 0;

    //let batterRuns = 0;

    let facingOne = false;
    let facingTwo = false;
    if (facingBall === 1) {
      facingOne = true;
    }

      allPlayers = this.props.players.players;
      const facingBall = this.props.players.facingBall;
      const teamPlayers = this.props.teamPlayers.teamPlayers;

      allPlayers.map(player => {
        console.log(player);
        console.log(player.id);

        let count = 0;


        if (player.batterFlag === 0) {
          const scoreTwo = allPlayers[player.id].scoreOne;
          const scoreThree = allPlayers[player.id].scoreTwo;
          const highestScore = allPlayers[player.id].highestScore;
          console.log('check 9');

          let outs = 0;
          if (allPlayers[player.id].outs < 3) {
            outs = allPlayers[player.id].outs
            outs++
          }
          else {
            outs = 3;
          }

          let batterRunsCount = gameRunEvents.map(acc => {
            console.log(acc);
            if (acc.batterID === allPlayers[player.id]) {
              console.log(acc.runsValue);
              return [acc.runsValue];
            }
            else {
                console.log(acc.runsValue);
                return 0;
              }
            });

            console.log('check 10');
            console.log(batterRunsCount);

            const batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

            console.log(batterRuns);
            console.log('check 11');

            let batterRunsHighest  = allPlayers[player.id].highestScore;
            let batterRunsInt = 0;
            let batterRunsHighestInt = 0;

            console.log(batterRunsInt + ' end innings batterRuns ');
            console.log(batterRunsHighestInt +  ' end innings batterRunsHighest ');

            //if ((isNaN(batterRunsHighest)) && (isNaN(batterRuns))) {
              batterRunsInt = parseInt(batterRuns, 10);
              batterRunsHighestInt  = parseInt(batterRunsHighest, 10);

              console.log(batterRunsInt + ' end innings check batterRunsInt');
              console.log(batterRunsHighestInt + ' end innings check batterRunsHighestInt');

              if (batterRunsInt > batterRunsHighestInt){
                console.log('batterRunsInt > batterRunsHighestInt');
                batterRunsHighestInt = batterRunsInt;
              }
              else {
                console.log('else...');
                batterRunsHighestInt = batterRunsHighestInt;
              }
              /*
            }
            else if (batterRuns > batterRunsHighest) {
              batterRunsHighestInt = batterRuns;
            }
            else {
              batterRunsHighestInt = batterRunsHighest;
            }
            */


            console.log(batterRunsInt + ' end innings batterRunsInt ');
            console.log(batterRuns + ' end innings batterRuns ');
            console.log(batterRunsHighestInt +  ' end innings batterRunsHighestInt ');
            console.log(batterRunsHighest +  ' end innings batterRunsHighest ');

            allPlayers[player.id].highestScore = batterRunsHighestInt;

          allPlayers[player.id].scoreOne = batterRuns;
          allPlayers[player.id].scoreTwo = scoreTwo;
          allPlayers[player.id].scoreThree = scoreThree;
          allPlayers[player.id].outs = outs;

          console.log(allPlayers);
          console.log('check 12');

        }
    })

    console.log(batterRuns + ' batterRuns');
    console.log(highestPlayerScoreId + ' highestPlayerScoreId');

    if (batterRuns > highestPlayerScore) {
      this.setState({
      winningStreak: winningStreak,
      longestStreak: longestStreak,
      highestPlayerScore: highestPlayerScore,
      highestPlayerScoreId: highestPlayerScoreId,
      highestTeamScore: highestTeamScore,
      }, function () {
        const { winningStreak, longestStreak, highestPlayerScore, highestPlayerScoreId, highestTeamScore } = this.state
        this.props.dispatch(updatePlayerStats(this.state.winningStreak, this.state.longestStreak, this.state.highestPlayerScore, this.state.highestPlayerScoreId, this.state.highestTeamScore));
      })
    }

    /* Check if curretn batsman have more than 50 or 100 */
    /*
    console.log(currentBatters);
    const idBatterOneScore = currentBatters[0].id;
    console.log(idBatterOneScore);
    const idBatterTwoScore = currentBatters[1].id
    console.log(idBatterTwoScore);

    let idBatterOneAutoNotOuts = currentBatters[0].autoNotOut;
    console.log(idBatterOneAutoNotOuts);
    let idBatterTwoAutoNotOuts = currentBatters[1].autoNotOut;
    console.log(idBatterTwoAutoNotOuts);

    let idBatterOneScoreNumber = Number(idBatterOneScore);
    console.log(idBatterOneScoreNumber);
    let idBatterTwoScoreNumber = Number(idBatterTwoScore);
    console.log(idBatterTwoScoreNumber);

    let idBatterOneScoreRuns = 0;
    let idBatterTwoScoreRuns = 0;
    const batterNotOutRunsCount = gameRunEvents.map(acc => {
      console.log(acc);
      if (acc.batterID === idBatterOneScoreNumber) {
        console.log(acc.runsValue);
        return [acc.runsValue, acc.batterID];
      }
      else if (acc.batterID === idBatterTwoScoreNumber) {
        console.log(acc.runsValue);
        return [acc.runsValue, acc.batterID];
      }
      else {
          console.log(acc.runsValue);
          return [0, 0];
        }
      });

      console.log(batterNotOutRunsCount);

      //work out notout player one runs.

      const currentBatterOneRunsArray = batterNotOutRunsCount.filter( batter => batter[1] != idBatterTwoScore)
      const currentBatterOneRunsArrayRunsOnly = currentBatterOneRunsArray.map(acc => {
        console.log(acc);
          return acc[0];
        });
      const currentBatterOneRuns = sum(currentBatterOneRunsArrayRunsOnly.map(acc => Number(acc)));
      console.log(currentBatterOneRuns);

      //work out notout player two runs.
      const currentBatterTwoRunsArray = batterNotOutRunsCount.filter( batter => batter[1] != idBatterOneScore)
      const currentBatterTwoRunsArrayRunsOnly = currentBatterTwoRunsArray.map(acc => {
        console.log(acc);
          return acc[0];
        });
      const currentBatterTwoRuns = sum(currentBatterTwoRunsArrayRunsOnly.map(acc => Number(acc)));
      console.log(currentBatterTwoRuns);

      if (currentBatterOneRuns >= 50) {
        idBatterOneAutoNotOuts++
      }
      else if (currentBatterOneRuns >= 100) {
        idBatterOneAutoNotOuts = idBatterOneAutoNotOuts + 3;
      }
      else if (currentBatterTwoRuns >= 50) {
        idBatterTwoAutoNotOuts++
      }
      else if (currentBatterTwoRuns >= 100) {
        idBatterTwoAutoNotOuts = idBatterOneAutoNotOuts + 3;
      }

    const teamPlayersSet = allPlayers.map(player => {
      console.log(player);
      console.log(player.id);

      if ((player.id === 1 || player.id === 2) && (idBatterOneScoreNumber != 1 || idBatterOneScoreNumber != 2)) {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
      }
      else if (player.id === 1 && idBatterOneScoreNumber === 1) {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
      }
      else if (player.id === 2 && idBatterTwoScoreNumber === 2) {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterTwoScoreNumber, highestScore: player.highestScore};
      }
      else if (player.id === 2 && idBatterOneScoreNumber === 2) {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
      }
      else if (player.id === idBatterOneScoreNumber) {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
      }
      else if (player.id === idBatterTwoScoreNumber) {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterTwoAutoNotOuts, highestScore: player.highestScore};
      }
      else {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore}
      }
    });


    console.log(teamPlayersSet);
    console.log(facingBall);
    this.setState({
      players: teamPlayersSet,
      facingBall: facingBall,
    }, function () {
      const { players, facingBall } = this.state
      this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
    })



    console.log(teamPlayersSet + ' teamPlayersSet beofre storing in Redux & DB at the end of the game.');

    this.setState({
      teamPlayers: teamPlayersSet,
    }, function () {
      const { teamPlayers } = this.state
      this.props.dispatch(updateTeamPlayers(this.state.players));
    })

    this.ref.doc("players").update({
      players: teamPlayersSet,
    });
    */

    this.setState({
      momentum: 0,
      momentumPrevOver: 0,
      momentumThisOver: [],
    }, function () {
      const { momentum, momentumPrevOver, momentumThisOver } = this.state
      this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
    })


    //***** ENDS End Of Game Code. ***//
  }

    playNewGame = () => {

      const gameRunEvents = this.props.gameRuns.gameRunEvents;
      const getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      const totalWickets = getWicketCount[0];

      //const totalWickets = this.props.playerRuns.wickets;
      console.log(totalWickets);

      let sum = a => a.reduce((acc, item) => acc + item);

      //Calculate the total runs
      const totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

      //const totalRuns = this.props.playerRuns.totalRuns;
      console.log(totalRuns);

      const { navigation } = this.props;
      const firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
      console.log(firstInningsRuns);

      const highestPlayerScore = this.props.playerStats.highestPlayerScore;
      const winningStreak = this.props.playerStats.winningStreak;
      const longestStreak = this.props.playerStats.longestStreak;
      const highestTeamScore = this.props.playerStats.highestTeamScore;

      if (totalRuns >= firstInningsRuns) {

      if (winningStreak <= 4) {
      Alert.alert(
      'Play Again!',
      'Keep playing. If you get 5 wins in a row you win 2 FREE auto not-outs!',
      [
        {
          text: 'Get more auto not-outs now!',
          onPress: () => {

            this.buyAutoNotOutsEndGame();

          }
        },
        {text: 'Continue', onPress: () => {

          this.continueGame();


        }},
      ],
      {cancelable: false},
    );
  }
  else if (winningStreak === 5) {
  Alert.alert(
    'You win TWO FREE auto not-outs!',
    'Congratulations! You have 5 wins in a row and have TWO FREE auto not-outs! Keep going and if you get 10 wins a row you will win FOUR FREE auto not-outs!',
    [
    {
      text: 'Get more auto not-outs now!',
      onPress: () => {
        this.buyAutoNotOutsEndGame();
      }
    },
    {text: 'Continue', onPress: () => {

      this.continueGame();

    }},
  ],
  {cancelable: false},
);
}
else if (winningStreak > 5 && winningStreak <= 9) {
Alert.alert(
'Play Again!',
'Keep playing. If you get 10 wins in a row you win 4 FREE auto not-outs!',
[
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak === 10) {
Alert.alert(
  'You win FOUR FREE auto not-outs!',
  'Congratulations! You have 10 wins in a row and have FOUR FREE auto not-outs! Keep going and if you get 20 wins a row you will win EIGHT FREE auto not-outs!',
  [
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak > 10 && winningStreak <= 19) {
Alert.alert(
'Play Again!',
'Keep playing. If you get 20 wins in a row you win 8 FREE auto not-outs!',
[
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak === 20) {
Alert.alert(
  'You win EIGHT FREE auto not-outs!',
  'Congratulations! You have 20 wins in a row and have EIGHT FREE auto not-outs! Keep going and if you get 50 wins a row you will win TWENTY FREE auto not-outs!',
  [
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak > 20 && winningStreak <= 49) {
Alert.alert(
'Play Again!',
'Keep playing. If you get 50 wins in a row you win 20 FREE auto not-outs!',
[
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak === 50) {
Alert.alert(
  'You win TWENTY FREE auto not-outs!!!',
  'Congratulations! You have 50 wins in a row and have TWENTY FREE auto not-outs! Keep going and if you get 100 wins a row you will win FOURTY-FIVE FREE auto not-outs!',
  [
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak > 50 && winningStreak <= 99) {
Alert.alert(
'Play Again!',
'Keep playing. If you get 100 wins in a row you win 45 FREE auto not-outs!',
[
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak === 100) {
Alert.alert(
  'You win FOURTY-FIVE FREE auto not-outs!!!',
  'Congratulations! You have 100 wins in a row and have FOURTY-FIVE FREE auto not-outs! Keep going and if you get 200 wins a row you will win ONE HUNDRED FREE auto not-outs!',
  [
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak > 100 && winningStreak <= 199) {
Alert.alert(
'Play Again!',
'Keep playing. If you get 200 wins in a row you win 100 FREE auto not-outs!',
[
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak === 200) {
Alert.alert(
  'You win ONE HUNDRED FREE auto not-outs!!!',
  'Congratulations! You have 200 wins in a row and have ONE HUNDRED FREE auto not-outs! Keep going and if you get 500 wins a row you will win THREE HUNDRED FREE auto not-outs!',
  [
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak > 200 && winningStreak <= 499) {
Alert.alert(
'Play Again!',
'Keep playing. If you get 500 wins in a row you win 300 FREE auto not-outs!',
[
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak === 500) {
Alert.alert(
  'You win THREE HUNDRED FREE auto not-outs!!!',
  'Congratulations! You have 500 wins in a row and have THREE HUNDRED FREE auto not-outs! Wow, you have finished the game. Keep going and email highscore@4dotsixdigital.com when you finaly lose. You might end up on the all-time highest winnig streask list. good luck!!',
  [
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
else if (winningStreak > 500) {
Alert.alert(
'Play Again!',
'Keep playing. Keep going and email highscore@4dotsixdigital.com when you finaly lose. You might end up on the all-time highest winnig streask list. good luck!!',
[
  {
    text: 'Get more auto not-outs now!',
    onPress: () => {
      this.buyAutoNotOutsEndGame();
    }
  },
  {text: 'Continue', onPress: () => {

    this.continueGame();

  }},
],
{cancelable: false},
);
}
    }
    else {
      console.log('missed popup.');
      this.continueGame();
      const { navigation } = this.props;
      this.props.navigation.navigate('HomeApp');
    }
  }

    winningStreakDisplay = () => {
      const winningStreak = this.props.playerStats.winningStreak;

      if (winningStreak === 5) {
        return (
            <Col size={1}>
              <Row size={1}>
                <Text style={styles.buttonTextBack}>{winningStreak} in a row: </Text>
              </Row>
              <Row size={2}>
                <Text style={styles.buttonText}>+2</Text>
              </Row>
              <Row size={1}>
                <Text style={styles.buttonTextBack}>Auto Not-Outs</Text>
              </Row>
            </Col>
        )
      }
      else if (winningStreak === 10) {
        return (
          <Col size={1}>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>{winningStreak} in a row: </Text>
            </Row>
            <Row size={2}>
              <Text style={styles.buttonText}>+4</Text>
            </Row>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>Auto Not-Outs</Text>
            </Row>
          </Col>
        )
      }
      else if (winningStreak === 20) {
        return (
          <Col size={1}>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>{winningStreak} in a row: </Text>
            </Row>
            <Row size={2}>
              <Text style={styles.buttonText}>+8</Text>
            </Row>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>Auto Not-Outs</Text >
            </Row>
          </Col>
        )
      }
      else if (winningStreak === 50) {
        return (
          <Col size={1}>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>{winningStreak} in a row: </Text>
            </Row>
            <Row size={2}>
              <Text style={styles.buttonText}>+20</Text>
            </Row >
            <Row size={1}>
              <Text style={styles.buttonTextBack}>Auto Not-Outs</Text >
            </Row>
          </Col>
        )
      }
      else if (winningStreak === 100) {
        return (
          <Col size={1}>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>{winningStreak} in a row: </Text>
            </Row>
            <Row size={2}>
              <Text style={styles.buttonText}>+45</Text>
            </Row>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>Auto Not-Outs</Text >
            </Row >
          </Col>
        )
      }
      else if (winningStreak === 200) {
        return (
          <Col size={1}>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>{winningStreak} in a row: </Text>
            </Row>
            <Row size={2}>
              <Text style={styles.buttonText}>+100</Text>
            </Row>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>Auto Not-Outs</Text>
            </Row>
          </Col>
        )
      }
      else if (winningStreak === 500) {
        return (
          <Col size={1}>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>{winningStreak} in a row: </Text>
            </Row >
            <Row size={2}>
              <Text style={styles.buttonText}>+300</Text>
            </Row>
            <Row size={1}>
              <Text style={styles.buttonTextBack}>Auto Not-Outs</Text>
            </Row >
          </Col>
        )
      }
      else {
        // nohting.
      }

    }

    continueGame = () => {

      const gameRunEvents = this.props.gameRuns.gameRunEvents;
      const getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      const totalWickets = getWicketCount[0];

      //const totalWickets = this.props.playerRuns.wickets;
      console.log(totalWickets);

      let sum = a => a.reduce((acc, item) => acc + item);

      //Calculate the total runs
      const totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

      //const totalRuns = this.props.playerRuns.totalRuns;
      console.log(totalRuns);

      const { navigation } = this.props;
      const firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
      console.log(firstInningsRuns);

      if (totalWickets >= 10) {
        console.log('should not be hit unless 10 wikcet or more...');
        let ball = 0;

        /*
        let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
        let ballTotal = legitBall[0];
        console.log(ballTotal);

        ball = sum(ballTotal.map(acc => Number(acc)));
        console.log(ball);
        */

        ball = gameRunEvents.length;
        ball--

        const totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
        const totalOver = totalBallDiff[0];
          this.getGameResult(totalWickets, totalRuns, firstInningsRuns, totalOver);
          console.log('after getGameResults.');
      }



        //**ENDS not out player runs**/

        let batters = this.props.players.players
        console.log(batters);

        let findCurrentBatters = batters.map(acc => {
          console.log(acc);
          if (acc.batterFlag === 0) {
            console.log(acc.batterFlag);
            return {id: [acc.id]};
          }
            else {
              console.log(acc.batterFlag);
              return {id: [100]};
            }
          });
        console.log(findCurrentBatters);

        let idBatter = 0;
        console.log('currentBatters about to start');
        console.log(findCurrentBatters);
        let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)
        console.log(currentBatters);

        let idBatterOne = currentBatters[0].id;
        console.log(idBatterOne);
        let idBatterTwo = currentBatters[1].id
        console.log(idBatterTwo);

        let idBatterOneNumber = Number(idBatterOne);
        console.log(idBatterOneNumber);
        let idBatterTwoNumber = Number(idBatterTwo);
        console.log(idBatterTwoNumber);

        //worout who is facing.
        console.log();
        let facingBall = this.props.players.facingBall;

        let allPlayers = this.props.players.players;
        console.log(allPlayers + ' allPlayers check this.');
        let batterRuns = 0;
        let playerIDHighestScore = 0;

        const teamPlayers = this.props.teamPlayers.teamPlayers;

        allPlayers.map(player => {
          console.log(player);
          console.log(player.id);
          const wicketsPlusTwo = totalWickets + 2;
          if (player.id === idBatterOneNumber || player.id === idBatterTwoNumber) {
            //batterFlag = 1;
            console.log(allPlayers[player.id]);
            playerIDHighestScore = allPlayers[player.id];
            console.log(playerIDHighestScore + ' playerIDHighestScore');
            //allPlayers[player.id].batterFlag = 1;
            const scoreTwo = allPlayers[player.id].scoreOne;
            const scoreThree = allPlayers[player.id].scoreTwo;
            const highestScore = allPlayers[player.id].highestScore;
            console.log(highestScore);

            let sum = a => a.reduce((acc, item) => acc + item);
            const gameRunEventsNew = this.props.gameRuns.gameRunEvents;

            let ballCount = gameRunEventsNew.map(acc => {
              console.log(acc);
              return 1;
            });

            console.log(ballCount);

            let ball = sum(ballCount.map(acc => Number(acc)));

            let outs = 0;
            if (allPlayers[player.id].outs >= 1) {
              outs = allPlayers[player.id].outs
              outs--
            }
            else {
              outs = 0;
            }

            let batterRunsCount = gameRunEvents.map(acc => {
              console.log(acc);
              console.log(acc.batterID);
              console.log(allPlayers[player.id]);
              console.log(allPlayers[player.id].id);
              if (acc.batterID === allPlayers[player.id].id) {
                console.log(acc.runsValue + ' acc.runsValue is this one hit?');
                return [acc.runsValue];
              }
              else {
                  console.log(acc.runsValue + ' not hit for not out batsman.');
                  return 0;
                }
              });

              console.log(batterRunsCount);

              batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

              console.log(batterRuns);
              console.log(allPlayers[player.id]);


            //allPlayers[player.id].batterFlag = 1;
            allPlayers[player.id].scoreOne = batterRuns;
            allPlayers[player.id].scoreTwo = scoreTwo;
            allPlayers[player.id].scoreThree = scoreThree;
            allPlayers[player.id].highestScore = highestScore;
            allPlayers[player.id].outs = outs;

            let batterRunsHighest = allPlayers[player.id].highestScore;
            let batterRunsInt;
            let batterRunsHighestInt = 0;

            console.log(batterRunsInt + ' end of innings batterRuns');
            console.log(batterRunsHighestInt +  ' end of innings batterRunsHighest ');
            console.log(batterRunsHighest + ' end of innings batterRunsHighest');

            if ((isNaN(batterRunsHighest)) && (isNaN(batterRuns))) {

              console.log();
              batterRunsInt = parseInt(batterRuns, 10);
              batterRunsHighestInt  = parseInt(batterRunsHighest, 10);

              if (batterRunsInt > batterRunsHighestInt){
                batterRunsHighestInt = batterRunsInt;
              }
              else {
                batterRunsHighestInt = batterRunsHighestInt;
              }

            }
            else if (batterRuns > batterRunsHighest) {
              batterRunsHighestInt = batterRuns;
            }
            else {
              batterRunsHighestInt = batterRunsHighest;
            }



            console.log(batterRunsInt + ' wicket batterRunsInt ');
            console.log(batterRuns + ' wicket batterRuns ');
            console.log(batterRunsHighestInt +  ' wicket batterRunsHighestInt ');
            console.log(batterRunsHighest +  ' wicket batterRunsHighest ');



            teamPlayers[player.id].highestScore = batterRunsHighestInt;

            console.log(allPlayers);

            teamPlayers[player.id].scoreOne = batterRuns;
            teamPlayers[player.id].scoreTwo = scoreTwo;
            teamPlayers[player.id].scoreThree = scoreThree;
            teamPlayers[player.id].outs = outs;

            /*
            if (teamPlayers[player.id].id === 1 || teamPlayers[player.id].id === 2) {
              teamPlayers[player.id].batterFlag = 0;
            }
            else {
              teamPlayers[player.id].batterFlag = 1;
            }
            */

            console.log(teamPlayers);

            this.setState({
              teamPlayers: teamPlayers,
            }, function () {
              const { teamPlayers } = this.state
              this.props.dispatch(updateTeamPlayers(this.state.players));
            })

            console.log(this.props.teamPlayers.teamPlayers + ' teamPlayers redux.');

            const highestPlayerScore = this.props.playerStats.highestPlayerScore;
            const winningStreak = this.props.playerStats.winningStreak;
            const longestStreak = this.props.playerStats.longestStreak;
            const highestTeamScore = this.props.playerStats.highestTeamScore;

            console.log(batterRuns + ' batterRuns');
            console.log(highestPlayerScore + ' highestPlayerScore');

            if (batterRuns > highestPlayerScore) {
              this.setState({
              winningStreak: winningStreak,
              longestStreak: longestStreak,
              highestPlayerScore: batterRuns,
              highestPlayerScoreId: playerIDHighestScore,
              highestTeamScore: highestTeamScore,
              }, function () {
                const { winningStreak, longestStreak, highestPlayerScore, highestPlayerScoreId, highestTeamScore } = this.state
                this.props.dispatch(updatePlayerStats(this.state.winningStreak, this.state.longestStreak, this.state.highestPlayerScore, this.state.highestPlayerScoreId, this.state.highestTeamScore));
              })
            }

            /*

            this.setState({
              momentum: 0,
              momentumPrevOver: 0,
              momentumThisOver: [],
            }, function () {
              const { momentum, momentumPrevOver, momentumThisOver } = this.state
              this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
            })
            */

          }
          else {
            //do nothing.
          }
      })

      /*
        console.log(allPlayers + ' this is the set of players that get prepared for final state in redux.');
      const teamPlayersSet = allPlayers.map(player => {
        console.log(player);
        console.log(player.id);

        if ((player.id === 1 || player.id === 2) && (idBatterOneScoreNumber != 1 || idBatterOneScoreNumber != 2)) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
        }
        else if (player.id === 1 && idBatterOneScoreNumber === 1) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
        }
        else if (player.id === 2 && idBatterTwoScoreNumber === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterTwoScoreNumber, highestScore: player.highestScore};
        }
        else if (player.id === 2 && idBatterOneScoreNumber === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
        }
        else if (player.id === idBatterOneScoreNumber) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
        }
        else if (player.id === idBatterTwoScoreNumber) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterTwoAutoNotOuts, highestScore: player.highestScore};
        }
        else {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore}
        }
      });
      */

      const teamPlayersSet = this.props.teamPlayers.teamPlayers;
      //const facingBall = this.props.players.facingBall;
      console.log(teamPlayersSet + ' this gets set into redux state.');
      console.log(facingBall);





      /******** END CHCK IF PALYER SCORED 50 OR 100 ***************/

      const winningStreak = this.props.playerStats.winningStreak;

      this.setState({
        firstInningsRuns: 0,
      }, function () {
        const { firstInningsRuns } = this.state
        this.props.dispatch(updateFirstInningsRuns(this.state.firstInningsRuns));
      })

      /*
      this.setState({
        togglePremium: true,
        toggleHomeLoad: true,
      }, function () {
        const { togglePremium, toggleHomeLoad } = this.state
        this.props.dispatch(updateToggle(this.state.togglePremium, this.state.toggleHomeLoad));
      })
      */


      this.setState({
        wickets: 0,
        totalRuns: 0,
      }, function () {
        const { wickets, totalRuns } = this.state
        this.props.dispatch(updatePlayerRuns(this.state.wickets, this.state.totalRuns));
      })

      const teamPlayersSetNew = teamPlayersSet.map(player => {
        console.log(player);
        console.log(player.id);
        if (player.id === 1 || player.id === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
        }
        else {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore}
        }
      });

      console.log(teamPlayersSetNew + ' teamPlayersSet last');

      this.setState({
        players: teamPlayersSetNew,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })

      this.ref.doc("players").update({
        players: teamPlayersSetNew,
        facingBall: facingBall,
      });

      //console.log(this.state.loadingWinGameTotalRuns + ' deos it break on the next line?');

      this.setState({loadingWinGameTotalRuns: true})

      console.log(this.state.loadingWinGameTotalRuns + ' the value before changing.');

      console.log(this.props.playerRuns.totalRuns + ' should be zero.');

    //const { navigation } = this.props;
    this.props.navigation.navigate('HomeApp')
    }

    buyAutoNotOutsEndGame = () => {

      const gameRunEvents = this.props.gameRuns.gameRunEvents;
      const getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      const totalWickets = getWicketCount[0];

      //const totalWickets = this.props.playerRuns.wickets;
      console.log(totalWickets);

      let sum = a => a.reduce((acc, item) => acc + item);

      //Calculate the total runs
      const totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

      //const totalRuns = this.props.playerRuns.totalRuns;
      console.log(totalRuns);

      const { navigation } = this.props;
      const firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
      console.log(firstInningsRuns);

      if (totalWickets >= 10) {
        console.log('should not be hit unless 10 wikcet or more...');
        let ball = 0;

        /*
        let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
        let ballTotal = legitBall[0];
        console.log(ballTotal);

        ball = sum(ballTotal.map(acc => Number(acc)));
        console.log(ball);
        */

        ball = gameRunEvents.length;
        ball--

        const totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
        const totalOver = totalBallDiff[0];
          this.getGameResult(totalWickets, totalRuns, firstInningsRuns, totalOver);
          console.log('after getGameResults.');
      }

      /******** Check if curretn batsman have more than 50 or 100 ******/
      /*
      const allPlayers = this.props.players.players;
      console.log(allPlayers);

      let findCurrentBatters = allPlayers.map(acc => {
        console.log(acc);
        if (acc.batterFlag === 0) {
          console.log(acc.batterFlag);
          return {id: [acc.id]};
        }
          else {
            console.log(acc.batterFlag);
            return {id: [100]};
          }
        });
      console.log(findCurrentBatters);

      let idBatter = 0;
      let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)

      console.log(currentBatters);
      const idBatterOneScore = currentBatters[0].id;
      console.log(idBatterOneScore);
      const idBatterTwoScore = currentBatters[1].id
      console.log(idBatterTwoScore);


      let idBatterOneAutoNotOuts = currentBatters[0].autoNotOut;
      console.log(idBatterOneAutoNotOuts);
      let idBatterTwoAutoNotOuts = currentBatters[1].autoNotOut;
      console.log(idBatterTwoAutoNotOuts);


      let idBatterOneScoreNumber = Number(idBatterOneScore);
      console.log(idBatterOneScoreNumber);
      let idBatterTwoScoreNumber = Number(idBatterTwoScore);
      console.log(idBatterTwoScoreNumber);

      let idBatterOneScoreRuns = 0;
      let idBatterTwoScoreRuns = 0;
      const batterNotOutRunsCount = gameRunEvents.map(acc => {
        console.log(acc);
        if (acc.batterID === idBatterOneScoreNumber) {
          console.log(acc.runsValue);
          return [acc.runsValue, acc.batterID];
        }
        else if (acc.batterID === idBatterTwoScoreNumber) {
          console.log(acc.runsValue);
          return [acc.runsValue, acc.batterID];
        }
        else {
            console.log(acc.runsValue);
            return [0, 0];
          }
        });

        console.log(batterNotOutRunsCount + ' batterNotOutRunsCount here.');

        //work out notout player one runs.
        const currentBatterOneRunsArray = batterNotOutRunsCount.filter( batter => batter[1] != idBatterTwoScore)
        const currentBatterOneRunsArrayRunsOnly = currentBatterOneRunsArray.map(acc => {
          console.log(acc);
            return acc[0];
          });
        const currentBatterOneRuns = sum(currentBatterOneRunsArrayRunsOnly.map(acc => Number(acc)));
        console.log(currentBatterOneRuns + ' currentBatterOneRuns here.');

        //work out notout player two runs.
        const currentBatterTwoRunsArray = batterNotOutRunsCount.filter( batter => batter[1] != idBatterOneScore)
        const currentBatterTwoRunsArrayRunsOnly = currentBatterTwoRunsArray.map(acc => {
          console.log(acc);
            return acc[0];
          });
        const currentBatterTwoRuns = sum(currentBatterTwoRunsArrayRunsOnly.map(acc => Number(acc)));
        console.log(currentBatterTwoRuns + ' currentBatterTwoRuns here.');

        if (currentBatterOneRuns >= 50) {
          idBatterOneAutoNotOuts++
        }
        else if (currentBatterOneRuns >= 100) {
          idBatterOneAutoNotOuts = idBatterOneAutoNotOuts + 3;
        }
        else if (currentBatterTwoRuns >= 50) {
          idBatterTwoAutoNotOuts++
        }
        else if (currentBatterTwoRuns >= 100) {
          idBatterTwoAutoNotOuts = idBatterOneAutoNotOuts + 3;
        }

        //**ENDS not out player runs**/

        let batters = this.props.players.players
        console.log(batters);

        let findCurrentBatters = batters.map(acc => {
          console.log(acc);
          if (acc.batterFlag === 0) {
            console.log(acc.batterFlag);
            return {id: [acc.id]};
          }
            else {
              console.log(acc.batterFlag);
              return {id: [100]};
            }
          });
        console.log(findCurrentBatters);

        let idBatter = 0;
        console.log('currentBatters about to start');
        console.log(findCurrentBatters);
        let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)
        console.log(currentBatters);

        let idBatterOne = currentBatters[0].id;
        console.log(idBatterOne);
        let idBatterTwo = currentBatters[1].id
        console.log(idBatterTwo);

        let idBatterOneNumber = Number(idBatterOne);
        console.log(idBatterOneNumber);
        let idBatterTwoNumber = Number(idBatterTwo);
        console.log(idBatterTwoNumber);

        //worout who is facing.
        console.log();
        let facingBall = this.props.players.facingBall;

        let allPlayers = this.props.players.players;
        console.log(allPlayers + ' allPlayers check this.');
        let batterRuns = 0;
        let playerIDHighestScore = 0;

        const teamPlayers = this.props.teamPlayers.teamPlayers;

        allPlayers.map(player => {
          console.log(player);
          console.log(player.id);
          const wicketsPlusTwo = totalWickets + 2;
          if (player.id === idBatterOneNumber || player.id === idBatterTwoNumber) {
            //batterFlag = 1;
            console.log(allPlayers[player.id]);
            playerIDHighestScore = allPlayers[player.id];
            console.log(playerIDHighestScore + ' playerIDHighestScore');
            //allPlayers[player.id].batterFlag = 1;
            const scoreTwo = allPlayers[player.id].scoreOne;
            const scoreThree = allPlayers[player.id].scoreTwo;
            const highestScore = allPlayers[player.id].highestScore;
            console.log(highestScore);

            let sum = a => a.reduce((acc, item) => acc + item);
            const gameRunEventsNew = this.props.gameRuns.gameRunEvents;

            let ballCount = gameRunEventsNew.map(acc => {
              console.log(acc);
              return 1;
            });

            console.log(ballCount);

            let ball = sum(ballCount.map(acc => Number(acc)));

            let outs = 0;
            if (allPlayers[player.id].outs >= 1) {
              outs = allPlayers[player.id].outs
              outs--
            }
            else {
              outs = 0;
            }

            let batterRunsCount = gameRunEvents.map(acc => {
              console.log(acc);
              console.log(acc.batterID);
              console.log(allPlayers[player.id]);
              console.log(allPlayers[player.id].id);
              if (acc.batterID === allPlayers[player.id].id) {
                console.log(acc.runsValue + ' acc.runsValue is this one hit?');
                return [acc.runsValue];
              }
              else {
                  console.log(acc.runsValue + ' not hit for not out batsman.');
                  return 0;
                }
              });

              console.log(batterRunsCount);

              batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

              console.log(batterRuns);
              console.log(allPlayers[player.id]);


            //allPlayers[player.id].batterFlag = 1;
            allPlayers[player.id].scoreOne = batterRuns;
            allPlayers[player.id].scoreTwo = scoreTwo;
            allPlayers[player.id].scoreThree = scoreThree;
            allPlayers[player.id].highestScore = highestScore;
            allPlayers[player.id].outs = outs;

            let batterRunsHighest = allPlayers[player.id].highestScore;
            let batterRunsInt;
            let batterRunsHighestInt = 0;

            console.log(batterRunsInt + ' end of innings batterRuns');
            console.log(batterRunsHighestInt +  ' end of innings batterRunsHighest ');
            console.log(batterRunsHighest + ' end of innings batterRunsHighest');

            if ((isNaN(batterRunsHighest)) && (isNaN(batterRuns))) {

              console.log();
              batterRunsInt = parseInt(batterRuns, 10);
              batterRunsHighestInt  = parseInt(batterRunsHighest, 10);

              if (batterRunsInt > batterRunsHighestInt){
                batterRunsHighestInt = batterRunsInt;
              }
              else {
                batterRunsHighestInt = batterRunsHighestInt;
              }

            }
            else if (batterRuns > batterRunsHighest) {
              batterRunsHighestInt = batterRuns;
            }
            else {
              batterRunsHighestInt = batterRunsHighest;
            }



            console.log(batterRunsInt + ' wicket batterRunsInt ');
            console.log(batterRuns + ' wicket batterRuns ');
            console.log(batterRunsHighestInt +  ' wicket batterRunsHighestInt ');
            console.log(batterRunsHighest +  ' wicket batterRunsHighest ');



            teamPlayers[player.id].highestScore = batterRunsHighestInt;

            console.log(allPlayers);

            teamPlayers[player.id].scoreOne = batterRuns;
            teamPlayers[player.id].scoreTwo = scoreTwo;
            teamPlayers[player.id].scoreThree = scoreThree;
            teamPlayers[player.id].outs = outs;

            /*
            if (teamPlayers[player.id].id === 1 || teamPlayers[player.id].id === 2) {
              teamPlayers[player.id].batterFlag = 0;
            }
            else {
              teamPlayers[player.id].batterFlag = 1;
            }
            */

            console.log(teamPlayers);

            this.setState({
              teamPlayers: teamPlayers,
            }, function () {
              const { teamPlayers } = this.state
              this.props.dispatch(updateTeamPlayers(this.state.players));
            })

            console.log(this.props.teamPlayers.teamPlayers + ' teamPlayers redux.');

            const highestPlayerScore = this.props.playerStats.highestPlayerScore;
            const winningStreak = this.props.playerStats.winningStreak;
            const longestStreak = this.props.playerStats.longestStreak;
            const highestTeamScore = this.props.playerStats.highestTeamScore;

            console.log(batterRuns + ' batterRuns');
            console.log(highestPlayerScore + ' highestPlayerScore');

            if (batterRuns > highestPlayerScore) {
              this.setState({
              winningStreak: winningStreak,
              longestStreak: longestStreak,
              highestPlayerScore: batterRuns,
              highestPlayerScoreId: playerIDHighestScore,
              highestTeamScore: highestTeamScore,
              }, function () {
                const { winningStreak, longestStreak, highestPlayerScore, highestPlayerScoreId, highestTeamScore } = this.state
                this.props.dispatch(updatePlayerStats(this.state.winningStreak, this.state.longestStreak, this.state.highestPlayerScore, this.state.highestPlayerScoreId, this.state.highestTeamScore));
              })
            }

            /*

            this.setState({
              momentum: 0,
              momentumPrevOver: 0,
              momentumThisOver: [],
            }, function () {
              const { momentum, momentumPrevOver, momentumThisOver } = this.state
              this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
            })
            */

          }
          else {
            //do nothing.
          }
      })

      /*
        console.log(allPlayers + ' this is the set of players that get prepared for final state in redux.');
      const teamPlayersSet = allPlayers.map(player => {
        console.log(player);
        console.log(player.id);

        if ((player.id === 1 || player.id === 2) && (idBatterOneScoreNumber != 1 || idBatterOneScoreNumber != 2)) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
        }
        else if (player.id === 1 && idBatterOneScoreNumber === 1) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
        }
        else if (player.id === 2 && idBatterTwoScoreNumber === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterTwoScoreNumber, highestScore: player.highestScore};
        }
        else if (player.id === 2 && idBatterOneScoreNumber === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
        }
        else if (player.id === idBatterOneScoreNumber) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts, highestScore: player.highestScore};
        }
        else if (player.id === idBatterTwoScoreNumber) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterTwoAutoNotOuts, highestScore: player.highestScore};
        }
        else {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore}
        }
      });
      */

      const teamPlayersSet = this.props.teamPlayers.teamPlayers;
      //const facingBall = this.props.players.facingBall;
      console.log(teamPlayersSet + ' this gets set into redux state.');
      console.log(facingBall);





      /******** END CHCK IF PALYER SCORED 50 OR 100 ***************/

      const winningStreak = this.props.playerStats.winningStreak;

      this.setState({
        firstInningsRuns: 0,
      }, function () {
        const { firstInningsRuns } = this.state
        this.props.dispatch(updateFirstInningsRuns(this.state.firstInningsRuns));
      })

      /*
      this.setState({
        togglePremium: true,
        toggleHomeLoad: true,
      }, function () {
        const { togglePremium, toggleHomeLoad } = this.state
        this.props.dispatch(updateToggle(this.state.togglePremium, this.state.toggleHomeLoad));
      })
      */


      this.setState({
        wickets: 0,
        totalRuns: 0,
      }, function () {
        const { wickets, totalRuns } = this.state
        this.props.dispatch(updatePlayerRuns(this.state.wickets, this.state.totalRuns));
      })

      const teamPlayersSetNew = teamPlayersSet.map(player => {
        console.log(player);
        console.log(player.id);
        if (player.id === 1 || player.id === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
        }
        else {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut, highestScore: player.highestScore}
        }
      });

      console.log(teamPlayersSetNew + ' teamPlayersSet last');

      this.setState({
        players: teamPlayersSetNew,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })

      this.ref.doc("players").update({
        players: teamPlayersSetNew,
        facingBall: facingBall,
      });

      //console.log(this.state.loadingWinGameTotalRuns + ' deos it break on the next line?');

      this.setState({loadingWinGameTotalRuns: true})

      console.log(this.state.loadingWinGameTotalRuns + ' the value before changing.');

      console.log(this.props.playerRuns.totalRuns + ' should be zero.');

    //const { navigation } = this.props;
    this.props.navigation.navigate('CricStratIap', {
      iapGameOver: true,
    });

    }


    playButtons = () => {
      console.log(this.props.gameRuns.gameRunEvents);
      let gameRunEvents = this.props.gameRuns.gameRunEvents;
      const gameId = this.props.gameID.gameID
      console.log(gameId);
      const allPlayers = this.props.players.players;
      console.log(allPlayers);
      let keyID = this.props.gameID.keyID;
      console.log(keyID);

      let sum = a => a.reduce((acc, item) => acc + item);

      //Calculate the total runs
      //let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

      const totalRuns = this.props.playerRuns.totalRuns;
      console.log(totalRuns);

      let ball = 0;

      /*
      let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
      let ballTotal = legitBall[0];
      console.log(ballTotal);

      ball = sum(ballTotal.map(acc => Number(acc)));
      console.log(ball);
      */

      ball = gameRunEvents.length;
      ball--

      let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
      const over = totalBallDiff[0];
      /*
      let firstInningsRuns = [];
      if (this.state.firstInningsRuns === 0) {
        firstInningsRuns = [0]
      }
      else {
      let firstInningsRuns = this.state.firstInningsRuns;
    }
      let firstInningsRunsTotalArray = firstInningsRuns.filter( runs => runs != undefined)
      console.log(firstInningsRunsTotalArray);
      */

      const { navigation } = this.props;
      let firstInningsRuns = navigation.getParam('firstInningsRuns', 0);
      console.log(firstInningsRuns);

      if (firstInningsRuns === 0) {
        firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
      }
      else {
        //do nohthing.
      }

      /*
      if (firstInningsRuns === 0) {
        firstInningsRuns = 1000;
      }
      else {
      //do nothing.
    }
    */

    //console.log(firstInningsRunsTotal);

      //Get total wickets
      let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      let totalWickets = getWicketCount[0];
      console.log(totalWickets);
      /*
      console.log(this.props.games.games);
      let games = this.props.games.games;
      //let games = this.props.gamesList.gamesList;

      let gameIndex = games.findIndex(function(c) {
       return c.gameId == gameId;
      });

      console.log(gameIndex);
      console.log(allPlayers);
      */

      const gameRunEventsArray = this.props.gameRuns.gameRunEvents;
      const gameRunEventsLength = gameRunEventsArray.length;

      console.log(this.props.playerRuns.totalRuns + ' totalRuns at end of onDocCollectionUpdate 2 ');
      console.log(this.props.playerRuns.wickets + ' wickets at end of onDocCollectionUpdate 2.');
      console.log(this.props.firstInningsRuns.firstInningsRuns + ' first innings runs at end of onDocCollectionUpdate 2');
      console.log(this.props.ball.ball + ' ball at end of onDocCollectionUpdate 2');
      console.log(gameRunEventsLength + ' game events length at end of onDocCollectionUpdate 2');

        console.log(this.state.loadingWinGameTotalRuns);
        if ((this.props.playerRuns.totalRuns > this.props.firstInningsRuns.firstInningsRuns) || (this.props.playerRuns.wickets >= 10) || (gameRunEventsLength >= 121)) {
        this.setState({loadingWinGameTotalRuns: false})
        }

      console.log(totalWickets);
      if (totalWickets >= 10) {
        /*
        let filtered = '';
        if (keyID === '0') {
          filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
          console.log(filtered);

          this.setState({
            keyID: filtered,
            gameID: gameId,
          }, function () {
            const { keyID, gameID } = this.state
            this.props.dispatch(updateGameID(this.state.keyID, this.state.gameID));
          })
        }
        else {
          filtered = keyID;
        }
        console.log('Wickets 10 or more.');
        //let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];
          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRuns,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 1,
          });
          */

          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            topScore: battersHighestScore[0][0],
            topScorePlayer: battersNameHighestScore[0].player,
            topScoreBalls: highestScoreBallCount,
            topSecondScore: battersSecondHighestScore[0][0],
            topSecondScorePlayer: battersNameSecondHighestScore[0].player,
            topSecondBalls: secondHighestScoreBallCount,
            totalWickets: totalWickets,
            gameResult: 1,
          }

          console.log(game);
          console.log(games);
          games.slice(0);
          games.unshift(game);
          console.log(games);

          /*
          var indexCurrentGame = games.indexOf(gameIndex);
          if (~indexCurrentGame) {
              games[indexCurrentGame] = game;
        }


          //console.log(games);
          //games.update(game. {index: gameIndex})
          //console.log(games);

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */
          /*
          if (this.state.loadingWinGameTotalRuns === true) {
            return (
              <Row style={{height: 100}}>
                <Col size={1}>
                <Button style={styles.saveButton} large success
                >
                <ActivityIndicator
                style={{ color: '#fff', height: 100, width: 'auto' }}
                size="large"
                color="#fff"
              />
              <Text style={styles.goButtonText}>All OUT! saving...</Text >
                </Button>
              </Col>
            </Row>
            )
          }
          else {
          */
        return (
        <Row style={{height: 100}}>
          <Col size={1}>
            <Button style={styles.goButton} large success
              onPress={() => this.playNewGame()}
            >
              <Text style={styles.goButtonText}>All out. Play Again?</Text>
            </Button>
          </Col>
        </Row>
      )
    //}
      }
      else if (totalRuns > firstInningsRuns) {
        /*
        let filtered = '';
        if (keyID === '0') {
          filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
          console.log(filtered);

          this.setState({
            keyID: filtered,
            gameID: gameId,
          }, function () {
            const { keyID, gameID } = this.state
            this.props.dispatch(updateGameID(this.state.keyID, this.state.gameID));
          })
        }
        else {
          filtered = keyID;
        }
        console.log('total runs more than first innings toal!.');
        //let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        console.log(gameRunEvents);
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];
          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRuns,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 2,
          });
          */

          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            topScore: battersHighestScore[0][0],
            topScorePlayer: battersNameHighestScore[0].player,
            topScoreBalls: highestScoreBallCount,
            topSecondScore: battersSecondHighestScore[0][0],
            topSecondScorePlayer: battersNameSecondHighestScore[0].player,
            topSecondBalls: secondHighestScoreBallCount,
            totalWickets: totalWickets,
            gameResult: 1,
          }

          console.log(games);
          games.update(game)
          console.log(games);

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */

          console.log(this.state.loadingWinGameTotalRuns + ' loadingWinGameTotalRuns');
          /*
          if (this.state.loadingWinGameTotalRuns === true) {
            return (
              <Row style={{height: 100}}>
                <Col size={1}>
                <Button style={styles.saveButton} large success
                >
                <ActivityIndicator
                style={{ color: '#fff', height: 100, width: 'auto' }}
                size="large"
                color="#fff"
              />
              <Text style={styles.goButtonText}>You win! saving...</Text >
                </Button >
              </Col>
            </Row>
            )
          }
          else {
          */
            return (
            <Row style={{height: 100}}>
              <Col size={1}>
                <Button style={styles.goButton} large success
                  onPress={() => this.playNewGame()}
                >
                  <Text style={styles.goButtonText}>You win! Play Again?</Text>
                </Button>
              </Col >
            </Row>
          )
          //}

      }
      else if (over >= 20) {
        /*
        let filtered = '';
        if (keyID === '0') {
          filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
          console.log(filtered);

          this.setState({
            keyID: filtered,
            gameID: gameId,
          }, function () {
            const { keyID, gameID } = this.state
            this.props.dispatch(updateGameID(this.state.keyID, this.state.gameID));
          })
        }
        else {
          filtered = keyID;
        }
        console.log('over 20 overs.');
        //let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];
          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRuns,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 1,
          });
          */

          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            topScore: battersHighestScore[0][0],
            topScorePlayer: battersNameHighestScore[0].player,
            topScoreBalls: highestScoreBallCount,
            topSecondScore: battersSecondHighestScore[0][0],
            topSecondScorePlayer: battersNameSecondHighestScore[0].player,
            topSecondBalls: secondHighestScoreBallCount,
            totalWickets: totalWickets,
            gameResult: 1,
          }

          console.log(games);
          games.update(game)
          console.log(games);

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */
          /*
          if (this.state.loadingWinGameTotalRuns === true) {
            return (
              <Row style={{height: 100}}>
                <Col size={1}>
                <Button style={styles.saveButton} large success
                >
                <ActivityIndicator
                style={{ color: '#fff', height: 100, width: 'auto' }}
                size="large"
                color="#fff"
              />
              <Text style={styles.goButtonText}>Game over! saving...</Text >
                </Button>
              </Col>
            </Row>
            )
          }
          else {
          */
        return (
        <Row style={{height: 100}}>
          <Col size={1}>
            <Button style={styles.goButton} large success
              onPress={() => this.playNewGame()}
            >
              <Text style={styles.goButtonText}>You Lose. Play Again?</Text>
            </Button>
          </Col>
        </Row>
      )
    //}
      }
      else {

        /*
          ******************
        console.log('continue game.');
        let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        console.log(filtered);
          //this.ref.doc(filtered[0]).update({
          this.ref.doc(filtered).update({
              gameResult: 0,
          });


          console.log(allPlayers);
          console.log(gameRunEvents);
          console.log(ball);
          console.log(over);
          if (totalRuns === 0) {
            //do nothing
          }
          else {
            console.log('ball and over more than 0.');
          let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
          console.log(highestScorers);
          //let battersHighestScore = highestScorers[0];
          //let battersNameHighestScore = highestScorers[1];
          //let highestScoreBallCount = highestScorers[2];
          //let battersSecondHighestScore = highestScorers[3];
          //let battersNameSecondHighestScore = highestScorers[4];
          //let secondHighestScoreBallCount = highestScorers[5];


          /*
          ***************************
          let game = {
            displayId: 111,
            firstInningsRuns: this.state.firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 0,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered,
            //topScore: battersHighestScore,
            //topScoreBalls: highestScoreBallCount,
            //topScorePlayer: battersNameHighestScore,
            //topSecondScore: battersSecondHighestScore,
            //topSecondBalls: secondHighestScoreBallCount,
            //topSecondScorePlayer: battersNameSecondHighestScore,
            totalRuns: totalRuns,
            totalWickets: totalWickets,
          }


          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            totalWickets: totalWickets,
            gameResult: 0,
          }
          */

          /*
          *********************
          //const some_array = [...this.state.some_array]
          console.log(game);
          console.log(games);
          console.log(game[0]);
          games[0] = game;
          console.log(games);
        }
        */

          /*
          console.log(game);
          console.log(games);
          games.slice(0);
          console.log(games);
          games.unshift(game);
          console.log(games);
          */

          /*

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */

          if (this.props.toggle.toggleHomeLoad === true) {

            return (
              <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator
                style={{ color: '#fff', height: 200, width: 'auto' }}
                size="large"
                color="#fff"
              />
              <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...</Text >

              </Col >
            )
          }
          else {
        return (
        <Row size={3}>
          <Col size={1}>
            <Button style={styles.goButton} large success
              onPress={() => this.handleCards()}
            >
              <Text style={styles.goButtonText}>PLAY!</Text>
            </Button>
          </Col>
          <Col size={1} style={{backgroundColor: 'transparent'}}>
            <TouchableHighlight style={{height: 100, marginTop: 10}} onPress={() => this.handleStopCardsOne()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImage}/>
              </View>
            </TouchableHighlight>
          </Col>
          <Col size={1} style={{backgroundColor: 'transparent'}}>
            <TouchableHighlight style={{height: 100, marginTop: 10}} onPress={() => this.handleStopCards()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImageTwo}/>
              </View>
            </TouchableHighlight>
          </Col>
          <BoardDisplayStats firstInningsRuns={firstInningsRuns} />
        </Row>
      )
    }
      }

      //this.setState({ isLoading: false });


    }

/*
    hideSpinner = () => {
      console.log('hit lead?' );
      console.log(this.props.toggle.togglePremium);
      const visible = this.props.toggle.togglePremium;
      this.setState({ visible: visible });

      this.setState({
        togglePremium: false,
      }, function () {
        const { togglePremium } = this.state
        this.props.dispatch(updateToggle(this.state.togglePremium));
      })

      //console.log(this.props.toggle.togglePremium);
    }
    */

    getView = () => {
      console.log(this.props.toggle.toggleHomeLoad + ' or is this hit first toggleHomeLoad? ');

      if (this.state.loadingBoard === true) {

        return (
          <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            style={{ color: '#fff', height: 200, width: 'auto' }}
            size="large"
            color="#fff"
          />
          <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...3</Text >

          </Col >
        )

        /*
        return (
          <View style={{ flex: 1 }}>
      <WebView
        onLoad={() => this.hideSpinner()}
        style={{ flex: 1 }}
      />
      {this.state.loadingBoard && (
        <ActivityIndicator
          style={{ color: '#fff', height: 200, width: 'auto' }}
          size="large"
          color="#fff"
        />
      )}
      </View>
    );
    */
      }
      else {
        const gameID = this.props.gameID.gameID;
        console.log(gameID + ' GameID for props.');
        const { navigation } = this.props;
        const gamesCount = navigation.getParam('gamesCount', 0);
        const continueGame = navigation.getParam('continueGame', false);
        return (
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
          {this.playButtons()}

          <View style={styles.horizontalRule} />
          <Row size={1}>
          <DisplayCurrentBatters navigation={this.props.navigation} gameTest={gameID} gamesCount={gamesCount}  continueGame={continueGame} continueGameArray={this.props.continueGameArray}/>
          </Row>

          <Row size={2}>
            <RunsTotal />
            </Row >
            </LinearGradient>
      )
      }
    }


    hideSpinner() {
      console.log('when is this hit hideSpinnder?');
  this.setState({ loadingBoard: false });
}

    render() {
      console.log('hit board!');
      //console.log(this.state.players);
      console.log(this.props.players.players);
        return (

          <Col >


          {this.getView()}


          </Col>


        );
    }
}

/*  <Row>

{this.playButtons()}

</Row>
*/

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  ball: state.ball,
  players: state.players,
  games: state.games,
  gamesList: state.gamesList,
  firstInningsRuns: state.firstInningsRuns,
  playerStats: state.playerStats,
  gameCards: state.gameCards,
  teamPlayers: state.teamPlayers,
  momentum: state.momentum,
  autoNotOut: state.autoNotOut,
  toggle: state.toggle,
  playerRuns: state.playerRuns,
});

export default connect(mapStateToProps)(Board);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    saveButton: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: '#ffbf00',
    },
    goButtonText: {
      color: '#fff',
      fontSize: 30,
    },
    cardDisplay: {
      flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  horizontalRule: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalRuleTop: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  linearGradient: {
    flex: 1,
    opacity: 0.9,
  },
  buttonText: {
    fontSize: PixelRatio.get() === 1 ? 20 : PixelRatio.get() === 1.5 ? 24 : PixelRatio.get() === 2 ? 28 : 32,
    color: '#fff',
    color: '#fff',
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    textAlign:'center',
    alignSelf:'center',
    flexDirection: 'column',
    fontWeight: '200',
    top: 0,
  },
  buttonTextBack: {
    fontSize: 16,
    color: '#fff',
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    textAlign:'center',
    alignSelf:'center',
    flexDirection: 'column',
  },
});
