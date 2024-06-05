import * as React from 'react';
import { Image, View } from 'react-native';
import Header from '../components/Header';
import { auth } from '../services/firebaseConfig';
import { signOut } from "firebase/auth";
import { Button } from 'react-native-paper';

export default function Profile({ navigation, route }) {

  

  const handleLogOut = ()=>{
    signOut(auth).then(() => {
      console.log("Deslogado")
    }).catch((error) => {
      Alert.alert('Erro de logout', error.message);
    });
  }

  return (
      <View className={'flex-1 flex flex-col justify-start bg-gray-100'} >
        <Header size={"big"}/>
        <View className={"flex flex-col items-center"}>
          <Image source={require("../assets/user.png")} className={"h-[300px] w-[300px] rounded-full"}/>
          <Button
            mode="elevated"
            textColor='#474747'
            onPress={() => navigation.push('MyPosts')}
            className={"mt-4 w-[90%] h-11"}
            labelStyle={{ fontSize: 20 }}>
            Meus anúncios
          </Button>
          <Button
            mode="filed"
            textColor='#FFF'
            buttonColor='#ed2b2b'
            onPress={() => handleLogOut()}
            className={"mt-4 w-[90%] h-11"}
            labelStyle={{ fontSize: 20 }}>
            Sair
          </Button>
        </View>
      </View>
  )
}