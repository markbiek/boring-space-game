import { useAppDispatch } from '../store/hooks';
import { setLocation, useFuel } from '../store/reducers/player';
import { setView } from '../store/reducers/view';

export default function useJumpTo() {
	const dispatch = useAppDispatch();

	return (destinationName: string) => {
		dispatch(useFuel());
		dispatch(setLocation(destinationName));
		dispatch(setView('solarsystem'));
	};
}
