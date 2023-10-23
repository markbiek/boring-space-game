interface MapSystemProps {
	name: string;
	x: number;
	y: number;
	onClick: (planetName: string) => void;
}

export default function MapSystem({ name, x, y, onClick }: MapSystemProps) {
	return (
		<circle cx={x} cy={y} r={20} fill="blue" onClick={() => onClick(name)}>
			<title>{name}</title>
		</circle>
	);
}
