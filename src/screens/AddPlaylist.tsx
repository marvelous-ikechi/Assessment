import React, {FunctionComponent} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../utils/styles';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {IPlaylist, usePlaylistStore} from '../zustand/store';

type Props = NativeStackScreenProps<NavigatorParams, 'AddPlayList'>;

const AddPlaylist: FunctionComponent<Props> = ({navigation}) => {
  const [playListTitle, setPlayListTitle] = React.useState<string>('');

  const playlist = usePlaylistStore(item => item.playlists);

  const addPlaylist = usePlaylistStore(item => item.addPlaylist);

  const handleAddPlaylist = () => {
    const newPlaylist: IPlaylist = {
      id: playlist.length + 1,
      title: playListTitle,
      songs: [],
    };
    addPlaylist(newPlaylist);
    navigation.navigate('Playlist');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.row}>
          <MaterialCommunityIcon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={30}
            color="black"
          />
          <Text>Add Playlist</Text>
          <MaterialCommunityIcon
            onPress={() => handleAddPlaylist()}
            name="check"
            size={30}
            color="blue"
            disabled={playListTitle.length === 0}
          />
        </View>
        <View style={localstyles.textInputContainerStyle}>
          <Text>Name</Text>
          <TextInput
            placeholder="Playlist Name"
            style={localstyles.textInput}
            placeholderTextColor={'grey'}
            onChangeText={text => setPlayListTitle(text)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const localstyles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  textInputContainerStyle: {
    marginTop: 10,
  },
});

export default AddPlaylist;
