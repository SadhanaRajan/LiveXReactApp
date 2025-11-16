import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { useDebounce } from '../hooks/useDebounce.js';

const SEARCH_DEBOUNCE_MS = 250;
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const Navbar = () => {
  const { searchTerm, setSearchTerm, content } = useAppContext();
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearch = useDebounce(inputValue, SEARCH_DEBOUNCE_MS);
  const searchInputRef = useRef(null);
  const paragraphs = content?.paragraphs ?? [];

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch === searchTerm) {
      return;
    }
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, searchTerm, setSearchTerm]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if (
        event.key !== '/' ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.defaultPrevented
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable
      ) {
        return;
      }

      event.preventDefault();
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.select();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const matchCount = useMemo(() => {
    const query = searchTerm.trim();
    if (!query) {
      return 0;
    }
    const safeQuery = escapeRegExp(query);
    const regex = new RegExp(safeQuery, 'gi');
    return paragraphs.reduce((sum, paragraph) => {
      const matches = paragraph.match(regex);
      return sum + (matches ? matches.length : 0);
    }, 0);
  }, [paragraphs, searchTerm]);

  const showMatchCount = searchTerm.trim().length > 0;

  return (
    <header className="navbar">
      <div className="logo" aria-label="Site logo">
        Logo
      </div>
      <div className="search-bar">
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search content..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          aria-label="Search paragraphs"
          aria-keyshortcuts="/"
        />
        <span className="search-match-count" aria-live="polite" aria-atomic="true">
          {showMatchCount ? `${matchCount} match${matchCount === 1 ? '' : 'es'}` : ''}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
