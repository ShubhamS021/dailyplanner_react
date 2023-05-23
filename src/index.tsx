import BoardContextProvider from 'context/BoardContext';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './theme/theme.colors.css';

import './i18n';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // ! WARNING: react-beautiful-dnd is not yet ready for React 18 + StrictMode..
    // Reference: https://github.com/atlassian/react-beautiful-dnd/issues/2396
    // <React.StrictMode>
    <BoardContextProvider>
        <App />
    </BoardContextProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
