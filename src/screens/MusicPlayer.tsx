import React, {FunctionComponent, useCallback} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {styles} from '../utils/styles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

type Props = NativeStackScreenProps<NavigatorParams, 'MusicPlayer'>;
const MusicPlayer: FunctionComponent<Props> = ({navigation, route}) => {
  const {title, duration} = route.params;
  const [currentTrackDuration, setCurrentTrackDuration] =
    React.useState<number>(0);

  const playSong = useCallback(() => {
    const interval = setInterval(() => {
      currentTrackDuration < duration &&
        setCurrentTrackDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTrackDuration, duration]);

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
          <MaterialCommunityIcon name="skip-previous" size={30} color="black" />
          <MaterialCommunityIcon
            onPress={() => playSong()}
            name="play"
            size={30}
            color="black"
          />
          <MaterialCommunityIcon name="skip-next" size={30} color="black" />
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
