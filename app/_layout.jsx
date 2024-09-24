import { Slot } from 'expo-router'
import { SessionProvider } from './utils/ctx'
import { PaperProvider } from 'react-native-paper'

const RootLayout = () => {
  return (
    <PaperProvider>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </PaperProvider>
  )
}

export default RootLayout
