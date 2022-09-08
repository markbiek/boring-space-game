import { Universe } from '../types';

const universe: Universe = {
	trade_items: [
		{
			name: 'Food',
			weight: 5,
			purchase_price: 10,
			availability: 10,
		},
		{
			name: 'Iron',
			weight: 25,
			purchase_price: 50,
			availability: 7,
		},
		{
			name: 'Hydrogen',
			weight: 15,
			purchase_price: 250,
			availability: 8,
		},
		{
			name: 'Steel',
			weight: 25,
			purchase_price: 50,
			availability: 7,
		},
		{
			name: 'Uranium',
			weight: 100,
			purchase_price: 500,
			availability: 1,
		},
		{
			name: 'Titanium',
			weight: 3,
			purchase_price: 30,
			availability: 6,
		},
		{
			name: 'Machine Parts',
			weight: 50,
			purchase_price: 100,
			availability: 9,
		},
		{
			name: 'Beryllium',
			weight: 25,
			purchase_price: 50,
			availability: 10,
		},
		{
			name: 'Selenium',
			weight: 25,
			purchase_price: 50,
			availability: 10,
		},
		{
			name: 'Xeon',
			weight: 5,
			purchase_price: 75,
			availability: 5,
		},
		{
			name: 'Oxygen',
			weight: 5,
			purchase_price: 45,
			availability: 7,
		},
		{
			name: 'Hydrogen',
			weight: 15,
			purchase_price: 45,
			availability: 7,
		},
		{
			name: 'Gold',
			weight: 50,
			purchase_price: 250,
			availability: 8,
		},
		{
			name: 'Uranium',
			weight: 100,
			purchase_price: 20,
			availability: 3,
		},
	],
	solar_systems: {
		azura: {
			name: 'Azura',
			description:
				'Vivamus eget est sollicitudin, viverra lorem et, vestibulum erat. Cras rhoncus venenatis commodo.',
			planets: [
				{
					name: 'Spire Colony',
					description: 'Donec ac purus eros.',
					has_fuel: true,
					has_missions: true,
					has_trade: true,
					has_gambling: true,
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
					has_fuel: false,
					has_missions: false,
					has_trade: true,
					has_gambling: false,
				},
			],
			connected_systems: ['azura', 'phantom'],
		},
		phantom: {
			name: 'Phantom',
			description:
				'Vivamus eget est sollicitudin, viverra lorem et, vestibulum erat. Cras rhoncus venenatis commodo.',
			planets: [
				{
					name: 'Daydream',
					description: 'Donec ac purus eros.',
					has_fuel: true,
					has_missions: true,
					has_trade: true,
					has_gambling: false,
				},
			],
			connected_systems: ['elysium'],
		},
	},
};

export default universe;
