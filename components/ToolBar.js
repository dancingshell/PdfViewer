import React from 'react';
import {Platform, View} from 'react-native';
import MenuIcon from './ToolMenuItem';

const icons = {
  'tennisball': 'Select',
  'pencil': 'Draw',
  'textbox': 'Text',
  'gavel': 'Stamp'
};

export default function ToolBar({selectedTab = 'tennisball', onSelect}) {
  return (
    <View style={{
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: 0 },
          shadowOpacity: 1,
          shadowRadius: 0,
        },
        android: {
          elevation: 20,
        },
      }),
      height: 50,
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
    }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {Object.keys(icons).map(icon =>
          <MenuIcon
            key={icon}
            label={icons[icon]}
            icon={icon}
            focused={selectedTab === icon}
            onClick={(iconName) => onSelect(iconName)}
          />
        )}
      </View>
    </View>
  );
}
