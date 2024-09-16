import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSession } from '../ctx'
import tw from 'twrnc'
import { useState } from 'react'

const Account = () => {
  const { signOut } = useSession()
  const [response, setResponse] = useState('null')
  return (
    <SafeAreaView>
      <View>
        <Button
          mode='contained'
          style={[
            tw`text-xl text-white bg-red-900 font-medium rounded-md h-10 m-2`,
            {
              shadowOffset: { width: 0, height: 2 },
            },
          ]}
          onPress={() => {
            const logout = signOut()
            setResponse(logout)
          }}
        >
          Log Out
        </Button>
        <Text>{response}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Account
