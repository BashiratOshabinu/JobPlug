import { View, StatusBar, SafeAreaView, StyleSheet, ImageBackground,ScrollView, TextInput, TouchableOpacity, Image, Alert, Text } from "react-native";



export function Notification (){
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Text>Notification</Text>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    backgroundColor: "white",
    justifyContent: "space-between"
  }
})