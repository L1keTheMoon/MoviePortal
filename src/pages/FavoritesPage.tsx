import { useNavigate } from 'react-router'
import { useAppSelector } from '../hooks/useStore';
import { useEffect } from 'react';

export default function FavoritesPage() {
	const navigator = useNavigate();
	const user = useAppSelector(state => state.user);

	useEffect(() => {
		if (!user?.isLogin) navigator('/Authorization');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);


	return (
		<div>FavoritesPage</div>
	)
}
