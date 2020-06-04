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
import firebase from 'react-native-firebase';

//Redux imports
import { connect } from "react-redux";
import { toggle } from '../../Reducers/toggle';

import { updateAutoNotOut } from '../../Reducers/autoNotOut';
import { updatePlayerStats } from '../../Reducers/playerStats';

import Loader from '../Loader/Loader';

//In-app Purchase import
//import * as RNIap from 'react-native-iap';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

/*
const itemSkus = Platform.select({
  ios: [
    'AUTONOTOUT01', // from APp Store Connect > Cricket Over and Ball Counter > Features > In-App Purchases > Product ID
  ],
  android: [
    'android.test.purchased', // test purchse from https://developer.android.com/google/play/billing/billing_testing#billing-testing-static
  ],
});
*/

const itemSkus = Platform.select({
  ios: [
    'AUTONOTOUT01',
    'AUTONOTOUT02',
  ],
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;


class Iap extends Component {
  constructor(props) {
    console.log(itemSkus);
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);

    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
      loading: true,
      sku: '',
    };
  }

  state = {
    toggle: this.props.toggle.togglePremium || false,
    autoNotOut: this.props.autoNotOut.autoNotOut || 0,
    winningStreak: this.props.playerStats.winningStreak || 0,
    longestStreak: this.props.playerStats.longestStreak || 0,
  };

  handleChange = ( toggle, autoNotOut, playerStats ) => {
    this.setState({ toggle });
    this.setState({ autoNotOut });
    this.setState({ playerStats });
  };

  async componentDidMount(): void {
    try {
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.log('result', result);
    } catch (err) {
      console.warn(err.code, err.message);
    }

    RNIap.prepare();
    RNIap.getProducts(items).then((products) => {
     //handle success of fetch product list
    }).catch((error) => {
      console.log(error.message);
    })

  }

  componentWillUnmount(): void {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }

  //after purcahse go to the finish transaction page.

  goNext = () => {

    console.log(this.state.sku);

    const sku = this.state.sku;

    let autoNotOut = this.props.autoNotOut.autoNotOut;
    const winningStreak = this.props.playerStats.winningStreak;
    const longestStreak = this.props.playerStats.longestStreak;


    if (sku === 'AUTONOTOUT01') {
      autoNotOut = autoNotOut + 4;
    }
    else {
      autoNotOut = autoNotOut + 10;
    }

    const highestPlayerScore = this.props.playerStats.highestPlayerScore;
    const highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;
    const highestTeamScore = this.props.playerStats.highestTeamScore;

    this.ref.doc("playerStats").update({
      winningStreak: winningStreak,
      longestStreak: longestStreak,
      highestPlayerScore: highestPlayerScore,
      highestPlayerScoreId: highestPlayerScoreId,
      highestTeamScore: highestTeamScore,
      autoNotOut: autoNotOut,
    });

    this.setState({
      autoNotOut: autoNotOut,
    }, function () {
      const { autoNotOut } = this.state
      this.props.dispatch(updateAutoNotOut(this.state.autoNotOut));
    })

    this.props.navigation.navigate('IapTrue', {
      receipt: this.state.receipt,
    });
  }

  /*
  goNext = (): void => {
    Alert.alert('Receipt', this.state.receipt);
  };
  */

  purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            // if (Platform.OS === 'ios') {
            //   finishTransactionIOS(purchase.transactionId);
            // } else if (Platform.OS === 'android') {
            //   // If consumable (can be purchased again)
            //   consumePurchaseAndroid(purchase.purchaseToken);
            //   // If not consumable
            //   acknowledgePurchaseAndroid(purchase.purchaseToken);
            // }
            const ackResult = await finishTransaction(purchase);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }

          this.setState({receipt}, () => this.goNext());
        }
      },
    );

  getItems = async (): void => {
    console.log(this.state.loading);
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log('Products', products);
      this.setState({loading: false});
      console.log(this.state.loading);
      this.setState({productList: products});
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };


  /*
  buyItem = async(sku) => {
  console.info('buyItem: ' + sku);
  // const purchase = await RNIap.buyProduct(sku);
  // const products = await RNIap.buySubscription(sku);
  // const purchase = await RNIap.buyProductWithoutFinishTransaction(sku);
  try {
    const purchase: any = await RNIap.buyProduct(sku);
    this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
  } catch (err) {
    console.warn(err.code, err.message);
    const subscription = RNIap.addAdditionalSuccessPurchaseListenerIOS(async (purchase) => {
      this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
      subscription.remove();
    });
  }
}
*/

getAvailablePurchases = async (): void => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };


  //***needs tested!!***
  /*
  getPurchases = async() => {
  try {
    console.log('get hit, and when??');
    const purchases = await RNIap.getAvailablePurchases();
    let restoredTitles = '';
    let coins = CoinStore.getCount();
    purchases.forEach(purchase => {
      if (purchase.productId == '4dot6OVER01') {
        this.setState({ togglePremium: true });
        restoredTitles += 'Premium Version';
      }
      else if (purchase.productId == 'android.test.purchased') {
        console.log(purchase.productId);
        this.setState({ togglePremium: true });
        restoredTitles += 'Premium Version';
      }
    })
    Alert.alert('Restore Successful', 'You successfully restored the following purchases: ' + restoredTitles);
  } catch(err) {
    console.warn(err); // standardized err.code and err.message available
    Alert.alert(err.message);
  }
}
*/


    static navigationOptions = {
      drawerIcon : ({tintColor}) => (
        <Icon name="ios-star-outline" style={{fontSize: 24, color: tintColor}} />
      )
    }

    getPrice = (priceString) => {
      const price = JSON.parse(priceString);
      //return (<H1 style={styles.textHeaderNumber}>${price}</H1>)
      return(<Text style={styles.textHeader}>${price}</Text>)
    }

    getTitle = (titleString) => {

      const title = JSON.parse(titleString);
      return(<Row><H1 style={styles.textHeader}>{title}</H1></Row>)
    }

    getDescription = (descString) => {

      const desc = JSON.parse(descString);
      return(<Row><Text style={styles.textHeader}>{desc}</Text></Row>)
    }

    requestPurchase = async (sku): void => {
    try {
      this.setState({sku: sku});
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

    render() {
      const purchase = this.props.toggle.togglePremium;
      const { productList, receipt, availableItemsMessage } = this.state;
      const receipt100 = receipt.substring(0, 100);
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



                      <Row style={styles.textHeaderBorder}><Text style={styles.textHeader}>Purchase Auto-Notouts</Text></Row>
                      <Row><Text style={styles.textDesc}>4dot6 Cricket Strategy Board Game allows you to purchase auto-notouts to help you chase down large scores. Momemtum is key - the less wickets in your innings, the more moementum you have and the more 4's and 6's will show on the board!</Text></Row>
                      <Row><Text style={styles.textDesc}>Purchase auto-noutouts today and give yourself a massive advantage when cahsing down those large scores!</Text></Row>


                      </Col>
                      </LinearGradient>
                      </ImageBackground>
                      <Col size={1} >

            <Button large warning style={styles.lightGreenButton}
             onPress={(): void => this.getItems()}>
             <Text style={styles.lightGreenButtonText}>Choose auto-notout options...</Text>
             <Icon type="AntDesign" name="downcircleo" style={styles.autoNotOutIcon} />
           </Button>
           {productList.map((product, i) => {
             return (
               <View
                 key={i}
                 style={{
                   flexDirection: 'column',
                 }}>
                 <Loader
                 loading={this.state.loading} />
                 <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
                 <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                 locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>

                     <Col size={1} style={styles.rowPaddingCoachChat}>
                 {this.getDescription(JSON.stringify(product.description))}
                 </Col>
                 </LinearGradient>
                 </ImageBackground>
                 <Button large warning style={styles.lightGreenButton}
                 onPress={(): void =>
                   this.requestPurchase(product.productId)
                 }>
                    <Icon type="AntDesign" name="plus" style={styles.autoNotOutIcon} />{this.getPrice(JSON.stringify(product.price))}<Text> </Text>{this.getTitle(JSON.stringify(product.title))}
                  </Button>
                 </View>
             );
           })}

                </Col>

                </Content>
                </LinearGradient>
                </ImageBackground>
                <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
                <Button large warning style={styles.lightGreenButton100}
                   // onPress={(): void => this.requestPurchase(product.productId)}
                   onPress={() => this.props.navigation.navigate('WicketCheck')}>
                   <Icon type="AntDesign" name="back" style={styles.autoNotOutIcon} /><Text style={styles.lightGreenButtonText}>Go Back</Text>
                 </Button>
                </Footer>

              </Container>
        );
    }
}

const mapStateToProps = state => ({
  toggle: state.toggle,
  autoNotOut: state.autoNotOut,
  playerStats: state.playerStats,
});

export default connect(mapStateToProps)(Iap);

// Custom Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },
    rowPadding: {
      paddingBottom: 40,
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
      fontSize: 30,
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
      textAlign: 'center',
      fontWeight: '200',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
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
  colFontSizeLarge: {
    fontSize: 100,
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

/*
<Row>
  <Button
    onPress={this.getItems}
    activeOpacity={0.5}
    style={styles.btn}
    textStyle={styles.txt}
    ><Text>Get available purchases</Text>
  </Button>

  <Text style={{ margin: 5, fontSize: 15, alignSelf: 'center' }} >{availableItemsMessage} </Text>

  <Text style={{ margin: 5, fontSize: 9, alignSelf: 'center' }} >{receipt100}</Text>

  <Button
    onPress={() => this.getItems()}
    activeOpacity={0.5}
    style={styles.btn}
    textStyle={styles.txt}
  ><Text>Get Products ({productList.length})</Text></Button>
  </Row>

  */

  /*
  code to call title and description from app stores

  <Row>{this.getTitle(JSON.stringify(product.title))}</Row>
  <Row>{this.getDescription(JSON.stringify(product.description))}</Row>

  */




  /*
        {
          productList.map((product, i) => {
            console.log(product);
            return (
              <Row key={i} style={{
                flexDirection: 'column', alignItems: 'center',
              }}>

                <Button rounded large warning style={styles.largeButtonGreen}
                    onPress={() => this.buyItem(product.productId)} >
                    {this.getPrice(JSON.stringify(product.price))}
                  </Button>
              </Row>

        );
    })
  }
  */

  /*
  <Button rounded large warning style={styles.largeButtonGreen}
onPress={this.getAvailablePurchases}>
<Text>Get available purchases</Text>
</Button>

<Text style={{margin: 5, fontSize: 15, alignSelf: 'center'}}>
{availableItemsMessage} and test text here.
</Text>
*/

/*
<Text
  style={{
    marginTop: 20,
    fontSize: 12,
    color: 'black',
    minHeight: 100,
    alignSelf: 'center',
    paddingHorizontal: 20,
  }}>
  {JSON.stringify(product)}
</Text>
*/
