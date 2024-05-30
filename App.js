import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import SettingsScreen from './screens/SettingsScreen';
import TabBar from './components/TabBar';
import { SafeAreaView } from 'react-native-safe-area-context'

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Tab = createBottomTabNavigator();

function App() {

  const [fontsLoaded, fontError] = useFonts({
    'LibreBarcode': require('./assets/fonts/LibreBarcode128Text-Regular.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf')
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  print(fontsLoaded)

  return (
    <SafeAreaView className={"flex-1"}>
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen 
          name="Home"
          component={Home} 
          options={{
            tabBarIcon: 'home', // Nome do ícone para a guia Home
            headerShown: false
          }}
          />
          <Tab.Screen 
          name="Settings"
          component={SettingsScreen} 
          options={{
            tabBarIcon: 'settings', // Nome do ícone para a guia Home
            headerShown: false
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
export default App;