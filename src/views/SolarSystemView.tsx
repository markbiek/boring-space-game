import { useState } from 'react';
import { useAppSelector } from '../store/hooks';

import { playerLocation } from '../store/reducers/player';
import PlanetList from '../components/PlanetList';
import Planet from '../components/Planet';
import SolarSystem from '../components/SolarSystem';

import { Planet as PlanetType } from '../types';
import universe from '../data/universe';

export default function SolarSystemView() {
	const [landed, setLanded] = useState(false);
	const [landedPlanet, setLandedPlanet] = useState<PlanetType | null>(null);
	const location = useAppSelector(playerLocation);
	const solarSystem = universe.solar_systems[location];

	return landed && landedPlanet ? (
		<Planet
			planet={landedPlanet}
			returnToOrbit={() => {
				setLandedPlanet(null);
				setLanded(false);
			}}
		/>
	) : (
		<SolarSystem
			solarSystem={solarSystem}
			onLand={(planet: PlanetType) => {
				setLandedPlanet(planet);
				setLanded(true);
			}}
		/>
	);
}
