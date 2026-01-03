/**
 * Keyboard Layout Manager Module
 * Manages keyboard layouts for English, Urdu, and Symbols
 * Handles layout switching and mode management
 */

const KeyboardManager = (function() {
    'use strict';

    /**
     * Keyboard layouts for different languages and modes
     * Each layout is organized by rows for proper rendering
     */
    const LAYOUTS = {
        english: {
            lowercase: [
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                ['z', 'x', 'c', 'v', 'b', 'n', 'm']
            ],
            uppercase: [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
            ]
        },

        urdu: {
            lowercase: [
                // Urdu QWERTY Layout - Row 1
                ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
                // Urdu QWERTY Layout - Row 2
                ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک'],
                // Urdu QWERTY Layout - Row 3
                ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ۓ', 'و', 'ز', 'ظ', 'ط'],
                // Additional characters
                ['ژ', 'ص', 'ق', 'غ', 'ع', 'ہ', 'ج', 'د']
            ],
            uppercase: [
                // Urdu uppercase variants (same as lowercase for most)
                ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ہ', 'خ', 'ح'],
                ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک'],
                ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ۓ', 'و', 'ز', 'ظ', 'ط'],
                ['ژ', 'ص', 'ق', 'غ', 'ع', 'ہ', 'ج', 'د']
            ]
        },

        symbols: [
            // Numbers row
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            // Special symbols row 1
            ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
            // Special symbols row 2
            ['-', '_', '=', '+', '[', ']', '{', '}', '|', '\\'],
            // Special symbols row 3
            [';', ':', '"', "'", '<', '>', ',', '.', '?', '/'],
            // Additional symbols
            ['~', '`', '€', '¥', '£', '¢', '±', '×', '÷', '§']
        ]
    };

    /**
     * Current state of the keyboard
     */
    let state = {
        activeLanguage: 'english',
        activeMode: 'lowercase',
        currentLayout: null
    };

    /**
     * Initialize keyboard manager
     */
    function init() {
        state.currentLayout = LAYOUTS[state.activeLanguage][state.activeMode];
        return true;
    }

    /**
     * Get current keyboard layout based on language and mode
     * @param {string} language - 'english' or 'urdu'
     * @param {string} mode - 'lowercase', 'uppercase', or 'symbols'
     * @returns {Array<Array<string>>} 2D array of characters
     */
    function getLayout(language = state.activeLanguage, mode = state.activeMode) {
        // Validate inputs
        if (!language || !LAYOUTS[language]) {
            console.warn(`Invalid language: ${language}, using default`);
            language = state.activeLanguage;
        }

        if (mode === 'symbols') {
            return LAYOUTS.symbols;
        }

        if (!LAYOUTS[language][mode]) {
            console.warn(`Invalid mode: ${mode}, using default`);
            mode = state.activeMode;
        }

        return LAYOUTS[language][mode];
    }

    /**
     * Get all available languages
     * @returns {Array<string>}
     */
    function getAllLanguages() {
        return Object.keys(LAYOUTS).filter(key => key !== 'symbols');
    }

    /**
     * Get all available modes
     * @returns {Array<string>}
     */
    function getAllModes() {
        return ['lowercase', 'uppercase', 'symbols'];
    }

    /**
     * Switch active language
     * @param {string} language - 'english' or 'urdu'
     * @returns {boolean} - Success status
     */
    function switchLanguage(language) {
        if (!getAllLanguages().includes(language)) {
            console.error(`Invalid language: ${language}`);
            return false;
        }

        if (state.activeMode === 'symbols') {
            // Keep symbols mode when switching languages
            state.activeLayout = LAYOUTS.symbols;
        } else {
            state.activeLanguage = language;
            state.activeLayout = LAYOUTS[language][state.activeMode];
        }

        state.activeLanguage = language;
        return true;
    }

    /**
     * Switch active mode (lowercase, uppercase, symbols)
     * @param {string} mode - 'lowercase', 'uppercase', or 'symbols'
     * @returns {boolean} - Success status
     */
    function switchMode(mode) {
        if (!getAllModes().includes(mode)) {
            console.error(`Invalid mode: ${mode}`);
            return false;
        }

        state.activeMode = mode;

        if (mode === 'symbols') {
            state.currentLayout = LAYOUTS.symbols;
        } else {
            state.currentLayout = LAYOUTS[state.activeLanguage][mode];
        }

        return true;
    }

    /**
     * Check if currently in symbol mode
     * @returns {boolean}
     */
    function isSymbolMode() {
        return state.activeMode === 'symbols';
    }

    /**
     * Check if currently in uppercase mode
     * @returns {boolean}
     */
    function isUppercaseMode() {
        return state.activeMode === 'uppercase';
    }

    /**
     * Get current active language
     * @returns {string}
     */
    function getActiveLanguage() {
        return state.activeLanguage;
    }

    /**
     * Get current active mode
     * @returns {string}
     */
    function getActiveMode() {
        return state.activeMode;
    }

    /**
     * Get current layout state object
     * @returns {Object}
     */
    function getState() {
        return {
            language: state.activeLanguage,
            mode: state.activeMode,
            layout: state.currentLayout
        };
    }

    /**
     * Flatten layout to single array of all characters
     * Useful for quick access to all characters
     * @param {string} language
     * @param {string} mode
     * @returns {Array<string>}
     */
    function getAllCharacters(language = state.activeLanguage, mode = state.activeMode) {
        const layout = getLayout(language, mode);
        return layout.flat();
    }

    /**
     * Get layout by flat index
     * @param {number} index - Flat index in flattened array
     * @returns {string|null}
     */
    function getCharacterByIndex(index) {
        const chars = getAllCharacters();
        return chars[index] || null;
    }

    /**
     * Get character position in layout [row, col]
     * @param {string} char
     * @returns {Array<number>|null} - [row, column] or null if not found
     */
    function getCharacterPosition(char) {
        const layout = state.currentLayout;
        
        for (let row = 0; row < layout.length; row++) {
            for (let col = 0; col < layout[row].length; col++) {
                if (layout[row][col] === char) {
                    return [row, col];
                }
            }
        }
        
        return null;
    }

    /**
     * Get all layout metadata
     * @returns {Object}
     */
    function getLayoutMetadata() {
        return {
            languages: getAllLanguages(),
            modes: getAllModes(),
            totalLanguages: getAllLanguages().length,
            totalModes: getAllModes().length,
            currentLanguage: state.activeLanguage,
            currentMode: state.activeMode,
            isSymbolMode: isSymbolMode(),
            isUppercaseMode: isUppercaseMode(),
            currentLayoutSize: state.currentLayout ? state.currentLayout.flat().length : 0
        };
    }

    /**
     * Reset to default state
     */
    function reset() {
        state = {
            activeLanguage: 'english',
            activeMode: 'lowercase',
            currentLayout: LAYOUTS.english.lowercase
        };
    }

    /**
     * Validate layout structure
     * @param {string} language
     * @param {string} mode
     * @returns {Object} - Validation result
     */
    function validateLayout(language = state.activeLanguage, mode = state.activeMode) {
        const layout = getLayout(language, mode);
        const validation = {
            valid: true,
            errors: [],
            warnings: []
        };

        // Check for empty rows
        layout.forEach((row, index) => {
            if (!Array.isArray(row)) {
                validation.valid = false;
                validation.errors.push(`Row ${index} is not an array`);
            } else if (row.length === 0) {
                validation.warnings.push(`Row ${index} is empty`);
            }

            // Check for invalid characters
            row.forEach((char, colIndex) => {
                if (typeof char !== 'string' || char.length === 0) {
                    validation.valid = false;
                    validation.errors.push(`Invalid character at [${index}, ${colIndex}]`);
                }
            });
        });

        return validation;
    }

    /**
     * Export layout as JSON
     * @returns {string}
     */
    function exportLayout() {
        return JSON.stringify({
            language: state.activeLanguage,
            mode: state.activeMode,
            layout: state.currentLayout
        });
    }

    /**
     * Get layout stats
     * @returns {Object}
     */
    function getStats() {
        const layout = state.currentLayout;
        const chars = layout.flat();
        
        return {
            rows: layout.length,
            columns: layout[0]?.length || 0,
            totalCharacters: chars.length,
            uniqueCharacters: new Set(chars).size,
            averageCharsPerRow: (chars.length / layout.length).toFixed(2)
        };
    }

    /**
     * Public API
     */
    return {
        // Initialization
        init,
        reset,

        // Layout retrieval
        getLayout,
        getAllCharacters,
        getCharacterByIndex,
        getCharacterPosition,

        // Language management
        getAllLanguages,
        switchLanguage,
        getActiveLanguage,

        // Mode management
        getAllModes,
        switchMode,
        getActiveMode,

        // State checks
        isSymbolMode,
        isUppercaseMode,
        getState,

        // Metadata
        getLayoutMetadata,
        getStats,
        validateLayout,

        // Export
        exportLayout
    };
})();

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KeyboardManager;
}
