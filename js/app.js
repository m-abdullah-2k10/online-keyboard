/**
 * Main Application Controller
 * Initializes and coordinates all modules
 * Handles UI rendering and event management
 */

const App = (() => {
  let initialized = false;

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

    layout.forEach(row => {
      const rowElement = document.createElement('div');
      rowElement.className = 'keyboard-row';

      row.forEach(key => {
        const keyElement = createKeyElement(key);
        rowElement.appendChild(keyElement);
      });

      keyboardGrid.appendChild(rowElement);
    });
  };

  /**
   * Create a DOM element for a single key
   * @param {string} char - The character for the key
   * @returns {HTMLElement} The key button element
   */
  const createKeyElement = (char) => {
    const button = document.createElement('button');
    button.className = 'key-btn';
    button.textContent = char;
    button.setAttribute('data-char', char);
    button.setAttribute('aria-label', `Key ${char}`);

    button.addEventListener('click', () => handleKeyClick(char));

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
      const mode = KeyboardManager.getCurrentMode();
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
