import React, {FunctionComponent} from 'react';
import {
  FlatList,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  Pressable,
} from 'react-native';
import {styles} from '../utils/styles';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ISong, usePlaylistStore} from '../zustand/store';
import BottomPlayer from '../components/BottomPlayer';

type Props = NativeStackScreenProps<NavigatorParams, 'PlaylistDetails'>;
const PlaylistDetails: FunctionComponent<Props> = ({navigation, route}) => {
  const {id, title} = route.params;

  const setSelectedPlayList = usePlaylistStore(
    item => item.setSelectedPlayList,
  );
  const selectedPlayList = usePlaylistStore(item => item.selectedPlayList);

  const currentTrack = usePlaylistStore(item => item.currentTrack);
  const deleteItemFromPlayList = usePlaylistStore(
    item => item.removeSongFromPlaylist,
  );

  const moveSongUp = (index: number) => {
    if (selectedPlayList && index > 0) {
      if (selectedPlayList.songs) {
        const newSongs = [...selectedPlayList.songs];
        [newSongs[index], newSongs[index - 1]] = [
          newSongs[index - 1],
          newSongs[index],
        ];
        setSelectedPlayList({...selectedPlayList, songs: newSongs});
      }
    }
  };

  // Function to move a song down in the list
  const moveSongDown = (index: number) => {
    if (selectedPlayList.songs) {
      if (selectedPlayList && index < selectedPlayList.songs.length - 1) {
        const newSongs = [...selectedPlayList.songs];
        [newSongs[index], newSongs[index + 1]] = [
          newSongs[index + 1],
          newSongs[index],
        ];
        setSelectedPlayList({...selectedPlayList, songs: newSongs});
      }
    }
  };
  const renderItem: ListRenderItem<ISong> = ({item, index}) => {
    return (
      <Pressable
        onLongPress={() =>
          deleteItemFromPlayList(selectedPlayList?.id, item.id)
        }
        style={[styles.listItem, styles.row]}>
        <TouchableOpacity
          style={localstyles.songItem}
          onPress={() => navigation.navigate('MusicPlayer', item)}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
        <View>
          {index !== 0 && (
            <TouchableOpacity onPress={() => moveSongUp(index)}>
              <MaterialCommunityIcon
                name="chevron-up"
                size={20}
                color={'black'}
              />
            </TouchableOpacity>
          )}
          {selectedPlayList?.songs &&
            index !== selectedPlayList?.songs?.length - 1 && (
              <TouchableOpacity onPress={() => moveSongDown(index)}>
                <MaterialCommunityIcon
                  name="chevron-down"
                  size={20}
                  color={'black'}
                />
              </TouchableOpacity>
            )}
        </View>
      </Pressable>
    );
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
          <Text>{title}</Text>
          <View />
        </View>
        <TouchableOpacity
          style={localstyles.button}
          onPress={() =>
            navigation.navigate('AddSong', {
              playlistId: id,
            })
          }>
          <Text style={localstyles.buttonText}>Add Song</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={selectedPlayList?.songs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {currentTrack && <BottomPlayer />}
    </SafeAreaView>
  );
};

const localstyles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
  songItem: {
    width: '80%',
  },
});

export default PlaylistDetails;
