import React from 'react';
import { withExpoSnack } from 'nativewind';
import tn from 'twrnc';

import { Text, View } from './components/BaseComponents';

const App = () => {
  return (
    <View className="flex-1 items-center justify-center" style={tn`flex bg-red-200`}>
      <Text className="text-orange-500 text-xl">
        Try editing me! 🎉
      </Text>
    </View>
  );
}
export default withExpoSnack(App);