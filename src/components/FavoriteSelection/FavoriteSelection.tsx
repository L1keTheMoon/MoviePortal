import { Dispatch } from 'react';
import { Typography, TextField, ButtonGroup, Button } from '@mui/material';
import { SortVariant } from '../../types/types';
import styles from './FavoriteSelection.module.css';

const fieldNameStyle = { fontSize: 36, fontWeight: 700, width: '30%' };

interface FavoriteSelectionProps {
	sortVariants: SortVariant[],
	activeVariantId: number,
	handlSortChange: (index: number) => void,
	search: string,
	setSearch: Dispatch<React.SetStateAction<string>>
}

export default function FavoriteSelection({ sortVariants, activeVariantId, handlSortChange, search, setSearch }: FavoriteSelectionProps) {
	return (
		<div>
			<div className={styles.container}>
				<Typography component="h2" sx={fieldNameStyle}>Поиск</Typography>
				<TextField
					size='small'
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</div>
			<div className={styles.container}>
				<Typography component="h2" sx={fieldNameStyle}>Сортировать по</Typography>
				<ButtonGroup
					variant='outlined'
					size='large'
					sx={{ height: 46 }}
				>
					{sortVariants.map((e, i) => {
						return (
							<Button
								key={e.id}
								variant={activeVariantId === e.id ? 'contained' : 'outlined'}
								onClick={() => handlSortChange(i)}
							>
								{e.name}
							</Button>
						)
					})}
				</ButtonGroup>
			</div>
		</div>
	)
}
