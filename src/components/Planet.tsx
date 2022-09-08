import { Planet as PlanetType } from '../types';

interface PlanetProps {
	planet: PlanetType;
	returnToOrbit: () => void;
}

export default function Planet({ planet, returnToOrbit }: PlanetProps) {
	if (!planet) {
		return null;
	}

	const { name, has_fuel, has_gambling, has_missions, has_trade } = planet;

	console.log(planet);

	return (
		<div>
			<p>Landed on {name}</p>
			<button
				onClick={(e) => {
					e.preventDefault();

					returnToOrbit();
				}}
			>
				Return to Orbit
			</button>
			{has_fuel && <p>Fuel available</p>}
			{has_trade && <p>Trading available</p>}
			{has_missions && <p>Missions available</p>}
			{has_gambling && <p>Gambling available</p>}
		</div>
	);
}
