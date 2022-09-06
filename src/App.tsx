import { Provider, useSelector } from 'react-redux';
import './App.css';

import { store } from './store';

import GameView from './views/Game';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h1>Boring Space Game</h1>
				<GameView />
			</div>
		</Provider>
	);
}

export default App;
