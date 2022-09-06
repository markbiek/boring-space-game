import { useRef } from 'react';

import { useAppDispatch } from '../store/hooks';
import { setView } from '../store/reducers/view';
import { setPlayerName, setShipName } from '../store/reducers/player';

import { ViewProps } from '../types';

export default function StartView({ subview }: ViewProps) {
	const playerNameRef = useRef<HTMLInputElement>(null);
	const shipNameRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	return (
		<div className="view">
			<h1>Welcome to Boring Space Game!</h1>

			<p>Please name your player and your ship:</p>

			<form
				onSubmit={(e) => {
					e.preventDefault();

					if (!playerNameRef.current || !shipNameRef.current) {
						return;
					}

					dispatch(setView('solarsystem'));
					dispatch(setPlayerName(playerNameRef.current.value));
					dispatch(setShipName(shipNameRef.current.value));
				}}
			>
				<div className="input-group">
					<label htmlFor="player-name">Player Name</label>
					<input type="text" name="player-name" id="player-name" ref={playerNameRef} required />
				</div>

				<div className="input-group">
					<label htmlFor="ship-name">Ship Name</label>
					<input type="text" name="ship-name" id="ship-name" ref={shipNameRef} required />
				</div>

				<div className="input-group">
					<button>Start Game</button>
				</div>
			</form>
		</div>
	);
}
