import { useAppDispatch } from '../store/hooks';
import { refuel } from '../store/reducers/player';

import { Planet as PlanetType } from '../types';

interface PlanetProps {
	planet: PlanetType;
	returnToOrbit: () => void;
}

export default function Planet({ planet, returnToOrbit }: PlanetProps) {
	const dispatch = useAppDispatch();

	if (!planet) {
		return null;
	}

	const { name, has_fuel, has_gambling, has_missions, has_trade } = planet;

	const refuelShip = () => {
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
				{has_fuel && refuelShip()}
				{has_trade && <button>Trade</button>}
				{has_missions && <button>Missions</button>}
				{has_gambling && <button>Gamble</button>}
			</div>
		</div>
	);
}
