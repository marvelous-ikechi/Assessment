/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import React from 'react';
import Navigator from './src/navigation/navigator';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <Navigator />
    </>
  );
}

export default App;
