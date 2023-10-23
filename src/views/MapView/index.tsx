import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { setView } from '../../store/reducers/view';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { playerLocation } from '../../store/reducers/player';

import useCanJumpTo from '../../hooks/use-can-jump-to';
import useJumpTo from '../../hooks/use-jump-to';
import useSystemVisible from '../../hooks/use-system-visible';

import universe from '../../data/universe';

export default function MapView() {
	const dispatch = useAppDispatch();
	const systemKey = useAppSelector(playerLocation);
	const solarSystems = universe.solar_systems;
	const canJumpTo = useCanJumpTo(systemKey);
	const isSystemVisible = useSystemVisible();

	const handleSystemClick = (planetName: string) => {
		console.log(planetName);
	};

	useEffect(() => {
		const radius = 300; // distance from the center
		const center = { x: 500, y: 500 }; // center of the circle
		let angleIncrement = (2 * Math.PI) / Object.keys(solarSystems).length;
		let angle = 0;

		const newSystems = Object.keys(solarSystems).map((key) => {
			const system = solarSystems[key];
			const x = center.x + radius * Math.cos(angle);
			const y = center.y + radius * Math.sin(angle);
			angle += angleIncrement;
			return { ...system, x, y };
		});
	}, []);

	useEffect(() => {
		document.querySelector('.solar-systems .solar-system.active')?.scrollIntoView();
	}, []);

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
								{solarSystemName !== systemKey && <span className="connected-system">{name}</span>}

								{solarSystemName === systemKey && canJumpTo(key) && (
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

						const active = systemKey === key;

						return (
							<li
								className={`solar-system ${active ? 'active' : ''} 
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
