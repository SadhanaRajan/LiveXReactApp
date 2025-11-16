import { createContext, useContext, useMemo, useState } from 'react';
import { pages } from '../data/pages.js';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('apps');
  const [searchTerm, setSearchTerm] = useState('');

  const value = useMemo(
    () => ({
      activePage,
      setActivePage,
      searchTerm,
      setSearchTerm,
      content: pages[activePage],
      pages
    }),
    [activePage, searchTerm]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
