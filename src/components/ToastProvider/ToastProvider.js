import React from 'react';

import { useEscapeKey } from '../../hooks/useEscapeKey';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toast) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: crypto.randomUUID(),
        ...toast,
      },
    ]);
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

  useEscapeKey(clearAllToasts);

  const value = React.useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default React.memo(ToastProvider);
