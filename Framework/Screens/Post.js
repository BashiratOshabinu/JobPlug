import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { Theme } from "../Components/Theme";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Formik } from "formik";
import { useContext, useState, useEffect } from "react";
import { collection, doc, getDoc, onSnapshot, updateDoc, addDoc} from 'firebase/firestore';
import { db } from "../Firebase/settings";
import { AppContext } from "../Components/globalVariables";
import { Picker } from '@react-native-picker/picker';



export function Post({ navigation }) {
  const { userUID, setPreloader, userInfo, setUserInfo } = useContext(AppContext)
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [company, setCompany] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [contactInfo, setContactInfo] = useState(userInfo.email);
  const [description, setDescription] = useState(userInfo.email);
  const [image, setImage] = useState(null);

  

  function handlePost() {
    setPreloader(true)
    addDoc(collection(db, "jobs"), {
      jobTitle,
      jobType,
      jobLocation,
      company,
      workplace,
      contactInfo,
      description,
      userUID,
      creatAt: new Date().getTime(),
      status: "active"
    }).then(() => {
      setPreloader(false)
      Alert.alert(
        "Post Job",
        "Job has been posted successfully",
      )
    }).catch((error) => {
      // console.log(typeof error.code)
      setPreloader(false)
      Alert.alert(
        "Message!",
        errorMessage(error.code),
        [{ text: "Try Again" }]
      )
    })
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{}}
            onSubmit={() => {

            }}

          >

          </Formik>
          <Text style={{ fontFamily: Theme.fonts.text800, fontSize: 29, alignSelf: 'center', }}>Let's create your job post</Text>
          <View>
            <Text style={{ fontFamily: Theme.fonts.text200, marginTop: 10,}}>* indicates required</Text>
            <Text style={styles.Text}>
              Job title*
            </Text>
            <View style={styles.TextInput} >
              <TextInput onChangeText={(inp) => setJobTitle(inp.trim())}
              />
            </View>
            <Text style={styles.Text}>Company*</Text>
            <View style={styles.TextInput}>
              <TextInput
                onChangeText={(inp) => setCompany(inp.trim())} />
            </View>
            <Text style={styles.Text}>Workplace type*</Text>
            <Picker
              selectedValue={workplace}
              onValueChange={(itemValue,) => setWorkplace(itemValue)}>
              <Picker.Item label="On-site" value="On-site" />
              <Picker.Item label="Remote" value="Remote" />
              <Picker.Item label="Hybrid" value="Hybrid" />
            </Picker>
            <View>
            <Text style={styles.Text}  >Job location*</Text>
            </View>
            <View style={styles.TextInput}>
              <TextInput onChangeText={(inp) => setJobLocation(inp.trim())} />
            </View>
            <Text style={styles.Text}>Job type*</Text>
            <Picker
              selectedValue={jobType}
              onValueChange={(itemValue,) => setJobType(itemValue)}
              >
              <Picker.Item label="Full-time" value="Full-time" />
              <Picker.Item label="Part-time" value="Part-time" />
              <Picker.Item label="Internship" value="Internship" />
              <Picker.Item label="Contract" value="Contract" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <Text style={styles.Text}>Contact Info*</Text>
            <View>
              <TextInput style={styles.TextInput}
                onChangeText={(inp) => setContactInfo(inp.trim())}
                value={contactInfo}
                autoCapitalize="none"
                autoComplete="off"
              />
            </View>
            <Text style={styles.Text}>Job Description*</Text>
            <View>
              <TextInput style={styles.TextInput}
                multiline={true}
                numberOfLines={5}
                onChangeText={(inp) => setDescription(inp.trim())}
              />
            </View>


            <TouchableOpacity style={{
              alignItems: 'center', flexDirection: 'row'}}>
              <FontAwesome name="photo" size={20} />
              <Text style={{ fontFamily: Theme.fonts.text300 }}>photo/video</Text>
            </TouchableOpacity>
            <View style={styles.TextInput}>
              <TextInput
                onChangeText={(image) => setImage(image)}
                value="https://images.pexels.com/photos/6694104/pexels-photo-6694104.jpeg?auto=compress&cs=tinysrgb&w=600"
                 />
            </View>
          </View>
          <TouchableOpacity onPress={handlePost} style={[styles.TextInput, { alignItems: 'center', borderColor: Theme.colors.blueMedium, backgroundColor: Theme.colors.blueMedium }]}>
            <Text style={{ fontFamily: Theme.fonts.text300, color: "white" }}>Share now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 20,
    justifyContent: 'space-between',
    

  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  Text: {
    fontFamily: Theme.fonts.text300,
    marginTop: 10,
  }
});