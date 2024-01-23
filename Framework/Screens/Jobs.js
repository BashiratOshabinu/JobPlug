import { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, FlatList } from "react-native";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AppContext } from "../Components/globalVariables";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { faAngleRight, faBriefcase, faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { db } from '../Firebase/settings';


export function Jobs({navigation}) {
  const { userUID, setUserInfo, userInfo, setPreloader } = useContext(AppContext)
  const [jobs, setJobs] = useState([]);

  async function getUserInfo() {
    const userInfo = await getDoc(doc(db, "users", userUID))
    setUserInfo(userInfo.data())
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
          <View style={styles.constainer}>
          <FlatList
              data={jobs}
              renderItem={({ item }) => {
                return (
              <ScrollView>
              
                  <View style={{ marginTop: 10 }}>
                    
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
                      </View>
              </ScrollView>
               )
            }}
            keyExtractor={({ item }) => item}
          />
          </View>
      </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  constainer: {
      flex: 1,
      padding: 10,
      paddingTop: 0,
  },
})