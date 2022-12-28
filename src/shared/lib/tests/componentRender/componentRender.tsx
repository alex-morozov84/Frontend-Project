import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line path-checker/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// eslint-disable-next-line path-checker/layer-imports
import '@/app/styles/index.scss';

export interface ComponentRenderOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
  theme?: Theme
}

interface TestProviderProps {
  children: ReactNode
  options?: ComponentRenderOptions
}

export function TestProvider(props: TestProviderProps) {
  const {
    children, options = {},
  } = props;

  const {
    route = '/',
    initialState,
    asyncReducers,
    theme = Theme.LIGHT,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
              {children}
            </div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
