import React, { useState, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const initialFocuseState = {
  username: false,
  email: false,
  password: false,
};

SplashScreen.preventAutoHideAsync();

const RegistrationScreen = () => {
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
    console.log(state);
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
                      marginTop: isShowKeyboard
                        ? 350
                        : 219,
                    },
                    android: {
                      marginTop: isShowKeyboard
                        ? -100
                        : 0,
                    },
                  }),
                }}
              >
                <View style={styles.avatarBox}>
                  <Image
                    style={styles.avatar}
                    source={require('../../assets/image/avatar.png')}
                  />
                  <TouchableOpacity
                    style={styles.addAvatarBth}
                    activeOpacity={0.8}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={18}
                      color="#E8E8E8"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Реєстрація</Text>
                <View
                  style={{
                    paddingBottom: isShowKeyboard ? 32 : 45,
                  }}
                >
                  <View style={styles.inputUserName}>
                    <TextInput
                      style={{
                        ...styles.input,
                        borderColor:
                          isFocusInput.username
                            ? '#FF6C00'
                            : '#F6F6F6',
                        backgroundColor:
                          isFocusInput.username
                            ? '#FFFFFF'
                            : '#F6F6F6',
                      }}
                      textAlign={'left'}
                      placeholderTextColor={'#BDBDBD'}
                      textContentType="username"
                      value={state.username}
                      placeholder="Логін"
                      onFocus={() => {
                        setIsShowKeyboard(true),
                          setIsFocusInput({
                            ...isFocusInput,
                            username: true,
                          });
                      }}
                      onBlur={() => {
                        setIsFocusInput({
                          ...isFocusInput,
                          username: false,
                        });
                      }}
                      onChangeText={value =>
                        setState(prevState => ({
                          ...prevState,
                          username: value,
                        }))
                      }
                    />
                  </View>
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
                      Реєстрація
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.formLink}>
                      Вже є акаунт? Увійти
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
export default RegistrationScreen;

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
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: 'center',
  },
  avatarBox: {
    position: 'absolute',
    left: '38%',
    top: '-15%',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  addAvatarBth: {
    position: 'absolute',
    right: -12.5,
    top: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
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
  inputUserName: {
    marginTop: 32,
  },
  inputMail: {
    marginTop: 16,
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