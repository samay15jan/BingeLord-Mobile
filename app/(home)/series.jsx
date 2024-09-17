import { View } from 'react-native'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import Hero from '../../components/content/Hero'

const Series = () => {
  return (
    <View style={tw`bg-[#121212] flex w-full h-full`}>
      <StatusBar style='light' translucent={true} />
      <Hero type='series'/>
    </View>
  )
}

export default Series
