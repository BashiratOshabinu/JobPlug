import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState, useCallback } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export function Landing() {


  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/7550294/pexels-photo-7550294.jpeg?auto=compress&cs=tinysrgb&w=800" }}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.3)', 'rgba(0,0,139,0.6)']}
        style={styles.overlay}
      >
        <SafeAreaView >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 35, marginRight: 240, fontFamily: "Pacifico_400Regular", color: "black", marginBottom: 20 }}>JobPlug</Text>
              <TouchableOpacity style={{ padding: 10, alignItems: 'center', fontFamily: "Raleway_600SemiBold", marginTop: 1, }}>
                <Text style={{ fontSize: 20, fontFamily: "Raleway_600SemiBold", color: "#FFFFFF", }}>Help</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 550, fontFamily: "Raleway_500Medium_Italic", color: "white", }}>"The final solution to unemployment is work"</Text>
            <Text style={{ fontSize: 15, marginTop: 1, fontFamily: "Raleway_600SemiBold", color: "white", marginLeft: 30, }}>Everyone has the right to work, to free choice of employment, to just and favorable conditions of work and to protection against unemployment.</Text>
            <TouchableOpacity style={{ backgroundColor: 'skyblue', borderColor: 'skyblue', borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 5, alignItems: 'center', width: 350, marginLeft: 30, fontFamily: "Raleway_600SemiBold" }}>
              <Text style={{ fontSize: 20, fontFamily: "Raleway_600SemiBold" }}>GET STARTED</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0)', borderColor: 'skyblue', borderWidth: 1, padding: 10, borderRadius: 5, alignItems: 'center', width: 350, marginLeft: 30, fontFamily: "Raleway_600SemiBold", marginTop: 20 }}>
              <Text style={{ fontSize: 20, fontFamily: "Raleway_600SemiBold", color: "skyblue" }}>Learn More</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  }
});