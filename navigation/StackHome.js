import * as React from 'react';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostItem from '../screens/PostItem';
import PostSearch from '../screens/PostSearch';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function StackHome() {
  return (
      <Stack.Navigator
      initialRouteName='HomeStack'>
        <Stack.Screen name="HomeStack" component={Home}
        options={{
          headerShown: false
        }} />
        <Stack.Screen name="PostItem" component={PostItem}
        options={{
          headerShown: false
        }} />
        <Stack.Screen name="PostSearch" component={PostSearch}
        options={{
          headerShown: false
        }} />
        <Stack.Screen 
          name="Login"
          component={LoginScreen} 
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen 
          name="Cadastro"
          component={RegisterScreen} 
          options={{
            headerShown: false
          }}
          />
      </Stack.Navigator>
  );
}