import React from 'react';

import ErrorBoundary from '../ErrorBoundary';
import AppContextProvider from '../AppContextProvider';
import Header from '../Header';
import Main from '../Main';

import styles from './index.module.css';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <ErrorBoundary>
                <AppContextProvider>
                    <Header />
                    <Main />
                </AppContextProvider>
            </ErrorBoundary>
        </div>
    );
};

export default App;
