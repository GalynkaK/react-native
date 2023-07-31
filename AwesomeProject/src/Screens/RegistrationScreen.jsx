import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const initialFocusState = {
  username: false,
  email: false,
  password: false,
};

SplashScreen.preventAutoHideAsync();

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusInput, setIsFocusInput] = useState(initialFocusState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const openPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [fontsLoaded] = useFonts({
    RobotoRegular: require('../../assets/fonts/Roboto-Regular.ttf'),
    RobotoMedium: require('../../assets/fonts/Roboto-Medium.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/image/bg.jpg')}
          style={styles.ImageBackground}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
            <View onLayout={onLayoutRootView}>
              <View style={{
                ...styles.formWrapper,
                ...Platform.select({
                  ios: {
                    marginTop: isShowKeyboard ? 350 : 216,
                  },
                  android: {
                    marginTop: isShowKeyboard ? -100 : 0,
                  },
                }),
              }}>
                <View style={steles.avatarBox}>
                  <Image style={styles.avatar}
                    source={require('../../assets/image/avatar.png')} />
                  <TouchableOpacity style={styles.addAvatarBtn}
                    activeOpacity={0.8} >
                    <MaterialCumm
                  </TouchableOpacity>
                </View>
              </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}