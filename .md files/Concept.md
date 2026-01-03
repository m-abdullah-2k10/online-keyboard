1️⃣ Core Concept: Online Embeddable Keyboard
Definition

An online embeddable keyboard is a web-based virtual keyboard that runs inside a browser and allows users to type characters by clicking on on-screen keys.
It can be used:

As a standalone webpage

Or embedded inside other websites using an <iframe>

The keyboard does not require installation, works on desktop and mobile, and allows users to copy typed text.

2️⃣ How It Works (Conceptual Flow)

User opens the keyboard webpage (direct link or embedded)

A text input area is displayed

A keyboard layout (buttons) appears below the input

When a key is clicked:

The corresponding character is inserted into the text area

Utility keys (Backspace, Space, Enter, Clear) modify the text

User can copy the text and use it anywhere

Website owners can embed the keyboard using <iframe>

3️⃣ Core Functional Features (Must Have)
🔹 Text Input Area

Large textarea for typed content

Supports Unicode (Urdu, Arabic, English, etc.)

Cursor always stays at the end (initial version)

🔹 Keyboard Layout System

Keys are rendered as clickable buttons

Layout is defined using arrays (rows and keys)

Supports:

Alphabet keys

Space

Backspace

Enter

Clear / Reset

🔹 Language Support

Multiple language layouts (e.g., Urdu, English)

Language switch button

Each language has its own key map

Example:

Urdu layout → Urdu letters

English layout → A–Z

🔹 Input Logic

Clicking a key inserts text into textarea

Backspace removes last character

Space inserts a space character

Enter inserts newline (optional)

Clear empties the text area

🔹 Copy Functionality

“Copy” button

Copies text to clipboard using JavaScript

Shows success message after copying

4️⃣ Embedding Capability (Very Important)
Concept

The keyboard is designed to be embedded into any external website using an <iframe>.

Requirements

No login required

No tracking

No dependency on parent website

Fully self-contained

Embed Example:
<iframe
  src="https://example.com/keyboard"
  width="100%"
  height="400"
  frameborder="0">
</iframe>

5️⃣ Technical Architecture (High-Level)
Frontend Only Application

No backend required

No database

Runs fully in browser

Technologies Used

HTML → Structure

CSS → Styling & responsive layout

JavaScript → Keyboard logic & interactions

6️⃣ UI / UX Concept
Design Principles

Large, touch-friendly keys

Clear separation of rows

Mobile-first responsive layout

Minimal and clean design

Accessibility

Buttons clearly labeled

High contrast for readability

Works with mouse and touch

7️⃣ Security & Compatibility Concept

No user data is stored

No cookies required

Safe for embedding

Compatible with:

Chrome

Firefox

Edge

google

Mobile browsers

8️⃣ Extensible Features (Future Scope)

(Not required initially, but design should allow)

Shift key

Symbols layout

Dark mode

Phonetic typing

Auto direction (RTL for Urdu)

Key sound toggle

#features:

it should contain languages urdu, english
button for upper case and bydefault lower case 
button for symbols that when pressed change the key to write symbols and numbers(0-9)
button to switch language 