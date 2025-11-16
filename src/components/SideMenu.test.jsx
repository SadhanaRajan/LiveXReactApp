import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import SideMenu from './SideMenu.jsx';
import { AppProvider, useAppContext } from '../context/AppContext.jsx';

const SearchPrime = () => {
  const { setSearchTerm } = useAppContext();
  return (
    <button type="button" onClick={() => setSearchTerm('primed')}>
      Prime search
    </button>
  );
};

const SearchValue = () => {
  const { searchTerm } = useAppContext();
  return <p data-testid="search-state">{searchTerm}</p>;
};

const renderMenu = () =>
  render(
    <AppProvider>
      <SideMenu />
      <SearchPrime />
      <SearchValue />
    </AppProvider>
  );

describe('SideMenu', () => {
  it('switches active page and clears the search term', async () => {
    renderMenu();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /prime search/i }));
    expect(screen.getByTestId('search-state')).toHaveTextContent('primed');

    const documentsButton = screen.getByRole('button', { name: /documents/i });
    await user.click(documentsButton);

    expect(documentsButton).toHaveClass('active');
    expect(screen.getByRole('button', { name: /apps/i })).not.toHaveClass(
      'active'
    );
    expect(screen.getByTestId('search-state')).toHaveTextContent('');
  });
});
