import React, {FunctionComponent} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {NavigatorParams} from '../navigation/types/navigationTypes';
import {styles} from '../utils/styles';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<NavigatorParams, 'MusicPlayer'>;
const MusicPlayer: FunctionComponent<Props> = ({navigation, route}) => {
  const {title} = route.params;
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
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;
