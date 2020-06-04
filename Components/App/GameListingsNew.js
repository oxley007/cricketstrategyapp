import React from 'react';

import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList, ActivityIndicator } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button,FooterTab} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import DisplayGames from '../Game/DisplayGames';
import Game from '../Game/Game';
import GameListWinningStreak from './GameListWinningStreak';
import GameListLongestStreak from './GameListLongestStreak';

class GameListingsNew extends React.Component {
  constructor(props) {
    super(props);
    //const { currentUser } = firebase.auth()
    //this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    //this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        loading: true,
        gamesDb: [],
        gamesLength: 0,
    };
  }


games = () => {

  const { navigation } = this.props;
  const gamesParam = navigation.getParam('games', []);

  console.log('redux games hit games listings!');
  const games = gamesParam.sort((a, b) => {
        if (a.displayId < b.displayId) return -1;
        if (a.displayId > b.displayId) return 1;
        return 0;
      }).reverse();


      return (
        <Col >
        <Row>
          <DisplayGames navigation={this.props.navigation} games={games} />
        </Row >
      </Col>
      )
    //}

}


  render() {
    console.log('is game listing getting hit?');

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
      </Col >
      <Right size={1} style={styles.colVerticleAlign}>
        </Right >
    </Header>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
    <Content style={{ flex: 1, width: '100%'}}>
      <Grid>
          {this.games()}
      </Grid>
    </Content>
    <Footer style={{ height: 120, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
      <FooterTab>
        <Button
          vertical
          light
          style={{height: '100%'}}
          onPress={() => this.goToStats()}>
          <Icon name="ios-stats" type="Ionicons" />
          <Text>Game</Text>
          <Text>Stats</Text>
        </Button >
        <Button vertical
        style={styles.largeButtonStartGame}>
             <GameListWinningStreak />
        </Button>
        <Button vertical
        style={{height: '100%'}}>
             <GameListLongestStreak />
        </Button>
      </FooterTab>
    </Footer >
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
  toggle: state.toggle,
  widecount: state.widecount,
});

export default GameListingsNew;

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
