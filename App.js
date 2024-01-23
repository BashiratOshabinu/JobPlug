import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Intro } from './Framework/Screens/Intro';
import { Pacifico_400Regular, } from '@expo-google-fonts/pacifico';
import { Raleway_300Light_Italic, Raleway_600SemiBold, Raleway_500Medium_Italic,Raleway_200ExtraLight,Raleway_100Thin,Raleway_300Light,Raleway_400Regular,Raleway_700Bold,Raleway_800ExtraBold,Raleway_900Black, Raleway_500Medium} from '@expo-google-fonts/raleway';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useEffect, useState, useCallback } from "react";
import { HomeScreen } from "./Framework/Screens/HomeScreen";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigator } from './Framework/Navigators/StackNavigator';
import { Profile } from './Framework/Screens/Profile'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider } from './Framework/Components/globalVariables';
import { Preloader } from './Framework/Components/Preloader';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ Pacifico_400Regular });
        await Font.loadAsync({ Raleway_500Medium_Italic });
        await Font.loadAsync({ Raleway_600SemiBold });
        await Font.loadAsync({ Raleway_200ExtraLight });
        await Font.loadAsync({ Raleway_100Thin });
        await Font.loadAsync({ Raleway_300Light });
        await Font.loadAsync({ Raleway_400Regular });
        await Font.loadAsync({ Raleway_700Bold });
        await Font.loadAsync({ Raleway_800ExtraBold });
        await Font.loadAsync({ Raleway_900Black });
        await Font.loadAsync({ Raleway_500Medium });


        

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <AppProvider>
      <Preloader/>
      <StackNavigator/>
      </AppProvider>
      {/* <SafeAreaView>
      <Text>HI</Text>

      </SafeAreaView>
      <Profile/> */}
    </View>
  );
}

//const styles = StyleSheet.create({
//container: {
//flex: 1,
//backgroundColor: '#fff',
//alignItems: 'center',
//justifyContent: 'center',
//},
//});
