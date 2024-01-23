import { View, Text, StatusBar, Pressable, SafeAreaView, Dimensions, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Button, FlatList, ScrollView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState} from 'react';
import { AppContext, } from '../Components/globalVariables';
import { doc, updateDoc, } from 'firebase/firestore';
import { Modal } from 'react-native';
import { Theme } from '../Components/Theme';
import * as Imagepicker from "expo-image-picker";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { db, imgStorage } from '../Firebase/settings';


export function EditProfile({ navigation }) {
  const { setUserInfo, setPreloader, userInfo, userUID } = useContext(AppContext)
  const [image, setImage] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [preVisibility, setpreVisibility] = useState(false);
  const [imageMD, setimageMD] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [homeAddress, sethomeAddress] = useState(userInfo.homeAddress);
  const [email, setEmail] = useState(userInfo.email);
  const [gender, setGender] = useState(userInfo.gender);
  const width = Dimensions.get("screen").width
  const height = Dimensions.get ("screen").width
  const [description, setDescription] = useState(userInfo.email);

  

  useEffect(() => {
    // setPreloader(false)
}, []);

const closeModal = () => {
    setModalVisibility(!modalVisibility);
};
const previewModal = () => {
    setpreVisibility(!preVisibility);
};

const imageModal = () => {
    setimageMD(!imageMD);
};

async function picker() {
    const result = await Imagepicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    })
    console.log(result);
    if (!result.canceled){
      const {uri} = result.assets[0];
      setImage(uri)
      uplaodToStorage();
  }
}
async function uplaodToStorage() {
  try {
      let response = await fetch(image);
      console.log(response);
      const imageBlob = await response.blob()
      await imgStorage().ref().child(`ProfileImages/${userUID}`).put(imageBlob);
  } catch {
      setPreloader(false)
      Alert.alert(
          "Upload Status",
          "Failed to upload profile image. Please try again",
          [{ text: 'OK' }]
      )
  }
}

function editProfile() {
    setPreloader(true)
    updateDoc(doc(db, "users", userUID), {
        firstName,
        lastName,
        email,
        homeAddress,

    }).then(() => {
        setPreloader(false)
        Alert.alert(
            "Edit Profile",
            "Profile has been edited successfully",
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
    <View style={styles.container}>
      <View>
        <View style={{ marginTop: 30, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <FontAwesomeIcon icon={faArrowLeftLong} size={30} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 30, textAlign: "center", color: 'white' }}>Edit Profile</Text>
        <View >
        <View style={{ position: "relative" }}>
          <Pressable onPress={() => {imageModal(); setModalVisibility(true)}}>
          <Image source={require("../../assets/G.png")} style={{ width: 200, alignSelf: "center", height: 200, borderWidth: 0, borderRadius: 250, borderColor: 'black', marginTop: 20 }} />
          </Pressable>
          </View>
        <TouchableOpacity onPress={() => {closeModal(); picker()}}>
          <MaterialCommunityIcons name="camera-outline" size={40} color="black" style={{ position: 'absolute', bottom: 7, right: 110, zIndex: 9999 }} />
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
      <View>
        <Text style={{ fontSize: 20, marginTop: 70, }}>First Name</Text>
        <TextInput
          placeholder={userInfo.firstName}
          style={{ borderWidth: 1, padding: 10, borderRadius: 20, borderColor: "white", fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 10, alignItems: 'center', }}
          placeholderTextColor={"gray"}
          keyboardType='default'
                            autoCapitalize='words'
                            mode='outlined'
                            onChangeText={(text) => setFirstName(text.trim())}
                            value={firstName} />
          <Text style={{ fontSize: 20,  }}>Last Name</Text>
        <TextInput
          placeholder={userInfo.lastName}
          style={{ borderWidth: 1, padding: 10, borderRadius: 20, borderColor: "white", fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 10, alignItems: 'center', }}
          placeholderTextColor={"gray"}
          keyboardType='default'
                            mode='outlined'
                            autoCapitalize='words'
                            onChangeText={(text) => setLastName(text.trim())}
                            value={lastName} />
        <Text style={{ fontSize: 20, marginTop: 10, }}>Email Address</Text>
        <TextInput
          placeholder={userInfo.email}
          style={{ borderWidth: 1, padding: 10, borderColor: "white", borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 10, alignItems: 'center' }}
          placeholderTextColor={"gray"} />
        <Text style={{ fontSize: 20, marginTop: 10, }}>Home Address</Text>
           
        <TextInput
          placeholder={userInfo.homeAddress}
          style={{ borderWidth: 1, borderColor: "white", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 10, alignItems: 'center' }}
          placeholderTextColor={"gray"} />
                  


        <Text style={{ fontSize: 20, marginTop: 10, }}>Gender</Text>

        <TextInput
          placeholder={userInfo.gender}
          style={{ borderWidth: 1, borderColor: "white", padding: 10, borderRadius: 20, fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 10, alignItems: 'center' }}
          placeholderTextColor={"gray"} />
        <TouchableOpacity onPress={editProfile} >
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: "center", marginTop: 20, padding: 10, width: 100, borderWidth: 1, borderColor: "black", alignSelf: "center", backgroundColor: 'black',  }}>Update</Text>
        </TouchableOpacity>
      </View>
      <Modal visible= {modalVisibility} onRequestClose={()=> setModalVisibility(false)}
      animationType='slide'
      transparent={true}
      >
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end", padding:1,}}>
          <Pressable style={{ flex: 1 }} onPress={closeModal} >
            </Pressable>
            <View style={{ backgroundColor: "white", width: '100%', height: 250, borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingHorizontal:10, padding: 50
        }}>
            
              <TouchableOpacity>
              <View style={{ flexDirection: "row", }} >
            <FontAwesomeIcon icon={faImage} color={Theme.colors.primary} size={25} />
            <Text style= {{alignItems: "center", fontSize: 25,marginBottom: 10, color: Theme.colors.primary, marginLeft: 10}}>Choose from library</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity>
            <View style={{ flexDirection: "row", }} >
            <FontAwesomeIcon icon={faCamera} color={Theme.colors.primary} size={25} />
            <Text style= {{alignItems: "center", fontSize: 25, marginBottom: 10, color: Theme.colors.primary, marginLeft: 10 }}>Take photo</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{ flexDirection: "row", }} >
            <FontAwesomeIcon icon={faTrash} color={"red"} size={25} />
            <Text style= {{alignItems: "center", fontSize: 25, marginBottom: 25, color: "red" }}>Remove current photo</Text>
            </View>
            </TouchableOpacity>
            <Pressable onPress={() => {setModalVisibility(false)}}>
              <Text style= {{alignItems: "center", fontSize: 25, marginBottom: 10,color: Theme.colors.primary, alignSelf: "center"}}>Cancel</Text>
            </Pressable>

            
            </View>
            
        </View>
      </Modal>
      </ScrollView>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    backgroundColor: '#2F80ED',


  },
  
})