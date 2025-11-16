# Frontend Development Challenge: Chatbot Website

**Objective:**  
Create a responsive website using **React JS** with a chatbot interface, navigation elements, and dynamic content handling.

## Requirements:

### Layout:
- **Navbar:** 
  - Positioned at the top of the screen.
  - On the left side, include a "Logo".
  - On the right side, include a search bar input.

- **Side Menu:** 
  - Positioned on the left side of the screen.
  - Contains menu items: "Apps", "Documents".
  - When an item is selected, content corresponding to "Apps Page" or "Documents Page" should be displayed on the right side of the screen.

- **Content Area:**
  - Each page ("Apps", "Documents") should contain multiple paragraphs of text (using Lorem Ipsum) to ensure the page is scrollable for testing purposes.

### Chatbot:
- **Icon Button:** 
  - Positioned at the bottom right of the screen, visible on all pages.
  - Clicking this button opens the chatbot.

- **Chatbot Window:**
  - **Dimensions:** Width 400px, Height 600px on desktop views.
  - **Mobile View:** Full screen when opened on mobile devices.
  
  - **Components:**
    - **Header:** 
      - Contains two buttons:
        - **Reset:** Clears all conversation history.
        - **Close:** Closes the chatbot window.
      - Displays elapsed time in seconds since opening, updating every second. Reset the timer when the 'Reset' or 'Close' button is clicked.
    
    - **Message View:** 
      - Displays messages in a chat format:
        - User messages on the right side.
        - Bot responses on the left side. 
      - For bot responses, you can use placeholder text or random responses.

    - **Input View:** 
      - Allows users to type messages.
      - Messages should be displayed in the message view when the user presses the "Enter" key or clicks the send button.

## Functionality:
- **Interactivity:** 
  - Menu selection should update the content area.
  - Chatbot should handle sending messages and responding with mock data or placeholders.
  - **Search Bar:** 
    - As the user types text into the search bar, only paragraphs containing the typed text should be shown in the content area.
    - Highlight the matching text within the paragraphs in the view.

## Technical Specifications:
- **Frameworks/Libraries:** Use **React JS**.
  - Use any kind of global state management
  - Create at least 1 custom hook
- **Version Control:** Create a public repository on GitHub for this project. Include a README with setup instructions, how to run the project, and any decisions you made during development.