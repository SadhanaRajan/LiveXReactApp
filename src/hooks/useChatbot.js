import { useCallback, useEffect, useRef, useState } from 'react';

const BOT_RESPONSES = [
  'Thanks for your message! Let me check on that.',
  'Great question. I will follow up shortly.',
  'I appreciate your patience while I gather more info.',
  'Can you share more details so I can assist better?',
  'Consider trying again in a moment.'
];

const randomResponse = () =>
  BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];

const createId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);
  const pendingResponsesRef = useRef([]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
  }, [stopTimer]);

  const clearPendingResponses = useCallback(() => {
    pendingResponsesRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    pendingResponsesRef.current = [];
  }, []);

  useEffect(() => {
    if (isOpen) {
      setElapsedSeconds(0);
      startTimer();
    } else {
      stopTimer();
      setElapsedSeconds(0);
      clearPendingResponses();
    }

    return () => {
      stopTimer();
      clearPendingResponses();
    };
  }, [clearPendingResponses, isOpen, startTimer, stopTimer]);

  const toggleChat = () => {
    setIsOpen((state) => !state);
  };

  const closeChat = () => {
    setIsOpen(false);
    setElapsedSeconds(0);
    clearPendingResponses();
  };

  const resetChat = () => {
    setMessages([]);
    setElapsedSeconds(0);
    clearPendingResponses();
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: createId(),
      from: 'user',
      text: trimmed,
      createdAt: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const timeoutId = setTimeout(() => {
      const botMessage = {
        id: createId(),
        from: 'bot',
        text: randomResponse(),
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, botMessage]);
      pendingResponsesRef.current = pendingResponsesRef.current.filter(
        (id) => id !== timeoutId
      );
    }, 600);

    pendingResponsesRef.current.push(timeoutId);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return {
    isOpen,
    toggleChat,
    closeChat,
    resetChat,
    input,
    setInput,
    messages,
    sendMessage,
    handleKeyDown,
    elapsedSeconds
  };
};
