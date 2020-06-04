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

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 5,
                  })
                }
                style={styles.largeButton}>
                    <Text>Australia: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 6,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>Australia: Hollywood XI</Text>
                </Button>

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 7,
                  })
                }
                style={styles.largeButton}>
                    <Text>England: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 8,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>England: Hollywood XI</Text>
                </Button>

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 9,
                  })
                }
                style={styles.largeButton}>
                    <Text>South Africa: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 10,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>South Africa: Hollywood XI</Text>
                </Button>

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 11,
                  })
                }
                style={styles.largeButton}>
                    <Text>New Zealand: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 12,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>New Zealand: Hollywood XI</Text>
                </Button>

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 13,
                  })
                }
                style={styles.largeButton}>
                    <Text>Pakistan: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 14,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>Pakistan: Lollywood XI</Text>
                </Button>

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 15,
                  })
                }
                style={styles.largeButton}>
                    <Text>West Indies: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 16,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>West Indies: Musicians XI</Text>
                </Button>

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 17,
                  })
                }
                style={styles.largeButton}>
                    <Text>Sri Lanka: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 18,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>Sri Lanka: H/Bollywood/Tamil XI</Text>
                </Button>

                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 19,
                  })
                }
                style={styles.largeButton}>
                    <Text>Bangladesh: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 20,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>Bangladesh: Tollywood XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 21,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>Zimbabwe: Best Ever XI</Text>
                </Button>

                <Button rounded large warning
                  onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                    preBuildTeam : 22,
                    })
                  }
                  style={styles.largeButton}>
                      <Text>All Countries: Hollywood XI</Text>
                </Button>


                    <Button rounded large warning
                    onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                      preBuildTeam : 4,
                      })
                    }
                    style={styles.largeButton}>
                        <Text>All Countries: Moden Day Best XI</Text>
                      </Button>
                <Button rounded large warning
                onPress={() => this.props.navigation.navigate('GameAddPlayers', {
                  preBuildTeam : 1,
                  })
                }
                style={styles.largeButton}>
                    <Text>All Countries: Best of all time XI</Text>
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
