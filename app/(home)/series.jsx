
import { ScrollView } from 'react-native'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import Hero from '../components/content/Hero'
import Genres from '../components/content/Cards'
import { View } from 'react-native'

const Series = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' translucent={true} />
      <ScrollView style={tw`bg-[#121212]`}>
        <Hero type='series' />
        <Genres type='series' />
      </ScrollView>
    </View>
  )
}

export default Series

