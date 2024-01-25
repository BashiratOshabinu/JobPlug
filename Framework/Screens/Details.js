import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export function Details() {
    return (
<View style={styles.container}>
              <Text>See details</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: "space-between",
    marginTop: 200
  },
})