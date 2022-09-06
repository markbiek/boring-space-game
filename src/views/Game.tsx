import { useEffect } from 'react';

import { setView, currentView, currentSubview } from '../store/reducers/view';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function GameView() {
	const view = useAppSelector(currentView);
	const subview = useAppSelector(currentSubview);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setView('start'));
	}, []);

	return <h2>Game</h2>;
}
