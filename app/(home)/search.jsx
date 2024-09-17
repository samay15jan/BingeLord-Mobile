import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'

const Search = () => {
  return (
    <SafeAreaView style={tw`bg-black flex w-full h-full`}>
      <StatusBar style='light'/>
      <View>
        <Text>Search</Text>
      </View>
    </SafeAreaView>
  )
}

export default Search
