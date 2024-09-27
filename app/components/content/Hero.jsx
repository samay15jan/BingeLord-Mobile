import React from 'react'
import axios from 'axios'
import tw from 'twrnc'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { trendingStore, contentStore } from '../../utils/zustand'
import { useStore } from 'zustand'
import { Image } from 'expo-image'
import { AddButton, WatchButton } from './Buttons'
import { LinearGradient } from 'expo-linear-gradient'

const blurhash = '$5OWpW-UL3K,00]y-=GK'

const useTrending = (type) => {
  const state = useStore(trendingStore)
  const trending =
    type === 'movies' ? state.trending.movies : state.trending.series
  const updateTrending = (newselectedItem) =>
    state.updateTrending({ ...state.trending, [type]: newselectedItem })

  return { trending, updateTrending }
}

const useContent = (type) => {
  const state = useStore(contentStore)
  const content =
    type === 'movies' ? state.content.movies : state.content.series
  const updateContent = (newselectedItem) =>
    state.updateContent({ ...state.content, [type]: newselectedItem })

  return { content, updateContent }
}


const Hero = ({ id, type, contentScreen }) => {
  const { trending, updateTrending } = useTrending(type)
  const { updateContent } = useContent(type)
  const [selectedItem, setSelectedItem] = React.useState()

  React.useEffect(() => {
    if(contentScreen) return 

    const intervalId = setInterval(() => {
      const index = trending?.results?.slice(0, 5)?.indexOf(selectedItem)
      const newItem =
        (trending?.results.slice(0, 5)?.length != index &&
          trending?.results[index + 1]) ||
        trending?.results[0]
      setSelectedItem(newItem)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [trending, selectedItem])

  React.useEffect(() => {
    function getURl () { 
      if (!contentScreen) {
        return `${process.env.EXPO_PUBLIC_BACKEND_URL}${type === 'movies' ? 'TrendingMovie' : 'TrendingTV'}`
      } else {
        return `${process.env.EXPO_PUBLIC_BACKEND_URL}${type === 'movies' ? 'movie' : 'series'}?id=${id}`
      }
    }
    axios
      .get(getURl())
      .then((response) => {
        if(!contentScreen){
          updateTrending(response.data)
          setSelectedItem(response.data?.results[0])
        } else{
          updateContent(response.data)
          setSelectedItem(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <View style={tw`relative mb-10`}>
      <Poster path={selectedItem?.backdrop_path || selectedItem?.poster_path} />
      <View style={tw`relative`}>
        <Details selectedItem={selectedItem} type={type} contentScreen={contentScreen}/>
      </View>
      
      {!contentScreen && (
        <FlatList
          style={tw`mx-2 mt-2`}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={
            trending?.results?.slice(0, 6) || trending?.results?.slice(0, 6)
          }
          renderItem={({ item }) => (
            <ImageCarousal
              item={item?.backdrop_path}
              onPress={() => setSelectedItem(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedItem}
        />
      )}

      {contentScreen && 
        <>
        <View style={tw`w-full px-5 mt-2`}>
          <Text style={tw`text-[14px] font-bold text-gray-200 my-2`}>Storyline</Text>
          <Text style={tw`text-[12px] font-light text-gray-400`}>
            {selectedItem?.overview?.split('.')?.slice(0,2) || 'No description available'}
          </Text>
        </View>    
        <View style={[tw`flex-row`, {gap: '15px', justifyContent: 'center'}]}>
          <WatchButton id={selectedItem?.id} type={type} customText={'Play'} />
          <WatchButton id={selectedItem?.id} type={type} customText={'Watch Trailer'} customColor={['#191919', '#1a1a1a']} />
          <AddButton ml='0' rounded='12' transform/>
        </View>
        </>
      }
    </View>
  )
}

const Poster = ({ path }) => {
  return (
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
  )
}

const ImageCarousal = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={tw`w-24 h-14 rounded-md mx-1 shadow-xl`}
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_SD}${item}`,
          cache: 'only-if-cached',
        }}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={500}
      />
    </TouchableOpacity>
  )
}

const Details = ({ selectedItem, contentScreen, type }) => {
  return (
    <LinearGradient
      colors={[
        'transparent',
        'rgba(0, 0, 0,0.3)',
        'rgba(0, 0, 0,0.5)',
        'rgba(0, 0, 0,0.6)',
        'rgba(0, 0, 0,0.7)',
        'rgba(18, 18, 18, 08)',
      ]}
      style={tw`w-full absolute bottom-0 pl-5`}
    >
      {/* Rating */}
      <Text style={tw`flex-row text-[14px] mt-5 font-medium text-white`}>
        <Image
          source={require('../../../assets/tmdb.png')}
          style={{ width: 25, height: 10, marginLeft: 10 }}
          transition={500}
        />
        {selectedItem?.vote_average.toFixed(1)}
      </Text>

      {/* Heading */}
      <Text style={[tw`text-white mt-2 font-bold max-w-80`, {fontSize: contentScreen ? '25px' : '20px'}]}>
        {selectedItem?.title || selectedItem?.name}
      </Text>

      {/* Genre */}
      {contentScreen &&
      <View style={tw`flex-row my-2`}>
        {selectedItem?.genres?.slice(0, 3)?.map((genre) => (
          <TouchableOpacity key={genre?.id}>
            <Text style={tw`bg-[#121212] border-2 border-gray-400 mx-1 text-gray-400 bg-opacity-60 rounded-xl px-2 p-1 text-[10px] font-semibold`}>
              {genre?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      }

      {/* Button */}
      <View style={tw`flex-row`}>
        {!contentScreen &&
          <>
            <WatchButton id={selectedItem?.id} type={type} />
            <AddButton id={selectedItem?.id} type={type} />
          </>
        }
      </View>
    </LinearGradient>
  )
}

export default Hero
