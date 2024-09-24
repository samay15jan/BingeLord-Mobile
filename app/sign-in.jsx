import {
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import { useState } from 'react'
import { Card, TextInput, Button } from 'react-native-paper'
import { useSession } from './utils/ctx'
import { router } from 'expo-router'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import { DarkTheme } from '@react-navigation/native'

export default function AuthMenu() {
  const { register, signIn, isLoading, session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [type, setType] = useState('Login')
  const [error, setError] = useState('')

  const changeMenu = () => {
    type === 'Login' ? setType('Sign Up') : setType('Login')
    setEmail('')
    setPassword('')
    setError('')
  }

  const handleSubmit = async () => {
    // Login
    if (type === 'Login') {
      try {
        const response = signIn(email, password)
        if (response) {
          setError(response)
          router.replace('/')
        }
      } catch (error) {
        setError(error)
        setEmail('')
        setPassword('')
      }
    }
    // Register
    else {
      try {
        const response = register(email, password)
        if (response) {
          setError(response)
        }
      } catch (error) {
        setError(error)
        setEmail('')
        setPassword('')
      }
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
            <Image
              style={tw`w-full h-full relative opacity-20`}
              source={require('../assets/auth-background.webp')}
              alt='logo'
            />
            <View
              style={tw`w-full h-full justify-center shadow-xl drop-shadow-2xl`}
            >
              <Card
                style={[
                  tw`px-4 py-3 mx-5 my-5 h-screen bg-black bg-opacity-80`,
                  { color: 'white' },
                ]}
              >
                <Text
                  style={tw`text-2xl my-5 mt-10 text-center text-white font-bold `}
                >
                  {type === 'Login' ? 'Log In' : 'Sign Up'}
                </Text>
                <TextInput
                  mode='outlined'
                  label='Email'
                  style={[tw`m-2 h-12 `, { color: 'white' }]}
                  textContentType='emailAddress'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  outlineColor='#121212'
                  selectionColor='white'
                  keyboardAppearance='dark'
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
                <View>
                  <TextInput
                    mode='outlined'
                    label='Password'
                    theme={DarkTheme}
                    style={tw`m-2 h-12`}
                    textContentType='password'
                    value={password}
                    secureTextEntry={hidePassword ? true : false}
                    onChangeText={(text) => setPassword(text)}
                    outlineColor='#121212'
                    keyboardAppearance='dark'
                    keyboardType='visible-password'
                    autoCapitalize='none'
                    right={
                      <TextInput.Icon
                        style={tw`h-14 mt-4`}
                        icon={!hidePassword ? 'eye' : 'eye-off'}
                        onPress={() => setHidePassword(!hidePassword)}
                        color='white'
                        loading='false'
                      />
                    }
                  />
                </View>
                <Text style={tw`text-white h-auto text-center`}>{error}</Text>
                <Button
                  mode='contained'
                  style={[
                    tw`text-xl text-white bg-red-900 font-medium rounded-md h-10 m-2`,
                    {
                      shadowOffset: { width: 0, height: 2 },
                    },
                  ]}
                  onPress={handleSubmit}
                >
                  {type}
                </Button>
                <Pressable style={tw`grid mt-5`}>
                  <Text style={tw`text-sm text-white font-medium rounded-md `}>
                    {type === 'Login' ? 'New to BingeLord?' : 'Existing User?'}
                  </Text>
                  <Pressable onPress={changeMenu}>
                    <Text style={tw`text-sm text-white font-medium rounded-md`}>
                      {type === 'Login' ? 'Sign Up now' : 'Login'}
                    </Text>
                  </Pressable>
                </Pressable>
              </Card>
            </View>
          </Card>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}
