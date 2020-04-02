import React from 'react';
import firebase from 'react-native-firebase';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import Todo from '../Todo/Todo';

class Todos extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.state = {
        textInput: '',
        loading: true,
        todos: [],
    };
  }

  componentDidMount() {
    //SplashScreen.hide()
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
    this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  const todos = [];
  querySnapshot.forEach((doc) => {
    const { title, complete } = doc.data();

    todos.push({
      key: doc.id,
      doc, // DocumentSnapshot
      title,
      complete,
    });
  });

  this.setState({
    todos,
    loading: false,
 });
}

  updateTextInput(value) {
      this.setState({ textInput: value });
  }

  addTodo() {
  this.ref.add({
    title: this.state.textInput,
    complete: false,
  });

  this.setState({
    textInput: '',
  });
}


  toDos = () => {
    return (
      <Col>
      <Row>
      <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <Todo {...item} />}
        />
      </Row>
        <Row>
      <ScrollView>
        <Text>List of TODOs</Text>
      </ScrollView>
      </Row>
      <Row>
      <TextInput
      placeholder={'Add TODO'}
    value={this.state.textInput}
    onChangeText={(text) => this.updateTextInput(text)}
      />
      </Row>
      <Row>
      <Button rounded large warning
    disabled={!this.state.textInput.length}
    onPress={() => this.addTodo()}
      style={styles.largeButton}>
          <Text>Add To do</Text>
        </Button>
      </Row>
    </Col>
    )

  }

  static navigationOptions = {
    drawerIcon : ({tintColor}) => (
      <Icon name="sync" style={{fontSize: 24, color: tintColor}} />
    )
  }

  render() {
    if (this.state.loading) {
    return null; // or render a loading icon
  }

    return (
    <Container>
    <Header style={styles.headerStyle}>
      <Left size={1}>
        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff', paddingLeft: 20, marginTop: 'auto', marginBottom: 'auto' }} />
      </Left>
      <Col size={1} style={ styles.logoStylingCol }>
      <Image
       source={require('../../assets/4dot6logo-transparent.png')}
       style={{ height: '100%', width: 'auto', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
      />
      </Col>
      <Right size={1} style={styles.colVerticleAlign}>
        </Right>
    </Header>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
    <Content style={{ flex: 1, width: '100%'}}>
      <Grid>
          {this.toDos()}
      </Grid>
    </Content>
    <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
    <Button rounded large warning style={styles.largeButton}
        onPress={() => this.props.navigation.navigate('Home')} >
        <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Back to run counter</Text>
      </Button>
      <H1 style={{color:'#fff'}}>
      </H1>
    </Footer>
    </LinearGradient>
  </Container>
  );
  }
}

export default Todos;

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
    }
});
