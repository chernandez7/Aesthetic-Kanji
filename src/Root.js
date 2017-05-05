import React, { Component } from 'react';
import {
  HomeScene,
  CardScene
 } from './Screens';

import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator(
{
  Home: {screen: HomeScene},
  Cards: {screen: CardScene}
},{
  headerMode: 'screen'
}
);

export default class AestheticKanji extends Component {
    render() {
        return (
            <App />
        );
    }
}
