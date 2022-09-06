import { Planet as PlanetType } from '../types';

interface PlanetProps {
	planet: PlanetType;
	onLand: () => void;
}

export default function Planet({ planet, onLand }: PlanetProps) {
	const { name, description } = planet;

	return (
		<div className="planet">
			<div className="planet-details">
				<p>
					<span className="planet-name">{name}</span>
					<br />
					{description}
				</p>
			</div>
			<div className="planet-controls">
				<button
					onClick={(e) => {
						e.preventDefault();

						onLand();
					}}
				>
					Land
				</button>
			</div>
		</div>
	);
}
