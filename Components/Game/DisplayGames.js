import React from 'react';
import { TouchableHighlight, View, StyleSheet, ImageBackground, Grid } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Button } from 'native-base';

import { connect } from "react-redux";
import { updateGames } from '../../Reducers/games';

import LinearGradient from 'react-native-linear-gradient';

class DisplayGames extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        sessionId: 1,
        gamesCount: 5,
        //gamesSixTen: [],
        gamesFirstFive: [],
    };
  }

  state = {
    games: this.props.games.games || [],
  };

  handleChange = ( games ) => {
    this.setState({ games });
  };
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    /*
    componentDidMount() {
      //console.log(nextProps);
      //console.log(nextProps.games.games);
      //console.log(this.props.games.games);
      console.log('GamesList di Mount.');

      this.props.navigation.addListener('didFocus', payload => {
        console.log('GameList Listener.');
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
    */

    getMoreGames = () => {
      console.log('getMoreGames press');
      const games = this.props.games.games;
      console.log(games);


      const gamesLength = games.length;
      console.log(gamesLength);

      let gamesCount = this.state.gamesCount;

      const gamesCountPlusFive = gamesCount + 5;

      this.setState({
      gamesCount: gamesCountPlusFive,
      });

      if (gamesLength >= gamesCountPlusFive) {

      const gamesFirstFive = games.slice(0, gamesCountPlusFive);

      this.setState({
      gamesFirstFive: gamesFirstFive,
      });

      //const gamesSixTen = this.state.gamesSixTen;

      console.log(gamesFirstFive);

      const gamesOutput2 = this.getImageBackgroundList();



      return gamesOutput2;
      }

    }

    getImageBackground = () => {

      const gamesOutput = this.getImageBackgroundList();

      return gamesOutput;

    }

    getImageBackgroundList = () => {

      let games = this.state.gamesFirstFive;

      if (games === undefined || games.length == 0) {
        games = this.props.games.games;
         games = games.slice(0, 5);
      }

      console.log(games + ' games!');

      const gamesOutput = games.map((item, key) => {
      console.log(item.displayId + ' displayID22');
      console.log(item.topScorePlayer + ' what about top player?');
      let displayId = item.displayId;
      let lastNumberGet = displayId.toString().split('').pop();
      console.log(lastNumberGet);
      let lastNumber = Number(lastNumberGet);
      console.log(lastNumber);

        //return <ImageBackground source={require('../../assets/4dot6-cricekt-sim-bg-image-web.png')} style={styles.backgroundImage}>


      if (lastNumber === 0 || lastNumber === 3 || lastNumber === 6 || lastNumber === 9) {
        console.log('hit 0 3 6 9 ' + lastNumber);
        return (<ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
          {this.getDisplay(item)}
        </ImageBackground>)
      }
      else if (lastNumber === 1 || lastNumber === 4 || lastNumber === 7) {
        console.log('hit 1 4 7 ' + lastNumber);
        return (<ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-web.png`)} style={styles.backgroundImage}>
          {this.getDisplay(item)}
        </ImageBackground>)
      }
      else {
        console.log('hit else ' + lastNumber);
        return (<ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-3.png`)} style={styles.backgroundImage}>
          {this.getDisplay(item)}
        </ImageBackground>)
      }
    })

    return gamesOutput;

    }

    getIconDisplay = (item) => {
      if (item.gameResult === 2) {
    return (<Icon name="ios-checkmark-circle-outline" style={{fontSize: 30, color: '#BDECB6', fontWeight: 600}} />)
    }
    else if (item.gameResult === 1) {
      return (<Icon name="ios-close-circle-outline" style={{fontSize: 30, color: '#000', fontWeight: 900}} />)
    }
    else {
      // no icon
    }
    }

    winningStreakDisplay = (winningStreak) => {

      if (winningStreak === 5) {
        return (
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>you've won {winningStreak} in a row: </Text>
            </Col>
            <Col size={1}>
              <Row>
              <Text style={styles.whiteText}>+2</Text>
              </Row>
              <Row>
              <Text style={styles.whiteText}>Auto Not-Outs</Text>
              </Row>
            </Col>
          </Row>
        )
      }
      else if (winningStreak === 10) {
        return (
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>you've won {winningStreak} in a row: </Text>
            </Col>
            <Col size={1}>
              <Row>
              <Text style={styles.whiteText}>+4</Text>
              </Row>
              <Row>
              <Text style={styles.whiteText}>Auto Not-Outs</Text>
              </Row>
            </Col>
          </Row>
        )
      }
      else if (winningStreak === 20) {
        return (
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>you've won {winningStreak} in a row: </Text>
            </Col>
            <Col size={1}>
              <Row>
              <Text style={styles.whiteText}>+8</Text>
              </Row>
              <Row>
              <Text style={styles.whiteText}>Auto Not-Outs</Text>
              </Row>
            </Col>
          </Row>
        )
      }
      else if (winningStreak === 50) {
        return (
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>you've won {winningStreak} in a row: </Text>
            </Col>
            <Col size={1}>
              <Row>
              <Text style={styles.whiteText}>+20</Text>
              </Row>
              <Row>
              <Text style={styles.whiteText}>Auto Not-Outs</Text>
              </Row>
            </Col>
          </Row>
        )
      }
      else if (winningStreak === 100) {
        return (
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>you've won {winningStreak} in a row: </Text>
            </Col>
            <Col size={1}>
              <Row>
              <Text style={styles.whiteText}>+45</Text>
              </Row>
              <Row>
              <Text style={styles.whiteText}>Auto Not-Outs</Text>
              </Row>
            </Col>
          </Row>
        )
      }
      else if (winningStreak === 200) {
        return (
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>you've won {winningStreak} in a row: </Text>
            </Col>
            <Col size={1}>
              <Row>
              <Text style={styles.whiteText}>+100</Text>
              </Row>
              <Row>
              <Text style={styles.whiteText}>Auto Not-Outs</Text>
              </Row>
            </Col>
          </Row>
        )
      }
      else if (winningStreak === 500) {
        return (
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>you've won {winningStreak} in a row: </Text>
            </Col>
            <Col size={1}>
              <Row>
              <Text style={styles.whiteText}>+300</Text>
              </Row>
              <Row>
              <Text style={styles.whiteText}>Auto Not-Outs</Text>
              </Row>
            </Col>
          </Row>
        )
      }
      else {
        // nohting.
      }
    }


    getDisplay = (item) => {

      console.log(item.gameResult);
      console.log(item.firstInningsRuns);
      console.log(item.totalRuns);
      console.log(item.totalWickets);
      console.log(item.topScore);
      console.log(item.topScorePlayer);
      console.log(item.gameId);
      console.log(item.winningStreak);



      if (item.gameResult === 0) {
        return (
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
          <TouchableHighlight>
          <ListItem style={{ flex: 1, height: 240, flexDirection: 'row', alignItems: 'center' }}>
          <Col>
            <Row style={styles.rowCenter}>
              <H2 style={{color: '#fff'}}>Game #{item.displayId}&nbsp;</H2>
              {this.getIconDisplay(item)}
            </Row>
            <Row style={styles.rowCenterLarge}>
              <Button rounded large warning style={styles.largeButton}
              onPress={() => this.props.navigation.navigate('Game', {
                gameId: item.gameId,
                displayId: item.displayId,
                }
              )} >
                <Text style={styles.buttonTextBack}>Continue Game <Icon name='ios-arrow-forward' style={styles.buttonTextBack} /></Text>
              </Button>
            </Row>
            <View style={styles.horizontalRule} />
            <Row style={{marginTop: 0, height: 20}}>
              <Col >
                  <Text style={styles.whiteText}>Target: {item.firstInningsRuns}</Text>
              </Col>
              <Col>
                  <Text style={styles.whiteText}>Total: {item.totalRuns}/{item.totalWickets}</Text>
              </Col>
            </Row>
            <View style={styles.horizontalRule} />
              </Col>
            </ListItem>
          </TouchableHighlight>
          </LinearGradient>
        )
      }
      else {
      return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
      <TouchableHighlight>
      <ListItem style={{ flex: 1, height: 240, flexDirection: 'row', alignItems: 'center' }}>
      <Col>
        <Row style={styles.rowCenter}>
          <H2 style={{color: '#fff'}}>Game #{item.displayId}&nbsp;</H2>
          {this.getIconDisplay(item)}
        </Row>
        <View style={styles.horizontalRule} />
        <Row style={{marginTop: 0, height: 20}}>
          <Col >
              <Text style={styles.whiteText}>Target: {item.firstInningsRuns}</Text>
          </Col>
          <Col>
              <Text style={styles.whiteText}>Total: {item.totalRuns}/{item.totalWickets}</Text>
          </Col>
        </Row>
        <View style={styles.horizontalRule} />
          <Row style={styles.rowCenter}>
              <H3 style={styles.whiteText}>Top Scores:</H3>
          </Row>
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>{item.topScorePlayer}</Text>
            </Col>
            <Col size={1}>
              <Text style={styles.whiteText}>{item.topScore} ({item.topScoreBalls})</Text>
            </Col>
          </Row>
          <Row>
            <Col size={2}>
              <Text style={styles.whiteText}>{item.topSecondScorePlayer}</Text>
            </Col>
            <Col size={1}>
              <Text style={styles.whiteText}>{item.topSecondScore} ({item.topSecondBalls})</Text>
            </Col>
          </Row>
            {this.winningStreakDisplay(item.winningStreak)}
          </Col>
        </ListItem>
      </TouchableHighlight>
      </LinearGradient>
    )
    }
  }


/*
  render() {
    console.log(this.props.displayId + ' displayID22');
    console.log(this.props.topScorePlayer + ' what about top player?');
      return (
        <View>
        {this.getDisplayTest()}
        </View>
      );
  }
  */


    render() {
      //console.log(this.props.displayId + ' displayID22');
      //console.log(this.props.topScorePlayer + ' what about top player?');
        return (
          <View style={{width: '100%'}}>
          {this.getImageBackground()}
          <Button large style={styles.largeButtonLoad}
          onPress={() => this.getMoreGames()}>
            <Text style={styles.buttonTextBackLoad}>Load More Games... </Text>
          </Button>
          </View>
        );
    }

}

const mapStateToProps = state => ({
  games: state.games,
});

export default connect(mapStateToProps)(DisplayGames);

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    loginForm: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    whiteText: {
      color: '#fff',
    },
    rowCenter: {
      marginRight: 'auto',
      marginLeft: 'auto',
      height: 30,
    },
    rowCenterLarge: {
      marginRight: 'auto',
      marginLeft: 'auto',
      height: 60,
    },
    rowLeft: {
      height: 30,
      textAlign: 'left',
      alignItems: 'flex-start',
    },
    linearGradient: {
      opacity: 0.9
    },
    horizontalRule: {
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
      width: '75%',
      marginTop: 15,
      marginBottom: 15,
      marginRight: 'auto',
      marginLeft: 'auto',
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
    largeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
    buttonTextBackLoad: {
      fontSize: 30,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    largeButtonLoad: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
});
