import { Universe } from '../types';

const universe: Universe = {
	azura: {
		name: 'Azura',
		description:
			'Vivamus eget est sollicitudin, viverra lorem et, vestibulum erat. Cras rhoncus venenatis commodo.',
		planets: [
			{
				name: 'Spire Colony',
				description: 'Donec ac purus eros.',
				fuel: true,
				trade: true,
				gambling: true,
			},
		],
		connected_systems: ['elysium'],
	},
	elysium: {
		name: 'Elysium',
		description:
			'Vivamus eget est sollicitudin, viverra lorem et, vestibulum erat. Cras rhoncus venenatis commodo.',
		planets: [
			{
				name: 'Exposure',
				description: 'Donec ac purus eros.',
				fuel: false,
				trade: false,
				gambling: false,
			},
		],
		connected_systems: ['azura'],
	},
};

export default universe;
