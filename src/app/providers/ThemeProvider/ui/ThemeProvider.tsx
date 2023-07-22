import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Theme } from '@/shared/const/theme'
import { useJsonSettings } from '@/entities/User'

interface ThemeProviderProps {
  initialTheme?: Theme
  children?: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialTheme, children } = props

  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings()
  const [isThemeInited, setThemeInited] = useState(false)

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

  useEffect(() => {
    if (!isThemeInited) {
      setTheme(defaultTheme)
      setThemeInited(true)
    }
  }, [defaultTheme, isThemeInited])

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
