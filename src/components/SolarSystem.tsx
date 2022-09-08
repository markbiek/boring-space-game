import PlanetList from './PlanetList';

import { SolarSystem as SolarSystemType, Planet } from '../types';

interface SolarSystemProps {
	solarSystem: SolarSystemType;
	onLand: (planet: Planet) => void;
}

export default function SolarSystem({ solarSystem, onLand }: SolarSystemProps) {
	const { name, description, planets } = solarSystem;
	return (
		<div className="view">
			<h1>{name} System</h1>
			<p>{description}</p>
			<div className="planets">{planets && <PlanetList planets={planets} onLand={onLand} />}</div>
		</div>
	);
}
