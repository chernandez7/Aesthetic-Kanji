import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from 'react-native';

import Images from '../Assets/images';
import Colors from '../Style/Colors';
import {
  N5,
  N4,
  N3,
  N2,
  N1
} from '../Kanji';

import SwipeCards from 'react-native-swipe-cards';
const window = Dimensions.get('window');

let Card = React.createClass({
  render() {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>{this.props.kanji}</Text>
        <Text style={styles.cardText}>{this.props.onyomi}</Text>
        <Text style={styles.cardText}>{this.props.kunyomi}</Text>
        <Text style={styles.cardText}>{this.props.meaning}</Text>
        <Image style={styles.cardImage} source={Images[this.props.img]}/>
      </View>
    )
  }
})

export default class CardScene extends Component {
  static navigationOptions = {
    header: null,
  }

  handleYup (card) {
    console.log(`Yup for ${card.kanji}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.kanji}`)
  }

  handleMaybe (card) {
    console.log(`Maybe for ${card.kanji}`)
  }

  render() {
    const { params } = this.props.navigation.state;

        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (
          <View style={styles.container}>
          <SwipeCards
            cards={
              (
              (params.level == 5)? N5 :
              (params.level == 4)? N4 :
              (params.level == 3)? N3 :
              (params.level == 2)? N2 :
              N1 )
          }

            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards />}

            handleYup={this.handleYup}
            handleNope={this.handleNope}
            handleMaybe={this.handleMaybe}
            hasMaybeAction
            loop={true}
          />
          </View>
    );
  }
}

class NoMoreCards extends Component {
  render() {
    return(
      <View style={styles.noMoreCardsContainer}>
      <Text>No More Cards!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.Background
  },
  cardContainer: {
    //backgroundColor: Colors.Background
  },
  cardText: {
    fontSize: 30,
    color: Colors.Text
  },
  cardImage: {
   flex: 1,
   // remove width and height to override fixed static size
   width: null,
   height: null,
   resizeMode: 'cover',
  },
  noMoreCardsContainer: {

  }
});
