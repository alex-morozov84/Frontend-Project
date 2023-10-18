import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

const ForceUpdateContext = createContext({
  value: true,
  forceUpdate: () => {},
});

export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);

  return forceUpdate;
};

// Костыльный способ обновить интерфейс при смене feature flag (подробнее в уроке 148)
export function ForceUpdateProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(true);

  const forceUpdate = () => {
    setValue((prev) => !prev);
    setTimeout(() => {
      setValue((prev) => !prev);
    }, 120);
  };

  const valueContext = useMemo(() => ({ value, forceUpdate }), [value]);

  if (!value) {
    return null;
  }

  return (
    <ForceUpdateContext.Provider value={valueContext}>
      {children}
    </ForceUpdateContext.Provider>
  );
}
