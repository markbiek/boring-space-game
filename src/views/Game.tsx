import { useEffect } from 'react';

import { setView, currentView } from '../store/reducers/view';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { StartView, SolarSystemView } from './';

interface ViewComponents {
	[index: string]: JSX.Element;
}

export default function GameView() {
	const view = useAppSelector(currentView);
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

	return viewComponents[view];
}
