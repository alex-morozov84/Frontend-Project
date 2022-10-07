import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/ui/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar)}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t('Войти')}
      </Button>
      <Modal
        isOpen={isAuthModal}
        onClose={onToggleModal}
      >
        {/* eslint-disable-next-line i18next/no-literal-string */}
        {/* eslint-disable-next-line i18next/no-literal-string,max-len */}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolorem dolores eos et iusto nesciunt odio provident qui sed. Ad architecto distinctio doloribus exercitationem laboriosam neque rem repudiandae ut velit!
      </Modal>
    </div>
  );
};
