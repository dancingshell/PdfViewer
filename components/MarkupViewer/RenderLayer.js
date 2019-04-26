import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Svg } from 'expo';
const { Circle, G } = Svg;
import TouchHandler from '../utils/touch/touchHandler';

const touchPlaygroundStyle = {
  height: 500,
  width: '100%',
  backgroundColor: '#AA1050',
};

export default class RenderLayer extends Component {
  static navigationOptions = {
    title: 'RenderLayer',
  };

  render() {
    return (
      <View
        style={touchPlaygroundStyle}
        // onStartShouldSetResponderCapture={() => true}
      >
        <Svg height="100%" width="100%" viewBox={`0 0 ${this.props.pageWidth} ${this.props.pageHeight}`}>
          {this.circle()}
        </Svg>

      </View>
    );
  }

  circle() {
    return <Circle on cx="50" cy="50" r={this.state.scale * 45} stroke="blue" strokeWidth="2.5" fill="green" />;
  }
}
