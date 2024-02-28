import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toast) => {
    setToasts((currentToasts) => [...currentToasts, toast]);
  }, []);

  const removeToast = React.useCallback(
    (toastId) => {
      setToasts((currentToasts) => {
        return [...currentToasts].filter((toast) => toast.id !== toastId);
      });
    },
    [setToasts],
  );

  const clearAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  React.useEffect(() => {
    function handleEscape(event) {
      if (event.code === 'Escape') {
        clearAllToasts();
      }
    }

    window.addEventListener('keypress', handleEscape);

    return () => {
      window.removeEventListener('keypress', handleEscape);
    };
  }, [clearAllToasts]);

  const value = React.useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default React.memo(ToastProvider);
