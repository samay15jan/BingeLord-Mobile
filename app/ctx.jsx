import { useContext, createContext } from 'react'
import { useStorageState } from './useStorageState.jsx'
import { auth } from '../utils/firebase.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const AuthContext = createContext({
  register: () => null,
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

export function useSession() {
  return useContext(AuthContext)
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session')

  return (
    <AuthContext.Provider
      value={{
        register: async (email, password) => {
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            )
            const user = userCredential.user
            setSession(user)
          } catch (error) {
            return error.message
          }
        },
        signIn: async (email, password) => {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            )
            const user = userCredential.user
            setSession(user)
          } catch (error) {
            return error.message
          }
        },
        signOut: async () => {
          try {
            await signOut(auth)
            setSession(null)
          } catch (error) {
            return error
          }
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
