import { useAppSelector } from '../store/hooks';
import { playerShip } from '../store/reducers/player';

import universe from '../data/universe';
import { HOP_FUEL } from '../constants';

export default function useCanJumpTo(systemKey: string): (name: string) => boolean {
	const ship = useAppSelector(playerShip);
	const system = universe.solar_systems[systemKey];

	return (destinationName: string) => {
		if (systemKey === destinationName) {
			return false;
		}

		if (ship.fuel - HOP_FUEL < 0) {
			return false;
		}

		return system.connected_systems.includes(destinationName);
	};
}
