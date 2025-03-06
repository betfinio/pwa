import ReactDOM from 'react-dom/client';
import './index.css';
import '@betfinio/components';
import App from './App';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
