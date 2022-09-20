import { useEffect } from 'react';

import { setView, currentView } from '../store/reducers/view';
import { loadSystems, setVisibility } from '../store/reducers/universe';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { MapView, StartView, SolarSystemView } from '.';
import PlayerHeader from '../components/PlayerHeader';

import universe from '../data/universe';

interface ViewComponents {
	[index: string]: JSX.Element;
}

export default function GameView() {
	const view = useAppSelector(currentView);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const { solar_systems } = universe;

		dispatch(setView('start'));

		// Load all systems with visibility = false
		dispatch(loadSystems(Object.keys(solar_systems)));

		// Then set our initial systems to visible
		for (const system of [
			'sol',
			'azura',
			'elysium',
			'nesre primus',
			'tichel',
			'alphara',
			'tau ceti',
			'kerella',
			'nesre secundus',
		]) {
			dispatch(
				setVisibility({
					system,
					visible: true,
				})
			);
		}
	}, []);

	const viewComponents: ViewComponents = {
		start: <StartView />,
		solarsystem: <SolarSystemView />,
		map: <MapView />,
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
