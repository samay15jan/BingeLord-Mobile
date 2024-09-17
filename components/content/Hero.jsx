import React from 'react'
import axios from 'axios'
import tw from 'twrnc'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { trendingStore } from '../../utils/zustand'
import { useStore } from 'zustand'
import { Image } from 'expo-image'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const useTrending = (type) => {
  const state = useStore(trendingStore)
  const trending =
    type === 'movies' ? state.trending.movies : state.trending.series
  const updateTrending = (newData) =>
    state.updateTrending({ ...state.trending, [type]: newData })

  return { trending, updateTrending }
}

const Hero = ({ type }) => {
  const { trending, updateTrending } = useTrending(type);
  const [selectedItem, setSelectedItem] = React.useState()

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const index = trending?.results?.indexOf(selectedItem)
      const newItem =
        trending?.results?.length === index
          ? trending?.results[0]
          : trending?.results[index + 1]
      setSelectedItem(newItem)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [trending, selectedItem])

  React.useEffect(() => {
    axios
      .get(
        `https://bingelord-backend.onrender.com/api/${type === 'movies' ? 'TrendingMovie' : 'TrendingTV'}`
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
    <View style={tw`relative`}>
      <Poster path={selectedItem?.backdrop_path} />
      <Text style={tw`text-white text-xl font-medium`}>
        {selectedItem?.title || selectedItem?.name}
      </Text>
      <FlatList
        style={tw`mx-2 mt-2`}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trending?.results || trending?.results}
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
      style={tw`w-full h-2/3`}
      source={`https://image.tmdb.org/t/p/original${path}`}
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
        source={{ uri: `https://image.tmdb.org/t/p/original${item}` }}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={500}
      />
    </TouchableOpacity>
  )
}

export default Hero
