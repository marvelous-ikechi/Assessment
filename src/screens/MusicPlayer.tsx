import React, {FunctionComponent, useCallback, useEffect, useRef} from 'react';
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const setCurrentTrack = usePlaylistStore(item => item.setCurrentTrack);
  const setTrackQueue = usePlaylistStore(item => item.setTrackQueue);
  const selectedPlayList = usePlaylistStore(item => item.selectedPlayList);
  const currentTrack = usePlaylistStore(item => item.currentTrack);
  const setIsCurrentlyPlaying = usePlaylistStore(
    item => item.setIsCurrentlyPlaying,
  );
  const setIsPaused = usePlaylistStore(item => item.setIsPaused);
  const isCurrentlyPlaying = usePlaylistStore(item => item.isCurrentlyPlaying);

  const startPlaying = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTrackDuration(prev => {
        if (prev < duration) {
          return prev + 1;
        } else {
          clearInterval(intervalRef.current!);
          return prev;
        }
      });
    }, 1000);
  }, [duration]);

  const playSong = useCallback(() => {
    setIsCurrentlyPlaying(true);
    setIsPaused(false);
    startPlaying();
  }, [setIsCurrentlyPlaying, setIsPaused, startPlaying]);

  const pauseSong = useCallback(() => {
    setIsPaused(true);
    setIsCurrentlyPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [setIsPaused, setIsCurrentlyPlaying]);

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
    const track = {
      title,
      duration,
      id,
    };
    setCurrentTrack(track);
  }, [title, duration, id, setCurrentTrack]);

  useEffect(() => {
    if (currentTrackDuration >= duration) {
      next();
    }
  }, [currentTrackDuration, duration, next]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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

          {isCurrentlyPlaying ? (
            <MaterialCommunityIcon
              onPress={pauseSong}
              name="pause"
              size={30}
              color="black"
            />
          ) : (
            <MaterialCommunityIcon
              onPress={playSong}
              name="play"
              size={30}
              color="black"
            />
          )}

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
