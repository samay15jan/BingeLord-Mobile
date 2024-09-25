import React from 'react'
import * as SecureStore from 'expo-secure-store'

function reducer(state, action) {
  return action === null ? [] : action
}

export function useStorageState(key) {
  const [state, setState] = React.useReducer(
    reducer,
    [true, null] // Initial state
  )

  // Get
  React.useEffect(() => {
    const loadItem = async () => {
      try {
        const value = await SecureStore.getItemAsync(key)
        setState([false, value])
      } catch (error) {
        setState([false, null])
      }
    }

    loadItem()
  }, [key])

  // Set
  const setValue = React.useCallback(
    async (value) => {
      try {
        setState([value[0], null])
        if (value[1] === null) {
          await SecureStore.deleteItemAsync(key)
        } else {
          await SecureStore.setItemAsync(key, value[1])
        }
        setState([false, value[1]])
      } catch (error) {
        setState(null)
      }
    },
    [key]
  )

  return [state, setValue]
}
