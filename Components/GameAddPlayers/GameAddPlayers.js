import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Row, Col, Button, Label, H1, Footer } from 'native-base';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList, Alert } from 'react-native';

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
        errorMessage: '',
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

    Alert.alert("Welcome!", "On the next screen you will create your own team. To maximise the fun of this game - we suggest adding players to your team who are friends, family or pets! Or, if you're in a hurry - click a 'Pre-selected' team which includes some of the greatest Cricket teams ever, and a few teams that include the greatest Actors/Actresses of all time. Crazy!" )

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
      playerArray.push({id: 0, player: value.teamName, batterFlag: 3, scoreOne: 0, scoreTwo: 0, scoreThree: 0, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 1, player: value.batterOne, batterFlag: 0, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 2, player: value.batterTwo, batterFlag: 0, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 3, player: value.batterThree, batterFlag: 1, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 4, player: value.batterFour, batterFlag: 1, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 5, player: value.batterFive, batterFlag: 1, scoreOne: 25, scoreTwo: 25, scoreThree: 25, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 6, player: value.batterSix, batterFlag: 1, scoreOne: 20, scoreTwo: 20, scoreThree: 20, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 7, player: value.batterSeven, batterFlag: 1, scoreOne: 20, scoreTwo: 20, scoreThree: 20, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 8, player: value.batterEight, batterFlag: 1, scoreOne: 20, scoreTwo: 20, scoreThree: 20, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 9, player: value.batterNine, batterFlag: 1, scoreOne: 15, scoreTwo: 15, scoreThree: 15, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 10, player: value.batterTen, batterFlag: 1, scoreOne: 15, scoreTwo: 15, scoreThree: 15, outs: 3, autoNoutOut: 0, highestScore: 0}, {id: 11, player: value.batterEleven, batterFlag: 1, scoreOne: 15, scoreTwo: 15, scoreThree: 15, outs: 3, autoNoutOut: 0, highestScore: 0});
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
        .then(() => this.props.navigation.navigate('HomeApp'))

    }
  }

getForm = () => {
  const { navigation } = this.props;
  const preBuildTeam = navigation.getParam('preBuildTeam', 0);
  console.log(preBuildTeam);
  if (preBuildTeam === 1) {
    const value = {
        batterOne: 'Jack Hobbs',
        batterTwo: 'WG Grace',
        batterThree: 'Don Bradman',
        batterFour: 'Sachin Tendulkar',
        batterFive: 'Vivian Richards',
        batterSix: 'Garry Sobers',
        batterSeven: 'Alan Knott',
        batterEight: 'Wasim Akram',
        batterNine: 'Shane Warne',
        batterTen: 'Malcolm Marshall',
        batterEleven: 'Sydney Barnes',
        teamName: 'All Countries: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 2) {
    const value = {
        batterOne: 'Sachin Tendulkar',
        batterTwo: 'Sourav Ganguly',
        batterThree: 'Virat Kohli',
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
  else if (preBuildTeam === 4) {
    const value = {
        batterOne: 'Sachin Tendulkar',
        batterTwo: 'Matthew Hayden',
        batterThree: 'Ricky Ponting',
        batterFour: 'Virat Kohli',
        batterFive: 'Jacques Kallis',
        batterSix: 'Shaun Pollock',
        batterSeven: 'Adam Gilchrist',
        batterEight: 'Wasim Akram',
        batterNine: 'Shane Warne',
        batterTen: 'Glenn McGrath',
        batterEleven: 'Muttiah Muralitharan',
        teamName: 'All Countries: Moden Day Best XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 5) {
    const value = {
        batterOne: 'Matthew Hayden',
        batterTwo: 'Justin Langer',
        batterThree: 'Donald Bradman',
        batterFour: 'Ricky Ponting',
        batterFive: 'Allan Border',
        batterSix: 'Greg Chappell',
        batterSeven: 'Adam Gilchrist',
        batterEight: 'Shane Warne',
        batterNine: 'Mitchell Johnson',
        batterTen: 'Dennis Lillee',
        batterEleven: 'Glenn McGrath',
        teamName: 'Australia: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 6) {
    const value = {
        batterOne: 'Mel Gibson',
        batterTwo: 'Hugh Jackman',
        batterThree: 'Heath Ledger',
        batterFour: 'Chris Hemsworth',
        batterFive: 'Cate Blanchett',
        batterSix: 'Rebel Wilson',
        batterSeven: 'Liam Hemsworth',
        batterEight: 'Eric Bana',
        batterNine: 'Margot Robbie',
        batterTen: 'Sam Worthington',
        batterEleven: 'Nicole Kidman',
        teamName: 'Australia: Hollywood XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 7) {
    const value = {
        batterOne: 'Graham Gooch',
        batterTwo: 'Jack Hobbs',
        batterThree: 'Len Hutton',
        batterFour: 'Michael Vaughan',
        batterFive: 'Kevin Pietersen',
        batterSix: 'Ian Botham',
        batterSeven: 'Alec Stewart',
        batterEight: 'Andrew Flintoff',
        batterNine: 'Graeme Swann',
        batterTen: 'Sydney Barnes',
        batterEleven: 'Jimmy Anderson',
        teamName: 'England: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 8) {
    const value = {
        batterOne: 'Judi Dench',
        batterTwo: 'Daniel Craig',
        batterThree: 'Martin Freeman',
        batterFour: 'Kate Winslet',
        batterFive: 'Tom Hardy',
        batterSix: 'Sacha Baron Cohen',
        batterSeven: 'keira knightley',
        batterEight: 'Sean Connery',
        batterNine: 'Anthony Hopkins',
        batterTen: 'John Cleese',
        batterEleven: 'Michael Caine',
        teamName: 'England: Hollywood XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 9) {
    const value = {
        batterOne: 'Graeme Smith',
        batterTwo: 'Graeme Pollock',
        batterThree: 'Hashim Amla',
        batterFour: 'Jacques Kallis',
        batterFive: 'AB de Villiers',
        batterSix: 'Mark Boucher',
        batterSeven: 'Shaun Pollock',
        batterEight: 'Vernon Philander',
        batterNine: 'Hugh Tayfield',
        batterTen: 'Dale Steyn',
        batterEleven: 'Allan Donald',
        teamName: 'South Africa: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 10) {
    const value = {
        batterOne: 'Trevor Noah',
        batterTwo: 'Lesley-Ann Brandt',
        batterThree: 'Arnold Vosloo',
        batterFour: 'Charlize Theron',
        batterFive: 'Sharlto Copley',
        batterSix: 'John Kani',
        batterSeven: 'Lesley-Ann Brandt',
        batterEight: 'Dean Geyer',
        batterNine: 'Sasha Pieterse',
        batterTen: 'Tammin Sursok',
        batterEleven: 'Alice Krige',
        teamName: 'South Africa: Hollywood XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 11) {
    const value = {
        batterOne: 'Brendon McCullum',
        batterTwo: 'Glenn Turner',
        batterThree: 'Kane Williamson',
        batterFour: 'Martin Crowe',
        batterFive: 'Ross Taylor',
        batterSix: 'Nathan Astle',
        batterSeven: 'Chris Cairns',
        batterEight: 'Daniel Vettori',
        batterNine: 'Richard Hadlee',
        batterTen: 'Trent Boult',
        batterEleven: 'Shane Bond',
        teamName: 'New Zealand: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 12) {
    const value = {
        batterOne: 'Jemaine Clement',
        batterTwo: 'Bret McKenzie',
        batterThree: 'Sam Neill',
        batterFour: 'Lucy Lawless',
        batterFive: 'Taika Waititi',
        batterSix: 'Cliff Curtis',
        batterSeven: 'Peter Jackson',
        batterEight: 'Temuera Morrison',
        batterNine: 'Melanie Lynskey',
        batterTen: 'Karl Urban',
        batterEleven: 'Martin Henderson',
        teamName: 'New Zealand: Hollywood XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 13) {
    const value = {
        batterOne: 'Saeed Anwar',
        batterTwo: 'Shahid Afridi',
        batterThree: 'Inzamam-ul-Haq',
        batterFour: 'Mohammad Yousuf',
        batterFive: 'Javed Miandad',
        batterSix: 'Imran Khan',
        batterSeven: 'Moin Khan',
        batterEight: 'Wasim Akram',
        batterNine: 'Saqlain Mushtaq',
        batterTen: 'Waqar Younis',
        batterEleven: 'Shoaib Akhtar',
        teamName: 'Pakistan: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 14) {
    const value = {
        batterOne: 'Fawad Khan',
        batterTwo: 'Faran Tahir',
        batterThree: 'Kumail Nanjiani',
        batterFour: 'Adnan Siddiqui',
        batterFive: 'Mahnoor Baloch',
        batterSix: 'Dilshad Vadsaria',
        batterSeven: 'Art Malik',
        batterEight: 'Alyy Khan',
        batterNine: 'Mikaal Zulfiqar',
        batterTen: 'Javed Sheikh',
        batterEleven: 'Shaan Shahid',
        teamName: 'Pakistan: Lollywood XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 15) {
    const value = {
        batterOne: 'Gordon Greenidge',
        batterTwo: 'Chris Gayle',
        batterThree: 'Viv Richards',
        batterFour: 'Brian Lara',
        batterFive: 'Clive Lloyd',
        batterSix: 'Carl Hooper',
        batterSeven: 'Jeff Dujon',
        batterEight: 'Joel Garner',
        batterNine: 'Michael Holding',
        batterTen: 'Curtly Ambrose',
        batterEleven: 'Courtney Walsh',
        teamName: 'West Indies: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 16) {
    const value = {
        batterOne: 'Nicky Minaj',
        batterTwo: 'Sean Paul',
        batterThree: 'Bob Marley',
        batterFour: 'Rihanna',
        batterFive: 'Shaggy',
        batterSix: 'Mighty Sparrow',
        batterSeven: 'Doug E. Fresh',
        batterEight: 'Damian Marley',
        batterNine: 'Ziggy Marley',
        batterTen: 'Shontelle',
        batterEleven: 'Grandmaster Flash',
        teamName: 'West Indies: Musicians XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 17) {
    const value = {
        batterOne: 'Sanath Jayasuriya',
        batterTwo: 'Tillakaratne Dilshan',
        batterThree: 'Kumar Sangakkara',
        batterFour: 'Aravinda de Silva',
        batterFive: 'Mahela Jayawardene',
        batterSix: 'Arjuna Ranatunga',
        batterSeven: 'Angelo Mathews',
        batterEight: 'Chaminda Vaas',
        batterNine: 'Ajantha Mendis',
        batterTen: 'Lasith Malinga',
        batterEleven: 'Muttiah Muralitharan',
        teamName: 'Sri Lanka: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 18) {
    const value = {
        batterOne: 'Malini Fonseka',
        batterTwo: 'Lester James Peries',
        batterThree: 'Jacqueline Fernandez',
        batterFour: 'Pooja Umashankar',
        batterFive: 'Amarasiri Kalansuriya',
        batterSix: 'Rukmani Devi',
        batterSeven: 'Albert Moses',
        batterEight: 'Sarala Kariyawasam',
        batterNine: 'Geetha Kumarasinghe',
        batterTen: 'Iranganie Serasinghe',
        batterEleven: 'V.I.S Jayapalan',
        teamName: 'Sri Lanka: H/Bollywood/Tamil XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 19) {
    const value = {
        batterOne: 'Shahriar Nafees',
        batterTwo: 'Tamim Iqbal',
        batterThree: 'Mohammed Ashraful',
        batterFour: 'Mahmudullah Riad',
        batterFive: 'Shakib Al-Hasan',
        batterSix: 'Akram Khan',
        batterSeven: 'Mushfiqur Rahim',
        batterEight: 'Mashrafe Mortaza',
        batterNine: 'Mohammed Rafique',
        batterTen: 'Abdur Razzak',
        batterEleven: 'Rubel Hossain',
        teamName: 'Bangladesh: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 20) {
    const value = {
        batterOne: 'Pawan Kalyan',
        batterTwo: 'Prabhas',
        batterThree: 'Samantha Akkineni',
        batterFour: 'Mahesh Babu',
        batterFive: 'Rakul Preet Singh',
        batterSix: 'N.T. Rama Rao Jr.',
        batterSeven: 'Ileana D Cruz',
        batterEight: 'Allu Arjun',
        batterNine: 'Ram Charan',
        batterTen: 'Rashi Khanna',
        batterEleven: 'Nani',
        teamName: 'Bangladesh: Tollywood XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 21) {
    const value = {
        batterOne: 'Grant Flower',
        batterTwo: 'Brendan Taylor',
        batterThree: 'Murray Goodwin',
        batterFour: 'David Houghton',
        batterFive: 'Andy Flower ',
        batterSix: 'Alistair Campbell',
        batterSeven: 'Tatenda Taibu',
        batterEight: 'Heath Streak',
        batterNine: 'Paul Strang',
        batterTen: 'Henry Olonga',
        batterEleven: 'Ray Price',
        teamName: 'Zimbabwe: Best Ever XI',
      };
    return (
      <Form style={formStyles.controlLabel} ref={c => this._form = c} type={User} options={options} value={value} />
    )
  }
  else if (preBuildTeam === 22) {
    const value = {
        batterOne: 'B. Pitt',
        batterTwo: 'L. DiCaprio',
        batterThree: 'R. Crowe',
        batterFour: 'A. Jolie',
        batterFive: 'D. Washington',
        batterSix: 'A. Schwarzenegger',
        batterSeven: 'T. Cruise',
        batterEight: 'C. Theron',
        batterNine: 'K. Reeves',
        batterTen: 'S. Johansson',
        batterEleven: 'N. Kidman',
        teamName: 'All Countries: Hollywood XI',
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
            <Text style={styles.teamButtonText}>Select a Pre-Built Team</Text>
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
            <Text style={styles.teamButtonText}>All Done!</Text>
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
    teamButtonText: {
      color: '#c471ed',
      textAlign: 'center',
      fontSize: 20,
    }
});
