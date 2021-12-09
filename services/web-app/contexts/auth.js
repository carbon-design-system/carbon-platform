/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
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
    await fetch('/api/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
