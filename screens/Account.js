import * as React from 'react';
import { Text, View } from 'react-native';
import Header from '../components/Header';
import { auth } from '../services/firebaseConfig';
import LoginScreen from './LoginScreen';

export default function Account() {

  console.log(auth.currentUser)
  if (auth.currentUser){
    return (
      <View className={'flex-1 flex flex-col justify-start  bg-gray-100'} >
        <Header />
        <Text> Você está logado</Text>

      </View>
    );
  }
  else {
    return (<LoginScreen/>)
  }
}