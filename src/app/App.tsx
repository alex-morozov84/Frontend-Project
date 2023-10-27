import React, {memo, Suspense, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {classNames} from '@/shared/lib/classNames/classNames'
import {AppRouter} from './providers/router'
import {Navbar} from '@/widget/Navbar'
import {Sidebar} from '@/widget/Sidebar'
import {getUserInited, initAuthData} from '@/entities/User'
import {useTheme} from '@/shared/lib/hooks/useTheme/useTheme'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {PageLoader} from '@/widget/PageLoader'
import {ToggleFeatures} from '@/shared/lib/features'
import {MainLayout} from '@/shared/layouts/MainLayout'
import {AppLoaderLayout} from "@/shared/layouts/AppLoaderLayout";
import {useAppToolbar} from "./lib/useAppToolbar";
import {withTheme} from "./providers/ThemeProvider/ui/withTheme";

const App = memo(() => {
  const {theme} = useTheme()
  const dispatch = useAppDispatch()

  const inited = useSelector(getUserInited)
  const toolbar = useAppToolbar()

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData())
    }
  }, [dispatch, inited])

  if (!inited) {
    return <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <div id='app' className={classNames('app_redesigned', {}, [theme])}>
          <AppLoaderLayout/>
        </div>
      }
      off={<PageLoader/>}
    />
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div id='app' className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar/>}
              content={<AppRouter/>}
              sidebar={<Sidebar/>}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
      off={
        <div id='app' className={classNames('app', {}, [theme])}>
          <Suspense fallback="">
            <Navbar/>
            <div className="content-page">
              <Sidebar/>
              <AppRouter/>
            </div>
          </Suspense>
        </div>
      }
    />
  )
})

export default withTheme(App)