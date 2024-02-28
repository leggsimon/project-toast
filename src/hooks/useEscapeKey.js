import React from 'react';

export function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleEscape(event) {
      if (event.code === 'Escape') {
        callback();
      }
    }

    window.addEventListener('keypress', handleEscape);

    return () => {
      window.removeEventListener('keypress', handleEscape);
    };
  }, [callback]);
}
