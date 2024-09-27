import React from 'react'
import { useStore } from 'zustand'
import { contentStore } from '../../utils/zustand'
import { FlatList, View, Text } from 'react-native'
import { SegmentedButtons } from 'react-native-paper'
import Image from 'expo-image'
import tw from 'twrnc'

const useContent = (type) => {
  const state = useStore(contentStore)
  const content =
    type === 'movies' ? state.content.movies : state.content.series
  const updateContent = (newselectedItem) =>
    state.updateContent({ ...state.content, [type]: newselectedItem })

  return { content, updateContent }
}

export default function SegmentContainer ({ type }) {
  const { content } = useContent(type)
  const [selectedSegment, setSelectedSegment] = React.useState('trailers');

  return (
    <>
    <SegmentedButtons
      value={selectedSegment}
      density='3'
      onValueChange={setSelectedSegment}
      theme={{colors: { secondaryContainer: 'white', onSecondaryContainer: '#cc021a', onSurface: 'gray' }, marginHorizontal: '5' }}
      buttons={[
        {
          value: 'trailers',
          label: 'Trailers',
        },
        {
          value: 'similar',
          label: 'Similar',
        },
        {
          value: 'about',
          label: 'About',
        },
      ]}
    />
    {selectedSegment &&
      <Segment type={selectedSegment} data={content}/>
    }
    </>
  )
}

const Segment = ({type, data}) => {
  const blurhash = '$5OWpW-UL3K,00]y-=GK'
  const actors = data?.credits?.cast?.slice(0, 10)

  return (
    <>
    {type == 'about' &&
    <>
      <FlatList
        style={tw`w-auto mx-4`}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={actors}
        renderItem={({ actor }) => <ImageContainer path={actor?.profile_path} name={actor?.name}/>}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
    }
    </>    
  )
}

const ImageContainer = ({path, name}) => {
  return (
    <View style={tw`mr-4`}> 
    <Image 
      style={tw`w-full h-96 rounded-xl shadow-xl`}
      source={{
        uri: `${process.env.EXPO_PUBLIC_IMAGE_HD}${path}`,
        cache: 'only-if-cached',
      }}
      placeholder={{ blurhash }}
      contentFit='cover'
      transition={500}
    />
    <Text>{name}</Text>
  </View>        
  )
}