import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    PixelRatio,
    Image,
    ImageBackground,
} from "react-native";
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,Button,Footer} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

//Redux imports
import { connect } from "react-redux";
import { toggle } from '../../Reducers/toggle';


class IapTrue extends Component {

  state = {
    toggle: this.props.toggle.togglePremium || true,
  };


  handleChange = ( toggle ) => {
    this.setState({ toggle });
  };

    render() {
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
          <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>

            <Content>
            <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>

                <Col size={1} style={styles.rowPaddingCoachChat}>
                    <Row style={styles.textHeaderBorder}>
                    <Text style={styles.textHeader}>Upgrade purchased</Text>
                    </Row>
                    <Row>
                      <Text style={styles.textDesc}>You hve succefully purchased [product.title]. You have now gained and massive advantage to chase down large scores - go break some records!</Text>
                  </Row>
                  <Row>
                    <Text style={styles.textDesc}>4dot6 thanks you for purchse.</Text>
                </Row>
                </Col>
                </LinearGradient>
                </ImageBackground>
                </Content>
                </LinearGradient>
                </ImageBackground>
                <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
                <Button large warning style={styles.lightGreenButton100}
                   // onPress={(): void => this.requestPurchase(product.productId)}
                   onPress={() => this.props.navigation.navigate('WicketCheck')}>
                   <Icon type="AntDesign" name="back" style={styles.autoNotOutIcon} /><Text style={styles.lightGreenButtonText}>Back to game</Text>
                 </Button>
                </Footer>

              </Container>
        );
    }
}

const mapStateToProps = state => ({
  toggle: state.toggle,
});

export default connect(mapStateToProps)(IapTrue);

// Custom Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    textHeader: {
      color: '#fff',
      fontWeight: '400',
      fontSize: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#fff',
    },
    textHeaderBorder: {
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
    },
    textDesc: {
      color: '#fff',
      fontWeight: '200',
      fontSize: 16,
      paddingBottom: 20,
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
    },
    largeButtonGreen: {
      width: '100%',
      backgroundColor: '#28a745',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    buttonText: {
      fontSize: 40,
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
    buttonTextBackWhite: {
      fontSize: 20,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    rowPadding :{
      paddingTop: 20,
    },
    btn: {
    height: 50,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#00c40f',
    borderRadius: 0,
    borderWidth: 0,
  },
  txt: {
    fontSize: 12,
    color: 'white',
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
  headerStyle: {
    height: PixelRatio.get() === 1 ? 45 : PixelRatio.get() === 1.5 ? 50 : PixelRatio.get() === 2 ? 75 : PixelRatio.get() === 3.5 ? 60 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 60 : 75,
    backgroundColor: '#12c2e9',
  },
  linearGradientOpacity: {
    flex: 1,
    opacity: 0.9,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', //or 'stretch'
  },
  rowPaddingCoachChat: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    textAlign: 'center',
    backgroundColor: '#c471ed',
    opacity: 0.9,
  },
  lightGreenButton: {
    width: '100%',
    backgroundColor: '#77dd77',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightGreenButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  lightGreenButton100: {
    width: '100%',
    backgroundColor: '#77dd77',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
