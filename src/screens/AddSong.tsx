import React, {FunctionComponent, useMemo} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../utils/styles';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {ISong, usePlaylistStore} from '../zustand/store';

type Props = NativeStackScreenProps<NavigatorParams, 'AddSong'>;

const AddSong: FunctionComponent<Props> = ({navigation, route}) => {
  const {playlistId} = route.params;
  const [songTitle, setSongTitle] = React.useState<string>('');

  const playlist = usePlaylistStore(item => item.playlists);
  const addSongToPlaylist = usePlaylistStore(item => item.addSongToPlaylist);

  const songs: ISong[] = useMemo(() => {
    const allSongs = playlist.find(item => item.id === playlistId)?.songs || [];
    return allSongs;
  }, [playlist, playlistId]);

  const handleAddSongToPlayList = () => {
    const newSong = {
      id: songs.length + 1,
      title: songTitle,
      duration: 5,
    };
    addSongToPlaylist(playlistId, newSong);
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
          <Text>Add Song</Text>
          <MaterialCommunityIcon
            onPress={() => handleAddSongToPlayList()}
            name="check"
            size={30}
            color="blue"
            disabled={setSongTitle.length === 0}
          />
        </View>
        <View style={localstyles.textInputContainerStyle}>
          <Text>Name</Text>
          <TextInput
            placeholder="song title"
            style={localstyles.textInput}
            placeholderTextColor={'grey'}
            onChangeText={text => setSongTitle(text)}
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

export default AddSong;
