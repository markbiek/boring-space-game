import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setView } from '../store/reducers/view';

import { playerLocation } from '../store/reducers/player';
import Planet from '../components/Planet';
import SolarSystem from '../components/SolarSystem';

import { Planet as PlanetType } from '../types';
import universe from '../data/universe';

export default function SolarSystemView() {
	const dispatch = useAppDispatch();
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
		<>
			<button
				onClick={(e) => {
					e.preventDefault();
					dispatch(setView('map'));
				}}
			>
				Map
			</button>
			<SolarSystem
				solarSystem={solarSystem}
				onLand={(planet: PlanetType) => {
					setLandedPlanet(planet);
					setLanded(true);
				}}
			/>
		</>
	);
}
