import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './main.css';

import './i18n';
import { TooltipProvider } from './ui/tooltip';
import { logDeveloperInfo } from './utils/developer';
// to run why do you render: import './wdyr';

const root = ReactDOM.createRoot(
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    document.getElementById('root') as HTMLElement
);
root.render(
    // ! WARNING: react-beautiful-dnd is not yet ready for React 18 + StrictMode..
    // Reference: https://github.com/atlassian/react-beautiful-dnd/issues/2396
    // <React.StrictMode>
    <TooltipProvider>
        <App />
    </TooltipProvider>
    // </React.StrictMode>
);

await logDeveloperInfo();
