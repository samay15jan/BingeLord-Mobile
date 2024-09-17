import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const HomeLayout = () => {
  return (
    <Tabs   screenOptions={{
      tabBarStyle: { backgroundColor: '#101010', borderBlockColor: '#000000' },
      tabBarActiveTintColor: '#7f1d1d',
      tabBarHideOnKeyboard: true,
    }}>
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='movie-open-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='series'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name='tv' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='search1' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='user' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}

export default HomeLayout
