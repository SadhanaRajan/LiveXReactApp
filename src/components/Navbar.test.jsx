import { fireEvent, render, screen, act } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
} from 'vitest';
import Navbar from './Navbar.jsx';
import { AppProvider, useAppContext } from '../context/AppContext.jsx';

const ContextInspector = () => {
  const { searchTerm, activePage, setActivePage } = useAppContext();
  return (
    <div>
      <p data-testid="search-value">{searchTerm}</p>
      <p data-testid="active-page">{activePage}</p>
      <button type="button" onClick={() => setActivePage('documents')}>
        Debug: go documents
      </button>
    </div>
  );
};

const renderNavbar = () =>
  render(
    <AppProvider>
      <Navbar />
      <ContextInspector />
    </AppProvider>
  );

describe('Navbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('debounces updates before syncing to context searchTerm', () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(/search content/i);

    fireEvent.change(input, { target: { value: 'Docs' } });
    expect(screen.getByTestId('search-value')).toHaveTextContent('');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByTestId('search-value')).toHaveTextContent('Docs');
  });

  it('focuses the search field when pressing the "/" shortcut', () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(/search content/i);

    expect(document.activeElement).not.toBe(input);
    fireEvent.keyDown(window, { key: '/', code: 'Slash' });
    expect(document.activeElement).toBe(input);
  });

  it('resets to the initial page when tapping the logo', () => {
    renderNavbar();
    const input = screen.getByPlaceholderText(/search content/i);

    fireEvent.click(screen.getByRole('button', { name: /debug: go documents/i }));
    expect(screen.getByTestId('active-page')).toHaveTextContent('documents');

    fireEvent.change(input, { target: { value: 'Docs' } });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByTestId('search-value')).toHaveTextContent('Docs');

    fireEvent.click(screen.getByRole('button', { name: /site logo/i }));
    expect(screen.getByTestId('active-page')).toHaveTextContent('apps');
    expect(screen.getByTestId('search-value')).toHaveTextContent('');
  });
});
