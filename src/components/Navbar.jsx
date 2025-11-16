import { useAppContext } from '../context/AppContext.jsx';

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  return (
    <header className="navbar">
      <div className="logo" aria-label="Site logo">
        Logo
      </div>
      <div className="search-bar">
        <input
          type="search"
          placeholder="Search content..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search paragraphs"
        />
      </div>
    </header>
  );
};

export default Navbar;
