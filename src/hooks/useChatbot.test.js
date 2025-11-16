import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useChatbot } from './useChatbot.js';

const advanceTimers = (ms) => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};

describe('useChatbot', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
      vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('mock-id');
    }
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('sends a user message and queues a bot response', () => {
    const { result } = renderHook(() => useChatbot());

    act(() => {
      result.current.setInput('Hello bot');
    });

    act(() => {
      result.current.sendMessage();
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toMatchObject({
      from: 'user',
      text: 'Hello bot'
    });
    expect(result.current.input).toBe('');

    advanceTimers(600);

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1].from).toBe('bot');
  });

  it('tracks elapsed time only while the chat is open', () => {
    const { result } = renderHook(() => useChatbot());

    expect(result.current.elapsedSeconds).toBe(0);

    act(() => {
      result.current.toggleChat();
    });

    expect(result.current.isOpen).toBe(true);

    advanceTimers(2500);
    expect(result.current.elapsedSeconds).toBeGreaterThanOrEqual(2);

    act(() => {
      result.current.closeChat();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.elapsedSeconds).toBe(0);
  });
});
