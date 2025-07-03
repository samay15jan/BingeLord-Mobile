import React from 'react'
import axios from 'axios'
import { useStore } from 'zustand'
import { contentStore } from '../../utils/zustand'
import { Image } from 'expo-image'
import tw from 'twrnc'
import { View } from 'react-native'

const useContent = (type) => {
  const state = useStore(contentStore)
  const content =
    type === 'movies' ? state.content.movies : state.content.series
  const updateContent = (newselectedItem) =>
    state.updateContent({ ...state.content, [type]: newselectedItem })

  return { content, updateContent }
}

const ImageDisplay = ({id, type}) => {
  const [seletedImages, setImages] = React.useState(null)
  const { content, updateContent } = useContent(type)

  React.useEffect(() => {
    if(!content) return
    if(content && content.id === id)return

    const finalType = {
      movies: 'imagesMovie',
      series: 'imagesTV',
    }
    const endpoint = finalType[type]

    axios
      .get(`${process.env.EXPO_PUBLIC_BACKEND_URL}${endpoint}?id=${id}`)
      .then((response) => {
        const data = {...content, images: response.data}
        updateContent(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id, content])

  React.useEffect(() => {
    getImages();
  }, [content]);

  const getImages = () => {
    var filteredBackdrops
    if (content) {
      filteredBackdrops = content?.images?.backdrops?.filter(backdrop => {
        return backdrop.vote_count >= 10;
      })}
    if (content && filteredBackdrops?.length < 5) {
      filteredBackdrops = content?.images?.backdrops?.filter(backdrop => {
        return backdrop.vote_count >= 5;
      })}
    if (content && filteredBackdrops?.length >= 0 ) {
      filteredBackdrops = content?.images?.backdrops?.filter(backdrop => {
        return backdrop.vote_count >= 0;
    })}
    setImages(filteredBackdrops);
  }

  return (
    <View style={tw`mx-2 mb-10`}>
    {seletedImages &&
      <View style={tw`w-full`}>
      <ImageContainer path={seletedImages[1]?.file_path} customStyle={tw`h-40 m-2 rounded-xl shadow-xl`} />
      <View style={tw`flex-row`}>
        <View style={tw`w-1/2 h-88`}>
          <ImageContainer path={seletedImages[2]?.file_path} customStyle={tw`h-40 m-2 rounded-xl shadow-xl`}/>
          <ImageContainer path={seletedImages[3]?.file_path} customStyle={tw`h-40 m-2 rounded-xl shadow-xl`} />
        </View>
        <ImageContainer path={seletedImages[4]?.file_path} customStyle={tw`h-84 m-2 rounded-xl shadow-xl`} />
      </View>
      </View>
    }
    </View>
  )
}

const ImageContainer = ({path , customStyle}) => {
  const blurhash ='$5OWpW-UL3K,00]y-=GK'

  return (
    <View style={{flex: 1}}>
    <Image
      style={customStyle}
      source={{
        uri: `${process.env.EXPO_PUBLIC_IMAGE_HD}${path}`,
      }}
      placeholder={{ blurhash }}
      contentFit='cover'
      transition={500}
    />
    </View>
  )
}


export default ImageDisplay