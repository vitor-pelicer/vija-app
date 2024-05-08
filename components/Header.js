import * as React from 'react';
import { View, Text} from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function Header({size, search}){

  const [searchQuery, setSearchQuery] = React.useState('');

  let hSize = 'h-[100]'
  if (size==='big' && search) hSize='h-[300]'
  else if (size==='big' || size === 'medium' && search) hSize='h-[200]'

  return (
    <View>
      <View className={hSize + " w-full bg-[#FF7A00] rounded-b-[20px] z-0 absolute"}/>
      <View className={"flex items-center justify-center mt-7"}>
        <Text className={"text-[60px] text-rose-60 text-white font-LibreBarcode mb-5"}>VIJO</Text>
        <Searchbar
          placeholder="Pesquisar"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

    </View>
  )
}