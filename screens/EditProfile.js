import * as React from 'react';
import { Image, Text, View } from 'react-native';
import Header from '../components/Header';
import { auth } from '../services/firebaseConfig';
import LoginScreen from './LoginScreen';
import { TextInput, Button } from 'react-native-paper';

export default function EditProfile() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [secureText, setSecureText] = React.useState(true);

  return (
    <>
      <View className={'flex-1 flex flex-col justify-start bg-gray-100'} >
        <Header size={"big"}/>
        <View className={"flex flex-col items-center"}>
          <Image source={require("../assets/user.png")} className={"h-[300px] w-[300px] rounded-full"}/>
          <TextInput
            mode="outlined"
            label="Nome"
            value={name}
            onChangeText={text => setName(text)}
            outlineColor="#F6B200"
            selectionColor="#FF7A00"
            activeOutlineColor="#FF7A00"
            className={"w-[90%]"}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            outlineColor="#F6B200"
            selectionColor="#FF7A00"
            activeOutlineColor="#FF7A00"
            className={"mt-4 w-[90%]"}
          />
          <TextInput
            mode="outlined"
            label="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={secureText}
            outlineColor="#F6B200"
            selectionColor="#FF7A00"
            activeOutlineColor="#FF7A00"
            right={<TextInput.Icon icon="eye" onPress={()=>setSecureText(!secureText)}/>}
            className={"w-[90%] mt-4"}
          />
          <Button icon="account"
            mode="contained"
            onPress={() => handleRegister()}
            buttonColor="#FF7A00"
            className={"mt-4 w-[90%]"}>
            Cadastrar-se
          </Button>
        </View>
      </View>
    </>
  )
}