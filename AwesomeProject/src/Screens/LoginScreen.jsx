import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const initialState = {
  email: '',
  password: '',
};

const initialFocuseState = {
  email: false,
  password: false,
};

SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusInput, setIsFocusInput] = useState(initialFocuseState);

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
    setState(initialState);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/image/bg.jpg')}
          style={styles.imageBg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View onLayout={onLayoutRootView}>
              <View
                style={{
                  ...styles.formWrapper,

                  ...Platform.select({
                    ios: {
                      marginTop: isShowKeyboard ? 456 : 0,
                    },
                    android: {
                      marginTop: isShowKeyboard ? -50 : 0,
                    },
                  }),
                }}
              >
                <Text
                  style={{
                    ...styles.title,
                    marginTop: isShowKeyboard ? 24 : 0,
                  }}
                >
                  Увійти
                </Text>

                <View
                  style={{
                    paddingBottom: isShowKeyboard
                      ? 32
                      : 111,
                  }}
                >
                  <View style={styles.inputMail}>
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor: isFocusInput.email
                          ? '#FF6C00'
                          : '#F6F6F6',
                        backgroundColor:
                          isFocusInput.email
                            ? '#FFFFFF'
                            : '#F6F6F6',
                      }}
                      textAlign={'left'}
                      placeholderTextColor={'#BDBDBD'}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      value={state.email}
                      placeholder="Адреса електронної пошти"
                      onFocus={() => {
                        setIsShowKeyboard(true),
                          setIsFocusInput({
                            ...isFocusInput,
                            email: true,
                          });
                      }}
                      onBlur={() => {
                        setIsFocusInput({
                          ...isFocusInput,
                          email: false,
                        });
                      }}
                      onChangeText={value =>
                        setState(prevState => ({
                          ...prevState,
                          email: value,
                        }))
                      }
                    />
                  </View>
                  <View style={styles.inputPassword}>
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor:
                          isFocusInput.password
                            ? '#FF6C00'
                            : '#F6F6F6',
                        backgroundColor:
                          isFocusInput.password
                            ? '#FFFFFF'
                            : '#F6F6F6',
                      }}
                      textAlign={'left'}
                      placeholderTextColor={'#BDBDBD'}
                      textContentType="password"
                      value={state.password}
                      secureTextEntry={secureTextEntry}
                      placeholder="Пароль"
                      onFocus={() => {
                        setIsShowKeyboard(true),
                          setIsFocusInput({
                            ...isFocusInput,
                            password: true,
                          });
                      }}
                      onBlur={() => {
                        setIsFocusInput({
                          ...isFocusInput,
                          password: false,
                        });
                      }}
                      onChangeText={value =>
                        setState(prevState => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                    <Text
                      style={styles.showPass}
                      onPress={openPassword}
                    >
                      {secureTextEntry
                        ? 'Показати'
                        : 'Приховати'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={keyboardHide}
                  >
                    <Text style={styles.btnText}>
                      Увійти
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.formLink}>
                      Неміє акаунта? Зареєструватися
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  formWrapper: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'RobotoMedium',
    fontStyle: 'normal',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: '#212121',
    textAlign: 'center',
  },
  input: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    paddingLeft: 16,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
  },
  inputMail: {
    marginTop: 32,
  },
  inputPassword: {
    marginTop: 16,
  },
  showPass: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    lineHeight: 19,
    fontSize: 16,
    position: 'absolute',
    top: 16,
    right: 16,
    color: '#1B4371',
  },
  btn: {
    marginTop: 43,
    backgroundColor: '#FF6C00',
    height: 51,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    lineHeight: 19,
    color: '#FFFFFF',
  },
  formLink: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    lineHeight: 19,
    marginTop: 16,
    textAlign: 'center',
    color: '#1B4371',
  },
});