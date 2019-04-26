import React from 'react';
import {View} from 'react-native';
import MenuIcon from './../components/ToolMenuItem';
import ToolbarWrapper from './../components/ToolBarWrapper';

const icons = {
  'hand-pointer-o': 'Select',
  'pencil': 'Draw',
  'text-width': 'Text',
  'tag': 'Stamp'
};

export default function MainMenu({selectedTab = 'tennisball', onSelect}) {
  return (
    <ToolbarWrapper>
      {Object.keys(icons).map(icon =>
        <MenuIcon
          key={icon}
          label={icons[icon]}
          icon={icon}
          focused={selectedTab === icon}
          onClick={(iconName) => onSelect(iconName)}
        />
      )}
    </ToolbarWrapper>
  );
}

