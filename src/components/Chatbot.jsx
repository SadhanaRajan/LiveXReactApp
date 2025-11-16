import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useChatbot } from '../hooks/useChatbot.js';

const Chatbot = () => {
  const {
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
  } = useChatbot();

  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeChat, isOpen]);

  return (
    <div className="chatbot">
      <button
        type="button"
        className="chatbot-trigger"
        onClick={toggleChat}
        aria-expanded={isOpen}
      >
        {isOpen ? 'Hide Chat' : 'Chat'}
      </button>

      {isOpen && (
        <section className="chat-window" aria-label="Chatbot window">
          <header className="chat-header">
            <div>
              <p className="chat-title">Assistant</p>
              <span className="chat-timer">{elapsedSeconds}s elapsed</span>
            </div>
            <div className="chat-actions">
              <button type="button" className="ghost" onClick={resetChat}>
                Reset
              </button>
              <button type="button" className="ghost" onClick={closeChat}>
                Close
              </button>
            </div>
          </header>

          <div
            className="chat-messages"
            ref={messageEndRef}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Chat messages"
          >
            {messages.length === 0 ? (
              <p className="empty-state">Start the conversation by saying hi!</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={clsx('message-row', message.from)}
                >
                  <div className="bubble">{message.text}</div>
                </div>
              ))
            )}
          </div>

          <form
            className="chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <textarea
              ref={inputRef}
              rows={2}
              placeholder="Type your message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="primary">
              Send
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Chatbot;
