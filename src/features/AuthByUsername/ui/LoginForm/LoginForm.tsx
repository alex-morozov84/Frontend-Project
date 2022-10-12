import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/ui/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        placeholder={t('Введите username')}
        type="text"
        className={cls.input}
        autofocus
      />
      <Input
        placeholder={t('Введите пароль')}
        type="text"
        className={cls.input}
      />
      <Button className={cls.loginBtn}>
        {t('Войти')}
      </Button>
    </div>
  );
};
