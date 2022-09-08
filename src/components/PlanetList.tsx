import PlanetListItem from './PlanetListItem';

import { Planet } from '../types';

interface PlanetListProps {
	planets: Planet[];
	onLand: (planet: Planet) => void;
}

export default function PlanetList({ planets, onLand }: PlanetListProps) {
	return (
		<div className="planets">
			{planets &&
				planets.map((planet, idx) => {
					return (
						<PlanetListItem
							planet={planet}
							key={`planet-${idx}`}
							onLand={() => {
								onLand(planet);
							}}
						/>
					);
				})}
		</div>
	);
}
