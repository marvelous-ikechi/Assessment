import {createStackNavigator} from '@react-navigation/stack';
import React, {FunctionComponent} from 'react';
import {NavigatorParams} from './types/navigationTypes';
import {NavigationContainer} from '@react-navigation/native';
import Playlist from '../screens/Playlist';
import AddPlaylist from '../screens/AddPlaylist';
import AddSong from '../screens/AddSong';
import PlaylistDetails from '../screens/PlaylistDetails';

const Stack = createStackNavigator<NavigatorParams>();

const Navigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Playlist"
          component={Playlist}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddPlayList"
          component={AddPlaylist}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddSong"
          component={AddSong}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PlaylistDetails"
          component={PlaylistDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
