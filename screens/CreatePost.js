import * as React from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity, ImageBase, StyleSheet, Alert} from 'react-native';
import Header from '../components/Header';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import { auth } from '../services/firebaseConfig';
import StackAccount from '../navigation/StackAccount';
import { getDatabase, ref, set } from "firebase/database";
import * as Storage from "firebase/storage";
import uuid from 'react-native-uuid';

export default function CreatePost({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(auth.currentUser));
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [type, setType] = React.useState("");
  const [image, setImage] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [submited, setSubmited] = React.useState(false);

  const handleSubmit = async () => {
  if(title==='' && description==='' && price ==='' && type === '' && image.length ===0){
    setSubmited(true);
    return
  }
  setLoading(true);
  const db = getDatabase();
  const userId = auth.currentUser.uid;
  const postUid = uuid.v4();
  const postPath = 'posts/' + userId + '/' + postUid
  let images = [];

  try{
    for(i=0; i<image.length; i++){
      const blob = await uriToBlob(image[i])
      const img= await uploadImages(blob, postUid)
      images.push(img);
    }
  } catch (e){
    Alert.alert("Erro", "Erro ao enviar os dados.");
    return
  }

  const postData = {
    postUid,
    userId,
    title,
    description,
    price,
    type,
    userId,
    images,
  }

  set(ref(db, postPath), postData
  ).then(() => {
    console.log('Dados enviados com sucesso!');
    setTitle('');
    setDescription('');
    setPrice('');
    setType('');
    setImage([])
    Alert.alert("Anúncio enviado!", "O anúncio foi postado com sucesso.")
    navigation.navigate('Home');
  }).catch((error) => {
    console.error('Error writing data:', error);
    throw new Error('Erro ao enviar imagem');
  });
  setLoading(false);

}

function getFileExtension(file) {
  console.log(file._data.name)
  const parts = file._data.name.split('.');
  return parts[parts.length - 1];
}

const uploadImages = async (file, postUid)=>{
  const storage = Storage.getStorage();
  const imageName = uuid.v4();
  const extension = getFileExtension(file)
  const imagePath = postUid + '/' + imageName + '.' + extension
  const storageRef = Storage.ref(storage, imagePath);

  await Storage.uploadBytes(storageRef, file ).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  }).catch((error) => {
    console.error('Error uploading image:', error);
  });
  const downloadURL = await Storage.getDownloadURL(storageRef);
  return downloadURL

}

const uriToBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};




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

  const removeImage = (removedIndex) => {
    setImage(prevImages => {
      return prevImages.filter((item, index) => index !== removedIndex);
    });
  };

  return (
    <>
      {isLoggedIn &&
      <View className={'flex-1 flex flex-col justify-start bg-gray-100'} >
        <Header/>
        {loading &&
          <View className={"flex-1 items-center justify-center z-20"}>
          <ActivityIndicator animating={true} color={'#FF7A00'} />
          </View>
        }
        <View className={"flex flex-col items-center"}>
        <TextInput
            mode="outlined"
            label="Título"
            value={title}
            onChangeText={text => setTitle(text)}
            outlineColor="#F6B200"
            selectionColor="#FF7A00"
            activeOutlineColor="#FF7A00"
            disabled={loading}
            className={"w-[90%]"}
          />
          {title==='' && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Campo título não está preenchido</Text>}
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
          disabled={loading}
          className={"w-[90%]"}
        />
        {description==='' && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Campo descrição não está preenchido</Text>}
        <TextInput
          mode="outlined"
          label="Preço"
          value={price}
          onChangeText={text => setPrice(text)}
          outlineColor="#F6B200"
          selectionColor="#FF7A00"
          activeOutlineColor="#FF7A00"
          keyboardType='decimal-pad'
          numberOfLines={5}
          disabled={loading}
          className={"w-[90%]"}
        />
        {price==='' && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Campo preço não está preenchido</Text>}
        {!loading &&
          <>
          <View className={"mt-2 w-[90%]"}>
            <SelectList
              setSelected={setType}
              data={data}
              save="value"
              placeholder='Tipo'
              fontFamily="Inter-Regular"
              boxStyles={styles.dropdown}
              inputStyles={styles.input}
              dropdownStyles={styles.dropdownList}
              dropdownItemStyles={styles.dropdownItem}
              dropdownTextStyles={styles.dropdownText}
            />
          </View>
          {title==='' && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Campo tipo não está preenchido</Text>}
          </>
        }

        <View className={"flex flex-col space-y-4 items-start w-full"}>
          <Text className={"font-InterRegular text-lg ml-5 mt-5"}> Fotos: {image.length}/5</Text>
          {image.length===0 && submited && <Text className={"font-InterRegular text-sm text-red-600"}>Carregue ao menos uma foto</Text>}
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
              <View key={index} className={"mx-1 p-2 bg-slate-100 rounded-3xl h-[216px] relative overflow-hidden"}>
              <Image source={{ uri: i }} className={"w-[200px] h-[200px] rounded-2xl"} />
              <View className={"absolute top-0 right-0 m-2 bg-white rounded-full"}>
                <TouchableOpacity onPress={()=>removeImage(index)}>
                  <Ionicons
                    name={"close-outline"}
                    size={35}
                    color={"#F00"}
                  />
                </TouchableOpacity>
              </View>
            </View>)
            )}
          </ScrollView>
        </View>
          
          <Button
            mode="elevated"
            textColor='#474747'
            onPress={handleSubmit}
            className={"mt-4 w-[90%] h-11"}
            disabled={loading}
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
