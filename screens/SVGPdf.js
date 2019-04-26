import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Svg } from 'expo';
const { Circle, G } = Svg;
import TouchHandler from '../utils/touch/touchHandler';
import PdfViewer from '../components/PdfViewer';
import MarkupViewer from '../components/MarkupViewer';

const touchPlaygroundStyle = {
  height: 500,
  width: '100%',
  backgroundColor: '#AA1050',
};

export default class SVGPdf extends Component {
  static navigationOptions = {
    title: 'SVG',
  };
  constructor(props) {
    super(props);
    this.state = {
      initial: {
        x: 0,
        y: 0,
      },
      final: {
        x: 0,
        y: 0,
      },
      touchEvent: {},
      touching: 'false',
      scale: 1,
      transform: {
        scale: 1,
        x: 0,
        y: 0,
      }
    };
    this.currentTouch = null;
  }
  render() {
    return (
      <MarkupViewer></MarkupViewer>
      // <View
      //   // style={touchPlaygroundStyle}
      //   // onStartShouldSetResponderCapture={() => true}
      //   onTouchStart={(e) => {
      //     this.setState({touching: e.nativeEvent.touches[0].pageX});
      //     this.currentTouch = new TouchHandler(e);
      //   }}
      //   onTouchMove={(e) => {
          
      //     this.setState({touching: `x: ${e.nativeEvent.touches[0].pageX} y: ${e.nativeEvent.touches[0].pageY}` });
      //     if (!this.currentTouch) this.currentTouch = new TouchHandler(e);
      //     this.currentTouch.move(e);
      //     this.setState({scale: this.currentTouch.pinchMatrix().a, transform: this.currentTouch.pinchMatrix()});
      //   }}
      //   onTouchEnd={(e) => {
      //     this.setState({touching: 'end'});
      //     this.currentTouch = null;
      //   }}
      // >
      //   <PdfViewer></PdfViewer>
      //   {/* <Svg x="0" y="0" height="100%" width="100%" viewBox="0 0 100 100">
      //     <Circle
      //       on
      //       cx="50"
      //       cy="50"
      //       r={this.state.scale * 45}
      //       stroke="blue"
      //       strokeWidth="2.5"
      //       fill="green"
      //     />
      //   </Svg> */}

      // </View>
    );
  }
}