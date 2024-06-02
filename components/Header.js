import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function Header({size, search, navigation}){

  const [searchQuery, setSearchQuery] = React.useState('');

  let hSize = 'h-[100]'
  if (size==='big' && search) hSize='h-[300]'
  else if (size==='big' || size === 'medium' && search) hSize='h-[200]'

  return (
    <View>
      <View className={hSize + " w-full bg-[#FF7A00] rounded-b-[20px] z-0 absolute"}/>
      <View className={"flex items-center justify-center mt-7"}>
        <Text className={"text-[60px] text-rose-60 text-white font-LibreBarcode mb-5"}>VIJO</Text>
        {search && <Searchbar
          placeholder="Pesquisar"
          onChangeText={setSearchQuery}
          onIconPress={()=>search(searchQuery)}
          value={searchQuery}
        />}
      </View>
      {navigation && <TouchableOpacity
        onPress={() => navigation.goBack()}
        className={"z-10 absolute m-8"}
      >
        <View className={"w-[40px] h-[40px]"}>
          <Ionicons
            name={"arrow-back"}
            size={35}
            color={"#FFF"}
          />
        </View>
      </TouchableOpacity>}
    </View>
  )
}