import { useAppDispatch } from '../store/hooks';
import { setLocation, useFuel } from '../store/reducers/player';
import { setView } from '../store/reducers/view';
import { setVisibility } from '../store/reducers/universe';

import universe from '../data/universe';

export default function useJumpTo() {
	const dispatch = useAppDispatch();

	return (destinationName: string) => {
		dispatch(useFuel());
		dispatch(setLocation(destinationName));
		dispatch(setView('solarsystem'));

		// Set visibility for connected systems
		const { solar_systems } = universe;
		const { connected_systems } = solar_systems[destinationName];

		for (const system of connected_systems) {
			dispatch(
				setVisibility({
					system,
					visible: true,
				})
			);
		}
	};
}
