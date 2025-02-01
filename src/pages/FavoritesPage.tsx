import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router'
import { useAppSelector } from '../hooks/useStore';
import MovieList from '../components/MovieList/MovieList';
import { MovieShortData, SortVariant } from '../types/types';
import FavoriteSelection from '../components/FavoriteSelection/FavoriteSelection';
import { sortVariants } from '../constants/constants';
import { removeFromFavorites } from '../helpers/favorite';
import { Typography } from '@mui/material';

export default function FavoritesPage() {
	const user = useAppSelector(state => state.user);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState<SortVariant>(sortVariants[1]);
	const [list, setList] = useState<MovieShortData[]>(JSON.parse(localStorage.getItem(user?.name + '-Favorites')));
	const navigator = useNavigate();
	console.log('USER:', user);
	useEffect(() => {
		if (!user?.isLogin) navigator('/Authorization');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handlSortChange = (index: number) => {
		setSort(sortVariants[index]);
		setPage(1);
	};

	const handleRemove = (id: number) => {
		setList(list.filter(e => e.kinopoiskId !== id))
		removeFromFavorites(id, user.name);
	};

	const filteredlist = list?.filter(e => e.nameRu.includes(search)).sort(sort.sortFn);

	return (
		<div style={{ width: '70%' }}>
			<FavoriteSelection
				sortVariants={sortVariants}
				activeVariantId={sort.id}
				handlSortChange={handlSortChange}
				search={search}
				setSearch={setSearch}
			/>
			{
				filteredlist?.length > 0 ?
					<MovieList
						totalPages={Math.ceil(filteredlist.length / 10)}
						page={page}
						handlePageChange={handlePageChange}
						removeButton
						handleRemove={handleRemove}
						list={filteredlist.filter((_, i) => i >= page * 10 - 10 && i < page * 10)} />
					:
					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						<Typography variant="h2" >Список пуст...</Typography>
					</div>
			}
		</div >
	)
}
