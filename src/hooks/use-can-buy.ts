import { useAppSelector } from '../store/hooks';
import { playerShip, playerCredits } from '../store/reducers/player';

import { TradeItem } from '../types';

export default function useCanBuy(): (item: TradeItem) => boolean {
	const ship = useAppSelector(playerShip);
	const credits = useAppSelector(playerCredits);

	return (item: TradeItem) => {
		/**
		 * We can buy if:
		 *
		 * 1. We have enough $
		 * 2. We have enough cargo space
		 */
		if (!item.current_price) {
			return false;
		}

		return ship.cargo_size - item.weight >= 0 && credits - item.current_price >= 0;
	};
}
