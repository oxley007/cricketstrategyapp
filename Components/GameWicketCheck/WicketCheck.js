import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity, ImageBackground, Alert } from 'react-native';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateMomentum } from '../../Reducers/momentum';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updateAutoNotOut } from '../../Reducers/autoNotOut';
import { updatePlayerStats } from '../../Reducers/playerStats';

import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';
import FacingBatter from '../../Util/FacingBatter.js';
import BoardDisplayStats from '../Board/BoardDisplayStats';
import RunsTotal from '../Board/RunsTotal';
import DisplayCurrentBatters from '../Board/DisplayCurrentBatters'


class WicketCheck extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    //this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
        rImage: '',
        cardWicket: 0,
        randomClick: 1,
        incrementer: null,
        playera: [],
        buttonDisplayFlag: 0,
    };
    this.rImages = [require('../Board/random/a-hearts.png'),require('../Board/random/2-hearts.png'),require('../Board/random/3-hearts.png'),require('../Board/random/4-hearts.png'),require('../Board/random/5-hearts.png'),require('../Board/random/6-hearts.png'),require('../Board/random/7-hearts.png'),require('../Board/random/a-diamonds.png'),require('../Board/random/2-diamonds.png'),require('../Board/random/3-diamonds.png'),require('../Board/random/4-diamonds.png'),require('../Board/random/5-diamonds.png'),require('../Board/random/6-diamonds.png'),require('../Board/random/7-diamonds.png'),require('../Board/random/a-spades.png'),require('../Board/random/2-spades.png'),require('../Board/random/3-spades.png'),require('../Board/random/4-spades.png'),require('../Board/random/5-spades.png'),require('../Board/random/6-spades.png'),require('../Board/random/7-spades.png'),require('../Board/random/a-clubs.png'),require('../Board/random/2-clubs.png'),require('../Board/random/3-clubs.png'),require('../Board/random/4-clubs.png'),require('../Board/random/5-clubs.png'),require('../Board/random/6-clubs.png'),require('../Board/random/7-clubs.png')]
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    eventID: this.props.gameRuns.eventID || 0,
    overBowled: this.props.gameRuns.overBowled || false,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    teamPlayers: this.props.teamPlayers.teamPlayers || [],
    momentum: this.props.momentum.momentum || 0,
    momentumThisOver: this.props.momentum.momentumThisOver || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    autoNotOut: this.props.autoNotOut.autoNotOut || 0,
    winningStreak: this.props.playerStats.winningStreak || 0,
    longestStreak: this.props.playerStats.longestStreak || 0,
    highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
    highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
    highestTeamScore: this.props.playerStats.highestTeamScore || 0,
  };

  handleChange = ( gameID, gameRuns, ball, players, teamPlayers, momentum, firstInningsRuns, autoNotOut, playerStats ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ players });
    this.setState({ teamPlayers });
    this.setState({ momentum });
    this.setState({ firstInningsRuns });
    this.setState({ autoNotOut });
    this.setState({ playerStats });
  };

  incrementer = () => {
    console.log(this.state.incrementer);
    let incrementer = null;
    console.log(incrementer);
    this.setState({incrementer: incrementer});
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    //this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
    //this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.interval);
  }

  onCollectionUpdate = (querySnapshot) => {
    const games = [];
    querySnapshot.forEach((doc) => {
      const { gameId, gameName } = doc.data();

      games.push({
        key: doc.id,
        doc, // DocumentSnapshot
        gameId,
        gameName,
      });
    });

    this.setState({
      games,
      loading: false,
   });
  }

goOrCardDisplay = () => {
  console.log(this.state.rImage);
  if (this.state.rImage === '') {
    console.log('hit?');
    return (
      <Col style={{flex: 1,paddingLeft: 15, paddingRight: 15, alignItems: 'center', justifyContent: 'center'}}>
      <Row style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10, opacity: 1,}}>
      <Button rounded large success style={{backgroundColor: '#77dd77', height: 200, opacity: 1}}
        onPress={() => this.handleWicketStart()}>
        <Text style={{width: '100%', color: '#fff', fontSize: 100, textAlign: 'center'}}>GO!</Text>
      </Button>
      </Row>
      <Row style={{flex: 1}}>
        <Text style={{fontSize: 20, color: '#fff'}}>Click 'GO!' to start the 3rd umpire process.</Text>
      </Row>
    </Col>
    )
  }
  else {
    return(
      <Col style={{flex: 1,paddingLeft: 15, paddingRight: 15, alignItems: 'center', justifyContent: 'center'}}>
      <Row style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10, opacity: 1,}}>
      <TouchableHighlight style={{height: 160}} onPress={() => this.handleWicket()}>
        <View style={{height: 160}}>
          <Image style={styles.cardDisplay}source={this.state.rImage}/>
        </View>
      </TouchableHighlight>
      </Row>
      <Row style={{flex: 1}}>
        <Text style={{fontSize: 20, color: '#fff'}}>Click a card. Black is out. Red is not out</Text>
      </Row>
      <Row style={{flex: 1}}>
        <Text style={{fontSize: 30, color: '#fff'}}>OR:</Text>
      </Row>
    </Col>

    )
  }
}


handleWicketStart = () => {

  console.log('handleWicketStart');

  const buttonDisplayFlag = 1;
  this.setState({buttonDisplayFlag: buttonDisplayFlag})

  const randomClick = this.state.randomClick
  if (randomClick === 1) {
    clearInterval(this.incrementer)
    this.setState({ randomClick: 0 });
    let secValue = 100;

    this.incrementer = setInterval( () => {
      if (this.state.randomClick === 0) {
    var randomInt = Math.floor(Math.random() * this.rImages.length)
    console.log(randomInt);
    this.setState({
      cardWicket: randomInt,
    })
    var rImage = this.rImages[randomInt]
        this.setState({
          rImage: rImage,
        }
      )}
    }, secValue);
  }
}

handleBack = () => {
  const buttonDisplayFlag = 0;
  this.setState({buttonDisplayFlag: buttonDisplayFlag});

  this.props.navigation.navigate('Game')

}

onDocCollectionUpdate = (allPlayers, facingBall) => {

  this.ref.doc("players").update({
    players: allPlayers,
    facingBall: facingBall,
  });

}

handleWicket = () => {
  const randomClick = this.state.randomClick
  if (randomClick === 0) {
    this.setState({ randomClick: 1 });
    const cardWicket = this.state.cardWicket;
    //var cardTwo = this.state.cardTwo;
    let cardColorCheck = CardBoard.getCardColor(cardWicket);
    let cardColor = cardColorCheck;
    //let wicketEvent = boardRuns[1];
    console.log(cardColor);


    const { currentUser } = this.state;
    console.log(currentUser);
    console.log(currentUser.uid);
    //this.setState({ currentUser })

      let sum = a => a.reduce((acc, item) => acc + item);

      //this.setState({ random: runs });

      let eventID = this.props.gameRuns.eventID;
      eventID++
      console.log(eventID);


      let gameRunEvents = this.props.gameRuns.gameRunEvents;
      console.log(gameRunEvents);

      let ballCount = gameRunEvents.map(acc => {
        console.log(acc);
        return 1;
    });
    let ball = sum(ballCount.map(acc => Number(acc)));

      console.log(ball);

      // ************ workout who's batting **************** //
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

      if (ball <= 1) {
        facingBall = 1;
      }
      else {
        //nothing
      }


      console.log(facingBall);
      if (facingBall === 1) {
        facingBatter = idBatterOneNumber;
      }
      else {
        facingBatter = idBatterTwoNumber;
      }

      const runs = 0;
      let wicketEvent = false;
      if (cardColor === 'red') {
        console.log('Wicket event red');
        wicketEvent = true;
      }

      console.log(wicketEvent);

      gameRunEvents.push({eventID: eventID, runsValue: runs, ball: ball, runsType: 'runs', wicketEvent: wicketEvent, batterID: facingBatter, bowlerID: 0});
      console.log(gameRunEvents);



      //************ WICKET ON LAST BALL OF INNIBGS!!!!!!!!!!!! *******************//

      //nandled in board.js.

      //*********************************************************************//

      console.log(facingBall);
      //this.setState({facingBall: facingBall});

      //handle wicket event to remove batsman.
      //Get total wickets
      let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      let totalWickets = getWicketCount[0];
      console.log(totalWickets);

      const teamPlayers = this.props.teamPlayers.teamPlayers;

      if (cardColor === 'red' && totalWickets < 10) {

        if (ball === 6 || ball === 12 || ball === 18 || ball === 24 || ball === 30 || ball === 36 || ball ===42 || ball === 48 ||
        ball === 54 || ball === 60 || ball === 66 || ball === 72 || ball === 78 || ball === 84 || ball === 90 || ball === 96 ||
        ball === 102 || ball === 108 || ball === 114 || ball === 120 ) {
          if (facingBall === 1) {
            facingBall = 2;
          }
          else if (facingBall === 2) {
              facingBall = 1;
          }
        } else {
            if (facingBall === 1) {
              facingBall = 1;
            }
            else {
              facingBall = 2;
            }
        }

        if (facingBall === 1) {
          facingBatter = idBatterOneNumber;
        }
        else {
          facingBatter = idBatterTwoNumber;
        }

        allPlayers = this.props.players.players;
        let batterRuns = 0;
        let playerIDHighestScore = 0;

        allPlayers.map(player => {
          console.log(player);
          console.log(player.id);
          const wicketsPlusTwo = totalWickets + 2;
          console.log(facingBatter);
          if (player.id === facingBatter) {
            //batterFlag = 1;
            console.log(allPlayers[player.id]);
            playerIDHighestScore = allPlayers[player.id];
            allPlayers[player.id].batterFlag = 1;
            const scoreTwo = allPlayers[player.id].scoreOne;
            const scoreThree = allPlayers[player.id].scoreTwo;
            const highestScore = allPlayers[player.id].highestScore;

            let sum = a => a.reduce((acc, item) => acc + item);
            const gameRunEventsNew = this.props.gameRuns.gameRunEvents;

            let ballCount = gameRunEventsNew.map(acc => {
              console.log(acc);
              return 1;
            });

            console.log(ballCount);

            let ball = sum(ballCount.map(acc => Number(acc)));

            let outs = 0;
            if (allPlayers[player.id].outs < 3 && ball != 120) {
              outs = allPlayers[player.id].outs
              outs++
            }
            else {
              outs = 3;
            }

            let batterRunsCount = gameRunEvents.map(acc => {
              console.log(acc);
              console.log(acc.batterID);
              console.log(allPlayers[player.id]);
              if (acc.batterID === allPlayers[player.id].id) {
                console.log(acc.runsValue);
                return [acc.runsValue];
              }
              else {
                  console.log(acc.runsValue);
                  return 0;
                }
              });

              console.log(batterRunsCount);

              batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

              console.log(batterRuns);


            allPlayers[player.id].batterFlag = 1;
            allPlayers[player.id].scoreOne = batterRuns;
            allPlayers[player.id].scoreTwo = scoreTwo;
            allPlayers[player.id].scoreThree = scoreThree;
            allPlayers[player.id].highestScore = highestScore;
            allPlayers[player.id].outs = outs;

            let batterRunsHighest = allPlayers[player.id].highestScore;
            let batterRunsInt;
            let batterRunsHighestInt = 0;

            console.log(batterRunsInt + ' wicket batterRuns ');
            console.log(batterRunsHighestInt +  ' wicket batterRunsHighest ');

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
          else if (player.id === wicketsPlusTwo) {
            allPlayers[player.id].batterFlag = 0;
            console.log(allPlayers);
          }
          else {
            //do nothing.
          }
      })

      /* Check if curretn batsman have more than 50 or 100 */

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
      console.log(idBatterOneNumber);
      let idBatterTwoScoreNumber = Number(idBatterTwoScore);
      console.log(idBatterTwoNumber);

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

        //**ENDS not out player runs**//

        /*
      const teamPlayersSet = allPlayers.map(player => {
        console.log(player);
        console.log(player.id);

        if ((player.id === 1 || player.id === 2) && (idBatterOneScoreNumber != 1 || idBatterOneScoreNumber != 2)) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: player.autoNotOut};
        }
        else if (player.id === 1 && idBatterOneScoreNumber === 1) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts};
        }
        else if (player.id === 2 && idBatterTwoScoreNumber === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterTwoScoreNumber};
        }
        else if (player.id === 2 && idBatterOneScoreNumber === 2) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts};
        }
        else if (player.id === idBatterOneScoreNumber) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts};
        }
        else if (player.id === idBatterTwoScoreNumber) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterTwoAutoNotOuts};
        }
        else {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut}
        }
      });


      let countBAtterFlag0 = teamPlayersSet.map(player => {
        console.log(player);
        if (player.batterFlag === 0) {
          return 1;
        }
        else {
          return 0;
        }
      });

      console.log(countBAtterFlag0 + ' count batter flag ');





      //let sum = a => a.reduce((acc, item) => acc + item);
      let countBAtterFlag0Total = sum(countBAtterFlag0.map(acc => Number(acc)));


      console.log(countBAtterFlag0Total + ' count batter flag Tota; ');

      */
        //players.map(player => {

        const batters = this.props.players.players;
        const getFacingBatter = FacingBatter.getFacingBatter(batters, facingBall, totalWickets);
        const facingBatterNew = getFacingBatter[0];

        const teamPlayersSet = allPlayers.map(player => {

          console.log('New batter change.');

          const newBatsmanNum = player.id + 2;

          console.log(facingBatterNew + ' facingBatterNew');
          console.log(newBatsmanNum + ' newBatsmanNum');
          console.log(player.id + ' player.id');

          if (facingBatterNew === player.id) {
            return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
          }
          else if (newBatsmanNum === player.id) {
            return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
          }
          else {
            return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: player.batterFlag, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut, highestScore: player.highestScore};
          }
        });

            /*
          console.log(player);
          console.log(player.id);
          let batterZeroCount = 0
          if (countCurrentBatterMoreThanThree === true) {
            countCurrentBatterMoreThanThree = false;
            return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
          }
          else if (player.batterFlag === 1 ) {
            return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
          }
          else if (player.batterFlag === 2) {
            return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
          }
          else {
            return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
          }
        });

        let countCurrentBatterCheck = 0;
        let countCurrentBatterMoreThanThree = false;
        console.log(allPlayers);
        allPlayers.map(player => {
          console.log(player.batterFlag);
          console.log(player.id);
          console.log(player.player);

          console.log(countCurrentBatterCheck);
          console.log();
          if (player.batterFlag === 0) {
            countCurrentBatterCheck++
          }

          if (player.batterFlag === 0 && countCurrentBatterCheck === 3) {
            countCurrentBatterMoreThanThree = true;
          }
          console.log(countCurrentBatterMoreThanThree + ' countCurrentBatterMoreThanThree');
        })




          let teamPlayersSet = [];
          if (facingBall === 1) {
            teamPlayersSet = allPlayers.map(player => {
              console.log(player);
              console.log(player.id);
              let batterZeroCount = 0
              if (countCurrentBatterMoreThanThree === true) {
                countCurrentBatterMoreThanThree = false;
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
              }
              else if (player.batterFlag === 1 ) {
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
              }
              else if (player.batterFlag === 2) {
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
              }
              else {
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
              }
            });
          }
          else {
            teamPlayersSet = allPlayers.map(player => {
              console.log(player);
              console.log(player.id);

              if (countCurrentBatterMoreThanThree === true) {
                countCurrentBatterMoreThanThree === false;
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut};
              }
              else if (player.batterFlag === 1 ) {
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts};
              }
              else if (player.batterFlag === 2) {
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterTwoScoreNumber};
              }
              else {
                return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
              }

              if (player.batterFlag === 0) {
                batterZeroCount++;
              }

            });

        }

        */


      console.log(teamPlayersSet);
      console.log(facingBall);
      this.setState({
        players: teamPlayersSet,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })

      /*
      console.log(allPlayers);
      console.log(facingBall);
      this.setState({
        players: allPlayers,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })
      */

      console.log(this.props.players.players);
      console.log(this.props.players.facingBall);

      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
      //this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
      //this.onDocCollectionUpdate(allPlayers, facingBall);

      let momentum = this.props.momentum.momentum;
      console.log(momentum);
      let momentumThisOver = this.props.momentum.momentumThisOver;


      const getMomentum = CardBoard.getMomentum(gameRunEvents, momentum);
      const momentumThisBall = getMomentum[0];
      console.log(momentumThisBall);

      if (momentumThisBall > 0) {
      momentumThisOver.push(momentumThisBall);
      }

      momentum = momentum - momentumThisBall;

      console.log(momentumThisOver);

      //add momentum to redux.
      this.setState({
        momentum: momentum,
        momentumPrevOver: 0,
        momentumThisOver: momentumThisOver,
      }, function () {
        const { momentum, momentumPrevOver, momentumThisOver } = this.state
        this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
      })

    }



    let allPlayers = this.props.players.players;
    console.log(allPlayers);
    this.setState({
      players: allPlayers,
      facingBall: facingBall,
    }, function () {
      const { players, facingBall } = this.state
      this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
    })


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
      let numberBallValue = 0;

      if (totalBall === 0 && totalOver > 0) {
        let eventID = this.props.gameRuns.eventID;
        numberBallValue = Number(6);
        //this.props.dispatch(updateGameRuns(gameRunEvents, eventID, true))
        this.setState({
          gameRunEvents: gameRunEvents,
          eventID: eventID,
          overBowled: true,
        }, function () {
          const { gameRunEvents, eventID, overBowled } = this.state
          this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
        })

        console.log(this.state.games);
        console.log(this.state.games[0].gameId);
        const gameId = this.props.gameID.gameID

        let currentKey = this.state.games.map(acc => {
          console.log(acc);
          if (acc.gameId  === gameId) {
            console.log(acc.gameId);
            console.log(acc.key);
            return acc.key;
          }
          });
          console.log(currentKey);

          let filtered = currentKey.filter(t=>t != undefined);
          console.log(filtered);
          console.log(filtered[0]);

          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
          });

          const rImage = '';
          this.setState({
            rImage: rImage,
          })


       setTimeout(() => {
      this.props.navigation.navigate('OverBowled');
  }, 1000);  //5000 milliseconds

      }
      else {
        //do nothing
        console.log('naviagte not hit');
        this.setState({
          gameRunEvents: gameRunEvents,
          eventID: eventID,
          overBowled: false,
        }, function () {
          const { gameRunEvents, eventID, overBowled } = this.state
          this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
        })

      }
      let numberOverValue = Number(totalOver);

      const { navigation } = this.props;
      const displayId = navigation.getParam('displayId');
      console.log(displayId);

      if (cardColor === 'red') {

        const rImage = '';
        this.setState({
          rImage: rImage,
        })

        setTimeout(() => {

          this.props.navigation.navigate('WicketOut', {
            displayId: displayId,
            totalWickets: totalWickets,
            });
          }, 1000);  //5000 milliseconds
        }
        else if (cardColor === 'too close to call') {

          const rImage = '';
          this.setState({
            rImage: rImage,
          })

          setTimeout(() => {
            this.props.navigation.navigate('TooCloseToCall', {
              displayId: displayId,
            });
            }, 1000);  //5000 milliseconds
        }
        else {

          const rImage = '';
          this.setState({
            rImage: rImage,
          })

          setTimeout(() => {
            this.props.navigation.navigate('WicketNotOut', {
              displayId: displayId,
            });
            }, 1000);  //5000 milliseconds
        }
    }
  }

  buttonDisplay = () => {

      return (
        <Button rounded large success
          onPress={() => this.handleWicketStart()}>
          <Text >GO!</Text>
        </Button>
      )
  }

handleUseNotOut = () => {

  Alert.alert(
  'Use Auto Not-Out?',
  'Are you sure you want to use your auto not-out?',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {
      // ************ workout who's batting **************** //
      let sum = a => a.reduce((acc, item) => acc + item);
      console.log(this.props.players.players);
      const batters = this.props.players.players
      const facingBall = this.props.players.facingBall;
      console.log(batters);
      //Get total wickets
      const gameRunEvents = this.props.gameRuns.gameRunEvents;
      const getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      const totalWickets = getWicketCount[0];
      console.log(totalWickets);

      const getFacingBatter = FacingBatter.getFacingBatter(batters, facingBall, totalWickets);
      const facingBatter = getFacingBatter[0];

      let findCurrentBatterANO = batters.map(acc => {
        console.log(acc);
        if (acc.id === facingBatter) {
          console.log(acc.id);
          return acc.autoNotOut;
        }
          else {
            console.log(acc.id);
            return 0;
          }
        });

        let autoNotOutplayer = sum(findCurrentBatterANO.map(acc => Number(acc)));

        if (autoNotOutplayer <= 0) {
          Alert.alert(
          'Sorry, no auto not-outs',
          'Buy auto not-outs online now',
          [
            {
              text: 'Back',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Buy auto not-outs', onPress: () =>console.log('Cancel Pressed'),
          },
      ],
      {cancelable: false},
    );
        }
        else {

        autoNotOutplayer--

      const teamPlayersSet = allPlayers.map(player => {
        console.log(player);
        console.log(player.id);

        if (player.id === facingBatter) {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: player.batterFlag, aggBoard: player.aggBoard, autoNotOut: autoNotOutplayer, highestScore: player.highestScore};
        }
        else {
          return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: player.batterFlag, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut, highestScore: player.highestScore}
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

      this.setState({ randomClick: 0 });
      const cardWicket = 14;
      this.setState({ cardWicket: cardWicket });
      this.handleWicket();
    }

    }},
  ],
  {cancelable: false},
);

  }

  getFacingBatterANO = () => {
    // ************ workout who's batting **************** //
    let sum = a => a.reduce((acc, item) => acc + item);
    console.log(this.props.players.players);
    const batters = this.props.players.players
    const facingBall = this.props.players.facingBall;
    console.log(batters);

    //Get total wickets
    const gameRunEvents = this.props.gameRuns.gameRunEvents;
    const getWicketCount = BallDiff.getWicketCount(gameRunEvents);
    const totalWickets = getWicketCount[0];
    console.log(totalWickets);

    const getFacingBatter = FacingBatter.getFacingBatter(batters, facingBall, totalWickets);
    const facingBatter = getFacingBatter[0];

    let findCurrentBatterANO = batters.map(acc => {
      console.log(acc);
      if (acc.id === facingBatter) {
        console.log(acc.id);
        return acc.autoNotOut;
      }
        else {
          console.log(acc.id);
          return 0;
        }
      });

      let autoNotOutplayer = sum(findCurrentBatterANO.map(acc => Number(acc)));

      return (
        <Text style={styles.autoNotOutNumber}>{autoNotOutplayer}</Text>
      )
  }

  handleBuyNotOut = () => {
    this.props.navigation.navigate('CricStratIap')
  }

handleUseNotOutTeam = () => {
  Alert.alert(
  'Use Auto Not-Out?',
  'Are you sure you want to use your auto not-out?',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {
      let autoNotOutTeam = this.props.autoNotOut.autoNotOut;

      if (autoNotOutTeam <= 0) {
        Alert.alert(
        'Sorry, no auto not-outs',
        'Buy auto not-outs online now',
        [
          {
            text: 'Back',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Buy auto not-outs', onPress: () =>console.log('Cancel Pressed'),
        },
    ],
    {cancelable: false},
  );
      }
      else {

      autoNotOutTeam--

      this.setState({
        autoNotOut: autoNotOutTeam,
      }, function () {
        const { autoNotOut } = this.state
        this.props.dispatch(updateAutoNotOut(this.state.autoNotOut));
      })

      this.setState({ randomClick: 0 });
      const cardWicket = 14;
      this.setState({ cardWicket: cardWicket });
      this.handleWicket();
    }
    }},
  ],
  {cancelable: false},
);
}

  render() {
    const firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
    return (
    <Container>
    <Header style={styles.headerStyle}>
      <Left size={1}>
        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff', paddingLeft: 20, marginTop: 'auto', marginBottom: 'auto' }} />
      </Left >
      <Col size={1} style={ styles.logoStylingCol }>
      <Image
       source={require('../../assets/4dot6logo-transparent.png')}
       style={{ height: '100%', width: 'auto', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
      />
      </Col>
      <Right size={1} style={styles.colVerticleAlign}>
        </Right>
    </Header>
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Content style={{flex: 1, height: '100%'}}>

        <Col style={{height: 75, backgroundColor: '#FF69B4', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#fff',}}>
          <Row size={5}>
            <Text style={{fontSize: 40, color: '#fff'}}>HOWZAT!</Text>
          </Row>
          <Row size={2} style={{paddingBottom: 5}}>
            <Text style={{fontSize: 15, color: '#fff'}}>3rd Umpire pending...</Text>
          </Row>
          </Col>
          <Col>
          <Row>
            <Col size={1} style={{backgroundColor: 'red', color: '#fff', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff'}}>Red is out.</Text>
            </Col>
            <Col size={1} style={{backgroundColor: '#000', color: '#fff', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff'}}>Black is not-out.</Text>
            </Col>
            <Col size={1} style={{backgroundColor: '#12c2e9', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff'}}>Use Auto Not-Out.</Text>
            </Col>
          </Row >
        </Col>
        <Row style={{paddingTop: 10}}>
        <DisplayCurrentBatters fromWicket={true} />
        </Row>
          {this.goOrCardDisplay()}
    </Content>
    </LinearGradient>
    </ImageBackground>
    <Col style={styles.autoNotOutColMain}>
    <Row style={{backgroundColor: '#12c2e9', height: 75, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#fff', fontSize: 30}}>Use Auto Not Out: </Text><Icon type="MaterialCommunityIcons" name="arrow-bottom-right" style={styles.autoNotOutIcon} />
    </Row>
    <Row style={{width: '100%'}}>
      <Col >
      <Button full style={{width: '100%', height: 150}}
      onPress={() => this.handleUseNotOutTeam()}
      >
        <Col style={styles.autoNotOutCol}>

        <Row size={5} >
          <Col style={styles.autoNotOutColNum}>
            <Row size={7}>
            <Text style={styles.autoNotOutNumber}>{this.props.autoNotOut.autoNotOut}</Text>
            </Row>
            <Row size={2}>
          <Text style={styles.autoNotOutHeading}>Auto Not-Outs</Text>
          </Row >
          </Col>
          <Col style={styles.autoNotOutColIcon}>
          <Row size={7}>
             <Icon type="MaterialCommunityIcons" name="rotate-left" style={styles.autoNotOutIcon} />
             </Row>
             <Row size={2}>
           <Text style={styles.autoNotOutHeading}>Use Not-Out</Text>
           </Row>
          </Col>
        </Row>
        <Row size={2}>
          <Col style={styles.autoNotOutCol}>
            <Row>
              <Text style={styles.autoNotOutComment}>(From consecutive wins & purchases online)</Text>
            </Row>
          </Col>
        </Row>
        </Col>
      </Button>
      </Col>
    </Row>
    <Row style={{width: '100%', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
      <Button full success style={{width: '100%', backgroundColor: '#77dd77', height: 75, alignItems: 'center', justifyContent: 'center'}}
      onPress={() => this.handleBuyNotOut()}
      >
        <Text style={{color: '#fff', fontSize: 18,}}>No Auto Not-Outs? Get More Now</Text><Icon type="MaterialCommunityIcons" name="chevron-right" style={styles.autoNotOutIconBuy} />
      </Button>
    </Row>
    </Col>
    <Footer style={{ height: 50, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
    <Row>
      <Col size={3} style={{backgroundColor: '#c471ed'}}>
        <RunsTotal overPageFlag={true} />
      </Col>
      <BoardDisplayStats firstInningsRuns={firstInningsRuns} overBoardFlag={true} />
    </Row>
    </Footer >
  </Container>
  );
  }
}

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  ball: state.ball,
  players: state.players,
  teamPlayers: state.teamPlayers,
  momentum: state.momentum,
  firstInningsRuns: state.firstInningsRuns,
  autoNotOut: state.autoNotOut,
  playerStats: state.playerStats,
});

export default connect(mapStateToProps)(WicketCheck);


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
    cardDisplay: {
      flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  autoNotOutHeading: {
    fontSize: 18,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  autoNotOutNumber: {
    fontSize: 70,
    color: '#fff',
    textAlign: 'right',
    bottom: 10
  },
  autoNotOutComment: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  autoNotOutColMain: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    flex: 1,
    position: 'absolute',
    marginBottom: 85,
  },
  autoNotOutCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoNotOutIcon: {
    color: '#fff',
    fontSize: 70,
  },
  autoNotOutIconBuy: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'right'
  },
  autoNotOutColNum: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    marginTop: 5,
  },
  autoNotOutColIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', //or 'stretch'
  },
  linearGradientOpacity: {
    flex: 1,
    opacity: 0.9,
  },
});

/*
<Col style={{borderRightWidth: 1,
borderRightColor: '#fff',}}>
<Button full style={{width: '100%', height: 150, color: '#fff'}}
onPress={() => this.handleUseNotOut()}
>
<Col style={styles.autoNotOutCol}>
  <Row size={1}>
  <Text style={styles.autoNotOutHeading}>Batsman Auto Not-Outss</Text>
  </Row>
  <Row size={5}>
    <Col style={styles.autoNotOutColNum}>
      {this.getFacingBatterANO()}
    </Col>
    <Col style={styles.autoNotOutColIcon}>
       <Icon type="MaterialCommunityIcons" name="rotate-left" style={styles.autoNotOutIcon} />
    </Col>
  </Row>
  <Row size={2}>
  <Col style={styles.autoNotOutCol}>
    <Row>
      <Text style={styles.autoNotOutComment}>(From this batsman </Text>
    </Row>
    <Row>
      <Text style={styles.autoNotOutComment}> scoring 50's & 100's)</Text>
    </Row>
  </Col>
  </Row>
  </Col>
</Button>
</Col>
*/
