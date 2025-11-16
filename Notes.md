### Improvements - already implemented in this project
1. *Accessibility & keyboarding:*
   * Provide focus outlines, aria-live regions for new chat messages, and keyboard shortcuts (e.g., / to jump to search, `Ctrl+Enter` to send). Also ensure contrast ratios meet WCAG.
   * Added an `esc` key listener that’s only active when the chat is open, so pressing Esc closes the chatbot instantly without reaching for the mouse
1. *Search UX polish:*
   * Add debounce to reduce re-renders on every keystroke
   * Show match counts next to the search content
   * Clear search contents when switching pages
1. *Testing & quality gates*: 
   * Introduce unit tests (React Testing Library) for context logic and the chatbot hook, plus Playwright/Cypress smoke tests to catch regressions around search highlighting and chat interactions.
   * Installed `vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test`
   * Vitest requires `jsdom` package for the configured browser-like test environment. So installed `jsdom`
   * Run `npx playwright install` (once) to download browsers, then execute `npm run test:e2e`
1. Fun stuff:
   * Tapping on Logo will take you to the first landing page, App page in this case.
   * Textarea in Chatbot autofocuses whenever the chat window becomes visible, letting users type immediately, while keeping the scroll behavior intact.
   



### A few more ideas (not in this repo) roughly in order of impact:

1. Expandable data model: Right now the two pages are hard-coded. Move page content to a CMS or JSON fetched on load so product folks can add categories without touching code, and show a graceful loading/error state.
1. Search UX polish: For large payloads, consider Web Workers or server-backed search.
1. Chatbot fidelity: Persist conversation to localStorage/session so a refresh doesn’t erase history, display timestamps/avatars, and add typing indicators. Hook up to a simple backend endpoint if you want more realistic replies.
1. Performance & bundle health: Split the chatbot into a lazy-loaded chunk and run Lighthouse/React Profiler to check hydration and CPU use on low-end devices; add ESLint/Prettier hooks to keep the codebase tidy.
