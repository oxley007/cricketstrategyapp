import React from 'react';
import { TouchableHighlight, View, StyleSheet, ImageBackground, Grid, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Button, Footer } from 'native-base';

import { connect } from "react-redux";
import { updateGames } from '../../Reducers/games';

import LinearGradient from 'react-native-linear-gradient';

class ExplainerImageNine extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        //sessionId: 1,
        //gamesCount: 5,
        //gamesSixTen: [],
        //gamesFirstFive: [],
    };
  }

  state = {
    games: this.props.games.games || [],
  };


    render() {

      const { navigation } = this.props;
      const gameId = navigation.getParam('gameId', 0);
      const displayId = navigation.getParam('displayId', 111000);

      return (
      <Container>
        <ImageBackground source={require('../../assets/ExplainerImageNine.png')} style={styles.backgroundImageBg}>
          <Row style={{top: 0, position: 'absolute'}}>
            <Button large warning style={styles.largeButton}
            onPress={() => this.props.navigation.navigate('ExplainerImageTen', {
              gameId: gameId,
              displayId: displayId,
              }
            )} >
            <Col style={{alignItems: 'flex-start', marginTop: 40}}>
              <Row>
                <Text style={styles.buttonTextExplain}>You can also play <Text style={{backgroundColor: '#12c2e9', color: '#FFF'}}>auto-notouts</Text> to automatically be given notout.</Text>
              </Row>
              <Row>
                <Text style={styles.buttonTextExplain}>Every new player starts with 3 free auto-notouts to begin with. I suggest using the free auto-notouts when you lose an early wicket.</Text>
              </Row>
              <Row>
                <Text style={styles.buttonTextExplain}>You can also gain auto-notouts by winning consecutive games, or by purchasing online.</Text>
              </Row>
              <Row>
                <Col style={styles.buttonCenter}>
                  <Text style={styles.buttonTextBack}>Next <Icon name='ios-arrow-forward' style={styles.buttonTextBack} /></Text>
                </Col>
              </Row>
              </Col>
            </Button>
          </Row>
        </ImageBackground>
      </Container>
        );
    }

}

const mapStateToProps = state => ({
  games: state.games,
});

export default connect(mapStateToProps)(ExplainerImageNine);

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
      fontSize: 30,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '300',
    },
    buttonCenter: {
      flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
    buttonTextExplain: {
      fontSize: 15,
      color: '#333',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '300',
      justifyContent: 'flex-start',
    },
    largeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
      height: 300
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
    containerBg: {
        flex: 1,
    },
    backgroundImageBg: {
        //flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: '100%',
        height: '100%'
    },
    loginFormBg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});

/*
<View style={{width: '100%'}}>
{this.getExplainerImage()}
<Footer>
{this.getNextSlide()}
</Footer>
</View>
{this.getNextSlide()}
*/
