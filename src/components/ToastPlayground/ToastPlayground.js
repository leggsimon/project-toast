import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];
const DEFAULT_VARIANT = 'notice';

function ToastPlayground() {
  const [showToast, setShowToast] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  const [tentativeToastMessage, setTentativeToastMessage] = React.useState('');
  const [tentativeToastVariant, setTentativeToastVariant] = React.useState(DEFAULT_VARIANT);

  function handleSubmit(event) {
    event.preventDefault();
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: crypto.randomUUID(),
        variant: tentativeToastVariant,
        message: tentativeToastMessage,
      },
    ]);
    setTentativeToastMessage('');
    setTentativeToastVariant(DEFAULT_VARIANT);
    setShowToast(true);
  }

  function dismissToast(toastId) {
    setToasts((currentToasts) => [...currentToasts].filter(({ id }) => id !== toastId));
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      {showToast ? <ToastShelf toasts={toasts} dismissToastHandler={dismissToast} /> : null}

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='message' className={styles.label} style={{ alignSelf: 'baseline' }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              required
              className={styles.messageInput}
              value={tentativeToastMessage}
              onChange={(event) => {
                setTentativeToastMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => {
              return (
                <label htmlFor={`variant-${variant}`}>
                  <input
                    id={`variant-${variant}`}
                    type='radio'
                    name='variant'
                    value={variant}
                    checked={tentativeToastVariant === variant}
                    onChange={() => setTentativeToastVariant(variant)}
                  />
                  {variant}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
