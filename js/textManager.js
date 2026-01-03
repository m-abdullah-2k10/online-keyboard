/**
 * Text Manager Module
 * Handles text input/output, character insertion, deletion, and clipboard operations
 * Supports Unicode characters including Urdu text
 */

const TextManager = (() => {
  let textArea = null;

  /**
   * Initialize the Text Manager with a textarea element
   * @param {HTMLTextAreaElement} element - The textarea element to manage
   */
  const init = (element) => {
    textArea = element;
  };

  /**
   * Set the text content of the textarea
   * @param {string} text - The text to set
   */
  const setText = (text) => {
    if (!textArea) return;
    textArea.value = text;
  };

  /**
   * Get the current text content of the textarea
   * @returns {string} Current textarea content
   */
  const getText = () => {
    if (!textArea) return '';
    return textArea.value;
  };

  /**
   * Insert a character at the current cursor position
   * @param {string} char - The character to insert
   */
  const insertCharacter = (char) => {
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const currentText = textArea.value;

    // Handle special character for newline
    if (char === '\n') {
      const newText = currentText.substring(0, start) + '\n' + currentText.substring(end);
      textArea.value = newText;
      textArea.selectionStart = textArea.selectionEnd = start + 1;
    } else {
      const newText = currentText.substring(0, start) + char + currentText.substring(end);
      textArea.value = newText;
      textArea.selectionStart = textArea.selectionEnd = start + 1;
    }
  };

  /**
   * Delete the last character before the cursor
   */
  const deleteLastCharacter = () => {
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const currentText = textArea.value;

    if (start === end && start > 0) {
      // No selection, delete character before cursor
      const newText = currentText.substring(0, start - 1) + currentText.substring(start);
      textArea.value = newText;
      textArea.selectionStart = textArea.selectionEnd = start - 1;
    } else if (start !== end) {
      // Text is selected, delete the selection
      const newText = currentText.substring(0, start) + currentText.substring(end);
      textArea.value = newText;
      textArea.selectionStart = textArea.selectionEnd = start;
    }
  };

  /**
   * Clear all text from the textarea
   */
  const clearText = () => {
    if (!textArea) return;
    textArea.value = '';
    textArea.selectionStart = textArea.selectionEnd = 0;
  };

  /**
   * Copy the current text to system clipboard
   * @returns {Promise<void>}
   */
  const copyToClipboard = async () => {
    if (!textArea) return;

    const text = textArea.value;
    if (!text) return;

    try {
      // Modern API: Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        tempTextArea.style.position = 'fixed';
        tempTextArea.style.left = '-999999px';
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  /**
   * Get the current cursor position in the textarea
   * @returns {number} Current cursor position
   */
  const getCurrentCursorPosition = () => {
    if (!textArea) return 0;
    return textArea.selectionStart;
  };

  /**
   * Set the cursor position in the textarea
   * @param {number} pos - The position to set the cursor to
   */
  const setCursorPosition = (pos) => {
    if (!textArea) return;

    // Clamp position to valid range
    const maxPos = textArea.value.length;
    const clampedPos = Math.max(0, Math.min(pos, maxPos));

    textArea.selectionStart = textArea.selectionEnd = clampedPos;
    textArea.focus();
  };

  /**
   * Get the length of current text
   * @returns {number} Length of text
   */
  const getTextLength = () => {
    if (!textArea) return 0;
    return textArea.value.length;
  };

  // Public API
  return {
    init,
    setText,
    getText,
    insertCharacter,
    deleteLastCharacter,
    clearText,
    copyToClipboard,
    getCurrentCursorPosition,
    setCursorPosition,
    getTextLength
  };
})();
