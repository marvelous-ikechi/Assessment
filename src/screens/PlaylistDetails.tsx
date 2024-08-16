import React, {FunctionComponent, useEffect} from 'react';
import {
  FlatList,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import {styles} from '../utils/styles';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ISong, usePlaylistStore} from '../zustand/store';

type Props = NativeStackScreenProps<NavigatorParams, 'PlaylistDetails'>;
const PlaylistDetails: FunctionComponent<Props> = ({navigation, route}) => {
  const {id, title, songs} = route.params;

  const setSelectedPlayList = usePlaylistStore(
    item => item.setSelectedPlayList,
  );

  const renderItem: ListRenderItem<ISong> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MusicPlayer', item)}
        style={styles.listItem}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setSelectedPlayList({
      id,
      title,
      songs,
    });
  }, [id, title, songs, setSelectedPlayList]);

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
        data={songs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
});

export default PlaylistDetails;
