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

const window = Dimensions.get('window');

export default class CardScene extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { params } = this.props.navigation.state;

        return (
        <View style={styles.container}>
          <Text style={styles.cardText}>{N5[0].kanji}</Text>
          <Text style={styles.cardText}>{N5[0].onyomi}</Text>
          <Text style={styles.cardText}>{N5[0].kunyomi}</Text>
          <Text style={styles.cardText}>{N5[0].meaning}</Text>
          <Image style={styles.cardImage} source={Images[N5[0].img]}/>
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
});
