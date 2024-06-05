import * as React from "react"
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native"
import Header from "../components/Header"
import { getDatabase, ref, remove, get, set, child } from "firebase/database";
import { auth } from "../services/firebaseConfig";

export default function PostItem({ navigation, route }){

  const { data } = route.params

  const [like, setLike] = React.useState(false);

  React.useEffect(()=>{
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const postUid = data.postUid
    const dbRef = ref(getDatabase());

    const likePath = userId + '/' + postUid

    get(child(dbRef, likePath)
  ).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      setLike(true);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error('Error getting data:', error);
    Alert.alert("Erro", "Erro ao buscar data.");
  });
  },[])


  const handleLike = ()=>{
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const postUid = data.postUid

    const likePath = userId + '/' + postUid

    const postData = {like: true}

    set(ref(db, likePath), postData
  ).then(() => {
    console.log('Like!');
    setLike(true);
  }).catch((error) => {
    console.error('Error writing data:', error);
    Alert.alert("Erro", "Erro ao curtir.");
  });
  }

  const handleDeslike = ()=>{
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const postUid = data.postUid

    const likePath = userId + '/' + postUid

    const postData = {like: true}

    remove(ref(db, likePath), postData
  ).then(() => {
    console.log('Deslike!');
    setLike(false);
  }).catch((error) => {
    console.error('Error deleting data:', error);
    Alert.alert("Erro", "Erro ao descurtir.");
  });
  }

  return (
    <View className={"flex-1"}>
      <Header navigation={navigation}/>
      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.images.map((image) => <Image key={image} source={{uri: image}} className={"m-2 rounded-xl w-[300px] h-[300px]"}/>)}
        </ScrollView>
        <View className={"bg-white mt-9 pt-[50px] flex-1 h-[500px] rounded-t-3xl"}>
          {like &&
          <TouchableOpacity onPress={handleDeslike} className={"absolute -top-6 right-10"}>
            <Image source={require("../assets/circle-heart.png")} className={"h-[64px] w-[64px]"}/>
          </TouchableOpacity>}
          {!like &&
          <TouchableOpacity onPress={handleLike} className={"absolute -top-6 right-10"}>
            <Image source={require("../assets/circle-heart-gray.png")} className={"h-[64px] w-[64px]"}/>
          </TouchableOpacity>}
          <View className={"flex flex-row w-[90%] justify-around"}>
            <Text className={"font-InterSemiBold text-2xl mx-4"}>
              {data.title}
            </Text>
            <Text className={"font-InterSemiBold text-2xl ml-6"}>
              R$ {data.price}
            </Text>
          </View>
          <Text className={"font-InterRegular text-base ml-6 mt-11"}>
            Descrição:
            {data.description}
          </Text>

        </View>
      </ScrollView>
    </View>
  )
}