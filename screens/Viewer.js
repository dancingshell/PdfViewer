import React from 'react';
import {View, Text, Button, Platform, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import MainMenu from '../Menus/MainMenu';
import ToolBarWrapper from "../components/ToolBarWrapper";
import Slider from "react-native-slider";
import {Icon} from "expo";

class Viewer extends React.Component {
  state = {
    selectedTab: '',
    activeTool: 'rect',
    attributesActive: false,
    attributes: {
      stroke: 2,
      color: 'red',
      opacity: 0.5
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ToolbarContainer>
          {
            this.state.attributesActive && (
              <AttributesMenu
                attributes={this.state.attributes}
                onChangeAttribute={(attributeType, value) => this.setState({attributes: {...this.state.attributes, [attributeType]: value }})}
              />
            )
          }
          {
            this.state.selectedTab === 'pencil' && (
              <DrawMenu
                activeTool={this.state.activeTool}
                onToolChange={(tool) => this.setState({activeTool: tool})}
                isAttributeMenuActive={this.state.attributesActive}
                toggleAttributeMenu={() => {
                  this.setState({attributesActive: !this.state.attributesActive})
                }}
              />
            )
          }
          <MainMenu selectedTab={this.state.selectedTab} onSelect={(tab) => this.setState({selectedTab: tab})}/>
        </ToolbarContainer>
      </View>
    );
  }
}

function ToolbarContainer({children}) {
  return (
    <View style={{
      flex: 1,
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

function DrawMenu({activeTool, onToolChange, isAttributeMenuActive, toggleAttributeMenu }) {
  return (
    <ToolBarWrapper>
      <Icon.FontAwesome
        onPress={toggleAttributeMenu}
        name={'paint-brush'}
        size={26}
      />
      {
        drawTools.map(toolName =>
          <DrawItem toolName={toolName} isSelected={toolName === activeTool} onPress={() => onToolChange(toolName)}/>
        )
      }
    </ToolBarWrapper>
  )
}

function DrawItem({ toolName, isSelected, onPress }) {
  return (
    <View>
      <Text onPress={onPress} style={{color: isSelected ? 'red': 'black'}}>{toolName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sliders: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  sliderWrapper: {
    flexBasis: '45%',
  },
  attributeLabel: {
    alignItems: 'center',
    width: '100%'
  }
});


export const colorPairs = {
  '#D62C2F': '#A11E21',
  '#B220AA': '#96178F',
  '#6912C3': '#520B9B',
  '#003A92': '#002B6D',
  '#2D78E7': '#1F5EBC',
  '#40BBEF': '#2793C1',
  '#8C002F': '#5D001F',
  '#F47E42': '#BB5A29',
  '#F4BB43': '#CB992F',
  '#7CD511': '#6CBA0F',
  '#06A800': '#058E00',
  '#000000': '#000000',
};
function AttributesMenu({attributes, onChangeAttribute}) {
  return (
    <ToolBarWrapper height={100}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.sliders}>
          <View style={styles.sliderWrapper}>
            <Slider
              style={{height: 20}}
              value={attributes.stroke}
              onValueChange={(stroke) => onChangeAttribute('stroke', stroke)}
              minimumValue={1}
              maximumValue={12}
              step={1}
            />
            <Text style={styles.attributeLabel}>Stroke: {attributes.stroke}</Text>
          </View>
          <View style={styles.sliderWrapper}>
            <Slider
              thumbStyle={{width: 20, height: 20}}
              style={{height: 20}}
              value={attributes.opacity}
              step={.1}
              onValueChange={(opacity) => onChangeAttribute('opacity', opacity)}
            />
            <Text style={styles.attributeLabel}>Opacity: {Math.floor(attributes.opacity * 100)}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {Object.keys(colorPairs).map(color => (
            <Icon.FontAwesome
              onPress={() => onChangeAttribute('color', color)}
              name={'square'}
              size={26}
              style={{borderWidth: 1, borderColor: color === attributes.color ? 'black': 'transparent', padding: 0}}
              color={color}
            />
          ))}
        </View>
      </View>
    </ToolBarWrapper>
  )
}

export default connect()(Viewer);
