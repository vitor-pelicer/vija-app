import * as React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import TypeProductCarousel from '../components/TypeProductCarousel';
import PostCard from '../components/PostCard';
import { getDatabase, ref, onValue } from "firebase/database";
import listTargetObjects from '../utils/listTargetObjects';
import EmptyWarning from '../components/EmptyWarning';


export default function Home({ navigation, route }) {

  const [posts, setPosts] = React.useState([])

  const carouselData = [
    {
      title: "carro",
      image: "https://s1.1zoom.me/big0/819/Peugeot_308_White_White_background_512805_1280x768.jpg",
      key:1,
    },
    {
      title: "moto",
      image: "https://www.webmotors.com.br/wp-content/uploads/2020/05/11153531/Honda-CG-Cargo-160.jpg",
      key:2,
    },
    {
      title: "celular",
      image: "https://static.vecteezy.com/ti/vetor-gratis/p3/11765951-modelo-de-smartphone-branco-apple-iphone-14-pro-novidade-da-industria-papel-de-parede-original-maquete-para-web-design-em-um-fundo-branco-gratis-vetor.jpg",
      key:3,
    },
    {
      title: "eletrodoméstico",
      image: "https://electrolux.vtexassets.com/arquivos/ids/228171/ea_ea_Refrigerator_IF45S_Front_Electrolux_Portuguese-1000x1000-1.jpg?v=638234022535370000",
      key:4,
    },
    {
      title: "imóvel",
      image: "https://fotos.vivadecora.com.br/decoracao-casa-moderna-casa-j-a-fachada-externa-revisitearquiteturaeconstru-295624-proportional-height_cover_medium.jpg",
      key:5,
    }
  ]


  const handleClick = (type)=>{
    navigation.push("PostSearch", { type: type})
  }

  const search = (searchQuery)=>{
    navigation.push("PostSearch", {title:searchQuery})
  }

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
        <Header size={'big'} search={search}/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {carouselData.map((data) => 
          <TouchableOpacity key={data.key} onPress={()=> handleClick(data.title)} >
            <TypeProductCarousel  data={data}/>
          </TouchableOpacity>
          )}
        </ScrollView>
        {posts.map((data) => <PostCard key={data.postUid} navigation={navigation} data={data} />)}
      </ScrollView>
      {posts.length===0 && <EmptyWarning/>}
    </View>
  );
}