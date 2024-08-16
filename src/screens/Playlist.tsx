import React, {FunctionComponent} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ListRenderItem,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {styles} from '../utils/styles';
import {IPlaylist, usePlaylistStore} from '../zustand/store';

type Props = NativeStackScreenProps<NavigatorParams, 'Playlist'>;

const Playlist: FunctionComponent<Props> = ({navigation}) => {
  const setSelectedPlayList = usePlaylistStore(
    state => state.setSelectedPlayList,
  );

  const handleListPress = (item: IPlaylist) => {
    setSelectedPlayList(item);
    navigation.navigate('PlaylistDetails', item);
  };

  const renderItem: ListRenderItem<IPlaylist> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleListPress(item)}
        style={localstyles.playListItem}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const playlistData = usePlaylistStore(item => item.playlists);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Playlist</Text>
          <MaterialCommunityIcon
            onPress={() => navigation.navigate('AddPlayList')}
            name="plus-circle"
            size={30}
            color="black"
          />
        </View>
        <FlatList
          data={playlistData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const localstyles = StyleSheet.create({
  playListItem: {
    borderWidth: 1,
    padding: 4,
    height: 40,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default Playlist;
