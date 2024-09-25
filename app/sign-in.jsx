import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import { Card, TextInput, Button } from 'react-native-paper'
import { useSession } from './utils/ctx'
import { router } from 'expo-router'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'expo-image'

export default function AuthMenu() {
  const { register, signIn, isLoading, session, error } = useSession()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [hidePassword, setHidePassword] = React.useState(true)
  const [type, setType] = React.useState('Sign Up')

  function handleMenu() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#cc021a' />
      </View>
    )
  }

  React.useEffect(() => {
    if (session) {
      router.replace('/')
    }
    if (isLoading) {
      handleMenu()
    }
  }, [session, isLoading])

  const changeMenu = () => {
    type === 'Login' ? setType('Sign Up') : setType('Login')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async () => {
    try {
      if (type === 'Login') {
        signIn(email, password)
      } else {
        register(email, password)
      }
    } catch (error) {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <View style={tw`bg-black w-full h-full`}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card style={tw`bg-black w-full h-full`}>
            <ImageBackground
              style={tw`w-full h-full absolute opacity-20`}
              source={require('../assets/auth-background.webp')}
              alt='logo'
            />
            <View style={tw`w-full h-full justify-center shadow-xl`}>
              <Card
                style={[
                  tw`px-4 py-3 mx-5 my-5 bg-black bg-opacity-80`,
                  { color: 'white' },
                ]}
              >
                <Text
                  style={tw`text-2xl my-5 mt-10 text-center text-white font-bold `}
                >
                  {type === 'Login' ? 'Log In' : 'Sign Up'}
                </Text>
                <TextInput
                  mode='flat'
                  label='Email'
                  style={tw`m-2 h-12 bg-transparent text-[16px]`}
                  textContentType='emailAddress'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  textColor='white'
                  underlineColor='gray'
                  activeUnderlineColor='#7f1d1d'
                  keyboardAppearance='dark'
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
                <TextInput
                  mode='flat'
                  label='Password'
                  style={tw`m-2 h-12 bg-transparent text-[16px]`}
                  textContentType='password'
                  value={password}
                  secureTextEntry={hidePassword ? true : false}
                  onChangeText={(text) => setPassword(text)}
                  textColor='white'
                  underlineColor='gray'
                  activeUnderlineColor='#7f1d1d'
                  keyboardAppearance='dark'
                  keyboardType='visible-password'
                  autoCapitalize='none'
                  right={
                    <TextInput.Icon
                      style={tw`h-14 mt-4`}
                      icon={!hidePassword ? 'eye' : 'eye-off'}
                      onPress={() => setHidePassword(!hidePassword)}
                      color='gray'
                      loading={isLoading}
                    />
                  }
                />
                {error && (
                  <Text
                    style={[
                      tw`text-sm font-light h-auto text-center mt-2 opacity-80`,
                      {
                        color: 'red',
                      },
                    ]}
                  >
                    {error}
                  </Text>
                )}
                <Button
                  mode='contained'
                  style={tw`text-xl text-white bg-[#7f1d1d] font-medium rounded-md h-10 m-2 mt-5`}
                  onPress={handleSubmit}
                >
                  {!isLoading && type === 'Login'
                    ? 'Continue'
                    : 'Become A BingeLord'}
                  {isLoading && (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ActivityIndicator size='large' color='#cc021a' />
                    </View>
                  )}
                </Button>
                <View style={tw`my-5`}>
                  <Text style={tw`text-sm text-white font-medium rounded-md`}>
                    {type === 'Login' ? 'New to BingeLord?' : 'Existing User?'}
                  </Text>
                  <TouchableOpacity onPress={changeMenu}>
                    <Text
                      style={tw`text-sm text-gray-500 font-medium rounded-md`}
                    >
                      {type === 'Login' ? 'Sign Up now' : 'Login'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          </Card>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}
