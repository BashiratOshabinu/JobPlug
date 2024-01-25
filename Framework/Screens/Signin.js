import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { AppContext } from '../Components/globalVariables';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup'
import { createUserWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth';
import { authenthication, db } from '../Firebase/settings';
import { useContext } from 'react';
import { collection, setDoc, doc } from 'firebase/firestore';

const validation = yup.object({
  email: yup.string()
    .required()
    .email("Enter a valid email")
    .min(5)
    .max(30),
  password: yup.string().required().min(8).max(20),
  firstName: yup.string().required().min(1).max(15),
  lastName: yup.string().required().min(1).max(15)
})


export function Signin({ navigation, route }) {
  const { setPreloader } = useContext(AppContext)
  console.log(route.params)

  const { setUserUID } = useContext(AppContext)
  return (

    <SafeAreaView style={{ flex: 1, }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ flex: 1 }}>
        </View>


        <ScrollView>


          <View>
            <View>
              <Text style={{ fontSize: 40, color: 'black', fontWeight: 'bold', alignSelf: 'flex-start', textAlign: "left", marginTop: 200 }}>Create New Account</Text>
              <View style={{ alignItems: 'center', }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: "gray", fontSize: 18 }}>Already Registered? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Text style={{ marginBottom: 10, fontWeight: "bold", color: "black", fontSize: 20 }}>Login</Text>
                  </TouchableOpacity>
                </View>
                <Formik
                  initialValues={{ email: "", password: "", firstName: "", lastName: "", homeAddress: "", gender: "" }}
                  onSubmit={(value) => {
                    setPreloader(true)
                    //console.log(value)
                    createUserWithEmailAndPassword(authenthication, value.email, value.password)
                      .then(() => {
                        onAuthStateChanged(authenthication, (user) => {
                          const userUID = user.uid
                          setUserUID(userUID)
                          setDoc(doc(db, "users", userUID), {
                            balance: 0,
                            email: value.email,
                            firstName: value.firstName,
                            lastName: value.lastName,
                            homeAddress: value.homeAddress,
                            gender: value.gender,
                            accountStatus: "active",
                            image: null
                          }).then(() => {
                            setPreloader(false)
                          })
                          navigation.navigate("HomeScreen")
                        })
                      })
                      .catch((error) => {
                        console.log(error);
                        setPreloader(false)
                        Alert.alert(
                          "Message",
                          ErrorMessage(error.code),
                          [{ text: "Try Again" }]
                        )
                      })
                  }}
                  validationSchema={validation}
                >
                  {(prop) => {
                    return (
                      <View>
                        <TextInput
                          placeholder='First Name'
                          style={{ borderWidth: 1, padding: 10, borderRadius: 20, borderColor: "black", fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                          placeholderTextColor={"gray"}
                          onChangeText={prop.handleChange("firstName")}
                          onBlur={prop.handleBlur("firstName")}
                          value={prop.values.firstName} />
                        <TextInput
                          placeholder='Last Name'
                          style={{ borderWidth: 1, padding: 10, borderRadius: 20, borderColor: "black", fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                          placeholderTextColor={"gray"}
                          onChangeText={prop.handleChange("lastName")}
                          onBlur={prop.handleBlur("lastName")}
                          value={prop.values.lastName} />
                        <TextInput
                          placeholder='Home Address'
                          style={{ borderWidth: 1, padding: 10, borderRadius: 20, borderColor: "black", fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                          placeholderTextColor={"gray"}
                          onChangeText={prop.handleChange("homeAddress")}
                          onBlur={prop.handleBlur("homeAddress")}
                          value={prop.values.homeAddress} />
                        <TextInput
                          placeholder='Gender'
                          style={{ borderWidth: 1, padding: 10, borderRadius: 20, borderColor: "black", fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                          placeholderTextColor={"gray"}
                          onChangeText={prop.handleChange("gender")}
                          onBlur={prop.handleBlur("gender")}
                          value={prop.values.gender} />
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
                          secureTextEntry
                          onChangeText={prop.handleChange("password")}
                          onBlur={prop.handleBlur("password")}
                          value={prop.values.password} />
                        <Text style={{ color: "red", display: prop.errors.password ? "flex" : "none" }}>{prop.errors.password}</Text>

                        <TouchableOpacity onPress={prop.handleSubmit} >
                          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: "center", marginBottom: 20, backgroundColor: "black", padding: 10, width: 350, }} >Signup</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                </Formik>
              </View>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    backgroundColor: 'white',
    justifyContent: "flex-middle"



  },
})