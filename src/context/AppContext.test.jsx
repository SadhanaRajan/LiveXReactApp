import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { AppProvider, useAppContext } from './AppContext.jsx';

const ContextConsumer = () => {
  const { activePage, setActivePage, searchTerm, setSearchTerm, content } =
    useAppContext();

  return (
    <div>
      <p data-testid="active-page">{activePage}</p>
      <p data-testid="search-value">{searchTerm}</p>
      <p data-testid="content-title">{content.title}</p>
      <button type="button" onClick={() => setActivePage('documents')}>
        Go to documents
      </button>
      <button type="button" onClick={() => setActivePage('apps')}>
        Go to apps
      </button>
      <button type="button" onClick={() => setSearchTerm('lorem')}>
        Set search
      </button>
    </div>
  );
};

describe('AppContext', () => {
  const renderWithProvider = () =>
    render(
      <AppProvider>
        <ContextConsumer />
      </AppProvider>
    );

  it('provides initial active page and related content', () => {
    renderWithProvider();

    expect(screen.getByTestId('active-page')).toHaveTextContent('apps');
    expect(screen.getByTestId('content-title')).toHaveTextContent('Apps Page');
    expect(screen.getByTestId('search-value')).toHaveTextContent('');
  });

  it('clears the search term when switching pages', async () => {
    renderWithProvider();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /set search/i }));
    expect(screen.getByTestId('search-value')).toHaveTextContent('lorem');

    await user.click(
      screen.getByRole('button', { name: /go to documents/i })
    );

    await waitFor(() => {
      expect(screen.getByTestId('search-value')).toHaveTextContent('');
    });
    expect(screen.getByTestId('active-page')).toHaveTextContent('documents');
    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Documents Page'
    );
  });
});
