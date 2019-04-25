import React from 'react'
import { StyleSheet, View } from 'react-native'
import PdfReader from 'rn-pdf-reader-js'
import { Constants } from 'expo'

export default class PdfViewer extends React.Component {
  render() {
    return (
      <PdfReader source={{ uri: 'http://binder-staging1.procoretech-qa.com/v4/d/us-east-1/pro-core.com/prostore/20180926221938_staging9_9130.pdf?sig=80db235e45ea95f5ae6d975e3493ce50fad9f0e862a6d3b066570d64920baab0' }} />
    )
  }
}
