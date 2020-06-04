import React from 'react';
import { TouchableHighlight, View, StyleSheet, ImageBackground, Grid, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2, Button, Footer } from 'native-base';

import { connect } from "react-redux";
import { updateGames } from '../../Reducers/games';

import LinearGradient from 'react-native-linear-gradient';

class ExplainerImageTen extends React.PureComponent {
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
        <ImageBackground source={require('../../assets/ExplainerImageTen.png')} style={styles.backgroundImageBg}>
          <Row style={{top: 0, position: 'absolute'}}>
            <Button large warning style={styles.largeButton}
            onPress={() => this.props.navigation.navigate('ExplainerImageEleven', {
              gameId: gameId,
              displayId: displayId,
              }
            )} >
            <Col style={{alignItems: 'flex-start', marginTop: 40}}>
              <Row>
                <Text style={styles.buttonTextExplain}>To play a ball - click <Text style={{backgroundColor: '#7CFC00', color: '#000'}}>'Play!'</Text> followed by the two cards that display.</Text>
              </Row>
              <Row>
                <Text style={styles.buttonTextExplain}>The two cards shuffle quiclky. So again, you'll need good timing to land on the cards that give you 4's & 6's!</Text>
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

export default connect(mapStateToProps)(ExplainerImageTen);

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
