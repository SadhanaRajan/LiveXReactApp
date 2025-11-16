import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Chatbot from './Chatbot.jsx';

const createHookState = () => ({
  isOpen: true,
  toggleChat: vi.fn(),
  closeChat: vi.fn(),
  resetChat: vi.fn(),
  input: '',
  setInput: vi.fn(),
  messages: [
    { id: '1', from: 'user', text: 'Hello' },
    { id: '2', from: 'bot', text: 'Hi there' }
  ],
  sendMessage: vi.fn(),
  handleKeyDown: vi.fn(),
  elapsedSeconds: 5
});

let hookState = createHookState();

vi.mock('../hooks/useChatbot.js', () => ({
  useChatbot: () => hookState
}));

describe('Chatbot component', () => {
  beforeEach(() => {
    hookState = createHookState();
  });

  it('toggles visibility when pressing the trigger button', async () => {
    hookState.isOpen = false;
    render(<Chatbot />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /chat/i }));
    expect(hookState.toggleChat).toHaveBeenCalledTimes(1);
  });

  it('shows messages and wires up actions when open', async () => {
    render(<Chatbot />);
    const user = userEvent.setup();

    expect(screen.getByText(/assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/5s elapsed/)).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(textarea, { target: { value: 'New Msg' } });
    expect(hookState.setInput).toHaveBeenCalledWith('New Msg');

    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(hookState.resetChat).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(hookState.closeChat).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /^send$/i }));
    expect(hookState.sendMessage).toHaveBeenCalledTimes(1);
  });
});
