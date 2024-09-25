import React from 'react'
import { Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';

const ContentScreen = () => {
  const { id, type } = useLocalSearchParams();
  return (
    <Text>{id}-{type}</Text>
  )
}

export default ContentScreen