import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Dropdown } from 'shared/ui/Popups';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { useDispatch, useSelector } from 'react-redux';

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      direction="bottom left"
      className={classNames('', {}, [className])}
      items={[
        ...(isAdminPanelAvailable ? [{
          content: t('Админка'),
          href: RouterPath.admin_panel,
        }] : []),
        {
          content: t('Профиль'),
          href: RouterPath.profile + authData.id,
        },
        {
          content: t('Выйти'),
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});
