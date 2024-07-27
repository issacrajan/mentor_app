'use client';
import { GlobalContent, UserInfoType } from '@/common/types/types';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext<GlobalContent>({
  user: {},
  setUser: () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfoType>({ userName: '' });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
