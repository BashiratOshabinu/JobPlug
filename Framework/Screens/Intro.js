import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image} from 'react-native';
import { useEffect, useState, useCallback } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../Components/Theme';


export function Intro({ navigation }){

  

  return(
    <SafeAreaView style={{ flex: 1, }}>
      <View style={ styles.container}>
        <View>
        <Image source={require("../../assets/Joblogo.png")} style={{ width: 150, height: 100}}/>
        <Image source={ require("../../assets/interview.png")} style={{ width: "100%", height: 400, }}/>
        <Text style={{ fontSize: 20, textAlign:"center" }}>
          Welcome to JobPlug, where opportunites await! Your gateway to a world of career possibilities
        </Text>
        </View>
        <View>
        <TouchableOpacity style={ styles.appBTN }  onPress={() => navigation.navigate("Signin")}>
        <Text style={{ fontSize: 16, }}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ [styles.appBTN, { backgroundColor: "white"}] }  onPress={() => navigation.navigate("Login", {metaData: "Stella Adonis"})}>
          <Text style={{ fontSize: 16, color: "#2F80ED"}}>Sign in</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
            
          
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight: 0,
    padding: 20,
    justifyContent: "space-between",

  },
  appBTN: {
    borderWidth: 1,
    borderColor: "#2F80ED",
    borderRadius: 40,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#2F80ED",
    marginVertical: 5

  }
});