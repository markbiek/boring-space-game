import { Provider, useSelector } from 'react-redux';
import './App.css';

import { store } from './store/index';

import { GameView } from './views';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<GameView />
			</div>
		</Provider>
	);
}

export default App;
