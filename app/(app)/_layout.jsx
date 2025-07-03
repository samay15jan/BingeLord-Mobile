import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Redirect, Stack } from 'expo-router'
import { useSession } from '../../utils/ctx'

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  text: {
    color: '#FFFFFF',
  },
})


const RootLayout = () => {
  const { session, isLoading } = useSession()
  if (isLoading) {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212'}}>
      <ActivityIndicator size="large" color="#cc021a" />
    </View>
    )
  }
  if (!session) {
    return <Redirect href='/sign-in' />
  }
  return (
    <Stack style={globalStyles.container} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(screens)/content' options={{ headerShown: false }} />
      <Stack.Screen name='(screens)/stream' options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
