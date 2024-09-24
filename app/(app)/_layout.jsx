import { Text, StyleSheet } from 'react-native'
import { Redirect, Stack } from 'expo-router'
import { useSession } from '../utils/ctx'

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
    return <Text>Loading...</Text>
  }
  if (!session) {
    return <Redirect href='/sign-in' />
  }
  return (
    <Stack style={globalStyles.container} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(home)' options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
