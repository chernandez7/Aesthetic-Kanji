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

  componentWillMount() {
    const params = this.props.navigation.state.params;
    switch (params.level) {
      case 5:
        this.setState({
          list: params.list[4].data,
          max: params.list[4].data.length,
          key: params.list[4]._key
        });
        break;
      case 4:
        this.setState({
          list: params.list[3].data,
          max: params.list[3].data.length,
          key: params.list[3]._key
        });
        break;
      case 3:
        this.setState({
          list: params.list[2].data,
          max: params.list[2].data.length,
          key: params.list[2]._key
        });
        break;
      case 2:
        this.setState({
          list: params.list[1].data,
          max: params.list[1].data.length,
          key: params.list[1]._key
        });
        break;
      case 1:
        this.setState({
          list: params.list[0].data,
          max: params.list[0].data.length,
          key: params.list[0]._key
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

            <Image style={styles.cardImage} source={Images.one}/>
          
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
