import * as React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';


export default function Home({ navigation, route }) {

  return (
    <View>
      <Header size={'big'} search/>
      
    </View>
  );
}