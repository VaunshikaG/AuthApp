import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const Loading = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size={'large'} color='#1d9bf0'/>
      <Text>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Loading
