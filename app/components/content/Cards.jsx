import React from 'react'
import tw from 'twrnc'
import axios from 'axios'
import { Image } from 'expo-image'
import { useStore } from 'zustand'
import { genreStore } from '../../utils/zustand'
import { AddButton, WatchButton } from './Buttons'
import { TouchableOpacity, FlatList, Text, View } from 'react-native'

const useGenre = (type) => {
  const state = useStore(genreStore)
  const genre = type === 'movies' ? state.genre.movies : state.genre.series
  const updateGenre = (newGenreData) =>
    state.updateGenre({ type: type, data: newGenreData })
  return { genre, updateGenre }
}

const Genres = ({ type }) => {
  const genres = [
    { movie: '28', series: '10759' },
    { movie: '27', series: '35' },
    { movie: '35', series: '18' },
    { movie: '10749', series: '9648' },
    { movie: '9648', series: '10765' },
    { movie: '878', series: '16' },
    { movie: '16', series: '80' },
    { movie: '10752', series: '10768' },
    { movie: '37', series: '37' },
  ]

  return (
    <View>
      {genres.map((genre, index) => (
        <GenreContainer
          key={index}
          id={type === 'movies' ? genre.movie : genre.series}
          type={type}
        />
      ))}
    </View>
  )
}

const GenreContainer = React.memo(({ id, type }) => {
  const { genre, updateGenre } = useGenre(type)

  const finalType = {
    movies: 'discoverMovie',
    series: 'discoverTV',
  }

  React.useEffect(() => {
    const endpoint = finalType[type]
    const fetchData = async () => {
      const alreadyExists = genre && genre.find((item) => item?.id === id)
      if (alreadyExists) return
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}${endpoint}?genre=${id}`
        )
        if (response) {
          updateGenre({ type: type, id: id, data: response.data })
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  const MovieGenres = {
    28: 'Action 💪🏼 🔥',
    27: 'Horror 👻🔪🩸',
    35: 'Comedy 🤣 🍿',
    10749: 'Romance 💕 🫰🏻',
    9648: 'Mystery 🧐 🕵️ 🔍',
    878: "Editor's Picks 👨🏻‍💻 😈",
    16: 'Animation 🎬 🎨',
    10752: 'War ⚔️ 🛡️ 🧨',
    37: 'Western 🔫 🤠',
  }

  const TVShowGenres = {
    10759: 'Action 💪🏼 🔥',
    35: 'Comedy 🤣 🍿',
    18: 'Drama 🍿 🎬',
    9648: 'Mystery 🧠 🔮',
    10765: "Editor's Picks 👨🏻‍💻 😈",
    16: 'Animation 🎬 🎨',
    80: 'Crime 🔪 🚨',
    10768: 'War ⚔️ 🛡️ 🧨',
    37: 'Western 🔫 🤠',
  }

  // Fisher-Yates shuffle / Knuth shuffle algorithm
  function shuffleItems(array) {
    if (!array) return
    const shuffledArray = array.slice()
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }
    return shuffledArray
  }

  const getResult = () => {
    const item = genre && genre.find((item) => item?.id === id)
    const ShuffledData = shuffleItems(item?.data?.results?.slice(0, 7))
    return item ? ShuffledData : null
  }

  return (
    <View>
      <Text style={tw`ml-4 mb-4 text-xl text-white font-bold`}>
        {type === 'movies' ? MovieGenres[id] : TVShowGenres[id]}
      </Text>
      <FlatList
        style={tw`w-auto mx-4`}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={getResult()}
        renderItem={({ item }) => <Card type={type} data={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
})

const Card = ({ type, data }) => {
  const [showDetails, setShowDetails] = React.useState(false)

  //Firebase watchlist
  // const userId = localStorage.getItem('userId')
  // const watchlistRef = ref(database, `users/${userId}/watchlist`)
  // const addToWatchlist = (data) => {
  //   push(watchlistRef, {
  //     type: type,
  //     id: data.id,
  //   })
  // }

  if(showDetails){
    setTimeout(() => {
      setShowDetails(false)
    }, 10000);
  }
  return (
    <TouchableOpacity
      style={tw`relative w-32 mx-2 mb-10`}
      onPress={() => setShowDetails(!showDetails)}
    >
      <View style={tw`relative w-full h-54`}>
        <ImageContainer path={data?.poster_path} isFaded={showDetails} />
        <Rating votes={data?.vote_average?.toFixed(1)} />
        <Year data={data} type={type} />
        {showDetails && (
          <>
            <Title data={data} type={type} />
            <Description data={data} />
            <View style={tw`absolute bottom-0 px-2 flex-row`}>
              <WatchButton
                id={data?.id}
                type={type}
                size={12}
                px={8}
                py={8}
                my={4}
                mt={20}
                rounded={5}
                fontWeight='heavy'
              />
              <AddButton
                size={16}
                px={8}
                py={8}
                my={10}
                ml={4}
                mt={20}
                rounded={5}
                transform
              />
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

const ImageContainer = ({ path, isFaded }) => {
  const blurhash ='$5OWpW-UL3K,00]y-=GK'

  return (
    <View style={isFaded && { opacity: 0.2 }}>
      <Image
        style={tw`w-full h-54 rounded-lg`}
        placeholder={{ blurhash }}
        contentFit='cover'
        transition={500}
        source={{
          uri: `${process.env.EXPO_PUBLIC_IMAGE_SD}${path}`,
          cache: 'only-if-cached'
        }}
      />
    </View>
  )
}

const Rating = ({ votes }) => {
  return (
    <View style={tw`absolute`}>
      <View
        style={tw`relative top-1 left-1 rounded-[8px] p-1 bg-[#121212] bg-opacity-80`}
      >
        <Text style={tw`text-[12px] font-medium text-gray-400`}>
          <Image
            source={require('../../../assets/tmdb.png')}
            style={{ width: 24, height: 10, marginLeft: 5 }}
            transition={500}
          />
          {votes === '0.0' ? '~' : votes}
        </Text>
      </View>
    </View>
  )
}

const Year = ({ data, type }) => {
  var year
  if (type === 'movies') {
    year = new Date(data?.release_date).getFullYear()
  } else {
    year = new Date(data?.first_air_date).getFullYear()
  }
  return (
    <View
      style={tw`absolute top-1 right-1 rounded-[8px] p-1 bg-[#121212] bg-opacity-80`}
    >
      <Text style={tw`text-[12px] font-medium text-gray-400`}>{year}</Text>
    </View>
  )
}

const Title = ({ data, type }) => {
  return (
    <View style={tw`w-full absolute bottom-28 p-1`}>
      <Text style={tw`text-[14px] font-bold text-white text-center`}>
        {type === 'movies' ? data?.title : data?.name}
      </Text>
    </View>
  )
}

const Description = ({ data }) => {
  // Word Limit
  const words = data?.overview?.split(' ')
  const cutWords = words?.slice(0, 14)
  const description = cutWords?.join(' ') + (words?.length > 15 ? '...' : '')

  return (
    <View style={tw`w-full h-20 absolute bottom-10 pt-4 pb-2 px-1`}>
      <Text style={tw`text-[10px] font-medium text-gray-200 text-center`}>
        {description || 'No description available'}
      </Text>
    </View>
  )
}

export default Genres
