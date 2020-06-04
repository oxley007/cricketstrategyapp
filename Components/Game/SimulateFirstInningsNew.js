import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H2, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';

import { connect } from "react-redux";

import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';

class SimulateFirstInningsNew extends React.Component {
  constructor(props) {
    //const { currentUser } = firebase.auth()
    super(props);
    //this.ref = firebase.firestore().collection(currentUser.uid);
    //this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.state = {
        textInput: '',
    };
  }




  componentDidMount() {

    const { currentUser } = firebase.auth()

    console.log({currentUser} + ' currentUser');
    console.log(currentUser.uid + ' currentUser.uid');

    firebase.firestore().collection(currentUser.uid).add({
      gameId: 3243432,
      gameName: 'Cricket Strategy Simulator',
      displayId: '43234324324',
      gameResult: 0
    }).then(ref => {
    console.log('Added document with ID: ', currentUser.uid);
    });


  }





  render() {
    return (
    <Container>
    <Header style={styles.headerStyle}>
      <Col size={1} style={ styles.logoStylingCol }>
      <Image
       source={require('../../assets/4dot6logo-transparent.png')}
       style={{ height: '100%', width: 'auto', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
      />
      <Text>11</Text>
      </Col>
    </Header>
  </Container>
  );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(SimulateFirstInningsNew);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});
