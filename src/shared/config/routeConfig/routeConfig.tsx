import {RouteProps} from "react-router-dom";
import {AboutPage} from "pages/AboutPage";
import {MainPage} from "pages/MainPage";

export enum AppRoutes {
  MAIN ='main',
  ABOUT = 'about'
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: <MainPage/>
  },
  [AppRoutes.ABOUT]: {
    path: RouterPath.about,
    element: <AboutPage/>
  }
}