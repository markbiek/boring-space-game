import { useAppSelector } from '../store/hooks';
import { playerShip } from '../store/reducers/player';

import universe from '../data/universe';
import { HOP_FUEL } from '../constants';

export default function useCanJumpTo(sourceName: string): (name: string) => boolean {
	const ship = useAppSelector(playerShip);
	const source = universe.solar_systems[sourceName];

	return (destinationName: string) => {
		if (sourceName === destinationName) {
			return false;
		}

		if (ship.fuel - HOP_FUEL < 0) {
			return false;
		}
		console.log(
			'canJumpTo',
			sourceName,
			destinationName,
			source.connected_systems.includes(destinationName)
		);

		return source.connected_systems.includes(destinationName);
	};
}
