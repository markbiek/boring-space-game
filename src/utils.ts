import universe from './data/universe';

import { TradeItem } from './types';

export function pickTradeItems(numItems = 5): TradeItem[] {
	const { trade_items } = universe;
	let returnItems: {
		[index: string]: TradeItem;
	} = {};
	let itemCount = 0;
	let done = false;

	while (!done) {
		let foundItem = null;
		const availability = Math.floor(Math.random() * 10) + 1;

		for (const item of trade_items) {
			if (
				(item.availability === availability ||
					item.availability === availability + 1 ||
					item.availability === availability - 1) &&
				!returnItems.hasOwnProperty(item.name)
			) {
				foundItem = item;
				break;
			}
		}

		if (foundItem) {
			itemCount++;
			returnItems[foundItem.name] = foundItem;
		}

		if (itemCount >= numItems) {
			done = true;
		}
	}

	return Object.values(returnItems);
}
