import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';

import Images from '../Assets/images';
import Colors from '../Style/Colors';

const window = Dimensions.get('window');

export default class CardScene extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      cardIndex: 0,
      isLeftDisabled: true,
      isRightDisabled: false,
      isAnswerHidden: true,
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleCardPress = this.handleCardPress.bind(this);
  }

  randomNumber(max, min, used) {
    var number = Math.floor(max - Math.random()*(max-min));
    if (used.indexOf(number) === -1) {
      return number;
    } else {
      return this.randomNumber(max, min, used);
    }
  }

  generateRandomIndeces(data, max) {
    var indeces = [];

    for (var i = 0; i < 5; i++) {
      var random = this.randomNumber(max, 0, indeces);
      if (indeces.indexOf(random) === -1) {
        indeces.push(random);
        //console.log(random + " added");
    } else {
      console.log(random + " is in array, shouldn't get here");
      }
    }
    return indeces;
  }

  setListToState(params, index) {
    var indexList; 
    var dataList = [];

    indexList = this.generateRandomIndeces(params.list[index].data, params.list[index].data.length);
    for (var i = 0; i < indexList.length; i++) {
      dataList[i] = params.list[index].data[indexList[i]];
    }

    this.setState({
      list: dataList,
      max: params.list[index].data.length,
      key: params.list[index]._key
    });
  }

  componentWillMount() {
    const params = this.props.navigation.state.params;
    
    switch (params.level) {
      case 5:
        this.setListToState(params, 4);
        break;
      case 4:
        this.setListToState(params, 3);
        break;
      case 3:
        this.setListToState(params, 2);
        break;
      case 2:
        this.setListToState(params, 1);
        break;
      case 1:
        this.setListToState(params, 0);
        break;
      default:
        console.log('how did you get here?');
        break;
    }
  }

  handleIncrement() {

    var MAX = this.state.list.length;
    var newIndex = this.state.cardIndex + 1;

    this.setState({
          isAnswerHidden: true
        });
    
    // Increment index
    if (this.state.cardIndex < MAX - 1) { // less than max
      this.setState({
          cardIndex: newIndex,
          isRightDisabled: false
        });
    }
    if ((this.state.cardIndex < MAX - 1) && (this.state.cardIndex + 1 > 0)) {
      this.setState({
          isLeftDisabled: false
        });
    }
    if (this.state.cardIndex == MAX - 2) {
        this.setState({
          isRightDisabled: true
        });
      }
  }

  handleDecrement() {

    var MAX = this.state.list.length;
    var newIndex = this.state.cardIndex - 1;

    this.setState({
          isAnswerHidden: true
        });
        
    // Decrement index
    if (this.state.cardIndex > 0) { // less than max
      this.setState({
          cardIndex: newIndex,
          isLeftDisabled: false,
        });
    }

    if ((this.state.cardIndex > 0) && (this.state.cardIndex < MAX)) { // less than max
          this.setState({
              isRightDisabled: false,
            });
        }

    console.log(this.state.cardIndex);
    if (this.state.cardIndex -1 == 0) {
        this.setState({
          isLeftDisabled: true
        });
      }
  }

  handleCardPress() {
    if (this.state.isAnswerHidden) {
    this.setState({
      isAnswerHidden: false
    });
    console.log('showing answer');
    } else {
      this.setState({
      isAnswerHidden: true
    });
    console.log('hiding answer');
    }
  }

  render() {
    const { params } = this.props.navigation.state;

        return (
        <View style={styles.container}>
          
          <Card 
            source={this.state.list} 
            index={this.state.cardIndex} 
            isAnswerHidden={this.state.isAnswerHidden}
          />

          <Controls 
            index={this.state.cardIndex}
            handleIncrement={this.handleIncrement} 
            handleDecrement={this.handleDecrement}
            isLeftDisabled={this.state.isLeftDisabled}
            isRightDisabled={this.state.isRightDisabled}
            handleCardPress={this.handleCardPress}
          />

        </View>
    );
  }
}

class Card extends Component {

  render() {
    return(
      <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            {this.props.source[this.props.index].kanji}
          </Text>
          
          {!this.props.isAnswerHidden &&  
            <Answers source={this.props.source} index={this.props.index}/>}
            {/*
            <Image style={styles.cardImage} source={Images.one}/>
            */}
          
      </View>
    );
  }
}

class Answers extends Component {
  render() {
    return(
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{this.props.source[this.props.index].onyomi}</Text>
        <Text style={styles.answerText}>{this.props.source[this.props.index].kunyomi}</Text>
        <Text style={styles.answerText}>{this.props.source[this.props.index].meaning}</Text>
      </View>
    );
  }
}

class Controls extends Component {

  render() {
    return(
      <View style={styles.controlsContainer}>
        <View style={styles.controlsLeftContainer}>
          <Button 
            disabled={this.props.isLeftDisabled}
            onPress={this.props.handleDecrement}
            title={'Back'}
            color={Colors.one}
            />
          </View>

          <View style={styles.controlsMiddleContainer}>
            <Button
              onPress={this.props.handleCardPress}
              title={'Flip'}
              color={Colors.two}
              />
            </View>

          <View style={styles.controlsRightContainer}>
            <Button
            disabled={this.props.isRightDisabled}
            onPress={this.props.handleIncrement}
            title={'Forward'}
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
    flexDirection: 'column',
    backgroundColor: Colors.Background,
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width
  },
  answerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20
  },
  controlsLeftContainer: {
    justifyContent: 'flex-end',
    marginRight: 10,
    width: window.width * 0.25
  },
  controlsMiddleContainer: {
    justifyContent: 'flex-end',
    width: window.width * 0.25
  },
  controlsRightContainer: {
    marginLeft: 10,
    justifyContent: 'flex-end',
    width: window.width * 0.25
  },
  cardText: {
    fontSize: 40,
    color: Colors.Text
  },
  answerText: {
    fontSize: 30,
    color: Colors.one
  },
  cardImage: {
    flex: 0.5,
   width: 200,
   height: 200,
  },
});
