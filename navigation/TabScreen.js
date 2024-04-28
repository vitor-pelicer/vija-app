import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SettingsScreen from '../screens/SettingsScreen';


const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
      <Tab.Navigator
      initialRouteName='Home2'>
        <Tab.Screen name="Home2" component={Home} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}