import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Faq from './components/Faq';
import Consumption from './components/Consumption';
import History from './components/History';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Root = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen
            name="Consumo instantâneo"
            component={Consumption}
            options={{
              tabBarLabel: 'Consumo instantâneo',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="chart-donut"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Root.Screen
            name="Histórico de consumo"
            component={History}
            options={{
              tabBarLabel: 'Histórico de consumo',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="history"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Root.Screen
            name="Perguntas Frequentes"
            component={Faq}
            options={{
              tabBarLabel: 'Perguntas Frequentes',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="frequently-asked-questions"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Root.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
