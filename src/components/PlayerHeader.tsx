import { useState } from 'react';

import { currentView } from '../store/reducers/view';
import {
	playerName,
	playerCredits,
	playerHopsRemaining,
	playerAvailableCargo,
	playerShip,
} from '../store/reducers/player';
import { useAppSelector } from '../store/hooks';

export default function PlayerHeader() {
	const [showCargo, setShowCargo] = useState(false);
	const view = useAppSelector(currentView);
	const player = useAppSelector(playerName);
	const credits = useAppSelector(playerCredits);
	const hops = useAppSelector(playerHopsRemaining);
	const cargoSize = useAppSelector(playerAvailableCargo);
	const ship = useAppSelector(playerShip);

	if (view === 'start') {
		return null;
	}

	const cargoDetails = () => {
		const { cargo } = ship;
		const details: {
			[index: string]: number;
		} = {};

		for (const cargoItem of cargo) {
			const {
				item: { name, weight },
			} = cargoItem;

			if (!details.hasOwnProperty(name)) {
				details[name] = 0;
			}

			details[name] += weight;
		}

		return (
			<table className="cargo-details">
				<tbody>
					{Object.keys(details).map((key) => {
						return (
							<tr key={key}>
								<td>{key}</td>
								<td>{details[key]}kg</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	return (
		<header className="player-info">
			<ul>
				<li>Captain {player}</li>
				<li>Credits: {credits}</li>
			</ul>
			<ul className="player-ship">
				<li className={`${hops > 0 ? '' : 'low-fuel'}`}>Hops: {hops}</li>
				<li>Available Cargo: {cargoSize}</li>
			</ul>
			<button
				onClick={(e) => {
					setShowCargo(!showCargo);
				}}
			>
				{showCargo ? 'Hide Cargo' : 'Show Cargo'}
			</button>
			{showCargo && cargoDetails()}
		</header>
	);
}
