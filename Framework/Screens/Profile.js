import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image, ScrollView, Modal, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from 'react';
import { AppContext, } from '../Components/globalVariables';


export function Profile({ navigation }) {
    const { setUserInfo, userInfo } = useContext(AppContext)
    const [modalVisibility, setModalVisibility] = useState(false);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>

                        <Image source={{ uri: userInfo.image }}
                            defaultSource={require("../../assets/Profilep.png")}
                            style={{ width: 200, alignSelf: "center", height: 200, borderWidth: 0, borderRadius: 250, borderColor: 'black', marginTop: 20 }} />

                        <View style={{ alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ fontSize: 35, fontWeight: 'bold', fontFamily: Theme.fonts.brand }}>{userInfo.firstName} {userInfo.lastName}</Text>
                            <Text style={{ fontSize: 35, marginTop: 5, fontWeight: 'bold' }}>${userInfo.balance}</Text>
                            <TouchableOpacity style={{
                                paddingHorizontal: 10,
                                padding: 10,
                                borderRadius: 10,
                                marginVertical: 20,
                                backgroundColor: "black"
                            }} onPress={() => navigation.navigate("Funds")}>
                                <Text style={{ color: "white", fontSize: 20 }}>Fund Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.EditProfileBtn} onPress={() => navigation.navigate("EditProfile")}>
                                <Text style={{ color: "white", fontSize: 20 }}>Edit Profile</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.ProfileBtn}>
                            <MaterialCommunityIcons name='account-check' size={30} style={{ paddingRight: 20, color: Theme.colors.primary }} />
                            <Text style={{ color: Theme.colors.primary, fontSize: 20 }}>Verification</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ProfileBtn}>
                            <Ionicons name='settings-sharp' size={30} style={{ paddingRight: 20, color: Theme.colors.primary }} />
                            <Text style={{ color: Theme.colors.primary, fontSize: 20 }}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ProfileBtn} onPress={() => navigation.navigate("Changepassword")}>
                            <FontAwesome5 name='lock' size={30} style={{ paddingRight: 20, color: Theme.colors.primary }} />
                            <Text style={{ color: Theme.colors.primary, fontSize: 20 }}>Change password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ProfileBtn} onPress={() => setModalVisibility(true)}>
                            <SimpleLineIcons name='logout' size={30} style={{ paddingRight: 20, color: Theme.colors.primary }} />
                            <Text style={{ color: Theme.colors.primary, fontSize: 20 }} >Logout</Text>
                        </TouchableOpacity>
                        <Modal visible={modalVisibility}
                            onRequestClose={() => setModalVisibility(false)}
                            animationType="slide"
                            transparent={true}>

                            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 1, }}>


                                <View style={{
                                    backgroundColor: "white", width: '70%', height: 170, borderRadius: 10, paddingHorizontal: 10, padding: 20, justifyContent: "center", alignSelf: "center",
                                }}>
                                    <Text style={{ fontSize: 25, alignSelf: "center", alignItems: "center", color: Theme.colors.primary }} >Are you sure you want to log </Text>
                                    <Text style={{ fontSize: 25, alignSelf: "center", alignItems: "center", marginBottom: 20, color: Theme.colors.primary }}>out?</Text>
                                    <TouchableOpacity style={{ borderRadius: 30, borderColor: Theme.colors.primary, borderWidth: 1, width: "50%", alignSelf: "center", marginBottom: 15, padding: 5, backgroundColor: Theme.colors.primary }}>
                                        <Text style={{ fontSize: 25, alignSelf: "center", color: "white" }}
                                            onPress={() => navigation.navigate("Intro")} >Log Out</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { setModalVisibility(false) }}>
                                        <Text style={{ fontSize: 25, alignSelf: "center", color: Theme.colors.primary }} >Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>
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
        paddingHorizontal: 40,
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        backgroundColor: Theme.colors.primary,
    },
    ProfileBtn: {
        paddingVertical: 40,
        flexDirection: 'row',
        padding: 1,
        alignItems: 'center'
    },
})