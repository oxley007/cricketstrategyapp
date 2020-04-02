// SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import {Row,Col,Container,Content,Form, Item, Input, Label, H1, Button} from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = { email: '',
   password: '',
   uid: '',
   loading: false,
   errorMessage: null,
  }

  handleSignUp = () => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => {
          let uid = data.user.uid;
          this.setState({ uid: uid });
      console.log("User ID :- ", data.user.uid);
   })
       .then(data => {return firebase.firestore().collection(this.state.uid).doc("Hello2").set({
          gameId: 1,
          gameName: 'Game two hello1!',
          uid: this.state.uid,
          displayId: 1,
          gameResult: 3,
        })
      })
      .then(data => {return firebase.firestore().collection(this.state.uid).doc("playerStats").set({
         winningStreak: 0,
         longestStreak: 0,
         highestPlayerScore: 0,
         highestPlayerScoreId: 0,
         highestTeamScore: 0,
         gameId: 4,
         displayId: 1,
         gameResult: 3,
         autoNotOut: 0,
       })
     })
        .then(() => this.props.navigation.navigate('GameAddPlayers'))
        .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}



render() {
    return (
      <Container>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
          <Col style={{height:'100%',width:'100%',justifyContent: 'center',alignItems: 'center'}}>
            <Image
            source={require('../../assets/4dot6logo-transparent.png')}
            style={{ width: '90%', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
            />
            <H1 style={styles.whiteText}>Sign Up</H1>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
            </Text>}
            <Form>
              <Item floatingLabel style={{width:'90%'}}>
                <Label style={styles.whiteText}>Email</Label>
                <Input
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                 />
              </Item>
              <Item floatingLabel last style={{width:'90%'}}>
                <Label style={styles.whiteText}>Password</Label>
                <Input
                secureTextEntry
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                 />
              </Item>
            </Form>
            <Button rounded large warning style={styles.largeButton}
              onPress={() => this.handleSignUp()} >
                <Text style={styles.buttonTextBack}>Sign Up</Text>
            </Button>
            <Button transparent light style={styles.textButton}
              onPress={() => this.props.navigation.navigate('Login')}
              >
              <Text style={styles.whiteText}>Already have an account? Login here.</Text>
            </Button>
          </Col>
        </LinearGradient>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    color: '#fff',
    marginTop: 8
  },
  whiteText: {
    color: '#fff',
  },
  largeButton: {
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  textButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
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
})
