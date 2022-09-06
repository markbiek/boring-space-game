import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const app = document.getElementById('root');

if (app) {
	const root = createRoot(app);
	root.render(<App />);
}
