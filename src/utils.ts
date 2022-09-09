import universe from './data/universe';

import { TradeItem, CargoItem } from './types';

export function cargoItemFromTradeItem(tradeItem: TradeItem): CargoItem {
	return {
		weight: tradeItem.weight,
		name: tradeItem.name,
		item: tradeItem,
	};
}

export function pickTradeItems(numItems = 5): TradeItem[] {
	const { trade_items } = universe;
	let returnItems: {
		[index: string]: TradeItem;
	} = {};
	let itemCount = 0;
	let done = false;

	// Build up a list of numItems random trade items
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
				foundItem.quantity = Math.floor(Math.random() * 99) + 1;
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

	for (const key in returnItems) {
		const item = returnItems[key];

		const scaleDirection = Math.floor(Math.random() * 2);
		const scaleFactor = Math.floor(Math.random() * 50) / 100;

		if (scaleDirection === 0) {
			// Scale price down
			item.current_price = Math.floor(item.purchase_price - item.purchase_price * scaleFactor);
		} else {
			// Scale price up
			item.current_price = Math.floor(item.purchase_price + item.purchase_price * scaleFactor);
		}
	}

	return Object.values(returnItems);
}
