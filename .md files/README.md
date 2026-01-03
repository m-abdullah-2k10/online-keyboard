# Online Embeddable Keyboard

A web-based virtual keyboard that can be used as a standalone webpage or embedded in external websites via iframe. Supports Urdu and English languages with uppercase/lowercase toggling and symbol/number modes.

## Features

- **Multi-Language Support**: English and Urdu
- **Multiple Modes**: Lowercase, Uppercase, and Symbols/Numbers
- **Touch-Friendly**: Works seamlessly on desktop and mobile devices
- **Copy Functionality**: Copy typed text to clipboard with one click
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Embeddable**: Can be embedded in any website using iframe
- **Accessible**: Full ARIA labels and keyboard navigation support
- **No Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Privacy-Focused**: No backend required, all processing client-side

## Project Structure

```
online-keyboard/
├── index.html                    # Main entry point
├── css/
│   └── style.css                 # Complete styling with variables
├── js/
│   ├── utils.js                  # Utility functions
│   ├── keyboard.js               # Keyboard layout definitions
│   ├── textManager.js            # Text input/output logic
│   ├── langManager.js            # Language management
│   └── app.js                    # Main application controller
├── tests/
│   ├── test-setup.js             # Test framework
│   ├── test-runner.html          # Test runner interface
│   └── unit/
│       ├── textManager.test.js   # Text manager tests
│       ├── keyboard.test.js      # Keyboard tests
│       ├── langManager.test.js   # Language tests
│       └── utils.test.js         # Utils tests
├── README.md                     # This file
└── Concept.md                    # Project concept document
```

## Phase 1: Core Infrastructure - COMPLETED

### 1.1 Project Setup ✓
- Directory structure created
- HTML5 boilerplate initialized
- CSS framework setup (mobile-first responsive)
- JavaScript module system (IIFE pattern)
- Test framework configured

### 1.2 HTML Structure ✓
**File:** `index.html`

**Key Elements Implemented:**
- Semantic HTML5 structure
- Textarea for text output
- Control panel with language and mode selection
- Keyboard grid container
- Status message display
- Full accessibility attributes (ARIA labels, roles)
- Mobile-friendly viewport settings
- Support for iframe embedding

**Accessibility Features:**
- `aria-label` on all interactive elements
- `role` attributes for button groups
- `aria-pressed` for toggle buttons
- `aria-live` for status messages
- Semantic HTML elements

### 1.3 Core CSS Styling ✓
**File:** `css/style.css`

**Features Implemented:**
- CSS variables for colors, spacing, typography
- Mobile-first responsive design
- Flexbox layout system
- Touch-friendly button sizing (44px minimum for mobile)
- Hover and active states for all interactive elements
- Textarea styling with focus states
- Mode indicator styling
- Status message styling with animations
- Responsive breakpoints:
  - Tablet (≤ 768px)
  - Mobile (≤ 480px)

**CSS Variables Defined:**
- Color palette (primary, secondary, accent, success, warning)
- Typography (font family, sizes, weights)
- Spacing (xs to xl)
- Border radius values
- Shadows (sm, md, lg)
- Transitions (fast, normal)

**Accessibility Enhancements:**
- High contrast mode support
- Reduced motion preferences respected
- Dark mode support via `prefers-color-scheme`
- Focus indicators on all interactive elements

### 1.4 Utility Functions ✓
**File:** `js/utils.js`

**Functions Implemented:**
- **Validation**: `isUnicodeValid(char)`
- **Browser**: `getSystemLocale()`
- **Timing**: `debounce(func, wait)`, `throttle(func, limit)`
- **DOM Classes**: `addClass()`, `removeClass()`, `toggleClass()`, `hasClass()`
- **DOM Queries**: `getElementById()`, `querySelector()`, `querySelectorAll()`
- **DOM Content**: `setText()`, `getText()`, `setHTML()`, `getHTML()`
- **DOM Creation**: `createElement(tagName, attributes)`
- **DOM Manipulation**: `append()`, `insertBefore()`, `remove()`, `clear()`
- **Event Handling**: `addEventListener()`, `removeEventListener()`
- **Attributes**: `getAttribute()`, `setAttribute()`
- **Visibility**: `isVisible()`, `scrollIntoView()`
- **Clipboard**: `copyToClipboard(text)` with fallback
- **Utilities**: `isEmpty()`, `deepCopy()`, `getRect()`, etc.

**Code Quality:**
- Comprehensive error handling
- Input validation
- JSDoc comments
- IIFE pattern for namespace isolation
- No external dependencies

### 1.5 Test Framework Setup ✓
**File:** `tests/test-setup.js`

**Features Implemented:**
- Simple assertion library with methods:
  - `assert.equal(actual, expected, message)`
  - `assert.notEqual(actual, expected, message)`
  - `assert.true(value, message)`
  - `assert.false(value, message)`
  - `assert.throws(fn, message)`
  - `assert.deepEqual(obj1, obj2, message)`
- Test suite manager with:
  - `describe(name, callback)` for test suites
  - `it(testName, testFn)` for individual tests
  - `beforeEach(fn)` and `afterEach(fn)` for setup/teardown
- Test runner with:
  - `run()` method to execute all tests
  - `getSummary()` for test results
  - Pass/fail tracking

**Test Runner UI:**
**File:** `tests/test-runner.html`

- Browser-based test interface
- Real-time test execution
- Color-coded results (green for pass, red for fail)
- Test summary with statistics
- Success rate calculation
- Responsive design for mobile testing
- Clear and run buttons

## Installation & Setup

### Local Setup
1. Clone or download the repository
2. Open `index.html` in a web browser
3. The keyboard will load and be ready to use

### Running Tests
1. Open `tests/test-runner.html` in a web browser
2. Click "Run All Tests" button
3. View results in real-time
4. Check summary for pass/fail statistics

## Usage

### Standalone Usage
Simply open `index.html` in a browser to use the keyboard.

### Embedding in Iframe
```html
<iframe
  src="https://your-domain.com/path/to/keyboard"
  width="100%"
  height="400"
  frameborder="0"
  allowtransparency="true">
</iframe>
```

### Responsive Embedding
```html
<div style="position: relative; width: 100%; padding-bottom: 60%;">
  <iframe
    src="https://your-domain.com/path/to/keyboard"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0">
  </iframe>
</div>
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Code Standards

### JavaScript
- ES6+ syntax
- IIFE pattern for modules
- Comprehensive error handling
- Input validation
- JSDoc comments
- Single responsibility principle
- No external dependencies

### CSS
- Mobile-first approach
- CSS variables for maintainability
- Flexbox layout
- Responsive design patterns
- Accessibility-first styling
- Dark mode support

### HTML
- Semantic HTML5
- Full accessibility attributes
- Proper form structure
- Meta tags for responsiveness
- Clean and organized markup

## Performance Targets

- Initial load time: < 2 seconds
- Keyboard render time: < 100ms
- Keypress response: < 50ms
- Copy operation: < 100ms

## Security & Privacy

- No user data is stored
- No cookies required
- No tracking or analytics
- No backend communication
- Safe for embedding in any website
- All processing happens client-side

## Next Steps (Phase 2)

The following phases will implement:
- Keyboard layout system (`keyboard.js`)
- Text management (`textManager.js`)
- Language management (`langManager.js`)
- Main application controller (`app.js`)
- Comprehensive unit tests
- Integration tests
- Advanced features

## Contributing

This project is developed following the implementation plan in `Implementation plan.md`. Please refer to that document for detailed specifications and architecture decisions.

## License

This project is open source and available under the MIT License.

---

**Phase 1 Completion Date:** January 3, 2026

**Status:** ✓ Complete - Ready for Phase 2 Implementation
