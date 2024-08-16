import React, {FunctionComponent} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from '../utils/styles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const MusicPlayer: FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <MaterialCommunityIcon name="chevron-left" size={30} color="black" />
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;
