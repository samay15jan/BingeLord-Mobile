import { Slot } from 'expo-router'
import { SessionProvider } from './ctx'

const RootLayout = () => {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}

export default RootLayout
