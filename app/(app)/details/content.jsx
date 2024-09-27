import tw from 'twrnc'
import { ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Hero from '../../components/content/Hero'
import Segment from '../../components/content/Segment'

const ContentScreen = () => {
  const { id, type } = useLocalSearchParams()

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' translucent={true} />
      <ScrollView style={tw`bg-[#121212]`}>
        {id && type ?
        <>
          <Hero id={id} type={type} contentScreen />
          <Segment type={type}/>
        </>
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>An Error Occured.</Text>
          </View>
        }
      </ScrollView>
    </View>
  )
}

export default ContentScreen
