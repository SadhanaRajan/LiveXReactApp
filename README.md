## LiveX React Chatbot

A small React single-page app that meets the requirements from `FRONTEND.md`: sticky navbar with a search bar, contextual side menu, scrollable content panes, chatbot with mock responses, and live text filtering with highlighting.

### Tech Stack & Decisions

-   **React + Vite** for a lean developer experience.
-   **Context API** handles global UI state (active page + search term).
-   **Custom hook `useChatbot`** encapsulates chat open/close state, timer, and messaging logic.
-   **Pure CSS** (no utility frameworks) keeps the footprint minimal while satisfying responsive requirements.

### Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/SadhanaRajan/LiveXReactApp.git
    cd LiveXReactApp
    ```
2. **Install dependencies** (Node.js 18+ recommended)
    ```bash
    npm install
    ```
3. **Start the dev server**
    ```bash
    npm run dev
    ```
4. Open the printed URL (defaults to `http://localhost:5173`) to interact with the UI.

For a one-off production preview instead of the dev server:

```bash
npm run build
npm run preview
```

### Available Scripts

-   `npm run dev` – starts Vite dev server with hot module replacement.
-   `npm run build` – generates a production build inside `dist`.
-   `npm run preview` – serves the production build locally for quick verification.

### Feature Notes

-   **Search filtering** hides non-matching paragraphs and highlights the query within the remaining text.
-   **Chatbot** keeps user messages on the right, bot replies on the left, and displays an always-on timer that resets on reset/close commands. The floating trigger remains visible across viewports, and the chat window expands to full screen on mobile widths.
-   **Responsive layout** keeps the navbar fixed at the top, side menu accessible, and text content scrollable independently from the rest of the UI.
-   **Additional notes** in [Notes.md](./Notes.md)

---
