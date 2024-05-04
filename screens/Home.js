import * as React from 'react';
import { Button, View, Text} from 'react-native';

export default function Home({ navigation, route }) {

  return (
    <View>
        <View className={"h-[300] w-full bg-[#FF7A00] rounded-b-[20px] z-0 absolute"}/>
      <View className={"flex items-center justify-center mt-10"}>
        <Text className={"text-lg text-rose-60 text-white font-barcode"}>
          VIJA </Text>
      </View>

    </View>
  );
}