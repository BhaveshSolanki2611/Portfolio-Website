/**
 * Utility functions for better touch support on mobile devices
 */

/**
 * Add active touch state to buttons and interactive elements
 * Similar to :active state on desktop
 */
export const enableTouchFeedback = () => {
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
      const target = e.target.closest('a, button, .interactive');
      if (target) {
        target.classList.add('touch-active');
      }
    }, { passive: true });

    document.addEventListener('touchend', function() {
      const activeElements = document.querySelectorAll('.touch-active');
      activeElements.forEach(el => el.classList.remove('touch-active'));
    }, { passive: true });

    document.addEventListener('touchcancel', function() {
      const activeElements = document.querySelectorAll('.touch-active');
      activeElements.forEach(el => el.classList.remove('touch-active'));
    }, { passive: true });
  }
};

/**
 * Fix for 300ms tap delay on touch devices
 * Implements a fast-click solution for mobile browsers
 */
export const removeTouchDelay = () => {
  if ('ontouchstart' in window) {
    const fastClickElements = document.querySelectorAll('a, button, .interactive');
    
    fastClickElements.forEach(el => {
      el.addEventListener('touchstart', function(e) {
        // Store touch position
        this._touchX = e.touches[0].clientX;
        this._touchY = e.touches[0].clientY;
      }, { passive: true });
      
      el.addEventListener('touchend', function(e) {
        // Only trigger click if finger didn't move too much (prevent scroll conflicts)
        if (!this._touchX || !this._touchY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const dx = Math.abs(touchEndX - this._touchX);
        const dy = Math.abs(touchEndY - this._touchY);
        
        // Threshold of 10px for movement
        if (dx < 10 && dy < 10) {
          e.preventDefault();
          
          // Trigger a synthetic click event
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          
          this.dispatchEvent(clickEvent);
        }
        
        // Reset touch position
        this._touchX = null;
        this._touchY = null;
      });
    });
  }
};

/**
 * Apply passive event listeners for better scroll performance on touch devices
 */
export const optimizeTouchScroll = () => {
  // Check if passive events are supported
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
        return true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  // Apply passive listeners to touch events
  if (supportsPassive) {
    const passiveListenerOpts = { passive: true };
    
    window.addEventListener('touchstart', function() {}, passiveListenerOpts);
    window.addEventListener('touchmove', function() {}, passiveListenerOpts);
    window.addEventListener('touchend', function() {}, passiveListenerOpts);
    window.addEventListener('touchcancel', function() {}, passiveListenerOpts);
  }
};

/**
 * Initialize all touch optimizations
 */
export const initTouchSupport = () => {
  enableTouchFeedback();
  removeTouchDelay();
  optimizeTouchScroll();
};

export default initTouchSupport; 