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

const SearchValueReader = () => {
  const { searchTerm } = useAppContext();
  return <p data-testid="search-value">{searchTerm}</p>;
};

const renderNavbar = () =>
  render(
    <AppProvider>
      <Navbar />
      <SearchValueReader />
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
});
