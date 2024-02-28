import React from 'react';

import Button from '../Button';
import Toast from '../Toast';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastVariant, setToastVariant] = React.useState('notice');

  function handleSubmit(event) {
    event.preventDefault();
    setShowToast(true);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      {showToast ? (
        <Toast
          variant={toastVariant}
          message={toastMessage}
          onDismiss={() => setShowToast(false)}
        />
      ) : null}

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='message' className={styles.label} style={{ alignSelf: 'baseline' }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              className={styles.messageInput}
              value={toastMessage}
              onChange={(event) => {
                setToastMessage(event.target.value);
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
                    checked={toastVariant === variant}
                    onChange={() => setToastVariant(variant)}
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
