import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity,Image } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { AppContext, } from '../Components/globalVariables';


export function Profile({navigation}) {
    const { setUserInfo, userInfo } = useContext(AppContext)
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
           
            <Image source={ require("../../assets/G.png")} style={{ width: 200, alignSelf: "center",height:200, borderWidth: 0, borderRadius: 250, borderColor: 'black', marginTop: 20}}/>                
            
            <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={{fontSize: 35,  }}>{userInfo.firstName} {userInfo.lastName}</Text>
                <TouchableOpacity style={styles.EditProfileBtn} onPress={() => navigation.navigate("EditProfile")}>
                    <Text >Edit Profile</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View>
                <TouchableOpacity style={styles.ProfileBtn}>
                    <MaterialCommunityIcons name='account-check' size={30} style={{paddingRight: 20 }}/>
                    <Text >Verification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ProfileBtn}>
                    <Ionicons name='settings-sharp' size={30} style={{paddingRight: 20}} />
                    <Text >Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ProfileBtn} onPress={() => navigation.navigate("Changepassword")}>
                    <FontAwesome5 name='lock' size={30} style={{paddingRight: 20}}/>
                    <Text >Change password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ProfileBtn}>
                    <SimpleLineIcons name='logout' size={30} style={{paddingRight: 20}}/>
                    <Text >Logout</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        // alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between'
        
    },
    EditProfileBtn: {
        borderWidth: 1,
        paddingHorizontal: 40,
        padding: 10,
        borderRadius: 10,
        marginVertical: 20
    },
    ProfileBtn:{
        paddingVertical: 40,
        flexDirection: 'row',
        padding: 1,
        alignItems: 'center'
    },
})