import { useAppSelector } from '../store/hooks';

import { systemVisibilityList } from '../store/reducers/universe';

export default function useSystemVisible(): (name: string) => boolean {
	const systems = useAppSelector(systemVisibilityList);

	return (system: string) => {
		return systems[system];
	};
}
