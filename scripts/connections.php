<?php

echo "ERROR: This script has already been run.\n";
die();

function loadSystems(): array {
	$raw = file_get_contents(__DIR__ . '/../raw/systems-connections.txt');
	return array_map(function ($line) {
		return explode("\t", $line);
		},
		array_values(
			array_filter(explode("\n", $raw), function ($value) {
				return !empty($value) && $value[0] !== '#';
			})
		)
	);
}

function loadPlanets(): array {
	$raw = file_get_contents(__DIR__ . '/../raw/planets.txt');
	return array_values(array_unique(
			array_filter(explode("\n", $raw), function ($value) {
				return !empty($value) && $value[0] !== '#';
			})
		)
	);
}

function connect($items, $connections = [], $parentKey = null, $index = 0, $depth = 0): array {
	$item = $items[$index];
	$count = count($item);
	$key = strtolower($item[$count - 1]);

	if (!isset($connections[$key])) {
		$connections[$key] = [
			'connected_systems' => []
		];
	}

	if (isset($items[$index +1])) {
		$nextItem = $items[$index + 1];
		$nextCount = count($nextItem);
		$nextKey = strtolower($nextItem[$nextCount - 1]);
		$diff = $nextCount - $count;

		if (!isset($connections[$nextKey])) {
			$connections[$nextKey] = [
				'connected_systems' => []
			];
		}

		if ($diff === 1) {
			// Direct descendant
			$connections[$key]['connected_systems'][] = $nextKey;
			$parentKey = $key;
		} elseif ($diff === 0) {
			// Sibling
			$connections[$parentKey]['connected_systems'][] = $nextKey;
		}

		// Add the connection and some basic system info
		$connections[$key]['name'] = $item[$count - 1];
		$connections[$key]['description'] = 'Vivamus eget est sollicitudin, viverra lorem et, vestibulum erat. Cras rhoncus venenatis commodo.';
		$connections[$key]['depth'] = $depth;
		$connections[$key]['planets'] = [];

		// Set up the connection in reverse
		$connections[$nextKey]['connected_systems'][] = $key;

		return connect($items, $connections, $parentKey, $index + 1, $depth + 1);
	} else {
		$connections[$key]['depth'] = $depth;

		return $connections;
	}
}

$systems = connect(loadSystems());

$planets = loadPlanets();
foreach ($systems as $key => $system) {
	$isSPCSystem = str_contains($key, 'spc-');
	$innerCircle = in_array($system['depth'], [0, 1, 2]);
	$numPlanets = random_int(0, 4);

	// Force planets in the central ring to have at least one planet
	if ($numPlanets === 0 && $innerCircle) {
		$numPlanets = random_int(1, 4);
	}

	// SPC systems never have more than one planet
	if ($isSPCSystem) {
		$numPlanets = random_int(0, 1);
	}

	for($i = 0; $i < $numPlanets; $i++) {
		$planetIndex = random_int(0, count($planets) - 1);
		$planet = [
			"name" => $planets[$planetIndex],
			"description" => 'Donec ac purus eros.',
			"has_fuel" => random_int(1, 10) % 2 == 0,
			"has_missions" => random_int(1, 10) % 2 == 0,
			"has_trade" => random_int(1, 10) % 2 == 0,
			"has_gambling" => random_int(1, 10) % 2 == 0,
		];

		// Force planets in the central ring to have trade and fuel at a minimum
		if (in_array($system['depth'], [0, 1, 2])) {
			$planet['has_trade'] = true;
			$planet['has_fuel'] = true;
		}

		// SPC planets never have services
		if ($isSPCSystem) {
			$planet['has_fuel'] = false;
			$planet['has_missions'] = false;
			$planet['has_trade'] = false;
			$planet['has_gambling'] = false;
		}

		$systems[$key]['planets'][] = $planet;

		array_splice($planets, $planetIndex, 1);
	}
}

echo json_encode($systems);