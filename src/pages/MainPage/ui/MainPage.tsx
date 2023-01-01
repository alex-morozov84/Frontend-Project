import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widget/Page'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (
    <Page data-testid="MainPage">
      <div>234234234</div>
      {t('Главная')}
    </Page>
  )
}

export default MainPage
