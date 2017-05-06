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
      list: null,
      isLeftDisabled: false,
      isRightDisabled: false,
      isAnswerHidden: true
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleCardPress = this.handleCardPress.bind(this);

  }

  componentWillMount() {
    console.log(this.props.navigation.state.params.level);
    switch (this.props.navigation.state.params.level){
      case 5:
        this.setState({
          list: N5
        });
        break;
      case 4:
        this.setState({
          list: N4
        });
        break;
      case 3:
        this.setState({
          list: N3
        });
        break;
      case 2:
        this.setState({
          list: N2
        });
        break;
      case 1:
        this.setState({
          list: N1
        });
        break;
      default:
        console.log('how did you get here?');
        break;
    }
  }

  handleIncrement() {

    var MAX = this.state.list.length;
    var newIndex = this.state.cardIndex + 1;
    console.log('index: ' + this.state.cardIndex);

    // Increment index
    if (!(this.state.cardIndex + 1 > MAX)) { // not greater than max
      this.setState({
          cardIndex: newIndex
        });

      console.log('index: ' + this.state.cardIndex);

      if (this.state.cardIndex >= MAX) {
        this.setState({
          isRightDisabled: true
        });
      } else if (this.state.cardIndex < MAX) {
        this.setState({
          isRightDisabled: false,
        });
      }
    }
    
  }

  handleDecrement() {
    var MAX = this.state.list.length;
    var newIndex = this.state.cardIndex - 1;

    // decrement index
    if (!(this.state.cardIndex - 1 < 0)) { // not less than 0
      this.setState({
          cardIndex: newIndex
        });
    }

    console.log('index: ' + this.state.cardIndex);

    if (this.state.cardIndex <= 0) { // should be disabled
      this.setState({
        isLeftDisabled: true
      });
    } else if (this.state.cardIndex > 0) { // shouldn't be disabled
      this.setState({
        isLeftDisabled: false,
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
          
          {/* Need to make it go through whole list*/}
          <Card 
            source={this.state.list} 
            index={this.state.cardIndex} 
            isAnswerHidden={this.state.isAnswerHidden}
          />

          <Controls left={'Back'} right={'Forward'} index={this.state.cardIndex} max={this.state.list.length}
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
          
          {this.props.isAnswerHidden &&  
            <Answers source={this.props.source} index={this.props.index}/>}
          
      </View>
    );
  }
}

class Answers extends Component {
  render() {
    return(
      <View>
        <Text style={styles.cardText}>{this.props.source[this.props.index].onyomi}</Text>
        <Text style={styles.cardText}>{this.props.source[this.props.index].kunyomi}</Text>
        <Text style={styles.cardText}>{this.props.source[this.props.index].meaning}</Text>
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
            title={this.props.left}
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
    backgroundColor: Colors.Background,
    width: window.width
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
    width: window.width * 0.25
  },
  controlsMiddleContainer: {
    //flex: 1,
    justifyContent: 'flex-end',
    width: window.width * 0.25
  },
  controlsRightContainer: {
    //flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end',
    width: window.width * 0.25
  },
  cardText: {
    fontSize: 30,
    color: Colors.Text
  },
  cardImage: {
   flex: 1,
   // remove width and height to override fixed static size
   width: 100,
   height: 100,
  },
});
