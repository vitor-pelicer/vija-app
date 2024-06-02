import * as React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import TypeProductCarousel from '../components/TypeProductCarousel';
import PostCard from '../components/PostCard';


export default function Home({ navigation, route }) {
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

  const posts = [
    {
      title: "Corola 2012",
      description: "Veículo de segundo dono (adquirido com 28 mil quilômetros). Atualmente com 111 mil quilômetros rodados (estepe nunca utilizado). Em excelente estado de conservação estética e mecânica.",
      images: ["https://cdn.grupolance.com.br/batches/3b/20810/c36bbd258b7ee694eb987221b2b197b0.", "https://autovenice.com.br/wp-content/uploads/2011/03/toyota-corolla-2012-0031.jpg",],
      price: "60000",
      ownerId: "2",
      type: "carro",
      key:"1",
    },
    {
      title: "Apto Guaruja Pitangueiras",
      description: "05 minutos do Shoping La Plage, Praia Verde Beach Club Heineken, calçadão da praia, 4 qtos sendo 2 suites, armarios, 4 banheiros, ar condicionado split",
      images: ["https://viagemeturismo.abril.com.br/wp-content/uploads/2023/11/Apartamento-com-vista-para-o-mar-Guaruja-Sao-Paulo-Brasil-2.png?w=720&h=440&crop=1", "https://vault.imob.online/u0243/properties/photos/15161526/IBPxDc4D3n5XqnVXmCdzDQgU-64c686ff-72e2-4c9a-a1b3-f6361c098017.jpg"],
      price: "450000",
      ownerId: "3",
      type: "imóvel",
      key:"2",
    },
    {
      title: "Yamaha Fazer 250 2020",
      description: "Garantia LC Motos de 3 meses ou 3.000 km para o motor e câmbio. No cartão de crédito, em até 18x com juros e financiamento!",
      images: ["https://ipva2023.pro.br/wp-content/uploads/2022/10/fazer.webp", "https://http2.mlstatic.com/D_NQ_NP_868933-MLB74998311775_032024-O.webp"],
      price: "17600",
      ownerId: "4",
      type: "moto",
      key:"3",
    },
    {
      title: "iPhone 15 Pro",
      description: "128GB / 100% bateria",
      images: ["https://conteudo.imguol.com.br/c/noticias/92/2023/09/14/iphone-15-pro-max-1694672848007_v2_3x4.jpg", "https://i.zst.com.br/thumbs/12/25/34/-1114443995.jpg"],
      price: "5000",
      ownerId: "5",
      type: "celular",
      key:"4",
    }
  ]

  const handleClick = (type)=>{
    navigation.push("PostSearch", { type: type})
  }

  const search = (searchQuery)=>{
    navigation.push("PostSearch", {title:searchQuery})
  }

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
        {posts.map((data) => <PostCard key={data.key} navigation={navigation} data={data} />)}
      </ScrollView>
    </View>
  );
}