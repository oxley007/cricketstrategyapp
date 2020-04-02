import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Row, Col, Button, Label, H1, Footer } from 'native-base';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';

import t from 'tcomb-form-native';

import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';

import BallDiff from '../../Util/BallDiff.js';
import LinearGradient from 'react-native-linear-gradient';

const Form = t.form.Form;

const User = t.struct({
  batterOne: t.String,
  batterTwo: t.String,
  batterThree: t.String,
  batterFour: t.String,
  batterFive: t.String,
  batterSix: t.String,
  batterSeven: t.String,
  batterEight: t.String,
  batterNine: t.String,
  batterTen: t.String,
  batterEleven: t.String,
  teamName: t.String,
});


const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      display: 'none',
      color: '#ccc',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  },
  textbox: {

  // the style applied without errors
  normal: {
    borderWidth: 0,
    marginBottom: 0,
    height: 40,
    fontSize: 25,
    color: '#fff'
    },
    error: {
      borderWidth: 0,
      marginBottom: 0,
      height: 40,
      fontSize: 25,
      color: '#fff'
    }
  },
  textboxView: {
    normal: {
      borderWidth: 0,
      borderRadius: 0,
      borderBottomWidth: 1,
      marginBottom: 5,
      borderColor: '#ddd',
      height: 40,
    },
    error: {
      borderWidth: 0,
      borderRadius: 0,
      borderBottomWidth: 1,
      marginBottom: 5,
      borderColor: 'red',
      height: 40,
    }
  },
  controlLabel: {
    normal: {
      color: '#ddd'
    },
    error: {
      color: 'red'
    }
  }
}

const options = {
  fields: {
    batterOne: {
      label: '',
      placeholder: "Opening Batsman",
      stylesheet: formStyles,
    },
    batterTwo: {
      label: '',
      placeholder: "Opening Batsman",
      stylesheet: formStyles,
    },
    batterThree: {
      label: '',
      placeholder: "Number Three",
      stylesheet: formStyles,
    },
    batterFour: {
      label: '',
      placeholder: "Number Four",
      stylesheet: formStyles,
    },
    batterFive: {
      label: '',
      placeholder: "Number Five",
      stylesheet: formStyles,
    },
    batterSix: {
      label: '',
      placeholder: "Batting Allrounder",
      stylesheet: formStyles,
    },
    batterSeven: {
      label: '',
      placeholder: "Wicket Keeper",
      stylesheet: formStyles,
    },
    batterEight: {
      label: '',
      placeholder: "Bowler Allrounder",
      stylesheet: formStyles,
    },
    batterNine: {
      label: '',
      placeholder: "Fast Bowler",
      stylesheet: formStyles,
    },
    batterTen: {
      label: '',
      placeholder: "Fast Bowler",
      stylesheet: formStyles,
    },
    batterEleven: {
      label: '',
      placeholder: "Spin Bowler",
      stylesheet: formStyles,
    },
    teamName: {
      label: '',
      placeholder: "Team Name",
      stylesheet: formStyles,
    },
  },
};


class AddPlayers extends Component {
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
        errorMessage: 'dd',
    };
  }

  state = {
    batterRuns: this.props.batterRuns.batterRuns || 0,
    gameID: this.props.gameID.gameID || '0',
    teamPlayers: this.props.teamPlayers.teamPlayers || '',
  };

  handleChange = ( batterRuns, gameID, teamPlayers ) => {
    this.setState({ batterRuns });
    this.setState({ gameID });
    this.setState({ teamPlayers });
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
    this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  const scorecard = [];
  querySnapshot.forEach((doc) => {
    const { gameId, title, runs, complete } = doc.data();

    scorecard.push({
      key: doc.id,
      doc, // DocumentSnapshot
      gameId,
      title,
      runs,
      complete,
    });
  });

  this.setState({
    scorecard,
    loading: false,
 });
}

  updateTextInputBatter() {
    let batterName = this.state.textInput
    this.setState({ textInputBatter: batterName });

    this.setState({
      textInput: '',
    });
  }

handleSubmit = () => {
  const { currentUser } = this.state
  const value = this._form.getValue(); // use that ref to get the form value
  //console.log('value: ', value);
  //console.log(value.batterOne);

  if (value != undefined) {
    let playerArray = []
    //playerArray.push({[0, value.coach]}, {[1, value.batterOne]}, {[2, value.batterTwo]}, {[3, value.batterThree]}, {[4, value.batterFour]}, {[5, value.batterFive]}, {[6, value.batterSix]}, {[7, value.batterSeven]}, {[8, value.batterEight]}, {[9, value.batterNine]}, {[10, value.batterTen]}, {[11, value.batterEleven]});
    //playerArray.push({0:[0, value.coach]}, {1:[1, value.batterOne]}, {2:[2, value.batterTwo]}, {3:[3, value.batterThree]}, {4:[4, value.batterFour]}, {5:[5, value.batterFive]}, {6:[6, value.batterSix]}, {7:[7, value.batterSeven]}, {8:[8, value.batterEight]}, {9:[9, value.batterNine]}, {10:[10, value.batterTen]}, {11:[11, value.batterEleven]});
      //, [3, value.batterThree], [4, value.batterFour], [5, value.batterFive], [6, value.batterSix], [7, value.batterSeven], [8, value.batterEight], [9, value.batterNine], [10, value.batterTen], [11, value.batterEleven]);
      playerArray.push({id: 0, player: value.teamName, batterFlag: 3, scoreOne: 0, scoreTwo: 0, scoreThree: 0, outs: 3, autoNoutOut: 0}, {id: 1, player: value.batterOne, batterFlag: 0, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0}, {id: 2, player: value.batterTwo, batterFlag: 0, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0}, {id: 3, player: value.batterThree, batterFlag: 1, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0}, {id: 4, player: value.batterFour, batterFlag: 1, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0}, {id: 5, player: value.batterFive, batterFlag: 1, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0}, {id: 6, player: value.batterSix, batterFlag: 1, scoreOne: 20, scoreTwo: 20, scoreThree: 20, outs: 3, autoNoutOut: 0}, {id: 7, player: value.batterSeven, batterFlag: 1, scoreOne: 20, scoreTwo: 20, scoreThree: 20, outs: 3, autoNoutOut: 0}, {id: 8, player: value.batterEight, batterFlag: 1, scoreOne: 20, scoreTwo: 20, scoreThree: 20, outs: 3, autoNoutOut: 0}, {id: 9, player: value.batterNine, batterFlag: 1, scoreOne: 15, scoreTwo: 15, scoreThree: 15, outs: 3, autoNoutOut: 0}, {id: 10, player: value.batterTen, batterFlag: 1, scoreOne: 15, scoreTwo: 15, scoreThree: 15, outs: 3, autoNoutOut: 0}, {id: 11, player: value.batterEleven, batterFlag: 1, scoreOne: 15, scoreTwo: 15, scoreThree: 15, outs: 3, autoNoutOut: 0});
    console.log(playerArray);

    console.log(this.props.teamPlayers.teamPlayers);
    this.setState({
      teamPlayers: playerArray,
    }, function () {
      const { teamPlayers } = this.state
      this.props.dispatch(updateTeamPlayers(this.state.teamPlayers));
    })
    console.log(this.props.teamPlayers.teamPlayers);

      this.ref.doc("players").set({
          players: playerArray,
          displayId: 2,
        })
        .catch(error => this.setState({ errorMessage: error.message }))
        .then(() => this.props.navigation.navigate('GameListNew'))

    }
  }

getForm = () => {
  const { navigation } = this.props;
  const preBuildTeam = navigation.getParam('preBuildTeam', 0);
  console.log(preBuildTeam);
  if (preBuildTeam === 1) {
    const value = {
        batterOne: 'One Bat',
        batterTwo: 'Two Bat',
        batterThree: 'three Bat',
        batterFour: 'Four Bat',
        batterFive: 'Five Bat',
        batterSix: 'Six Bat',
        batterSeven: 'Seven Bat',
        batterEight: 'Eight Bat',
        batterNine: 'Nine Bat',
        batterTen: 'Ten Bat',
        batterEleven: 'Eleven Bat',
        teamName: 'All Countries: best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 2) {
    const value = {
        batterOne: 'Sachin Tendulkar',
        batterTwo: 'Sourav Ganguly',
        batterThree: 'Virat Kohli ',
        batterFour: 'Yuvraj Singh',
        batterFive: 'Suresh Raina',
        batterSix: 'MS Dhoni',
        batterSeven: 'Kapil Dev',
        batterEight: 'Zaheer Khan',
        batterNine: 'Harbhajan Singh',
        batterTen: 'Anil Kumble',
        batterEleven: 'Javagal Srinath',
        teamName: 'India: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 3) {
    const value = {
        batterOne: 'Aamir Khan',
        batterTwo: 'Priyanka Chopra',
        batterThree: 'Ajay Devgn',
        batterFour: 'Shah Rukh Khan',
        batterFive: 'Alia Bhatt',
        batterSix: 'Irrfan Khan',
        batterSeven: 'Aishwarya Rai',
        batterEight: 'Kareena Kapoor Khan',
        batterNine: 'Amitabh Bachchan',
        batterTen: 'Deepika Padukone',
        batterEleven: 'Akshay Kumar',
        teamName: 'Bollywood All-Star XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else {
  return (
    <Form
    style={formStyles.controlLabel}
     ref={c => this._form = c} // assign a ref
    type={User}
    options={options}
    />
    )
  }
}

  render() {
    const { navigation } = this.props;
    return (
      <Container>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
      <Content>
      <Col style={{height:'100%',width:'100%',justifyContent: 'center',alignItems: 'center'}}>
        <Content style={{height:'100%',width:'100%'}}>
        <Text style={styles.whiteTextHOne}>Add your team.</Text>
        <Button rounded large warning
        onPress={() => this.props.navigation.navigate('GameAddPreBuiltTeam')}
        style={styles.largeButton}>
            <Text>Select a Pre-Built Team</Text>
          </Button>
          <Text style={styles.whiteTextCenter}>Or enter your own team...</Text>
          <Text>{this.state.errorMessage}</Text>
          {this.getForm()}
        </Content>
        </Col>
        </Content>
        <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
        <Button rounded large warning
          onPress={this.handleSubmit}
          style={styles.largeButton}>
            <Text>All Done!</Text>
          </Button>
        </Footer>
        </LinearGradient>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  batterRuns: state.batterRuns,
  gameID: state.gameID,
  teamPlayers: state.teamPlayers,
});

export default connect(mapStateToProps)(AddPlayers);

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
