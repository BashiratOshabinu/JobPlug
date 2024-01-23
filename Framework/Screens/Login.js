import { useContext } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AppContext } from '../Components/globalVariables';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { authenthication } from '../Firebase/settings';
import { Preloader } from '../Components/Preloader';


const validation = yup.object({
  email: yup.string()
    .required()
    .email("Enter a valid email")
    .min(5)
    .max(30),
  password: yup.string().required().min(8).max(20)
})

export function Login({ navigation, route }) {
  //console.log(route.params.metaData)

  const { email, setEmail, Preloader, setPreloader, setUserUID, } = useContext(AppContext)
  return (

    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: "Pacifico_400Regular", fontSize: 40, marginBottom: 60, color: "#2F80ED" }}>Job</Text>
            <Text style={{ fontFamily: "Pacifico_400Regular", fontSize: 40, marginBottom: 60, color: 'black' }}>Plug</Text>
          </View>
          <Image source={require("../../assets/Login.png")} style={{ width: "100%", height: 380, }} />
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(value) => {
              setPreloader(true)
              //console.log(value)
              signInWithEmailAndPassword(authenthication, value.email, value.password)
                .then(() => {
                  onAuthStateChanged(authenthication, (user) => {
                    setUserUID(user.uid)
                    //console.log(user.uid);
                    setPreloader(false)
                    navigation.navigate("HomeScreen")
                  })
                })
                .catch((error) => {
                  setPreloader(false)
                  //console.log(error);
                  Alert.alert(
                    "Message!",
                    errorMessage(error.code),
                    [{ text: "Try Again" }]
                  )
                })
            }}
            validationSchema={validation}
          >
            {(prop) => {
              return (

                <View>

                  <Text style={{ fontFamily: "Pacifico_400Regular", fontSize: 40, marginLeft: 20, marginBottom: 20 }}>Welcome!</Text>
                  <View style={{ alignItems: 'center', }}>
                    <Text style={{ marginBottom: 10, color: "#2F80ED" }}>sign in to continue</Text>
                    <TouchableOpacity onPress={() => setEmail("biola@gmail.com")}>
                      <Text>{email}</Text>
                    </TouchableOpacity>
                    <TextInput
                      placeholder='Email address'
                      style={{ borderWidth: 1, padding: 10, borderColor: "black", borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                      placeholderTextColor={"gray"}
                      autoCapitalize='none'
                      onChangeText={prop.handleChange("email")}
                      onBlur={prop.handleBlur("email")}
                      value={prop.values.email} />
                    <Text style={{ color: "red", display: prop.errors.email ? "flex" : "none" }}>{prop.errors.email}</Text>
                    <TextInput
                      placeholder='Password'
                      style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                      placeholderTextColor={"gray"}
                      autoCapitalize='none'
                      onChangeText={prop.handleChange("password")}
                      onBlur={prop.handleBlur("password")}
                      value={prop.values.password} />
                    <Text style={{ color: "red", display: prop.touched.password && prop.errors.password ? "flex" : "none" }}>{prop.errors.password}</Text>
                    <TouchableOpacity onPress={prop.handleSubmit}
                      style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'black', width: 200, marginBottom: 20, alignItems: 'center' }}>
                      <Text style={{ color: "white" }}>Login</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              )
            }}

          </Formik>

          <TouchableOpacity onPress={() => navigation.navigate("Changepassword")}>
            <Text style={{ color: "#2F80ED", textAlign: "center" }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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