import { faBell, faBriefcase, faLocationDot, faMagnifyingGlass, faUser, faUserTie, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, FlatList,Alert} from 'react-native';
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


const CarouselLinks = [
  "https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/543946https://images.pexels.com/photos/18848929/pexels-photo-18848929/free-photo-of-confident-beautiful-asian-woman-in-suit-is-smiling-during-job-interview-in-office-environment.jpeg?auto=compress&cs=tinysrgb&w=6009/pexels-photo-5439469.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/5439481/pexels-photo-5439481.jpeg?auto=compress&cs=tinysrgb&w=800"
]



function Home() {
  const width = Dimensions.get("screen").width;
  const { userUID, setUserInfo, userInfo, setPreloader } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  async function getUserInfo() {
    const userInfo = await getDoc(doc(db, "users", userUID))
    setUserInfo(userInfo.data())
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
        allData.push({ ...item.data(), docId: item.id });

      });
      setJobs(allData);
    })
    getUserInfo()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: 5 }}>
          <View style={{ alignItems: "center", gap: 5, flexDirection: 'row' }}>
            <FontAwesomeIcon icon={faUserTie} size={30} color="#2F80ED" />
            <Text style={{ fontSize: 18 }}>{userInfo.firstName} {userInfo.lastName}</Text>
          </View>
          <TextInput placeholder='Search' style={{ padding: 10, borderRadius: 15, fontSize: 20, backgroundColor: '#CCE0F0', width: 200, marginBottom: 20, alignItems: 'center' }} placeholderTextColor={"black"} />
          <TouchableOpacity>
            <FontAwesomeIcon icon={faBell} size={30} color="#2F80ED" />
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
          <View style={{ marginTop: 10 }}>
            <View style={[styles.topBar, { marginBottom: 10 }]}>
              <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text600 }}>Recent Jobs</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Jobs")} style={styles.allJobs}>
                <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text500, color: Theme.colors.primary }}>View More</Text>
                <FontAwesomeIcon icon={faAngleRight} color={Theme.colors.primary} size={14} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={jobs}
              renderItem={({ item }) => {
                return (
                  <View style={{ padding: 5, paddingBottom: 10, marginBottom: 10, borderRadius: 3, borderColor: Theme.colors.primary + 20, borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Image style={{ width: 90, height: 90 }}
                        source={{ uri: "https://media.licdn.com/dms/image/C4E0BAQG8bdX5sQ24KQ/company-logo_100_100/0/1630619679689/crossover__logo?e=1713398400&v=beta&t=sWqKXP-u1sDu1EY8JCTLC-cCW7yTv9vF3l4t2zIoytM" }} />
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
              keyExtractor={({ item }) => item}
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


    </Tab.Navigator>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: "space-between"
  },
})