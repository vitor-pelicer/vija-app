import * as React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { SiOpenhab } from "react-icons/si";


export default function RegisterScreen({ navigation, route }){

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [secureText, setSecureText] = React.useState(true);
  const [submited, setSubmited] = React.useState(false);

  const handleRegister = ()=>{
    setSubmited(true)
    if(name==='' ||  email==='' || password===''){
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        updateProfile(user, {
          displayName: name
        }).then(() => {
          console.log("Usuário com nome criado")
        }).catch((error) => {
          Alert.alert('Erro ao atualizar o nome', error.message);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  return (
    <View className={"flex-1 flex-col bg-grad items-center bg-slate-100"}>
        <Text className={"text-[100px] text-rose-60 text-[#FF7A00] font-LibreBarcode z-10 mt-32"}>VIJA</Text>
        <View className={"flex-1 flex-col w-screen z-10 mt-16 pt-16 items-center"}>
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
          {name==='' && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Campo nome não está preenchido</Text>}
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
          {email==='' && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Campo email não está preenchido</Text>}
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
          {password==='' && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Campo senha não está preenchido</Text>}
          <View className={"flex justify-start w-screen"}>
            <TouchableOpacity onPress={()=> navigation.pop()} className={"ml-6 mt-4"}>
              <Text>Já tenho conta</Text>
            </TouchableOpacity>
          </View>
          <Button icon="account"
            mode="contained"
            onPress={() => handleRegister()}
            buttonColor="#FF7A00"
            className={"mt-4 w-[90%]"}>
            Cadastrar-se
          </Button>
        </View>
        <Image source={require("../assets/Ellipse.png")} className={"h-[700px] w-screen z-1 absolute -bottom-24"}/>
    </View>
  )

}