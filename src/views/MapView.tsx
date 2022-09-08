import { setView } from '../store/reducers/view';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerLocation, setLocation } from '../store/reducers/player';

import useCanJumpTo from '../hooks/use-can-jump-to';

import { SolarSystem } from '../types';
import universe from '../data/universe';

export default function MapView() {
	const dispatch = useAppDispatch();
	const location = useAppSelector(playerLocation);
	const solarSystems = universe.solar_systems;
	const canJumpTo = useCanJumpTo(location);

	const solarSystemInfo = (solarSystemName: string) => {
		const solarSystem = solarSystems[solarSystemName];
		const { planets, connected_systems } = solarSystem;

		return (
			<div className="info">
				<p>
					Planets:
					<br />
					{planets?.map((planet) => {
						const { name } = planet;
						return `${name}, `;
					})}
				</p>
				<p>
					Connected Systems:
					<br />
					{connected_systems.map((key) => {
						const solarSystem = solarSystems[key];
						const { name } = solarSystem;

						return (
							<>
								{solarSystemName !== location && <span className="connected-system">{name}</span>}

								{solarSystemName === location && canJumpTo(key) && (
									<button
										onClick={(e) => {
											e.preventDefault();

											dispatch(setLocation(key));
											dispatch(setView('solarsystem'));
										}}
									>
										{name}
									</button>
								)}
							</>
						);
					})}
				</p>
			</div>
		);
	};

	return (
		<div className="view map-view">
			<button
				onClick={(e) => {
					e.preventDefault();
					dispatch(setView('solarsystem'));
				}}
			>
				Close
			</button>
			<ul className="solar-systems">
				{solarSystems &&
					Object.keys(solarSystems).map((key) => {
						const { name } = solarSystems[key];

						return (
							<li
								className={`solar-system ${location === key ? 'active' : ''} 
							`}
							>
								{name}

								{solarSystemInfo(key)}
							</li>
						);
					})}
			</ul>
		</div>
	);
}
