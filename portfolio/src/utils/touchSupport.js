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
 * Handle orientation changes on mobile devices
 * Ensures proper recalculation of styles and layouts when device orientation changes
 */
export const handleOrientationChanges = () => {
  // Calculate the real viewport height for mobile browsers
  const setViewportHeight = () => {
    // Set custom viewport height property that works correctly on mobile
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
  };
  
  // Initial calculation
  setViewportHeight();
  
  // Wait time after orientation change or resize
  const ORIENTATION_CHANGE_DELAY = 100;
  let orientationTimer;
  
  // Listen for orientation changes
  window.addEventListener('orientationchange', () => {
    // Add class during orientation change
    document.body.classList.add('orientation-changing');
    
    // Clear any existing timer
    clearTimeout(orientationTimer);
    
    // Set a timeout to handle after the orientation change is complete
    orientationTimer = setTimeout(() => {
      // Fix scroll position and recalculate dimensions
      window.scrollTo(0, 0);
      setViewportHeight();
      
      // Remove the orientation changing class
      document.body.classList.remove('orientation-changing');
      
      // Dispatch a custom event for components to listen for
      window.dispatchEvent(new CustomEvent('orientationchangecomplete'));
    }, ORIENTATION_CHANGE_DELAY);
  });
  
  // Also update on resize for good measure
  window.addEventListener('resize', () => {
    clearTimeout(orientationTimer);
    orientationTimer = setTimeout(setViewportHeight, ORIENTATION_CHANGE_DELAY);
  });
};

/**
 * Add swipe gesture detection to elements
 * @param {string} selector - CSS selector for elements to add swipe detection to
 * @param {object} callbacks - Object with callbacks for swipe directions
 */
export const enableSwipeGestures = (selector = '.swipeable', callbacks = {}) => {
  if (!('ontouchstart' in window)) return;
  
  const swipeableElements = document.querySelectorAll(selector);
  
  swipeableElements.forEach(element => {
    let startX, startY, distX, distY;
    const threshold = 100; // Minimum distance for a swipe
    const restraint = 100; // Maximum perpendicular distance for a swipe
    const allowedTime = 300; // Maximum time allowed for the swipe
    let startTime;
    
    // Track touch start position and time
    element.addEventListener('touchstart', function(e) {
      const touch = e.changedTouches[0];
      startX = touch.pageX;
      startY = touch.pageY;
      startTime = new Date().getTime();
    }, { passive: true });
    
    // Detect direction on touch end
    element.addEventListener('touchend', function(e) {
      const touch = e.changedTouches[0];
      distX = touch.pageX - startX;
      distY = touch.pageY - startY;
      const elapsedTime = new Date().getTime() - startTime;
      
      // Check if time and distance thresholds are met
      if (elapsedTime <= allowedTime) {
        // Horizontal swipe
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // Right swipe
          if (distX > 0 && callbacks.onSwipeRight) {
            callbacks.onSwipeRight(element, e);
          } 
          // Left swipe
          else if (distX < 0 && callbacks.onSwipeLeft) {
            callbacks.onSwipeLeft(element, e);
          }
        }
        // Vertical swipe
        else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
          // Down swipe
          if (distY > 0 && callbacks.onSwipeDown) {
            callbacks.onSwipeDown(element, e);
          } 
          // Up swipe
          else if (distY < 0 && callbacks.onSwipeUp) {
            callbacks.onSwipeUp(element, e);
          }
        }
      }
    }, { passive: false });
  });
};

/**
 * Initialize all touch optimizations
 */
export const initTouchSupport = () => {
  enableTouchFeedback();
  removeTouchDelay();
  optimizeTouchScroll();
  handleOrientationChanges();
  
  // Add default swipe gesture handling for project cards
  enableSwipeGestures('.project-card', {
    onSwipeLeft: (element) => {
      element.classList.add('swiped-left');
      setTimeout(() => element.classList.remove('swiped-left'), 300);
    },
    onSwipeRight: (element) => {
      element.classList.add('swiped-right');
      setTimeout(() => element.classList.remove('swiped-right'), 300);
    }
  });
};

export default initTouchSupport; 