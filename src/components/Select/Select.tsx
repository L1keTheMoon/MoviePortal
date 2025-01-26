import React, { HTMLAttributes } from 'react'
import { FormControl, MenuItem } from '@mui/material';
import MUISelect from '@mui/material/Select';
import { FilterParams } from '../../types/types';
import styles from './Select.module.css';

interface MySelectProps extends HTMLAttributes<HTMLDivElement> {
	variants: FilterParams[],
	variantName: string,
	handleChange: (event) => void,
	name: string,
	size?: 'small' | 'medium',
	width?: number,
	label?: string,
	labelMinWidth?: number
}

export default function Select({ variants, variantName, handleChange, name, size = 'small', width = 150, label, labelMinWidth = 0, ...props }: MySelectProps) {
	return (
		<div className={styles.wrapper} {...props}>
			{label && <label className={styles.label} htmlFor={name} style={{ minWidth: labelMinWidth + 'px' }}>{label + ':'}</label>}
			<FormControl size={size} sx={{ width }}>
				<MUISelect
					MenuProps={{ sx: { height: 400 }, MenuListProps: { style: { backgroundColor: 'var(--black)', color: 'var(--fontcolor)' } } }}
					displayEmpty
					name={name}
					id={name}
					onChange={handleChange}
					style={{ height: '30px', backgroundColor: 'var(--black)', color: 'var(--fontcolor)' }}
				>
					<MenuItem value={undefined}>{'—'}</MenuItem>
					{variants.map((e, i) => <MenuItem key={i} value={e.id}>{e[variantName]}</MenuItem>)}
				</MUISelect>
			</FormControl>
		</div>
	)
}
