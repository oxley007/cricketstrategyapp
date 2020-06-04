import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button, Card, CardItem, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, ImageBackground } from 'react-native';

import { connect } from "react-redux";

import CardBoard from '../../Util/CardBoard.js';
import BallDiff from '../../Util/BallDiff.js';
import DisplayCurrentBatters from '../Board/DisplayCurrentBatters';
import RunsTotal from '../Board/RunsTotal';
import BoardDisplayTopAttack from '../Board/BoardDisplayTopAttack';
import BoardDisplayStats from '../Board/BoardDisplayStats';

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameId } from '../../Reducers/gameId';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateMomentum } from '../../Reducers/momentum';
import { updatePlayerRuns } from '../../Reducers/playerRuns';

class OverBowledBoard extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
        agressionValueOne: 0,
        agressionValueTwo: 0,
        agressionValue: 0,
    };
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    momentum: this.props.momentum.momentum || 0,
    momentumThisOver: this.props.momentum.momentumThisOver || [],
    playerRuns: this.props.playerRuns.wickets || 0,
    playerRuns: this.props.playerRuns.totalRuns || 0,
  };

  handleChange = ( gameRuns, gameID, firstInningsRuns, ball, players, momentum ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ firstInningsRuns });
    this.setState({ ball });
    this.setState({ players });
    this.setState({ momentum });
    this.setState({ playerRuns });
  };

/*
componentDidMount() {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const runRateValue = this.displayRequiredRunRate();
  const requiredRunRate = runRateValue[0];

  let momentum = this.props.momentum.momentum;
  console.log(momentum);
  const momentumThisOver = this.props.momentum.momentumThisOver;

  const momentumEndOfOver = CardBoard.getMomentumEndOfOver(requiredRunRate, gameRunEvents, momentum);
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

  this.setState({
    momentum: momentum,
    momentumPrevOver: 0,
    momentumThisOver: [],
  }, function () {
    const { momentum, momentumPrevOver, momentumThisOver } = this.state
    this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
  })
}
*/


  getDisplayRunsTotal() {

    let gameRunEvents = this.props.gameRuns.gameRunEvents;

    let sum = a => a.reduce((acc, item) => acc + item);
    //let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

    const totalRuns = this.props.playerRuns.totalRuns;
    console.log(totalRuns);

    //Get total wickets
    //let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
    //let totalWickets = getWicketCount[0];

    const totalWickets = this.props.playerRuns.wickets;
    console.log(totalWickets);

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

    const totalRuns = this.props.playerRuns.totalRuns;
    console.log(totalRuns);

    let runsRequired = this.props.firstInningsRuns.firstInningsRuns - totalRuns;
    console.log(runsRequired);

    const requiredRunRate = (runsRequired / ballsRemaining) * 6;
    console.log(requiredRunRate);

    const requiredRunRateOneDecimal = parseFloat(requiredRunRate).toFixed(1);
    return [requiredRunRateOneDecimal];

  }

  getPressureScore = () => {

    let momentum = this.props.momentum.momentum;
    console.log(momentum);

    const displayCurrentBatters = <DisplayCurrentBatters />
    const coachChat = this.getCoachChat(momentum);
    console.log(coachChat);

    return (
      <Grid>
        <Row style={{paddingTop: 5, paddingBottom: 5}}>
            {displayCurrentBatters}
        </Row>
        <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>

        <Row style={styles.rowPaddingCoachChat}>
            {coachChat}

        </Row>
        </ImageBackground>
      </Grid>
    )
}

getCoachChat = (momentum) => {
    if (momentum <= -26) {
      console.log('uncre 20');
      return (
      <Grid>
        <Row>
          <Text style={styles.textCoachChatHeading}>Coach Chat:</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>"The innings doesn't have any momemtum. You need to stop the wickets and build some momentum."</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>"Play defensive for a few overs and try not to lose any wickets."</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>"if you lose two wickets within 12 balls you lose -20 momentum."</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>"So the key from here is to build a partnership. Good luck."</Text>
        </Row>
      </Grid>
    )
    }
    else if (momentum <= -16) {
      console.log('uncre 40');
      return (
      <Grid>
        <Row>
          <Text style={styles.textCoachChatHeading}>Coach Chat:</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>You are lacking a bit of momenutm, however you can get gain some momenutm by keeping your wicket and building a partnership. </Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>If you think the runrate is under control, I'd suggest going defensive for a few overs. </Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>if you lose two wickets within 12 balls you get -20 momentum points.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>if you're not comfortable with the runrate I'd suggest keeping one batsman as defensive and the other as medium.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>make sure you have a few 'auto not-outs' avaialble! Good Luck.</Text>
        </Row>
      </Grid>
    )
    }
    else if (momentum <= -6) {
      console.log('uncre 60');
      return (
      <Grid>
        <Row>
          <Text style={styles.textCoachChatHeading}>Coach Chat:</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>Innings momentum is a little down. Easy to turn this around. </Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>A few boundaries and you'll be back in the positives.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>Just remember that if you lose 2 wickets within 12 balls you lose -20 momentum points.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>So just take it a bit easy, maybe go defensive if you are comfortable with the runrate..</Text>
        </Row>
      </Grid>
    )
    }
    else if (momentum <= 5) {
      console.log('uncre 80');
      return (
      <Grid>
        <Row>
          <Text style={styles.textCoachChatHeading}>Coach Chat:</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>The momentum is in the balance here. A few boundaries and you'll gain good momentum. However, a few wickets and you'll lose momentum completely.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>If you lose 2 wickets within 12 balls you lose -20 momentum points</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>If you are comfortable with the runrate then go with one defensive batsman and one medium or aggressive batsman</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>If your struggling with the runrate then you might need to risk going one batsam aggressive and the other medium.</Text>
        </Row>
      </Grid>
    )
    }
    else if (momentum <= 15) {
      console.log('uncre 100');
      return (
      <Grid>
        <Row>
          <Text style={styles.textCoachChatHeading}>Coach Chat:</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>Momentum is slightly on your side.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>You don't need to hit all out as you should be able to score the runs with your momentum.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>If you think you have the runrate under control I'd go with two medium batsman.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>Otherwise you might need to keep at least one batsman aggressive.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>Just remember that if you lose 2 wickets in 6 balls you will lose -10 momentum points.</Text>
        </Row>
      </Grid>
    )
    }
    else if (momentum <= 25) {
      console.log('uncre 100');
      return (
      <Grid>
        <Row>
          <Text style={styles.textCoachChatHeading}>Coach Chat:</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>You have good momentum so just keep wickets if you think you have the runrate under control.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>If you're not comfortable with the runrate then have atleast one batsman as aggressive.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>Just remember that if you lose 2 wickets in 6 balls you will lose -10 momentum points.</Text>
        </Row>
      </Grid>
    )
    }
    else if (momentum >= 26) {
      console.log('uncre 100');
      return (
      <Grid>
        <Row>
          <Text style={styles.textCoachChatHeading}>Coach Chat:</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>You have fantastic momentum! Two options avaialble: go aggressive with both batsman as a lose of a wicket wont hurt. Or if the runrate is under control then go medium or defesive so you don't lose wickets.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>1) Go aggressive with both batsman as a loss of a wicket wont hurt your momentum.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>2) If the runrate is under control then go medium or defesive so you don't lose wickets.</Text>
        </Row>
        <Row>
          <Icon type="MaterialCommunityIcons" name="checkbox-blank-circle" style={styles.textCoachChatIcon} /><Text style={styles.textCoachChat}>With this type of momentum you should be able to score runs without needing to go aggressive.</Text>
        </Row>
      </Grid>
    )
    }
  }

  getAggressionBoard = (agressionValue) => {

    console.log(this.props.players.players);
    let batters = this.props.players.players
    const facingBall = this.props.players.facingBall
    let allPlayers = [];
    console.log(batters);
    console.log(agressionValue);

    if (agressionValue === 1 || agressionValue === 2 || agressionValue === 3) {
      this.setState({ agressionValueOne: agressionValue });
      this.setState({ agressionValue: agressionValue });

      // ************ workout who's batting **************** //
      let currentBatterCount = 0;
      allPlayers = batters.map(acc => {
        console.log(acc);
        if (acc.batterFlag === 0 && currentBatterCount === 0) {
          console.log(acc.batterFlag);
          console.log('in.');
          console.log(agressionValue);
          currentBatterCount++
          console.log({player: acc.player, id: acc.id, scoreOne: acc.scoreOne, scoreTwo: acc.scoreTwo, scoreThree: acc.scoreThree, outs: acc.outs, batterFlag: acc.batterFlag, aggBoard: agressionValue, autoNotOut: acc.autoNotOut, highestScore: acc.highestScore });
          return {player: acc.player, id: acc.id, scoreOne: acc.scoreOne, scoreTwo: acc.scoreTwo, scoreThree: acc.scoreThree, outs: acc.outs, batterFlag: acc.batterFlag, aggBoard: agressionValue, autoNotOut: acc.autoNotOut, highestScore: acc.highestScore };
        }
          else {
            console.log(acc.batterFlag);
            return acc;
          }
        });
    }
    else {
      this.setState({ agressionValueTwo: agressionValue });
      this.setState({ agressionValue: agressionValue });

      // ************ workout who's batting **************** //
      let currentBatterCount = 0;
      allPlayers = batters.map(acc => {
        console.log(acc);
        if (acc.batterFlag === 0 && currentBatterCount === 0) {
          console.log(acc.batterFlag);
          currentBatterCount++

          return acc;
        }
        else if (acc.batterFlag === 0 && currentBatterCount === 1) {
          currentBatterCount++
          return {player: acc.player, id: acc.id, scoreOne: acc.scoreOne, scoreTwo: acc.scoreTwo, scoreThree: acc.scoreThree, outs: acc.outs, batterFlag: acc.batterFlag, aggBoard: agressionValue, autoNotOut: acc.autoNotOut, highestScore: acc.highestScore };
        }
          else {
            console.log(acc.batterFlag);
            return acc;
          }
        });
    }

  console.log(allPlayers);


  this.setState({
    players: allPlayers,
    facingBall: facingBall,
  }, function () {
    const { players, facingBall } = this.state
    this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
  })


  }

  getScoreBoard = () => {

    const players = this.props.players.players;
    const agressionValue = this.state.agressionValue;

    //let playerOneName = '';
    //let playerTwoName = '';
    //let playerOneAgg = 0;
    //let playerTwoAgg = 0;
    let facingBall;
    let flag = 0;
    players.map(player => {
      if (player.batterFlag === 0 && agressionValue <= 3) {
        facingBall = 1;
        flag++
      }
      else if (player.batterFlag === 0 && (agressionValue >= 3 && agressionValue <= 6)) {
        facingBall = 2;
      }
      else {
        //nothing.
      }

    });

    console.log(facingBall + ' facingBall');

    return (
      <BoardDisplayTopAttack aggBoardValue={this.state.agressionValue} overPageFlag={true} overPageFacingBall={facingBall} />
    )

  }

  getAggressionOne = () => {

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

    console.log(playerOneAgg);

    if (playerOneAgg === 0) {
    return (
      <Grid style={{paddingTop: 10}}>
      <Col size={3}>
        <Text style={styles.whiteText}>{playerOneName}</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full danger
        onPress={() => this.getAggressionBoard(1)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full warning
        onPress={() => this.getAggressionBoard(2)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button full success
        onPress={() => this.getAggressionBoard(3)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
  )
}
else if (playerOneAgg === 1) {
  return (
    <Grid style={{paddingTop: 10}}>
    <Col size={3}>
      <Text style={styles.whiteText}>{playerOneName}</Text>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button full danger
      onPress={() => this.getAggressionBoard(1)} >
        <Text style={styles.whiteText}>Aggressive</Text>
      </Button>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full warning
      onPress={() => this.getAggressionBoard(2)} >
        <Text style={styles.whiteText}>Medium</Text>
      </Button>
    </Col>
    <Col size={2}>
      <Button bordered full success
      onPress={() => this.getAggressionBoard(3)} >
        <Text style={styles.whiteText}>Defensive</Text>
      </Button>
    </Col>
  </Grid>
)
}
else if (playerOneAgg === 2) {
  return (
    <Grid style={{paddingTop: 10}}>
    <Col size={3}>
      <Text style={styles.whiteText}>{playerOneName}</Text>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full danger
      onPress={() => this.getAggressionBoard(1)} >
        <Text style={styles.whiteText}>Aggressive</Text>
      </Button>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button  full warning
      onPress={() => this.getAggressionBoard(2)} >
        <Text style={styles.whiteText}>Medium</Text>
      </Button>
    </Col>
    <Col size={2}>
      <Button bordered full success
      onPress={() => this.getAggressionBoard(3)} >
        <Text style={styles.whiteText}>Defensive</Text>
      </Button>
    </Col>
  </Grid>
)
}
else {
  return (
    <Grid style={{paddingTop: 10}}>
    <Col size={3}>
      <Text style={styles.whiteText}>{playerOneName}</Text>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full danger
      onPress={() => this.getAggressionBoard(1)} >
        <Text style={styles.whiteText}>Aggressive</Text>
      </Button>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full warning
      onPress={() => this.getAggressionBoard(2)} >
        <Text style={styles.whiteText}>Medium</Text>
      </Button>
    </Col>
    <Col size={2}>
      <Button full success
      onPress={() => this.getAggressionBoard(3)} >
        <Text style={styles.whiteText}>Defensive</Text>
      </Button>
    </Col>
  </Grid>
)
}
}

getAggressionTwo = () => {

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

  console.log(playerTwoAgg);

  if (playerTwoAgg === 0) {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>{playerTwoName}</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  else if (playerTwoAgg === 4) {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>{playerTwoName}</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button bordered full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  else if (playerTwoAgg === 5) {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>{playerTwoName}</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button  full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button bordered full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  else {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>{playerTwoName}</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button  full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  }

  getMomentumDusplay = () => {

    const fromWicket = this.props.fromWicket;
    const momentum = this.props.momentum.momentum;
    const momentumThisOver = this.props.momentum.momentumThisOver;

    if (fromWicket === true) {
      return (
      <Grid >
        <Row size={1}>
          <Text style={styles.buttonTextBack}>Momentum total:</Text>
        </Row>
        <Row size={4}>
          <Text style={styles.buttonText}>{momentum}</Text>
        </Row>
      </Grid>
    )
    }
    else {

      let momentumThisOverDisplay = momentumThisOver.map((data, index) => {
          if (data === 2) {
              return (
                  <Row>
                    <Text style={styles.positivePoints}>+{data} boundry</Text>
                  </Row>
            )
            }
            else if (data === 5 && this.props.momentumEndOfOverRRR === true) {
              return (
                  <Row>
                    <Text style={styles.positivePoints}>+{data} Required Runrate achieved</Text>
                  </Row>
            )
            }
            else if (data === 5 && this.props.momentumEndOfOverRRR === false) {
              return (
                  <Row>
                    <Text style={styles.negativePoints}>-{data} Required Runrate missed</Text>
                  </Row>
            )
            }
            else if (data === 6) {
              return (
                  <Row>
                    <Text style={styles.negativePoints}>-{data} Wicket</Text>
                  </Row>
            )
            }
            else if (data === 10) {
              return (
                  <Row>
                    <Text style={styles.negativePoints}>-{data} more than one Wicket in last 6 balls</Text>
                  </Row>
            )
          }
          })

          momentumTotalDisplay = (
            <Grid >
              <Row size={1}>
                <Text style={styles.buttonTextBack}>Momentum total:</Text>
              </Row>
              <Row size={4}>
                <Text style={styles.buttonText}>{momentum}</Text>
              </Row>
            </Grid>
          )

          return (
            <Grid>
              <Col style={styles.rowPaddingStartGame}>{momentumTotalDisplay}</Col>
              <Col style={styles.rowPaddingStartGame}>
              <Row>
                <Text style={{color: '#fff', fontSize: 10, paddingBottom: 4}}>Completed over momentum:</Text>
              </Row>{momentumThisOverDisplay}</Col>
            </Grid>

          )
        }

  }


  render() {
    return (
      <Grid>
        <Row>
          {this.getPressureScore()}
        </Row>
        <Row>
            {this.getMomentumDusplay()}
        </Row>
        <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
          <Col style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 30}}>
          <Row>
            {this.getAggressionOne()}
          </Row>
          <Row>
            {this.getAggressionTwo()}
          </Row>
          <Row>
            {this.getScoreBoard()}
          </Row>
          </Col>
        </LinearGradient>
        </ImageBackground>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  gameID: state.gameID,
  firstInningsRuns: state.firstInningsRuns,
  ball: state.ball,
  players: state.players,
  momentum: state.momentum,
  playerRuns: state.playerRuns,
});

export default connect(mapStateToProps)(OverBowledBoard);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    linearGradientOpacity: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
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
      borderBottomWidth: 1,
      width: '100%',
      paddingBottom: 5,
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
    textCoachChat: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '200',
      paddingBottom: 5,
    },
    textCoachChatHeading: {
      fontSize: 20,
      color: '#fff',
      fontWeight: '200',
    },
    textCoachChatIcon: {
      fontSize: 10,
      color: '#fff',
      paddingRight: 10,
      paddingTop: 5,
    },
    rowPadding: {
      paddingTop: 15,
      paddingBottom: 15
    },
    rowPaddingCChatTitle: {
      paddingTop: 5,
      paddingBottom: 5
    },
    rowPaddingChat: {
      paddingBottom: 5,
    },
    rowPaddingPressure: {
      paddingBottom: 15,
      justifyContent: 'center',
    },
    rowPaddingPressureText: {
      color: '#fff',
      fontSize: 20,
    },
    rowPaddingPressureTextPercentage: {
      color: '#ddd',
      fontSize: 15,
      //alignSelf: 'flex-end',
    },
    chatText: {
      color: '#fff',
      fontStyle: 'italic',
    },
    whiteText: {
      color: '#fff',
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
    ThresholdStyle: {
      fontSize: 40,
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#fff',
      borderBottomColor: '#fff', backgroundColor: 'rgba(204, 204, 204, 0.4)'
    },
    aggressiveButton: {
      paddingRight: 5,
      paddingBottom: 5,
    },
    buttonText: {
      fontSize: 46,
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
      fontSize: 20,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
    rowPaddingStartGame :{
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      textAlign: 'center',
      backgroundColor: '#12c2e9'
    },
    rowPaddingCoachChat: {
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      textAlign: 'center',
      backgroundColor: '#c471ed',
      opacity: 0.9,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    positivePoints: {
      color: '#7CFC00',
    },
    negativePoints: {
      color: '#FF69B4',
    }
});
