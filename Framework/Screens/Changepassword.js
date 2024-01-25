import { Formik } from 'formik';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { Theme } from '../Components/Theme';
import { AppContext } from '../Components/globalVariables';
//import { Formik } from 'formik';
import * as yup from "yup";

const validationSchema = yup.object({
  oldPassword: yup.string().required().min(6).max(20),
  password: yup.string().required().min(6).max(20)
    .oneOf([yup.ref('passwordConfirmation'), null], 'password must match')
})


export function Changepassword({ navigation, route }) {
  const { email, setEmail } = useContext(AppContext)

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ flex: 1 }}></View>
        <ScrollView>
          <View style={styles.container}>

            <Formik
              style={{ flex: 1 }}
              initialValues={{ oldPassword: "", password: "" }}
              onSubmit={(value) => {
                console.log(value);
              }}
              validationSchema={validationSchema}
            >
              {(prop) => {
                return (
                  <View>
                    <Text style={{ fontSize: 40, marginTop: 30, fontWeight: 'bold', fontFamily: "Pacifico_400Regular" }}>Reset Password</Text>
                    <Text style={{ marginTop: 30 }}>Strong passwords include numbers, letters and punctuation marks.</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      <Text> Old Password</Text>
                      <Text style={{ color: 'red' }}>*</Text>
                    </View>
                    <TextInput
                      style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                      placeholderTextColor={"gray"}
                      autoCapitalize="none"
                      secureTextEntry
                      onChangeText={prop.handleChange("oldPassword")}
                      onBlur={prop.handleBlur("oldPassword")}
                      value={prop.values.oldPassword} />
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      <Text>New Password</Text>
                      <Text style={{ color: 'red' }}>*</Text>
                    </View>
                    <TextInput
                      style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                      placeholderTextColor={"gray"}
                      autoCapitalize="none"
                      secureTextEntry
                      onChangeText={prop.handleChange("password")}
                      onBlur={prop.handleBlur("password")}
                      value={prop.values.password} />
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      <Text>Confirm new Password</Text>
                      <Text style={{ color: 'red' }}>*</Text>
                    </View>
                    <TextInput
                      style={{ borderWidth: 1, borderColor: "black", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 20, alignItems: 'center' }}
                      placeholderTextColor={"gray"}
                      autoCapitalize="none"
                      secureTextEntry
                      onChangeText={prop.handleChange("passwordConfirmation")}
                      onBlur={prop.handleBlur("passwordConfirmation")}
                      value={prop.values.passwordConfirmation} />
                    <View style={{ alignItems: 'center', }}>
                      <TouchableOpacity style={{ borderWidth: 1, borderColor: '#2F80ED', padding: 10, borderRadius: 5, fontSize: 20, backgroundColor: '#2F80ED', width: 200, marginBottom: 20, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Reset Password</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>

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