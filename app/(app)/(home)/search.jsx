import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import { SegmentedButtons } from 'react-native-paper'

const Search = () => {
  const [value, setValue] = React.useState('movies');

  return (
    <SafeAreaView style={tw`bg-black flex w-full h-full`}>
      <StatusBar style='light'/>
      <View>
      <SegmentedButtons
        value={value}
        density='3'
        onValueChange={setValue}
        theme={{ colors: { secondaryContainer: 'white', onSecondaryContainer: '#cc021a', onSurface: 'gray' } }}
                buttons={[
          {
            value: 'movies',
            label: 'Movies',
            icon: 'movie-open',
          },
          {
            value: 'series',
            label: 'Series',
            icon: 'filmstrip',
          },
        ]}
      />
      </View>
    </SafeAreaView>
  )
}

export default Search
