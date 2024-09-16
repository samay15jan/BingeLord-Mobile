import { Text } from 'react-native'
import { Redirect, Stack } from 'expo-router'
import { useSession } from '../ctx'

const RootLayout = () => {
  const { session, isLoading } = useSession()
  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (!session) {
    return <Redirect href='/sign-in' />
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(home)' options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
