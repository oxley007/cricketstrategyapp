import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { connect } from "react-redux";

import { updateRuns } from '../../Reducers/runs';
import { updateOver } from '../../Reducers/over';
import { updateBatterRuns } from '../../Reducers/batterRuns';


class Game extends React.Component {

  state = {
    runs: this.props.batterRuns.batterRuns || 0,
  };

  handleChange = ( batterRuns ) => {
    this.setState({ batterRuns });
  };

  addRun = () => {

    ReactNativeHapticFeedback.trigger('impactLight', true);

    let totalRuns = this.props.batterRuns.batterRuns;
    console.log(totalRuns);

    totalRuns++
    console.log(totalRuns);

    this.setState({
      batterRuns: totalRuns,
    }, function () {
      console.log('Hit?');
      const { batterRuns } = this.state
      this.props.dispatch(updateBatterRuns(this.state.batterRuns));
    })

  }

  render() {
    return (
      <Grid>
          <Col style={styles.rowContainer} size={2}>
            <Button rounded large style={styles.runsButton} light onPress={this.addRun} title="add runs">
              <Text>+runs</Text>
            </Button>
          </Col>
      </Grid>
  );
  }
}

const mapStateToProps = state => ({
  batterRuns: state.batterRuns,
});

export default connect(mapStateToProps)(Game);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
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
    rowPadding :{
      paddingTop: 20,
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
    },
    runsButton: {
      width: '25%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
});
