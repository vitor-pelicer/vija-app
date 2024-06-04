import * as React from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity, ImageBase, StyleSheet} from 'react-native';
import Header from '../components/Header';
import LoginScreen from './LoginScreen';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import { db, auth } from '../services/firebaseConfig';
import StackAccount from '../navigation/StackAccount';

export default function CreatePost() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(auth.currentUser));
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [type, setType] = React.useState("");
  const [image, setImage] = React.useState([]);


  const handleSubmit = async () => {
    const postData = {
      title,
      description,
      price,
      type,
      user_id: auth.currentUser.uid 
    }

}


auth.onAuthStateChanged((user) => {
  if (user) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
});

  const handleChooseImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('A permissão para acessar a biblioteca de mídia é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage([...image, result.assets[0].uri]);
    }
  };

  const data = [
    { key: 1, value: 'carro' },
    { key: 2, value: 'moto' },
    { key: 3, value: 'celular' },
    { key: 4, value: 'imóvel' },
    { key: 5, value: 'eletrodoméstico' },
  ];

  return (
    <>
      {isLoggedIn &&
      <View className={'flex-1 flex flex-col justify-start bg-gray-100'} >
        <Header/>
        <View className={"flex flex-col items-center"}>
        <TextInput
            mode="outlined"
            label="Título"
            value={title}
            onChangeText={text => setTitle(text)}
            outlineColor="#F6B200"
            selectionColor="#FF7A00"
            activeOutlineColor="#FF7A00"
            className={"w-[90%]"}
          />
        <TextInput
          mode="outlined"
          label="Descrição"
          value={description}
          onChangeText={text => setDescription(text)}
          outlineColor="#F6B200"
          selectionColor="#FF7A00"
          activeOutlineColor="#FF7A00"
          multiline
          numberOfLines={5}
          className={"w-[90%]"}
        />
        <View className={"mt-2 w-[90%]"}>
        <SelectList
          setSelected={setType}
          data={data}
          save="value"
          fontFamily="Inter-Regular"
          boxStyles={styles.dropdown}
          inputStyles={styles.input}
          dropdownStyles={styles.dropdownList}
          dropdownItemStyles={styles.dropdownItem}
          dropdownTextStyles={styles.dropdownText}
        />
        </View>

        <View className={"flex flex-col space-y-4 items-start w-full"}>
          <Text className={"font-InterRegular text-lg ml-5 mt-5"}> Fotos: {image.length}/5</Text>
          <ScrollView horizontal className={"flex-grow-0"}>
            <TouchableOpacity onPress={handleChooseImage} disabled={image.length===5}>
              <View className={"mx-1 p-2 rounded-3xl h-[216px] w-[216px] items-center justify-center bg-slate-300"}>
                <Ionicons
                  name={"add-circle"}
                  size={35}
                  color={"#FFF"}
                  />
              </View>
            </TouchableOpacity>
            {image.map((i, index) => (
              <View key={index} className={"mx-1 p-2 bg-slate-100 rounded-3xl h-[216px]"}>
              <Image source={{ uri: i }} className={"w-[200px] h-[200px] rounded-2xl"} />
            </View>)
            )}
          </ScrollView>
        </View>
          
          <Button
            mode="elevated"
            textColor='#474747'
            onPress={handleSubmit}
            className={"mt-4 w-[90%] h-11"}
            labelStyle={{ fontSize: 20 }}>
            Postar
          </Button>
        </View>
      </View>}
      {!isLoggedIn && <StackAccount/>}
    </>
  )
}



const styles = StyleSheet.create({
  
  dropdown: {
    backgroundColor: '#FFF',
    borderColor: '#F6B200',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    color: '#444',
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#FFF',
    borderColor: '#F6B200',
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    color: '#444',
    fontSize: 16,
  },
});
