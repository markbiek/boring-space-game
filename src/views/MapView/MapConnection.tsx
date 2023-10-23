interface MapConnectionProps {
	from: { x: number; y: number };
	to: { x: number; y: number };
}

export default function Connection({ from, to }: MapConnectionProps) {
	return <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="black" />;
}
