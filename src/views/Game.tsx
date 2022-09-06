import { useEffect } from 'react';

import { setView, currentView, currentSubview } from '../store/reducers/view';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { StartView } from './';

interface ViewComponents {
	[index: string]: JSX.Element;
}

export default function GameView() {
	const view = useAppSelector(currentView);
	const subview = useAppSelector(currentSubview);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setView('start'));
	}, []);

	const viewComponents: ViewComponents = {
		start: <StartView subview={subview} />,
	};

	if (!viewComponents.hasOwnProperty(view)) {
		return <h1>Error: View {view} not found.</h1>;
	}

	return viewComponents[view];
}
