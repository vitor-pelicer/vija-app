import * as React from "react"
import { Image, View, ScrollView, Text, TouchableWithoutFeedback } from "react-native"
import { useRoute } from '@react-navigation/native';
import { Menu, Modal, PaperProvider, Portal } from "react-native-paper";
import { getDatabase, ref, remove } from "firebase/database";

export default function PostCard({ navigation, data }){

  const route = useRoute();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  
  const handlePressHomeStack = ()=>{
    navigation.push("PostItem", {data: data})
  }
  const handlePressMyPosts = ()=>{
    showModal()
  }
  const handlePress = route.name==='MyPosts' ? handlePressMyPosts : handlePressHomeStack;

  const handleEdit= ()=>{}

  const handleView= ()=>{
    navigation.navigate('Home');
    navigation.push("PostItem", {data: data})
  }

  const handleDelete= ()=>{
    const db = getDatabase();
    const userId = data.userId;
    const postUid = data.postUid;
    const postPath = 'posts/' + userId + '/' + postUid
    remove(ref(db, postPath));
  }
  
  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Menu.Item leadingIcon="pencil" onPress={() => {}} title="Editar" />
          <Menu.Item leadingIcon="eye" onPress={handleView} title="Visualizar" />
          <Menu.Item leadingIcon="delete" onPress={handleDelete} title="Excluir" />
        </Modal>
      </Portal>
      <View className={"flex flex-col bg-white rounded-2xl overflow-hidden m-3"}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.images.map((image) => 
            (<TouchableWithoutFeedback key={image} onPress={handlePress}>
              <Image source={{uri: image}} className={"m-2 rounded-xl w-[300px] h-[300px]"}/>
            </TouchableWithoutFeedback>)
          )}
        </ScrollView>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View>
            <Text className={"font-InterSemiBold text-lg mx-4"}>
              {data.title}
            </Text>
            <Text className={"font-InterSemiBold text-base ml-6 mb-4"}>
              R$ {data.price}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </PaperProvider>
  )
}