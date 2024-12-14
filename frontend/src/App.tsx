import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={'logo.svg'} className={styles.AppLogo} alt="logo" />
        <p>Welcome to the Client Ticket Task!</p>
        <p>
          <b>Good Luck!</b>
        </p>
        <span className={styles.AppSpan}>Make sure you read and understand the requirements in the README file</span>
      </header>
    </div>
  );
}

export default App;
