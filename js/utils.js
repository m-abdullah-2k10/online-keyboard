/**
 * Utility Functions Module
 * Helper functions for DOM manipulation, validation, and common operations
 */

const Utils = (function() {
    'use strict';

    return {
        /**
         * Validate if character is valid Unicode
         * @param {string} char
         * @returns {boolean}
         */
        isUnicodeValid(char) {
            if (typeof char !== 'string' || char.length === 0) {
                return false;
            }

            // Check if character code is valid
            const charCode = char.charCodeAt(0);
            return charCode > 0 && charCode <= 0x10FFFF;
        },

        /**
         * Get browser's system locale
         * @returns {string}
         */
        getSystemLocale() {
            return navigator.language || navigator.userLanguage || 'en-US';
        },

        /**
         * Debounce function to limit execution frequency
         * @param {function} func
         * @param {number} wait
         * @returns {function}
         */
        debounce(func, wait) {
            if (typeof func !== 'function') {
                throw new Error('First argument must be a function');
            }

            let timeout = null;

            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(this, args);
                }, wait);
            };
        },

        /**
         * Add class to DOM element
         * @param {HTMLElement} element
         * @param {string} className
         */
        addClass(element, className) {
            if (!element || !className) return;
            
            element.classList.add(className);
        },

        /**
         * Remove class from DOM element
         * @param {HTMLElement} element
         * @param {string} className
         */
        removeClass(element, className) {
            if (!element || !className) return;
            
            element.classList.remove(className);
        },

        /**
         * Toggle class on DOM element
         * @param {HTMLElement} element
         * @param {string} className
         * @returns {boolean}
         */
        toggleClass(element, className) {
            if (!element || !className) return false;
            
            return element.classList.toggle(className);
        },

        /**
         * Check if element has class
         * @param {HTMLElement} element
         * @param {string} className
         * @returns {boolean}
         */
        hasClass(element, className) {
            if (!element || !className) return false;
            
            return element.classList.contains(className);
        },

        /**
         * Get element by ID
         * @param {string} id
         * @returns {HTMLElement|null}
         */
        getElementById(id) {
            return document.getElementById(id);
        },

        /**
         * Query selector
         * @param {string} selector
         * @param {HTMLElement} container
         * @returns {HTMLElement|null}
         */
        querySelector(selector, container = document) {
            return container.querySelector(selector);
        },

        /**
         * Query selector all
         * @param {string} selector
         * @param {HTMLElement} container
         * @returns {NodeList}
         */
        querySelectorAll(selector, container = document) {
            return container.querySelectorAll(selector);
        },

        /**
         * Set text content of element
         * @param {HTMLElement} element
         * @param {string} text
         */
        setText(element, text) {
            if (!element) return;
            
            element.textContent = text;
        },

        /**
         * Get text content of element
         * @param {HTMLElement} element
         * @returns {string}
         */
        getText(element) {
            if (!element) return '';
            
            return element.textContent;
        },

        /**
         * Set HTML content of element
         * @param {HTMLElement} element
         * @param {string} html
         */
        setHTML(element, html) {
            if (!element) return;
            
            element.innerHTML = html;
        },

        /**
         * Get HTML content of element
         * @param {HTMLElement} element
         * @returns {string}
         */
        getHTML(element) {
            if (!element) return '';
            
            return element.innerHTML;
        },

        /**
         * Create element
         * @param {string} tagName
         * @param {Object} attributes
         * @returns {HTMLElement}
         */
        createElement(tagName, attributes = {}) {
            const element = document.createElement(tagName);

            for (const [key, value] of Object.entries(attributes)) {
                if (key === 'class') {
                    element.className = value;
                } else if (key === 'style') {
                    Object.assign(element.style, value);
                } else if (key.startsWith('data-')) {
                    element.setAttribute(key, value);
                } else if (key.startsWith('aria-')) {
                    element.setAttribute(key, value);
                } else {
                    element[key] = value;
                }
            }

            return element;
        },

        /**
         * Append element to parent
         * @param {HTMLElement} parent
         * @param {HTMLElement} child
         */
        append(parent, child) {
            if (!parent || !child) return;
            
            parent.appendChild(child);
        },

        /**
         * Insert element before reference element
         * @param {HTMLElement} newElement
         * @param {HTMLElement} referenceElement
         */
        insertBefore(newElement, referenceElement) {
            if (!newElement || !referenceElement) return;
            
            referenceElement.parentNode?.insertBefore(newElement, referenceElement);
        },

        /**
         * Remove element from DOM
         * @param {HTMLElement} element
         */
        remove(element) {
            if (!element) return;
            
            element.remove();
        },

        /**
         * Remove all children from element
         * @param {HTMLElement} element
         */
        clear(element) {
            if (!element) return;
            
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        /**
         * Add event listener
         * @param {HTMLElement} element
         * @param {string} event
         * @param {function} handler
         */
        addEventListener(element, event, handler) {
            if (!element || !event || typeof handler !== 'function') return;
            
            element.addEventListener(event, handler);
        },

        /**
         * Remove event listener
         * @param {HTMLElement} element
         * @param {string} event
         * @param {function} handler
         */
        removeEventListener(element, event, handler) {
            if (!element || !event || typeof handler !== 'function') return;
            
            element.removeEventListener(event, handler);
        },

        /**
         * Delegate event listener
         * @param {HTMLElement} parent
         * @param {string} selector
         * @param {string} event
         * @param {function} handler
         */
        addEventListener(element, event, handler) {
            if (!element || !event || typeof handler !== 'function') return;
            
            element.addEventListener(event, handler);
        },

        /**
         * Get element attribute
         * @param {HTMLElement} element
         * @param {string} attribute
         * @returns {string|null}
         */
        getAttribute(element, attribute) {
            if (!element || !attribute) return null;
            
            return element.getAttribute(attribute);
        },

        /**
         * Set element attribute
         * @param {HTMLElement} element
         * @param {string} attribute
         * @param {string} value
         */
        setAttribute(element, attribute, value) {
            if (!element || !attribute) return;
            
            element.setAttribute(attribute, value);
        },

        /**
         * Check if element is visible
         * @param {HTMLElement} element
         * @returns {boolean}
         */
        isVisible(element) {
            if (!element) return false;
            
            return element.offsetParent !== null;
        },

        /**
         * Get element position and size
         * @param {HTMLElement} element
         * @returns {Object}
         */
        getRect(element) {
            if (!element) return {};
            
            return element.getBoundingClientRect();
        },

        /**
         * Copy text to clipboard
         * @param {string} text
         * @returns {Promise<boolean>}
         */
        copyToClipboard(text) {
            if (typeof text !== 'string') {
                return Promise.reject(new Error('Text must be a string'));
            }

            // Try modern API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                return navigator.clipboard.writeText(text)
                    .then(() => true)
                    .catch(() => this._fallbackCopyToClipboard(text));
            }

            // Fallback for older browsers
            return Promise.resolve(this._fallbackCopyToClipboard(text));
        },

        /**
         * Fallback copy to clipboard for older browsers
         * @private
         */
        _fallbackCopyToClipboard(text) {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                return true;
            } catch (error) {
                console.error('Failed to copy to clipboard:', error);
                return false;
            }
        },

        /**
         * Throttle function to limit execution frequency
         * @param {function} func
         * @param {number} limit
         * @returns {function}
         */
        throttle(func, limit) {
            if (typeof func !== 'function') {
                throw new Error('First argument must be a function');
            }

            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Get element offset from top
         * @param {HTMLElement} element
         * @returns {number}
         */
        getOffsetTop(element) {
            if (!element) return 0;
            
            let offsetTop = 0;
            let el = element;
            
            while (el) {
                offsetTop += el.offsetTop;
                el = el.offsetParent;
            }
            
            return offsetTop;
        },

        /**
         * Scroll element into view
         * @param {HTMLElement} element
         * @param {boolean} smooth
         */
        scrollIntoView(element, smooth = true) {
            if (!element) return;
            
            element.scrollIntoView({
                behavior: smooth ? 'smooth' : 'auto',
                block: 'nearest'
            });
        },

        /**
         * Check if value is empty/null/undefined
         * @param {*} value
         * @returns {boolean}
         */
        isEmpty(value) {
            return value === null || value === undefined || value === '';
        },

        /**
         * Deep copy object
         * @param {Object} obj
         * @returns {Object}
         */
        deepCopy(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            if (obj instanceof Date) {
                return new Date(obj.getTime());
            }

            if (obj instanceof Array) {
                return obj.map(item => this.deepCopy(item));
            }

            if (obj instanceof Object) {
                const copy = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        copy[key] = this.deepCopy(obj[key]);
                    }
                }
                return copy;
            }
        }
    };
})();

// Make Utils available globally if not using module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
