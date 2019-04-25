import React from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

class Viewer extends React.Component {
  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}
export default Viewer
// export default connect()(Viewer);
