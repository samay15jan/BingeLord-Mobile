import { StatusBar } from 'expo-status-bar'
import { View, Text, SafeAreaView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import StreamContent from '../../components/content/StreamContent'

const Stream = () => {
  const { id, type } = useLocalSearchParams()

  return (
    <View style={{flex: 1}}>
      <StatusBar style='light' translucent={true} />
      <SafeAreaView style={{ flex: 1, backgroundColor:'#121212' }}>
        {id && type &&
          <StreamContent id={id} type={type === 'movies' ? 'movie' : 'tv'}/>
        }
      </SafeAreaView>
    </View>
  )
}

export default Stream
