import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../Screens/HomeScreen';
import { Intro } from '../Screens/Intro';
import { NavigationContainer } from '@react-navigation/native';
import { Profile } from '../Screens/Profile';
import { Signin } from '../Screens/Signin';
import { Login }  from '../Screens/Login';
import { Changepassword } from '../Screens/Changepassword';
import { EditProfile } from '../Screens/EditProfile';
import { Post } from '../Screens/Post';

const Stack = createNativeStackNavigator();

export function StackNavigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false}} >
        <Stack.Screen name="Intro" component={ Intro} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="Changepassword" component={ Changepassword } />
        <Stack.Screen name="EditProfile" component={ EditProfile } />
        <Stack.Screen name="Post" component={ Post } />




      </Stack.Navigator>
    </NavigationContainer>
  );
}