import {createStackNavigator} from '@react-navigation/stack';
import React, {FunctionComponent} from 'react';
import {NavigatorParams} from './types/navigationTypes';
import {NavigationContainer} from '@react-navigation/native';
import Playlist from '../screens/Playlist';

const Stack = createStackNavigator<NavigatorParams>();

const Navigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Playlist" component={Playlist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
