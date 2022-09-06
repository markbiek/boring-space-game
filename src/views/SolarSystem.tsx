import { useState } from 'react';
import { useAppSelector } from '../store/hooks';

import { playerLocation } from '../store/reducers/player';
import Planet from '../components/Planet';

import { ViewProps, Planet as PlanetType } from '../types';
import universe from '../data/universe';

export default function SolarSystemView() {
	const [landed, setLanded] = useState(false);
	const [landedPlanet, setLandedPlanet] = useState<PlanetType | null>(null);
	const location = useAppSelector(playerLocation);
	const solarSystem = universe[location];

	const { name, description, planets } = solarSystem;

	const planetContent = () => {
		if (!landedPlanet) {
			return null;
		}

		const { name, fuel, gambling, trade } = landedPlanet;

		console.log(landedPlanet);

		return (
			<div>
				<p>Landed on {name}</p>
				<button
					onClick={(e) => {
						e.preventDefault();

						setLandedPlanet(null);
						setLanded(false);
					}}
				>
					Return to Orbit
				</button>
				{fuel && <p>Fuel available</p>}
				{trade && <p>Trade available</p>}
				{gambling && <p>Gambling available</p>}
			</div>
		);
	};

	const solarSystemContent = () => {
		return (
			<div className="view">
				<h1>{name} System</h1>
				<p>{description}</p>
				<div className="planets">
					{planets &&
						planets.map((planet, idx) => {
							return (
								<Planet
									planet={planet}
									key={`planet-${idx}`}
									onLand={() => {
										setLandedPlanet(planet);
										setLanded(true);
									}}
								/>
							);
						})}
				</div>
			</div>
		);
	};

	return landed ? planetContent() : solarSystemContent();
}
