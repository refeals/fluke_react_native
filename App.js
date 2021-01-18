/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Faq from './components/Faq';
import Consumption from './components/Consumption';
import History from './components/History';

const Root = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen name="Consumo instantâneo" component={Consumption} />
          <Root.Screen name="Histórico de consumo" component={History} />
          <Root.Screen name="Perguntas Frequentes" component={Faq} />
        </Root.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
