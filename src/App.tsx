import { Provider, useSelector } from 'react-redux';
import './App.css';

import { store } from './store/index';

import { GameView } from './views';

function App() {
	return (
		<Provider store={store}>
			<main className="App">
				<GameView />
			</main>
		</Provider>
	);
}

export default App;
