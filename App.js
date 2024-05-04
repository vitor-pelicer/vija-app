import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withExpoSnack } from 'nativewind';
import { FaHouse, FaSearch} from "react-icons/fa6";
import Home from './screens/Home';
import SettingsScreen from './screens/SettingsScreen';
import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen 
        name="Home"
        component={Home} 
        options={{
          tabBarIcon: 'home', // Nome do ícone para a guia Home
          headerShown: false
        }}
        />
        <Tab.Screen 
        name="Settings"
        component={SettingsScreen} 
        options={{
          tabBarIcon: 'settings', // Nome do ícone para a guia Home
          headerShown: false
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default withExpoSnack(App);