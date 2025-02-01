import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number | null = 1000) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(
		() => {
			let timeout: NodeJS.Timeout;
			if (value !== '') {
				timeout = setTimeout(() => {
					setDebouncedValue(value);
				}, delay);
			}
			if (delay === null) {
				clearTimeout(timeout);
			}
			return () => {
				clearTimeout(timeout);
			};
		}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;