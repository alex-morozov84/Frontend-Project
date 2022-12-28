import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext'
import { Theme } from '@/shared/const/theme'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage'

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialTheme, children } = props

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

  const defaultProp = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  )

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={defaultProp}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
