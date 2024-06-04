import * as React from "react"
import { View, Text, Image, ImageBackground, Alert, TouchableOpacity } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";


export default function LoginScreen({ navigation, route }){

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [secureText, setSecureText] = React.useState(true);

  
  const handleLogin = () =>{
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Erro de login', error.message);
        console.log(errorCode)
      });
  }

  return (
    <View className={"flex-1 flex-col bg-grad items-center"}>
      <ImageBackground className={"flex flex-col bg-grad items-center h-screen w-screen"} source={require("../assets/backgroundLogin.png")}>
        <Text className={"text-[100px] text-rose-60 text-white font-LibreBarcode z-10 mt-32"}>VIJA</Text>
        <View className={"flex flex-col w-screen z-10 mt-[150px] items-center"}>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            outlineColor="#F6B200"
            selectionColor="#FF7A00"
            activeOutlineColor="#FF7A00"
            className={"w-[90%]"}
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
          <View className={"flex justify-start w-screen"}>
            <TouchableOpacity onPress={()=> navigation.push("Register")} className={"ml-6 mt-4"}>
              <Text>Não tenho conta</Text>
            </TouchableOpacity>
          </View>
          <Button icon="account"
            mode="contained"
            onPress={() => handleLogin()}
            buttonColor="#F6B200"
            className={"mt-4 w-[90%]"}>
            Log in
          </Button>
        </View>
        <Image source={require("../assets/Ellipse.png")} className={"h-[700px] w-screen z-1 absolute -bottom-12"}/>
      </ImageBackground>
    </View>
  )

}