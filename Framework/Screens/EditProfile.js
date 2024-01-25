import { View, Text, StatusBar, Pressable, SafeAreaView, Dimensions, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Button, FlatList, ScrollView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faCamera, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from 'react';
import { AppContext, } from '../Components/globalVariables';
import { doc, updateDoc, } from 'firebase/firestore';
import * as React from 'react';
import { Modal } from 'react-native';
import { Theme } from '../Components/Theme';
import * as Imagepicker from "expo-image-picker";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, imgStorage, storage } from '../Firebase/settings'


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
  const height = Dimensions.get("screen").width
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
      mediaType: Imagepicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    })
    console.log(result);
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri)
      previewModal();;
    }
  }
  async function fetchProfilePic() {
    const reference = ref(storage, `ProfileImages/${userUID}`);
    await getDownloadURL(reference).then(userImg => {
      updateDoc(doc(db, "users", userUID), {
        image: userImg
      }).then(() => {
        Alert.alert(
          "Profile Image uploaded",
          "Your profile picture has been uploaded successfully!",
        );
        setPreloader(false)
      })
        .catch(() => {
          Alert.alert(
            "Upload Status",
            "Failed to update profile image. Please try again",
          )
          setPreloader(false);
        })
    }).catch(() => {
      setPreloader(false);
    })
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

  function handleUpload() {
    setPreloader(true)
    uplaodToStorage().then(() => {
      fetchProfilePic()
    })
  }

  function editProfile() {
    setPreloader(true)
    updateDoc(doc(db, "users", userUID), {
      firstName,
      lastName,
      email,
      homeAddress,
      gender,

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
      <View style={styles.body}>
        {/* <ScrollView > */}
        <View style={{ marginTop: 30, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <FontAwesomeIcon icon={faArrowLeftLong} size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ position: "relative", alignItems: "center", marginTop: 30 }}>
          <View style={{ position: "relative" }}>
            <Pressable onPress={imageModal}>
              <Image source={{ uri: userInfo.image }}
                defaultSource={require("../../assets/Profilep.png")}
                style={styles.ProfileImage} />
            </Pressable>
            <TouchableOpacity onPress={closeModal} style={styles.BtnIcon}>
              <FontAwesomeIcon icon={faCamera} color="white" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>

          <View style={styles.formContainer}>
            <Text style={styles.signupText}>First Name</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType='default'
              placeholder={userInfo.firstName}
              autoCapitalize='words'
              mode='outlined'
              onChangeText={(text) => setFirstName(text.trim())}
              value={firstName}
            />

            <Text style={styles.signupText}>Last Name</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType='default'
              placeholder={userInfo.lastName}
              mode='outlined'
              autoCapitalize='words'
              onChangeText={(text) => setLastName(text.trim())}
              value={lastName}
            />

            <Text style={styles.signupText}>Home Address</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType='default'
              placeholder={userInfo.homeAddress}
              mode='outlined'
              autoCapitalize='none'
              onChangeText={(text) => sethomeAddress(text.trim())}
              value={homeAddress}
            />

            <Text style={styles.signupText}>Email</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType='default'
              placeholder={userInfo.email}
              mode='outlined'
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <Text style={styles.signupText}>Gender</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType='default'
              placeholder={userInfo.gender}
              mode='outlined'
              onChangeText={(text) => setGender(text)}
              value={gender}
            />
            <TouchableOpacity onPress={editProfile}
              style={[styles.getStarted, { marginHorizontal: 10 }]}>
              <Text style={{ fontFamily: Theme.fonts.text600, fontSize: 16, color: "white" }}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>


      {/* <=======================> Image Methods <=======================> */}
      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Pressable style={{ flex: 1 }} onPress={closeModal} >
          </Pressable>
          <View style={{ backgroundColor: "#16171D", height: 170, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color={Theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
            <View>

              <TouchableOpacity onPress={() => {
                closeModal(); picker()
              }}>
                <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row", }}>
                  <FontAwesomeIcon
                    icon={faImage}
                    color={Theme.colors.primary}
                    size={25}
                  />
                  <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>Gallery</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: Theme.colors.primary,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  margin: 10, marginTop: 0
                }}
              />
              <TouchableOpacity onPress={() => {
                closeModal()
              }}>
                <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row" }}>
                  <FontAwesomeIcon
                    icon={faCamera}
                    color={Theme.colors.primary}
                    size={25}
                  />
                  <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>
                    Camera
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </Modal>

      {/* <====================> Preview Image before Uploading <====================> */}
      <Modal
        visible={preVisibility}
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Pressable style={{ flex: 1 }} onPress={previewModal} >
          </Pressable>
          <View style={{ backgroundColor: '#16171D', height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <View style={{ alignItems: 'flex-end', margin: 10 }}>
              <TouchableOpacity onPress={previewModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  color='grey'
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', padding: 5, justifyContent: 'center' }}>
              <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 400, }} />
            </View>
            <TouchableOpacity onPress={() => { previewModal(); handleUpload() }}
              style={[styles.getStarted, { marginHorizontal: 10 }]}>
              <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16, color: "white" }}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ============================> Profile Modal <============================ */}
      <Modal
        visible={imageMD}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, backgroundColor: "#16171df4" }}>
          <Pressable style={{ flex: 1 }} onPress={imageModal} >
          </Pressable>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: userInfo.image }}
              defaultSource={require("../../assets/Profilep.png")}
              style={{ width: width - 5, height: width - 5 }}
            />
          </View>
          <Pressable style={{ flex: 1 }} onPress={imageModal} >
          </Pressable>
        </View>
      </Modal>
    </View >
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F80ED',

  },
  body: {
    flex: 1,
    marginHorizontal: 10,
  },

  BtnIcon: {
    position: "absolute",
    bottom: 0,
    right: 40,
    zIndex: 11,
  },
  ProfileImage: {
    width: 200,
    height: 200,
    borderRadius: 250, borderWidth: 0
  },
  text1: {
    color: '#787A8D',
    marginTop: 10,
    fontSize: 23,
    fontWeight: 'bold'
  },
  formContainer: {
    padding: 10,
    marginTop: 10
  },
  inputStyle: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: "100%",
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  getStarted: {
    backgroundColor: Theme.colors.primary,
    padding: 13,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'black',

  },
  signupText: {
    color: "black",
    marginBottom: 5,
    fontSize: 15
  },
  calenderIcon: {
    backgroundColor: Theme.colors.primary,
    position: "absolute",
    padding: 8,
    top: 4,
    right: 4,
    borderRadius: 90
  },
  login: {
    flexDirection: 'row',
  },
  terms: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red'
  },
  textBelow: {
    // flexDirection:'row',
    // justifyContent:'space-between'
    alignItems: 'center'
  }
})
