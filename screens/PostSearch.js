import * as React from "react"
import { View, ScrollView, Text } from "react-native"
import Header from "../components/Header"
import PostCard from "../components/PostCard"

export default function PostSearch({navigation, route}){
  const { type, title } = route.params

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
        {selectedPosts.map((data) => <PostCard key={data.key} navigation={navigation} data={data} />)}
      </ScrollView>
    </View>
  )

}