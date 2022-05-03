import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

const Popupmessage = ({ title, subtitle, visible, onPress }) => {
  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Overlay>
    </View>
  )
}

export default Popupmessage

const styles = StyleSheet.create({
  title:{
    fontSize: 20
  },
  subtitle: {
    fontSize: 16
  }
})