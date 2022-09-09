import { useAppSelector } from '../store/hooks';
import { playerShip, playerCredits } from '../store/reducers/player';

import { TradeItem } from '../types';

export default function useCanSell(): (item: TradeItem) => boolean {
	const ship = useAppSelector(playerShip);

	return (item: TradeItem) => {
		/**
		 * We can sell if:
		 *
		 * 1. This item exists in our inventory
		 */
		for (const cargo of ship.cargo) {
			if (cargo.item.name === item.name) {
				return true;
			}
		}

		return false;
	};
}
