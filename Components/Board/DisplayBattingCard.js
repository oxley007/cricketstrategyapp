import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";

import LinearGradient from 'react-native-linear-gradient';

import DisplayCurrentBattersRuns from './DisplayCurrentBattersRuns';

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';

class DisplayBattingCard extends Component {

    getCurrentBatters = () => {

      if (this.props.id > 0) {
        return (

<Col>
          <Row size={2}>

            <Col size={1}>
                <Text style={styles.text}>{this.props.id}</Text>
            </Col>
            <Col size={6}>
                <Text style={styles.text}>{this.props.player}</Text>
            </Col>
            <Col size={4}>
                <DisplayCurrentBattersRuns batterId={this.props.id} />
            </Col>




          </Row>
                      <View style={styles.horizontalRule} />
          </Col>



        );
      }
      else {
        //dont show.
      }
    }

  render() {
    console.log('Hit batting card??');
    return (
      <View>
        {this.getCurrentBatters()}
      </View>
    )
  }
}

export default DisplayBattingCard;

/*
Native Base StyleSheet
*/
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  horizontalRule: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 2.5,
  marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
