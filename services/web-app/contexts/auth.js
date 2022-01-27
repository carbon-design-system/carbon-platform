/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const userResponse = await fetch('/api/user')
      if (userResponse.ok) {
        setUser(await userResponse.json())
      }
      setLoading(false)
    }
    loadUser()
  }, [])

  const login = (next) => {
    fetch(`/api/login?next=${next}`)
  }

  const logout = async () => {
    const res = await fetch('/api/logout')
    if (res.ok) {
      setUser(null)
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook function used to tap into user object and it's functions, it serves:
 * - user: object containing user's data as per user models located in @/models/user.model.ts
 * - loading: boolean indicating whether user is still being retrieved or not
 * - isAuthenticated: booleand indicating whether the user has correctly authenticated or not
 * - login: function to login user
 * - logout: function to logout user
 *
 * @returns { { user, loading, isAuthenticated, login, logout} } value of the AuthProvider context
 */
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
