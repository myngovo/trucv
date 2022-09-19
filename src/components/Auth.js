import { useState, createContext, useContext } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const userInfoFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

  const [user, setUser] = useState(userInfoFromStorage)

  const login = (user) => {
    setUser(user)
    console.log('new', user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
