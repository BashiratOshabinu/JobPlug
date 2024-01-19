import { View, Text, StatusBar, Pressable, SafeAreaView, Dimensions, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState} from 'react';
import { AppContext, } from '../Components/globalVariables';
import { doc, updateDoc, } from 'firebase/firestore';
import { Modal } from 'react-native';
import { Theme } from '../Components/Theme';
import * as Imagepicker from "expo-image-picker"


export function EditProfile({ navigation }) {
  const { setUserInfo, setPreloader, userInfo } = useContext(AppContext)
  const [image, setImage] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [preVisibility, setpreVisibility] = useState(false);
  const [imageMD, setimageMD] = useState(false);
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [address, setaddress] = useState(userInfo.address);
  const [phone, setphone] = useState(userInfo.phone);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const width = Dimensions.get("screen").width

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
}

function editProfile() {
    setPreloader(true)
    updateDoc(doc(db, "users", userUID), {
        firstName,
        lastName,
        phone,
        nickname,
        address,

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
        <View style={{ position: "relative" }}>
                        <Pressable onPress={imageModal}>
          <Image source={require("../../assets/G.png")} style={{ width: 200, alignSelf: "center", height: 200, borderWidth: 0, borderRadius: 250, borderColor: 'black', marginTop: 20 }} />
          </Pressable>
          </View>
        <TouchableOpacity onPress={picker} >
          <FontAwesomeIcon icon={faCamera} size={40} color="black" style={{ position: 'absolute', bottom: 7, right: 110, zIndex: 9999 }} />
        </TouchableOpacity>

      </View>
      <View>
        <Text style={{ fontSize: 20, marginTop: 70, }}>Name</Text>
        <TextInput
          placeholder={userInfo.firstName + " " + userInfo.lastName}
          style={{ borderWidth: 1, padding: 10, borderRadius: 20, borderColor: "white", fontSize: 20, backgroundColor: 'white', width: 350, marginBottom: 10, alignItems: 'center', }}
          placeholderTextColor={"gray"} />
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
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} >
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textAlign: "center", marginTop: 20, padding: 10, width: 100, borderWidth: 1, borderColor: "black", alignSelf: "center", backgroundColor: 'black' }}>Update</Text>
        </TouchableOpacity>
      </View>
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