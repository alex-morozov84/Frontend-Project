import { useTranslation } from 'react-i18next'
import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User'
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router'
import {ToggleFeatures} from "@/shared/lib/features";
import {Dropdown} from "@/shared/ui/redesigned/Popups";
import {Avatar} from "@/shared/ui/redesigned/Avatar";

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation()
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const dispatch = useDispatch()
  const authData = useSelector(getUserAuthData)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (!authData) {
    return null
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
        {
          content: t('Админка'),
          href: getRouteAdminPanel(),
        },
      ]
      : []),
    {
      content: t('Профиль'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
  ]

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Dropdown
          direction="bottom left"
          className={classNames('', {}, [className])}
          items={items}
          trigger={<Avatar size={40} src={authData.avatar} />}
        />
      }
      off={
        <DropdownDeprecated
          direction="bottom left"
          className={classNames('', {}, [className])}
          items={items}
          trigger={<AvatarDeprecated fallbackInverted size={30} src={authData.avatar} />}
        />
      }
    />
  )
})
