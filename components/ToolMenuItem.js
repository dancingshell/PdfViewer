import React from 'react';
import { Icon } from 'expo';
import { Platform, TouchableOpacity, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default function ToolMenuIcon({icon, label, focused, onClick}) {
  return (
    <TouchableOpacity
      onPress={() => onClick(icon)}
      style={{
        flex: 1,
        width: 50,
        height: 50,
      }}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon.FontAwesome
          name={icon}
          size={26}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
        <Text style={{color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

