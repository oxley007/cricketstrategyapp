import React, { Component, useRef, useState, useEffect } from 'react';

import { Header, Container, Footer, Left, Right, Text, Button, Icon, H1, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions, ImageBackground, Easing, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

import LinearGradient from 'react-native-linear-gradient';
import RequiredRunRate from './RequiredRunRate';
import {Animated} from "react-native";
import {useSpring, animated} from 'react-spring'

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameCards } from '../../Reducers/gameCards';

const arr = []
for (var i = 0; i < 500; i++) {
  arr.push(i)
}



class BoardDisplayStats extends Component {
  constructor (props) {
  super(props)
  this.animatedValueRuns = new Animated.Value(0)
  this.animation = new Animated.Value(0)
  this.opacity = new Animated.Value(1)
  this.animatedValue = []
    arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0)
    })
  this.state = {
      stop: 0,
      animatedflag: 0,
  };
  }

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    cardOne: this.props.gameCards.cardOne || 100,
    cardTwo: this.props.gameCards.cardTwo || 100,
    runs: this.props.gameCards.runs || 100,
    wicketEvent: this.props.gameCards.wicketEvent || false,
    progressStatus: 0,

  };

  handleChange = ( gameRuns, ball, gameCards ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ gameCards });
  };


componentDidUpdate () {
}


 componentDidMount () {
}

componentWillMount = () => {
     this.animatedWidth = new Animated.Value(10)
     this.animatedHeight = new Animated.Value(10)
  }
  animatedBox = () => {
    let animatedFlag = this.state.animatedFlag
    if (animatedFlag === 0) {
      animatedFlag = 1;
      this.setState({ animatedFlag: animatedFlag });
    console.log(this.animatedHeight._value);
    console.log(this.animatedHeight);
     Animated.timing(this.animatedHeight, {
        toValue: 800,
        duration: 1000,
     }).start();
   }
   else if (animatedFlag === 1) {
     animatedFlag = 2;
     this.setState({ animatedFlag: animatedFlag });
     console.log('stop animate');
     console.log(this.animatedHeight._value);

    Animated.timing(
      this.animatedHeight
   ).stop(() =>{
     console.log(this.animatedHeight._value);
   });
   }
   else {
     this.animatedHeight.setValue(10);
     animatedFlag = 0;
     this.setState({ animatedFlag: animatedFlag });
   }
  }

  animatedBoxWidth = () => {
    let animatedFlag = this.state.animatedFlag
    if (animatedFlag === 2) {
      animatedFlag = 3;
      this.setState({ animatedFlag: animatedFlag });
    console.log(this.animatedWidth._value);
    console.log(this.animatedWidth);
     Animated.timing(this.animatedWidth, {
        toValue: 800,
        duration: 1700,
     }).start();
   }
   else if (animatedFlag === 3) {
     animatedFlag = 4;
     this.setState({ animatedFlag: animatedFlag });
     console.log('stop animate');
     console.log(this.animatedWidth._value);

    Animated.timing(
      this.animatedWidth
   ).stop(() =>{
     console.log(this.animatedWidth._value);
   });
   }
   else {
     this.animatedWidth.setValue(10);
     animatedFlag = 0;
     this.setState({ animatedFlag: animatedFlag });
   }
  }

  getTarget = () => {

    if (this.props.overBoardFlag === true) {
    return (
      <Col style={styles.rowPaddingStartGame}>
        <Row size={2}>
          <Text style={styles.buttonTextBackOver}>Target:</Text>
        </Row>
        <Row size={4}>
          <Text style={styles.buttonTextOver}>{this.props.firstInningsRuns}</Text>
        </Row>
      </Col>
    )
  }
  else {
    return (
    <Col style={styles.rowPaddingStartGame}>
      <Row size={2}>
        <Text style={styles.buttonTextBack}>Target:</Text>
      </Row>
      <Row size={4}>
        <Text style={styles.buttonText}>{this.props.firstInningsRuns}</Text>
      </Row>
    </Col>
    )
    }
  }

  render() {
    return (
        <Grid>
          {this.getTarget()}
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
  gameCards: state.gameCards,
});

export default connect(mapStateToProps)(BoardDisplayStats);

/*
Native Base StyleSheet
*/
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    buttonText: {
      fontSize: PixelRatio.get() === 1 ? 28 : PixelRatio.get() === 1.5 ? 32 : PixelRatio.get() === 2 ? 36 : 40,
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
    buttonTextOver: {
      fontSize: PixelRatio.get() === 1 ? 18 : PixelRatio.get() === 1.5 ? 22 : PixelRatio.get() === 2 ? 26 : 30,
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
    buttonTextBackOver: {
      fontSize: 15,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
});
