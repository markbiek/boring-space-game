import { useState, useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';
import { refuel, addCargo, removeCargo } from '../store/reducers/player';
import useCanBuy from '../hooks/use-can-buy';
import useCanSell from '../hooks/use-can-sell';

import { pickTradeItems, cargoItemFromTradeItem } from '../utils';

import { Planet as PlanetType, TradeItem } from '../types';

interface PlanetProps {
	planet: PlanetType;
	returnToOrbit: () => void;
}

export default function Planet({ planet, returnToOrbit }: PlanetProps) {
	const dispatch = useAppDispatch();
	const [showTrade, setShowTrade] = useState(false);
	const [tradeItems, setTradeItems] = useState<TradeItem[] | null>(null);
	const canBuy = useCanBuy();
	const canSell = useCanSell();

	// Make sure trade items stay consistent as long as we're on this planet
	useEffect(() => {
		if (tradeItems) {
			return;
		}
		setTradeItems(pickTradeItems());
	}, [planet]);

	if (!planet) {
		return null;
	}

	const { name, has_fuel, has_gambling, has_missions, has_trade } = planet;

	const handleBuy = (item: TradeItem) => {
		dispatch(addCargo(cargoItemFromTradeItem(item)));

		// TODO - decrement quanity available
	};

	const handleSell = (item: TradeItem) => {
		dispatch(removeCargo(cargoItemFromTradeItem(item)));

		// TODO - increment quanity available
	};

	const refuelButton = () => {
		return (
			<button
				onClick={(e) => {
					e.preventDefault();

					dispatch(refuel());
				}}
			>
				Refuel
			</button>
		);
	};

	const tradeButton = () => {
		return (
			<button
				className={`${showTrade ? 'active' : ''}`}
				onClick={(e) => {
					e.preventDefault();

					setShowTrade(!showTrade);
				}}
			>
				Trade
			</button>
		);
	};

	const tradeInterface = () => {
		return (
			<div className="planet-trade">
				<p>Trade:</p>
				<table>
					<tbody>
						{tradeItems &&
							tradeItems.map((item) => {
								const { name, weight, current_price, quantity } = item;

								return (
									<tr key={`trade-item${name}`}>
										<th>
											{name} <span className="trade-item-qty">({quantity})</span>
										</th>
										<td>{weight}kg</td>
										<td>{current_price}c</td>
										<td>
											{canBuy(item) && (
												<button
													onClick={(e) => {
														e.preventDefault();

														handleBuy(item);
													}}
												>
													Buy
												</button>
											)}
											{canSell(item) && (
												<button
													onClick={(e) => {
														e.preventDefault();

														handleSell(item);
													}}
												>
													Sell
												</button>
											)}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<div className="planet-details">
			<p>Landed on {name}</p>
			<button
				onClick={(e) => {
					e.preventDefault();

					returnToOrbit();
				}}
			>
				Return to Orbit
			</button>
			<div className="planet-actions">
				{has_fuel && refuelButton()}
				{has_trade && tradeButton()}
				{has_missions && <button>Missions</button>}
				{has_gambling && <button>Gamble</button>}
			</div>
			{showTrade && tradeInterface()}
		</div>
	);
}
