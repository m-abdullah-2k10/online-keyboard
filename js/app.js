/**
 * Main Application Controller
 * Initializes and coordinates all modules
 * Handles UI rendering and event management
 */

const App = (() => {
  let initialized = false;
  let oneTimeCaps = false; // single-use case invert toggle

  /**
   * Initialize the application
   */
  const init = () => {
    if (initialized) return;

    // Initialize managers
    const textAreaElement = document.getElementById('textInput');
    TextManager.init(textAreaElement);
    LanguageManager.init();

    // Setup event listeners
    setupLanguageButtons();
    setupModeButtons();
    setupActionButtons();

    // Initial render
    renderKeyboard();
    updateUIDisplay();

    initialized = true;
  };

  /**
   * Render the keyboard grid
   */
  const renderKeyboard = () => {
    const keyboardGrid = document.getElementById('keyboardGrid');
    keyboardGrid.innerHTML = '';

    const layout = KeyboardManager.getLayout();

    layout.forEach((row, rowIndex) => {
      const rowElement = document.createElement('div');
      rowElement.className = 'keyboard-row';

      row.forEach(key => {
        const keyElement = createKeyElement(key);
        rowElement.appendChild(keyElement);
      });

      // Add backspace at the right edge of the first row
      if (rowIndex === 0) {
        const backspaceBtn = createSpecialKeyElement('{BACKSPACE}', '⌫');
        backspaceBtn.classList.add('key-backspace');
        rowElement.appendChild(backspaceBtn);
      }

      keyboardGrid.appendChild(rowElement);
    });

    // Add special control row (Copy, Caps, Space, Clear)
    const controlRow = document.createElement('div');
    controlRow.className = 'keyboard-row keyboard-controls';

    // Copy button (left)
    const copyBtn = createSpecialKeyElement('{COPY}', 'Copy');
    controlRow.appendChild(copyBtn);

    // Caps (one-time shift)
    const capsBtn = createSpecialKeyElement('{CAPS}', 'Caps');
    controlRow.appendChild(capsBtn);

    // Space (wide)
    const spaceBtn = createSpecialKeyElement('{SPACE}', '');
    spaceBtn.classList.add('key-space');
    controlRow.appendChild(spaceBtn);

    // Clear (right)
    const clearBtn = createSpecialKeyElement('{CLEAR}', 'Clear');
    controlRow.appendChild(clearBtn);

    keyboardGrid.appendChild(controlRow);
  };

  /**
   * Create a DOM element for a single key
   * @param {string} char - The character for the key
   * @returns {HTMLElement} The key button element
   */
  const createKeyElement = (char) => {
    const button = document.createElement('button');
    button.className = 'key-btn';

    // If one-time caps is active and this is an alphabetic key, display uppercase
    const displayChar = (() => {
      try {
        if (oneTimeCaps && /^[a-zA-Z]$/.test(char)) {
          const mode = KeyboardManager.getActiveMode();
          if (mode === 'lowercase') return char.toUpperCase();
          if (mode === 'uppercase') return char.toLowerCase();
        }
      } catch (e) {
        // ignore
      }
      return char;
    })();

    button.textContent = displayChar;
    button.setAttribute('data-char', char);
    button.setAttribute('aria-label', `Key ${char}`);

    button.addEventListener('click', () => {
      // If one-time caps active and key is alphabetic, insert inverted-case char and reset
      if (oneTimeCaps && /^[a-zA-Z]$/.test(char)) {
        const mode = KeyboardManager.getActiveMode();
        const toInsert = mode === 'lowercase' ? char.toUpperCase() : char.toLowerCase();
        TextManager.insertCharacter(toInsert);
        oneTimeCaps = false;
        // Re-render to show original state
        renderKeyboard();
        updateCharCount();
        return;
      }

      handleKeyClick(char);
    });

    return button;
  };

  /**
   * Create special key element for control actions
   */
  const createSpecialKeyElement = (token, label) => {
    const button = document.createElement('button');
    button.className = 'key-btn key-special';
    button.textContent = label;

    switch (token) {
      case '{BACKSPACE}':
        button.setAttribute('aria-label', 'Backspace');
        button.addEventListener('click', () => { handleSpecialKey('backspace'); });
        break;
      case '{SPACE}':
        button.setAttribute('aria-label', 'Space');
        button.addEventListener('click', () => { handleSpecialKey('space'); });
        break;
      case '{CAPS}':
        button.setAttribute('aria-label', 'Caps Lock');
        button.addEventListener('click', () => {
          // Toggle one-time caps
          oneTimeCaps = true;
          // Visual feedback handled by renderKeyboard (button recreated there)
          renderKeyboard();
        });
        // If oneTimeCaps currently active, show visual state
        if (oneTimeCaps) button.classList.add('active');
        break;
      case '{COPY}':
        button.setAttribute('aria-label', 'Copy');
        button.addEventListener('click', async () => {
          const text = TextManager.getText();
          if (!text) {
            showStatusMessage('Nothing to copy', 'info');
            return;
          }

          // Use TextManager.copyToClipboard if available
          try {
            await TextManager.copyToClipboard();
            showStatusMessage('Copied to clipboard!', 'success');
          } catch (e) {
            // Fallback to Utils copy (await if returns Promise)
            if (typeof Utils !== 'undefined' && Utils.copyToClipboard) {
              try {
                const result = Utils.copyToClipboard(text);
                if (result && typeof result.then === 'function') {
                  const ok = await result;
                  showStatusMessage(ok ? 'Copied to clipboard!' : 'Copy failed', ok ? 'success' : 'error');
                } else {
                  showStatusMessage(result ? 'Copied to clipboard!' : 'Copy failed', result ? 'success' : 'error');
                }
              } catch (err) {
                showStatusMessage('Copy failed', 'error');
              }
            } else {
              showStatusMessage('Copy failed', 'error');
            }
          }
        });
        break;
      case '{CLEAR}':
        button.setAttribute('aria-label', 'Clear');
        button.addEventListener('click', () => {
          TextManager.clearText();
          updateCharCount();
          showStatusMessage('Text cleared', 'info');
        });
        break;
      default:
        break;
    }

    return button;
  };

  /**
   * Handle a key click
   * @param {string} char - The character that was clicked
   */
  const handleKeyClick = (char) => {
    TextManager.insertCharacter(char);
    updateCharCount();
  };

  /**
   * Setup language button event listeners
   */
  const setupLanguageButtons = () => {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const selectedLang = e.target.dataset.lang;

        // Update UI state
        langButtons.forEach(btn => {
          btn.classList.remove('lang-btn-active');
          btn.setAttribute('aria-pressed', 'false');
        });

        e.target.classList.add('lang-btn-active');
        e.target.setAttribute('aria-pressed', 'true');

        // Update manager
        LanguageManager.setLanguage(selectedLang);
        KeyboardManager.switchLanguage(selectedLang);

        // Re-render
        renderKeyboard();
        updateUIDisplay();
      });
    });
  };

  /**
   * Setup mode button event listeners
   */
  const setupModeButtons = () => {
    const modeButtons = document.querySelectorAll('.mode-btn');

    modeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const selectedMode = e.target.dataset.mode;

        // Update UI state
        modeButtons.forEach(btn => {
          btn.classList.remove('mode-btn-active');
          btn.setAttribute('aria-pressed', 'false');
        });

        e.target.classList.add('mode-btn-active');
        e.target.setAttribute('aria-pressed', 'true');

        // Update manager
        KeyboardManager.switchMode(selectedMode);

        // Re-render
        renderKeyboard();
        updateUIDisplay();
      });
    });
  };

  /**
   * Setup action button event listeners (Copy, Clear, etc.)
   */
  const setupActionButtons = () => {
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        await TextManager.copyToClipboard();
        showStatusMessage('Copied to clipboard!', 'success');
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        TextManager.clearText();
        updateCharCount();
        showStatusMessage('Text cleared', 'info');
      });
    }

    // Handle backspace - look for backspace key in keyboard
    // This will be handled through key click for now
  };

  /**
   * Update the character count display
   */
  const updateCharCount = () => {
    const charCountElement = document.getElementById('charCount');
    if (charCountElement) {
      const count = TextManager.getTextLength();
      charCountElement.textContent = `Characters: ${count}`;
    }
  };

  /**
   * Update the UI display (mode indicator)
   */
  const updateUIDisplay = () => {
    const modeDisplay = document.getElementById('modeDisplay');
    if (modeDisplay) {
      const mode = KeyboardManager.getActiveMode();
      const modeText = {
        lowercase: 'Lowercase Mode',
        uppercase: 'Uppercase Mode',
        symbols: 'Symbols & Numbers Mode'
      };
      modeDisplay.textContent = modeText[mode] || mode;
    }
  };

  /**
   * Show a status message
   * @param {string} message - The message to display
   * @param {string} type - Message type ('success', 'error', 'info')
   */
  const showStatusMessage = (message, type = 'info') => {
    const statusElement = document.getElementById('statusMessage');
    if (!statusElement) return;

    statusElement.textContent = message;
    statusElement.className = `status-message ${type} show`;

    // Auto-hide after 2 seconds
    setTimeout(() => {
      statusElement.textContent = '';
      statusElement.className = 'status-message';
    }, 2000);
  };

  /**
   * Handle special keys (Backspace, Enter, Space)
   * @param {string} keyType - Type of special key
   */
  const handleSpecialKey = (keyType) => {
    switch (keyType) {
      case 'backspace':
        TextManager.deleteLastCharacter();
        updateCharCount();
        break;
      case 'enter':
        TextManager.insertCharacter('\n');
        updateCharCount();
        break;
      case 'space':
        TextManager.insertCharacter(' ');
        updateCharCount();
        break;
      default:
        break;
    }
  };

  // Public API
  return {
    init,
    renderKeyboard,
    handleSpecialKey,
    showStatusMessage
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
