import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../screens/Account';
import TabBar from '../components/TabBar';
import StackHome from './StackHome';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();

function TabHome() {

  return (
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen 
          name="Home"
          component={StackHome} 
          options={{
            tabBarIcon: 'home',
            headerShown: false
          }}
          />
          <Tab.Screen 
          name="Conta"
          component={Account} 
          options={{
            tabBarIcon: 'person-circle-outline',
            headerShown: false
          }}
          />
          <Tab.Screen 
          name="Login"
          component={LoginScreen} 
          options={{
            tabBarIcon: 'flash-off',
            headerShown: false
          }}
          />
          <Tab.Screen 
          name="Cadastro"
          component={RegisterScreen} 
          options={{
            tabBarIcon: 'flash-off',
            headerShown: false
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
export default TabHome;