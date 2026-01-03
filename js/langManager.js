/**
 * Language Manager Module
 * Handles language tracking, switching, and persistence
 * Supports Urdu and English with localStorage persistence
 */

const LanguageManager = (() => {
  const STORAGE_KEY = 'keyboardLanguage';
  const AVAILABLE_LANGUAGES = ['urdu', 'english'];
  const DEFAULT_LANGUAGE = 'english';

  let activeLanguage = DEFAULT_LANGUAGE;
  let languageChangeCallbacks = [];

  /**
   * Initialize the Language Manager
   * Loads saved language preference or uses default
   */
  const init = () => {
    loadLanguagePreference();
  };

  /**
   * Set the active language
   * @param {string} lang - The language code ('urdu' or 'english')
   */
  const setLanguage = (lang) => {
    if (!AVAILABLE_LANGUAGES.includes(lang)) {
      console.error(`Invalid language: ${lang}. Available: ${AVAILABLE_LANGUAGES.join(', ')}`);
      return;
    }

    if (activeLanguage !== lang) {
      activeLanguage = lang;
      saveLanguagePreference();
      notifyLanguageChange(lang);
    }
  };

  /**
   * Get the currently active language
   * @returns {string} Current language code
   */
  const getActiveLanguage = () => {
    return activeLanguage;
  };

  /**
   * Get list of available languages
   * @returns {string[]} Array of language codes
   */
  const getAvailableLanguages = () => {
    return [...AVAILABLE_LANGUAGES];
  };

  /**
   * Save language preference to localStorage
   */
  const saveLanguagePreference = () => {
    try {
      localStorage.setItem(STORAGE_KEY, activeLanguage);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  /**
   * Load language preference from localStorage
   */
  const loadLanguagePreference = () => {
    try {
      const savedLanguage = localStorage.getItem(STORAGE_KEY);
      if (savedLanguage && AVAILABLE_LANGUAGES.includes(savedLanguage)) {
        activeLanguage = savedLanguage;
      } else {
        activeLanguage = DEFAULT_LANGUAGE;
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
      activeLanguage = DEFAULT_LANGUAGE;
    }
  };

  /**
   * Register a callback for language change events
   * @param {Function} callback - Function to call when language changes
   * @returns {Function} Unsubscribe function
   */
  const onLanguageChange = (callback) => {
    if (typeof callback !== 'function') {
      console.error('Callback must be a function');
      return () => {};
    }

    languageChangeCallbacks.push(callback);

    // Return unsubscribe function
    return () => {
      languageChangeCallbacks = languageChangeCallbacks.filter(cb => cb !== callback);
    };
  };

  /**
   * Notify all registered callbacks of language change
   * @private
   * @param {string} newLanguage - The new language
   */
  const notifyLanguageChange = (newLanguage) => {
    languageChangeCallbacks.forEach(callback => {
      try {
        callback(newLanguage);
      } catch (error) {
        console.error('Error in language change callback:', error);
      }
    });
  };

  /**
   * Check if a language is supported
   * @param {string} lang - Language code to check
   * @returns {boolean} True if language is supported
   */
  const isLanguageSupported = (lang) => {
    return AVAILABLE_LANGUAGES.includes(lang);
  };

  /**
   * Clear language preference from localStorage
   */
  const clearPreference = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear language preference:', error);
    }
  };

  // Public API
  return {
    init,
    setLanguage,
    getActiveLanguage,
    getAvailableLanguages,
    saveLanguagePreference,
    loadLanguagePreference,
    onLanguageChange,
    isLanguageSupported,
    clearPreference
  };
})();
