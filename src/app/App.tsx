import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from '@/widget/Navbar'
import { Sidebar } from '@/widget/Sidebar'
import { getUserInited, initAuthData } from '@/entities/User'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { PageLoader } from '@/widget/PageLoader'
import { ToggleFeatures } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts/MainLayout'

function App() {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()

  const inited = useSelector(getUserInited)

  useEffect(() => {
    dispatch(initAuthData())
  }, [dispatch])

  if (!inited) {
    return <PageLoader />
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div id='app' className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
            />
          </Suspense>
        </div>
      }
      off={
        <div id='app' className={classNames('app', {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  )
}

export default App
