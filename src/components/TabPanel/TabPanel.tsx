import { HTMLAttributes } from 'react';
import { Box } from '@mui/material';

interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export default function TabPanel({ children, value, index, ...props }: TabPanelProps) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...props}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}