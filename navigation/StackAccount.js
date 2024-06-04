import * as React from 'react';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function StackAccount() {
  return (
      <Stack.Navigator
      initialRouteName='Login'>
        <Stack.Screen 
          name="Login"
          component={LoginScreen} 
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen 
          name="Register"
          component={RegisterScreen} 
          options={{
            headerShown: false
          }}
          />
      </Stack.Navigator>
  );
}