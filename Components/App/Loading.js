// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import {Row,Col,Container,Content} from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

//import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase'

export default class Loading extends React.Component {

  componentDidMount() {
    //SplashScreen.hide()
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'GameListNew' : 'SignUp')
    })
  }


  render() {
    return (
      <Container>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
          <Content style={{ flex: 1, width: '100%', height:'100%',marginTop:'50%'}}>
            <Col size={1} style={ styles.logoStylingCol }>
              <Row size={1} style={ styles.logoStylingCol }>
                <Image
                source={require('../../assets/4dot6logo-transparent.png')}
                style={{ width: '90%', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
                />
              </Row>
              <Row style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
              </Row>
              <Row style={styles.container}>
                <Text style={styles.whiteText}>Loading...</Text>
              </Row>
            </Col>
          </Content>
      </LinearGradient>
    </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStylingCol :{
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 0,
    justifyContent: 'center'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  whiteText: {
    color: '#fff',
  }
})
