import React from 'react';
import {View, Text, Button, Platform} from 'react-native';
import {Svg} from 'expo';
import { connect } from 'react-redux';
import Toolbar from '../components/ToolBar';

class Viewer extends React.Component {
  state = {
    selectedTab: '',
    activeTool: 'rect'
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ToolbarContainer>
          {
            this.state.selectedTab === 'pencil' && (
              <DrawMenu activeTool={this.state.activeTool} onToolChange={(tool) => this.setState({activeTool: tool})}/>
            )
          }
          <Toolbar selectedTab={this.state.selectedTab} onSelect={(tab) => this.setState({selectedTab: tab})}/>
        </ToolbarContainer>
      </View>
    );
  }
}

function ToolbarContainer({children}) {
  return (
    <View style={{
      flex:1,
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      justifyContent: 'flex-end'
    }}
    >
      {children}
    </View>
  )
}

const drawTools = [
 'freehand',
  'line',
  'arrow',
  'rect',
  'ellipse',
  'cloud'
];


function DrawMenu({activeTool, onToolChange}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {
        drawTools.map(toolName =>
          <DrawItem toolName={toolName} isSelected={toolName === activeTool} onPress={() => onToolChange(toolName)}/>
        )
      }
    </View>
  )
}

function DrawItem({ toolName, isSelected, onPress }) {
  return (
    <View>
      <Text onPress={onPress} style={{color: isSelected ? 'red': 'black'}}>{toolName}</Text>
    </View>
  )
}

export default connect()(Viewer);
