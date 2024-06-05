import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackProfile from './StackProfile';
import TabBar from '../components/TabBar';
import StackHome from './StackHome';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CreatePost from '../screens/CreatePost';

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
          name="Anunciar"
          component={CreatePost} 
          options={{
            tabBarIcon: 'add-circle',
            headerShown: false
          }}
          
          />
          <Tab.Screen 
          name="Conta"
          component={StackProfile} 
          options={{
            tabBarIcon: 'person-circle',
            headerShown: false
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
export default TabHome;