import { useAppSelector } from '../store/hooks';

import { playerLocation } from '../store/reducers/player';
import universe from '../data/universe';

import { ViewProps } from '../types';

export default function SolarSystemView() {
	const location = useAppSelector(playerLocation);
	const solarSystem = universe[location];

	const { name, description, planets } = solarSystem;

	return (
		<div className="view">
			<h1>{name} System</h1>
			<p>{description}</p>
			<div className="planets">
				{planets &&
					planets.map((planet, idx) => {
						const { name, description } = planet;

						return (
							<div className="planet" key={`planet-${idx}`}>
								<div className="planet-details">
									<p>
										<span className="planet-name">{name}</span>
										<br />
										{description}
									</p>
								</div>
								<div className="planet-controls">
									<button>Land</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
