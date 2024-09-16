import { useEffect, useCallback, useReducer } from 'react'
import * as SecureStore from 'expo-secure-store'

function reducer(state, action) {
  return [false, action]
}

export function useStorageState(key) {
  const [state, setState] = useReducer(
    reducer,
    [true, null] // Initial state
  )

  // Get
  useEffect(() => {
    const loadItem = async () => {
      try {
        const value = await SecureStore.getItemAsync(key)
        setState(value)
      } catch (error) {
        setState(null)
        return 'An error occured'
      }
    }

    loadItem()
  }, [key])

  // Set
  const setValue = useCallback(
    async (value) => {
      setState(value)
      try {
        if (value === null) {
          await SecureStore.deleteItemAsync(key)
        } else {
          await SecureStore.setItemAsync(key, value)
        }
        setState(value)
      } catch (error) {
        setState(null)
        return 'An error occured'
      }
    },
    [key]
  )

  return [state, setValue]
}
