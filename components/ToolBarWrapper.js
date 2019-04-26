import React from 'react';
import {Platform, View} from 'react-native';

export default function ToolBarWrapper({ height = 50, children}) {
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
      height,
      alignItems: 'center',
      backgroundColor: '#fbfbfb'
    }}>
      <View style={{flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
        {children}
      </View>
    </View>
  );
}

