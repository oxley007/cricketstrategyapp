import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Row, Col, Button, Label, H1 } from 'native-base';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';

import t from 'tcomb-form-native';

import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';

import CardBoard from '../../Util/CardBoard.js';
import BallDiff from '../../Util/BallDiff.js';
import LinearGradient from 'react-native-linear-gradient';


class GameAddPreBuiltTeam extends Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
        docID: '',
    };
  }

  render() {
    return (
      <Container>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
      <Col style={{height:'100%',width:'100%',justifyContent: 'center',alignItems: 'center'}}>
        <Content style={{height:'100%',width:'100%'}}>
        <Text style={styles.whiteTextHOne}>Pre-Built Team.</Text>
        <Text style={styles.whiteTextCenter}>Select on of our pre built teams. You'll likley find some suprises in the 'All Stars' teams!</Text>
          <Button rounded large warning
          onPress={() => this.props.navigation.navigate('GameAddPlayers', {
            preBuildTeam : 1,
            })
          }
          style={styles.largeButton}>
              <Text>All Countries: best Ever XI</Text>
            </Button>
            <Button rounded large warning
            onPress={() => this.props.navigation.navigate('GameAddPlayers', {
              preBuildTeam : 2,
              })
            }
            style={styles.largeButton}>
                <Text>India: Best Ever XI</Text>
              </Button>
              <Button rounded large warning
              onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                preBuildTeam : 3,
                })
              }
              style={styles.largeButton}>
                  <Text>Bollywood All-Star XI</Text>
                </Button>
        </Content>
        </Col>
        </LinearGradient>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  batterRuns: state.batterRuns,
  gameID: state.gameID,
});

export default connect(mapStateToProps)(GameAddPreBuiltTeam);

const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 10,
    backgroundColor: '#ffffff',
  },
    largeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
      marginTop: 20,
      marginBottom: 20,
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      //borderRadius: 5
    },
    whiteTextHOne: {
      color: '#fff',
      fontSize: 40,
      marginTop: 50,
      textAlign: 'center',
    },
    whiteTextCenter: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 25,
      marginBottom: 10,
    },
});
