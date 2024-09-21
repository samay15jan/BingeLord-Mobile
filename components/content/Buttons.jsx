import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export const WatchButton = ({ size, px, py, my, mt, rounded, fontWeight }) => {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={['#cc021a', '#ff004d']}
        style={{
          position: 'relative',
          paddingHorizontal: px || 16,
          paddingVertical: py || 8,
          marginVertical: my || 20,
          marginTop: mt || 20,
          borderRadius: rounded || 12,
          transform: [{ skewX: '-14deg' }],
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: fontWeight || 'bold',
            fontSize: size || 20,
          }}
        >
          Watch Now
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export const AddButton = ({ size, px, py, my, ml, mt, rounded, transform }) => {
  const [saveIcon, removeIcon] = React.useState(false)
  return (
    <TouchableOpacity onPress={() => removeIcon(!saveIcon)}>
      <LinearGradient
        colors={['#303030', '#323232']}
        style={{
          position: 'relative',
          paddingHorizontal: px || 16,
          paddingVertical: py || 8,
          marginLeft: ml || 16,
          marginVertical: my || 20,
          marginTop: mt || 20,
          borderRadius: rounded || 50,
          transform: transform && [{ skewX: '-14deg' }],
        }}
      >
        <FontAwesome
          name={saveIcon ? 'bookmark' : 'bookmark-o'}
          size={size || 24}
          color={saveIcon ? '#ff004d' : 'white'}
        />
      </LinearGradient>
    </TouchableOpacity>
  )
}
