import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ContentArea from './ContentArea.jsx';
import { AppProvider, useAppContext } from '../context/AppContext.jsx';

const SearchControls = () => {
  const { setSearchTerm } = useAppContext();
  return (
    <div>
      <button type="button" onClick={() => setSearchTerm('lorem')}>
        Search lorem
      </button>
      <button type="button" onClick={() => setSearchTerm('xyz')}>
        Search none
      </button>
    </div>
  );
};

const renderContent = () =>
  render(
    <AppProvider>
      <ContentArea />
      <SearchControls />
    </AppProvider>
  );

describe('ContentArea', () => {
  it('highlights matching terms when searching', async () => {
    renderContent();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /search lorem/i }));
    expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent(
      /apps page/i
    );
    const highlights = screen.getAllByText(/lorem/i, { selector: 'mark' });
    expect(highlights.length).toBeGreaterThan(0);
  });

  it('shows an empty state when there are no matches', async () => {
    renderContent();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /search none/i }));
    expect(
      screen.getByText(/no paragraphs match your search/i)
    ).toBeInTheDocument();
  });
});
