import React from 'react'
import axios from 'axios'
import tw from 'twrnc'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { trendingStore } from '../../utils/zustand'
import { useStore } from 'zustand'
import { Image } from 'expo-image'
import { AddButton, WatchButton } from './Buttons'
import { LinearGradient } from 'expo-linear-gradient'

const blurhash ='$5OWpW-UL3K,00]y-=GK'

const useTrending = (type) => {
  const state = useStore(trendingStore)
  const trending =
    type === 'movies' ? state.trending.movies : state.trending.series
  const updateTrending = (newselectedItem) =>
    state.updateTrending({ ...state.trending, [type]: newselectedItem })

  return { trending, updateTrending }
}

const Hero = ({ type }) => {
  const { trending, updateTrending } = useTrending(type)
  const [selectedItem, setSelectedItem] = React.useState()

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const index = trending?.results?.slice(0,5)?.indexOf(selectedItem)
      const newItem =
        (trending?.results.slice(0,5)?.length != index && trending?.results[index + 1]) ||
        trending?.results[0]
      setSelectedItem(newItem)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [trending, selectedItem])
  
  React.useEffect(() => {
    axios
      .get(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}${type === 'movies' ? 'TrendingMovie' : 'TrendingTV'}`
      )
      .then((response) => {
        updateTrending(response.data)
        setSelectedItem(response.data?.results[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <View style={tw`relative mb-10`}>
      <Poster path={selectedItem?.backdrop_path} />
      <View style={tw`relative`}>
        <Details selectedItem={selectedItem} />
      </View>
      <FlatList
        style={tw`mx-2 mt-2`}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trending?.results?.slice(0,6) || trending?.results?.slice(0,6)}
        renderItem={({ item }) => (
          <ImageCarousal
            item={item?.backdrop_path}
            onPress={() => setSelectedItem(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedItem}
      />
    </View>
  )
}

const Poster = ({ path }) => {
  return (
    <Image
      style={tw`w-full h-96 rounded-xl shadow-xl`}
      source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_HD}${path}`, cache: 'only-if-cached' }}
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
        source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_SD}${item}`, cache: 'only-if-cached' }}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={500}
      />
    </TouchableOpacity>
  )
}

const Details = ({ selectedItem }) => {
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
      <Text style={tw`text-[14px] mt-5 font-medium text-white`}>
        <Image
          source={require('../../../assets/tmdb.png')}
          style={{ width: 25, height: 10, marginLeft: 10 }}
          transition={500}
        />
        {selectedItem?.vote_average.toFixed(1)}
      </Text>
      <Text style={tw`text-white mt-2 text-xl font-bold max-w-80`}>
        {selectedItem?.title || selectedItem?.name}
      </Text>
      <View style={tw`flex-row`}>
        <WatchButton />
        <AddButton />
      </View>
    </LinearGradient>
  )
}

export default Hero
