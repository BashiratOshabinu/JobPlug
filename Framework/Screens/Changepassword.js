import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';



export function Changepassword(){
  return(
    <View style={styles.container}>
    <View>
      <Text style={{fontSize: 40, marginTop: 30, fontWeight: 'bold', fontFamily: "Pacifico_400Regular"}}>Reset Password</Text>
      <Text style={{ marginTop: 30}}>Strong passwords include numbers, letters and punctuation marks.</Text>
      <View style={{flexDirection: 'row', marginTop: 10}}>
      <Text>New Password</Text>
      <Text style={{color:'red'}}>*</Text>
      </View>
      <TextInput
     placeholder=''
     style={{borderWidth: 1, borderColor:"black", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom:20, alignItems: 'center' }}
     placeholderTextColor={"gray"}/>
     <View style={{flexDirection: 'row', marginTop: 10}}>
     <Text>Confirm new Password</Text>
     <Text style={{color:'red'}}>*</Text>
     </View>
     <TextInput
      placeholder='' 
      style={{borderWidth: 1, borderColor:"black", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom:20, alignItems: 'center' }}
      placeholderTextColor={"gray"}/>
      <View style={{  alignItems: 'center',}}>
      <TouchableOpacity style={{borderWidth: 1, borderColor:'#2F80ED', padding: 10, borderRadius: 5, fontSize: 20, backgroundColor: '#2F80ED', width: 200, marginBottom:20, alignItems: 'center' }}>
      <Text style={{ fontWeight:'bold'}}>Reset Password</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: "space-between",
    marginTop: 200
  },
})