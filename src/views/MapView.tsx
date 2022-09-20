import { setView } from '../store/reducers/view';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerLocation } from '../store/reducers/player';

import useCanJumpTo from '../hooks/use-can-jump-to';
import useJumpTo from '../hooks/use-jump-to';
import useSystemVisible from '../hooks/use-system-visible';

import universe from '../data/universe';

export default function MapView() {
	const dispatch = useAppDispatch();
	const location = useAppSelector(playerLocation);
	const solarSystems = universe.solar_systems;
	const canJumpTo = useCanJumpTo(location);
	const isSystemVisible = useSystemVisible();

	const solarSystemInfo = (solarSystemName: string) => {
		const jumpTo = useJumpTo();
		const solarSystem = solarSystems[solarSystemName];
		const { planets, connected_systems } = solarSystem;

		return (
			<div className="info">
				<p>
					Planets:
					<br />
					{planets && planets?.length <= 0 && <span>No planets</span>}
					{planets &&
						planets?.map((planet) => {
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

											jumpTo(key);
										}}
										className="btn-connected-system"
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

						// Only show visible systems
						if (!isSystemVisible(key)) {
							return null;
						}

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
