import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App.jsx';
import { AppProvider } from '../context/AppContext.jsx';

const renderApp = () =>
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

describe('App', () => {
  it('renders the primary layout pieces', () => {
    renderApp();

    expect(screen.getByText(/logo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search content/i)).toBeVisible();
    expect(screen.getByRole('button', { name: /apps/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /documents/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
  });
});
