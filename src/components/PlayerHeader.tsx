import { currentView } from '../store/reducers/view';
import { playerName, playerCredits, playerHopsRemaining } from '../store/reducers/player';
import { useAppSelector } from '../store/hooks';

export default function PlayerHeader() {
	const view = useAppSelector(currentView);
	const player = useAppSelector(playerName);
	const credits = useAppSelector(playerCredits);
	const hops = useAppSelector(playerHopsRemaining);

	if (view === 'start') {
		return null;
	}

	return (
		<header className="player-info">
			<ul>
				<li>Captain {player}</li>
				<li>Credits: {credits}</li>
			</ul>
			<ul className="player-ship">
				<li className={`${hops > 0 ? '' : 'low-fuel'}`}>Hops: {hops}</li>
			</ul>
		</header>
	);
}
