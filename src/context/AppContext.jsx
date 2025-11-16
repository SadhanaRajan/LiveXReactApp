import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { pages } from '../data/pages.js';

const AppContext = createContext();
const defaultContent = {
  title: 'Content unavailable',
  paragraphs: []
};

const getInitialPage = () => {
  if (pages.apps) return 'apps';
  const [firstKey] = Object.keys(pages);
  return firstKey ?? 'apps';
};

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(getInitialPage());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm('');
  }, [activePage]);

  const resetToInitialPage = useCallback(() => {
    setActivePage(getInitialPage());
  }, []);

  const value = useMemo(
    () => ({
      activePage,
      setActivePage,
      resetToInitialPage,
      searchTerm,
      setSearchTerm,
      content: pages[activePage] ?? defaultContent,
      pages
    }),
    [activePage, resetToInitialPage, searchTerm]
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
