import * as React from "react"
import { View, ScrollView, Text } from "react-native"
import Header from "../components/Header"
import PostCard from "../components/PostCard"
import { getDatabase, ref, onValue } from "firebase/database";
import listTargetObjects from '../utils/listTargetObjects';
import EmptyWarning from "../components/EmptyWarning";

export default function PostSearch({navigation, route}){
  const { type, title } = route.params
  const [posts, setPosts] = React.useState([])

  const update = ()=>{
    const db = getDatabase();
    const dataRef = ref(db, 'posts/');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const objects = listTargetObjects(data);
      setPosts(objects)
      console.log("atualizou");
    });
  }

  React.useEffect(update, [])

  const selectedPosts = posts.filter((post)=> (!title || post.title.toLowerCase().includes(title.toLowerCase())) && (!type || post.type === type))

  const search = (searchQuery)=>{
    navigation.push("PostSearch", {title:searchQuery, type: type})
  }

  return (
    <View>
      <ScrollView>
        <Header search={search} navigation={navigation}/>
        {type && <Text className={"font-InterSemiBold text-lg ml-5 mt-3"}>
          Tipo: {type}
        </Text>}
        { title && <Text className={"font-InterSemiBold text-lg  ml-5 mt-3"}>
          Busca: {title}
        </Text>}
        {selectedPosts.map((data) => <PostCard key={data.postUid} navigation={navigation} data={data} />)}
      </ScrollView>
      {posts.length===0 && <EmptyWarning/>}
    </View>
  )

}