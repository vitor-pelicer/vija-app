import * as React from 'react';
import Home from '../screens/Home';
import SettingsScreen from '../screens/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostItem from '../screens/PostItem';
import PostSearch from '../screens/PostSearch';

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
      </Stack.Navigator>
  );
}