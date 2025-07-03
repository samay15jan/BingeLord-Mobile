import React from 'react'
import { useStorageState } from './useStorageState'
import { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const AuthContext = React.createContext({
  register: () => null,
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  error: null,
})

export function useSession() {
  return React.useContext(AuthContext)
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session')
  const [error, setError] = React.useState(null)

  React.useEffect(()  => {
    if(error){
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }, [error])

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
            setSession([false, JSON.stringify(user)])
          } catch (error) {
            setError(error?.message);
          }
        },
        signIn: async (email, password) => {
          try {
            setSession([true, null])
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            )
            const user = userCredential.user
            setSession([false, JSON.stringify(user)])
          } catch (error) {
            setError(error?.message);
          }
        },
        signOut: async () => {
          try {
            await signOut(auth)
            setSession([null, null])
          } catch (error) {
            setError(error?.message);
          }
        },
        session,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
