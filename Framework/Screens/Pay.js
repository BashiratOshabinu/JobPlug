import {View, Text, Alert, ToastAndroid } from "react-native";
import { Paystack } from 'react-native-paystack-webview';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useContext } from "react";
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";

export function Pay({ navigation, route }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const { amount } = route.params
    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey={"pk_test_218f4560ecb1cdee5e6d9e48483023bfd00694ae"}
                amount={amount + ((1.8 / 100)* amount)}
                billingEmail={userInfo.email}
                activityIndicatorColor={Theme.colors.green}
                onCancel={() => {
                    navigation.goBack()
                }}
                onSuccess={() => {
                  updateDoc(doc(db, "users", userUID), {
                    balance: amount + Number(userInfo.balance)
                  }).then(() => {
                    Alert.alert(
                      "Payment successful",
                      `Payment of ${ amount } was successful`,
                      [{text: "Ok", onPress: ()=> navigation.goBack() }]
                    )
                  })

                }}
                autoStart={true}
            />
        </View>
    )
}