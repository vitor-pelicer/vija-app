import * as React from "react"
import { View, ScrollView, Text } from "react-native"
import Header from "../components/Header"
import PostCard from "../components/PostCard"
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import listTargetObjects from '../utils/listTargetObjects';
import EmptyWarning from "../components/EmptyWarning";
import { auth } from "../services/firebaseConfig";

export default function MyLikes({navigation, route}){
  const [posts, setPosts] = React.useState([])
  const [likes, setLikes] = React.useState([]);
  const [filteredPosts, setFilteredPosts] = React.useState([])

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

  React.useEffect(()=>{
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    const likePath = userId

    get(child(dbRef, likePath)
  ).then((snapshot) => {
    if (snapshot.exists()) {
      const obj = snapshot.val()
      const keys = Object.keys(obj);
      setLikes(keys);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error('Error getting data:', error);
    Alert.alert("Erro", "Erro ao buscar data.");
  });
  },[])

  React.useEffect(()=>{
    setFilteredPosts(posts.filter(post => likes.includes(post.postUid)))
  }, [posts, likes])

  return (
    <View>
      <ScrollView>
        <Header navigation={navigation}/>
        {filteredPosts.map((data) => <PostCard key={data.postUid} navigation={navigation} data={data} />)}
      </ScrollView>
      {posts.length===0 && <EmptyWarning/>}
    </View>
  )

}