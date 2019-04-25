import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default class PdfViewer extends React.Component {
  render() {
    return (
      <Image source={require('../kiwis_lizard_sanctuary.png')} style={{flex: 1, height: undefined, width: undefined}} resizeMode="contain"/>
    )
  }
}
