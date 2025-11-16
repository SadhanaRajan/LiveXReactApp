import clsx from 'clsx';
import { useAppContext } from '../context/AppContext.jsx';

const menuItems = [
  { id: 'apps', label: 'Apps' },
  { id: 'documents', label: 'Documents' }
];

const SideMenu = () => {
  const { activePage, setActivePage, setSearchTerm } = useAppContext();

  const handleSelect = (id) => {
    setActivePage(id);
    setSearchTerm('');
  };

  return (
    <nav className="side-menu" aria-label="Primary">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={clsx('menu-item', { active: activePage === item.id })}
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
