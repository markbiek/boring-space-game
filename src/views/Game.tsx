import { useEffect } from 'react';

import { setView, currentView } from '../store/reducers/view';
import { playerName, playerCredits } from '../store/reducers/player';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { StartView, SolarSystemView } from './';
import PlayerHeader from '../components/PlayerHeader';

interface ViewComponents {
	[index: string]: JSX.Element;
}

export default function GameView() {
	const view = useAppSelector(currentView);
	const player = useAppSelector(playerName);
	const credits = useAppSelector(playerCredits);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setView('start'));
	}, []);

	const viewComponents: ViewComponents = {
		start: <StartView />,
		solarsystem: <SolarSystemView />,
	};

	if (!viewComponents.hasOwnProperty(view)) {
		return <h1>Error: View {view} not found.</h1>;
	}

	return (
		<>
			<PlayerHeader />
			{viewComponents[view]}
		</>
	);
}
