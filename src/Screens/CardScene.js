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

  constructor(props) {
    super(props);
    this.state = {
      cardIndex: 0,
      list: N5
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    // Need to add upper bound once list is in DB
    var MAX = this.state.list.length;

    var newIndex = this.state.cardIndex + 1;
    if (newIndex < MAX) {
    
    this.setState({
      cardIndex: newIndex
    });
    console.log("Incremented, index is: " + newIndex);
    } else {
      console.log("Can't Increment above max");
    }
  }

  handleDecrement() {
    var newIndex = this.state.cardIndex - 1;
    if (newIndex >= 0) {
      
      this.setState({
        cardIndex: newIndex
      });
      console.log("Decremented, index is: " + newIndex);
    } else {
      console.log("Can't Decrement out of range");
    }
  }

  render() {
    const { params } = this.props.navigation.state;

        return (
        <View style={styles.container}>
          
          {/* Need to make it go through whole list*/}
          <Card source={this.state.list} index={this.state.cardIndex}/>

          <Controls left={'Back'} right={'Forward'} handleIncrement={this.handleIncrement} handleDecrement={this.handleDecrement}/>
          
        </View>
    );
  }
}

class Card extends Component {
  render() {
    return(
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>{this.props.source[this.props.index].kanji}</Text>
        <Text style={styles.cardText}>{this.props.source[this.props.index].onyomi}</Text>
        <Text style={styles.cardText}>{this.props.source[this.props.index].kunyomi}</Text>
        <Text style={styles.cardText}>{this.props.source[this.props.index].meaning}</Text>
        <Image style={styles.cardImage} source={Images[this.props.source[this.props.index].img]}/>
      </View>
    );
  }
}

class Controls extends Component {
  /*
  constructor(props) {
      super(props);
      if (this.props.index == 0) {
        this.state = {
          disabledLeftButton: true
        };
      }
  }
  */
  render() {

    return(
      <View style={styles.controlsContainer}>
        <View style={styles.controlsLeftContainer}>
          <Button 
            onPress={this.props.handleDecrement}
            title={this.props.left}
            color={Colors.one}
            />
          </View>

          <View style={styles.controlsRightContainer}>
            <Button
            onPress={this.props.handleIncrement}
            title={this.props.right}
            color={Colors.one}
            />
          </View>
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
    flex: 1,
    backgroundColor: Colors.Background
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //alignItems: 'center',
    margin: 20
  },
  controlsLeftContainer: {
    //flex: 1,
    justifyContent: 'flex-end',
    marginRight: 10,
    width: window.width * 0.4
  },
  controlsRightContainer: {
    //flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end',
    width: window.width * 0.4
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
