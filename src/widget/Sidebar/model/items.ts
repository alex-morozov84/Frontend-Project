import React from 'react';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RouterPath.main,
    Icon: MainIcon,
    text: 'Главная',
  },
  {
    path: RouterPath.about,
    Icon: AboutIcon,
    text: 'О сайте',
  },
  {
    path: RouterPath.profile,
    Icon: ProfileIcon,
    text: 'Профиль',
  },
];
