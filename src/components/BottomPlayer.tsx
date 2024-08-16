import React, {FunctionComponent, useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePlaylistStore} from '../zustand/store';

const BottomTrackPlayer: FunctionComponent = () => {
  const currentTrack = usePlaylistStore(item => item.currentTrack);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const setIsCurrentlyPlaying = usePlaylistStore(
    item => item.setIsCurrentlyPlaying,
  );
  const isCurrentlyPlaying = usePlaylistStore(item => item.isCurrentlyPlaying);
  const isPaused = usePlaylistStore(item => item.isPaused);
  const setIsPaused = usePlaylistStore(item => item.setIsPaused);

  const [trackDuration, setTrackDuration] = useState<number>(0);

  const startPlaying = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTrackDuration(prev => {
        if (prev < trackDuration) {
          return prev + 1;
        } else {
          clearInterval(intervalRef.current!);
          return prev;
        }
      });
    }, 1000);
  }, [trackDuration]);

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

  return (
    <View style={localstyles.playerContainer}>
      <Text>{currentTrack?.title}</Text>
      {isCurrentlyPlaying ? (
        <MaterialCommunityIcon
          onPress={pauseSong}
          name="pause"
          size={30}
          color={'black'}
        />
      ) : (
        <MaterialCommunityIcon
          onPress={playSong}
          name="play"
          size={30}
          color="black"
        />
      )}
    </View>
  );
};

const localstyles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'grey',
  },
});

export default BottomTrackPlayer;
