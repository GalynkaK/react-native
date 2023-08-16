import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import RegistrationScreen from './src/Screens/RegistrationScreen.jsx';
import LoginScreen from './src/Screens/LoginScreen.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.imgBg}
          source={require('./assets/image/bg.jpg')}
        >
          <RegistrationScreen />
          <LoginScreen />

          <StatusBar style="auto" />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imgBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});