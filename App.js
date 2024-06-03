import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font';
import TabHome from './navigation/TabHome';


function App() {

  const [fontsLoaded, fontError] = useFonts({
    'LibreBarcode': require('./assets/fonts/LibreBarcode128Text-Regular.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  print(fontsLoaded)

  return (
    <SafeAreaView className={"flex-1"}>
      <TabHome/>
    </SafeAreaView>
  );
}
export default App;