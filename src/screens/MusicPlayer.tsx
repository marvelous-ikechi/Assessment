import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {styles} from '../utils/styles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import {usePlaylistStore} from '../zustand/store';

type Props = NativeStackScreenProps<NavigatorParams, 'MusicPlayer'>;
const MusicPlayer: FunctionComponent<Props> = ({navigation, route}) => {
  const {title, duration, id} = route.params;
  const [currentTrackDuration, setCurrentTrackDuration] =
    React.useState<number>(0);

  const setCurrentTrack = usePlaylistStore(item => item.setCurrentTrack);
  const setTrackQueue = usePlaylistStore(item => item.setTrackQueue);
  const selectedPlayList = usePlaylistStore(item => item.selectedPlayList);
  const currentTrack = usePlaylistStore(item => item.currentTrack);

  const playSong = useCallback(() => {
    const interval = setInterval(() => {
      currentTrackDuration < duration &&
        setCurrentTrackDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTrackDuration, duration]);

  const next = useCallback(() => {
    const currentTrackIndex = selectedPlayList?.songs?.findIndex(
      item => item.id === currentTrack?.id,
    );
    if (selectedPlayList?.songs && currentTrackIndex !== undefined) {
      // Check if the current track is the last one in the playlist
      if (currentTrackIndex < selectedPlayList.songs.length - 1) {
        const nextTrack = selectedPlayList.songs[currentTrackIndex + 1];
        setCurrentTrack(nextTrack);
        setCurrentTrackDuration(0);
        setTrackQueue(selectedPlayList?.songs);
      } else {
        // Stop playback if it's the last track in the queue
        setCurrentTrackDuration(duration);
      }
    }
  }, [
    currentTrack,
    selectedPlayList,
    setCurrentTrack,
    setTrackQueue,
    duration,
  ]);

  const previous = useCallback(() => {
    const currentTrackIndex = selectedPlayList?.songs?.findIndex(
      item => item.id === currentTrack?.id,
    );
    if (selectedPlayList?.songs && currentTrackIndex !== undefined) {
      const previousTrack =
        selectedPlayList?.songs[currentTrackIndex - 1] ||
        selectedPlayList?.songs[selectedPlayList?.songs?.length - 1];
      setCurrentTrack(previousTrack);
      setCurrentTrackDuration(0);
      setTrackQueue(selectedPlayList?.songs);
    }
  }, [currentTrack, selectedPlayList, setCurrentTrack, setTrackQueue]);

  useEffect(() => {
    setCurrentTrack({
      title,
      duration,
      id,
    });
  }, [title, duration, id, setCurrentTrack]);

  useEffect(() => {
    if (currentTrackDuration >= duration) {
      next();
    }
  }, [currentTrackDuration, duration, next]);

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
          <Text>{currentTrack?.title}</Text>
          <View />
        </View>
        <Slider
          style={localstyles.slider}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="black"
          maximumTrackTintColor="black"
          thumbTintColor="#FFFF"
          value={currentTrackDuration}
        />
        <View style={styles.row}>
          <MaterialCommunityIcon
            onPress={previous}
            name="skip-previous"
            size={30}
            color="black"
          />
          <MaterialCommunityIcon
            onPress={() => playSong()}
            name="play"
            size={30}
            color="black"
          />
          <MaterialCommunityIcon
            onPress={next}
            name="skip-next"
            size={30}
            color="black"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const localstyles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 40,
  },
});

export default MusicPlayer;
