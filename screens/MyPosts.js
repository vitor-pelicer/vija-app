import * as React from "react"
import { View, ScrollView, Text } from "react-native"
import Header from "../components/Header"
import PostCard from "../components/PostCard"
import { getDatabase, ref, onValue } from "firebase/database";
import listTargetObjects from '../utils/listTargetObjects';
import EmptyWarning from "../components/EmptyWarning";

export default function MyPosts({navigation, route}){
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

  return (
    <View>
      <ScrollView>
        <Header navigation={navigation}/>
        {posts.map((data) => <PostCard key={data.postUid} navigation={navigation} data={data} />)}
      </ScrollView>
      {posts.length===0 && <EmptyWarning/>}
    </View>
  )

}