import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useAppContext();
  const searchInputRef = useRef(null);

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
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search paragraphs"
          aria-keyshortcuts="/"
        />
      </div>
    </header>
  );
};

export default Navbar;
