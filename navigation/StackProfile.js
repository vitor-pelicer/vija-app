import * as React from 'react';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { auth } from '../services/firebaseConfig';
import Profile from '../screens/Profile';
import StackAccount from './StackAccount';
import MyPosts from '../screens/MyPosts';

const Stack = createNativeStackNavigator();

export default function StackProfile() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(auth.currentUser))
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
  return (
    <>
      {isLoggedIn &&
        <Stack.Navigator
        initialRouteName='Profile'>
          <Stack.Screen 
            name="Profile"
            component={Profile} 
            options={{
              headerShown: false
            }}
            />
            <Stack.Screen 
            name="MyPosts"
            component={MyPosts} 
            options={{
              headerShown: false
            }}
          />
      </Stack.Navigator>}
      {!isLoggedIn && <StackAccount/>}
    </>
  );
}