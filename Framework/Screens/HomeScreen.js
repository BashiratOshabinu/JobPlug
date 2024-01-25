import { faBell, faBriefcase, faLocationDot, faMagnifyingGlass, faUser, faUserTie, faAngleRight, faInbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Intro } from './Intro';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../Components/Theme';
import { Profile } from './Profile';
import Carousel from 'react-native-reanimated-carousel';
import { AppContext, } from '../Components/globalVariables';
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/settings';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Post } from '../Screens/Post';
import { Notification } from './Notification';


const CarouselLinks = [
  "https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5673502/pexels-photo-5673502.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4344878/pexels-photo-4344878.jpeg?auto=compress&cs=tinysrgb&w=600"
]



function Home({ navigation }) {
  const width = Dimensions.get("screen").width;
  const { userUID, setUserInfo, userInfo, setPreloader } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  async function getUserInfo() {
    onSnapshot(doc(db, "users", userUID), (snapshot) => {
      // console.log(snapshot.data());
      setUserInfo(snapshot.data())
    })
  }
  function editProfile() {
    setPreloader(true)
    updateDoc(doc(db, "users", userUID), {
      nickname: userInfo.firstName + " " + userInfo.lastName,
      phone: "09024230836",
      lastName: "Hamid"
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

  useEffect(() => {
    //console.log(userInfo);
    onSnapshot(collection(db, "jobs"), (snapshot) => {
      const allData = []
      snapshot.forEach(item => {
        allData.push({ ...item.data(), docID: item.id });

      });
      setJobs(allData);
    })
    getUserInfo()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", }}>
          <View style={{ alignItems: "center", }}>
            <Image source={{ uri: userInfo.image }} defaultSource={require("../../assets/Profilep.png")}
              style={{ width: 50, alignSelf: "center", height: 50, borderWidth: 0, borderRadius: 250, borderColor: 'black', marginTop: 20 }} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Jobs")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginEnd: 10 }} size={25} color={Theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Inbox")}>
            <FontAwesomeIcon icon={faInbox} size={32} color="#2F80ED" />
          </TouchableOpacity>
        </View>
        <ScrollView>

          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={width}
              height={250}
              autoPlay={true}
              data={CarouselLinks}
              scrollAnimationDuration={1000}
              renderItem={({ index }) => (
                <View
                  style={{
                    flex: 1,

                    justifyContent: 'center',
                  }}
                >
                  <Image
                    style={{
                      width: '100%',
                      height: 250,
                      borderRadius: 10,
                    }}
                    source={{ uri: CarouselLinks[index] }}
                  />
                </View>
              )}
            />
          </View>
          <View style={{ marginTop: 10, flex: 1 }}>
            <View style={[styles.topBar, { marginBottom: 10, }]}>
              <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text600 }}>Recent Jobs</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Jobs")} style={styles.allJobs}>
                  <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text500, color: Theme.colors.primary }}>View More</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Jobs")} style={styles.allJobs}>
                  <FontAwesomeIcon icon={faAngleRight} color={Theme.colors.primary} size={14} style={{ marginLeft: 5 }} />
                </TouchableOpacity>

              </View>
            </View>

            <FlatList
              data={jobs}
              renderItem={({ item }) => {
                return (
                  <View style={{ padding: 5, paddingBottom: 10, marginBottom: 10, borderRadius: 3, borderColor: Theme.colors.primary + 20, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Image style={{ width: 90, height: 90 }}
                        source={{ uri: "https://images.pexels.com/photos/3714786/pexels-photo-3714786.jpeg?auto=compress&cs=tinysrgb&w=800" }} />
                      <View style={{ padding: 5, flex: 1 }}>
                        <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600, color: Theme.colors.primary }}>{item.jobTitle}</Text>
                        <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text500 }}>{item.company}</Text>
                      </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Jobs")} style={[styles.allJobs, { paddingStart: 0 }]}>
                      <FontAwesomeIcon icon={faLocationDot} color={Theme.colors.primary} size={15} />
                      <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text500, color: Theme.colors.text }}>{item.jobLocation} ({item.workplace})</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: "#00000008", padding: 5, borderRadius: 5 }}>
                      <Text numberOfLines={2} style={{ fontSize: 15, fontFamily: Theme.fonts.text500, color: Theme.colors.text }}>{item.description}</Text>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Fund")}
                          style={{ borderColor: Theme.colors.primary, borderWidth: 1, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <FontAwesomeIcon icon={faBriefcase} color={Theme.colors.primary} />
                          <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: Theme.colors.primary }}>See detials</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Fund")}
                          style={{ backgroundColor: Theme.colors.primary, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <MaterialCommunityIcons name='briefcase-check' size={20} style={{ color: "white" }} />
                          <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: "white" }}>Apply now</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              }}
              key={({ item }) => { item.id }}
            />
          </View>
        </ScrollView>
      </View>


    </SafeAreaView>
  )
}

const Tab = createBottomTabNavigator();

export function HomeScreen() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let size;
          if (route.name === 'Home') {
            size = focused ? 35 : 23
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Intro') {
            size = focused ? 35 : 23
            iconName = focused ? 'account' : 'account-outline';
          }
          else if (route.name === 'Profile') {

            size = focused ? 35 : 23

            iconName = focused ? 'account-details' : 'account-details-outline';

          }
          else if (route.name === 'Post') {
            size = focused ? 35 : 23
            iconName = focused ? 'plus' : 'plus-box-outline';
          }
          else if (route.name === 'Notification') {
            size = focused ? 35 : 23
            iconName = focused ? 'bell' : 'bell-outline'
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;

        },



        tabBarActiveTintColor: '#2F80ED',

        tabBarInactiveTintColor: '#CCE0F0',

        headerShown: false,

      })}

    >
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name='Post' component={Post} options={{ title: "Post Jobs" }} />

      <Tab.Screen name="Profile" component={Profile} />

      <Tab.Screen name="Notification" component={Notification} />



    </Tab.Navigator>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 5,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})