import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './main.css';
import reportWebVitals from './reportWebVitals';
import './theme/theme.colors.css';

import './i18n';
// to run why do you render: import './wdyr';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // ! WARNING: react-beautiful-dnd is not yet ready for React 18 + StrictMode..
    // Reference: https://github.com/atlassian/react-beautiful-dnd/issues/2396
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
