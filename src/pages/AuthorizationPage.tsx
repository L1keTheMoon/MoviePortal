import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TabPanel from '../components/TabPanel/TabPanel';
import LoginOrRegisterForm from '../components/LoginOrRegisterForm/LoginOrRegisterForm';
import { useLocation } from 'react-router';
import { createUser, logIn } from '../store/store';

export default function AuthorizationPage() {
	const [value, setValue] = useState(0);
	const location = useLocation();

	useEffect(() => {
		setValue(location.state?.registration || 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs centered value={value} onChange={handleChange}>
					<Tab sx={{ fontSize: 30 }} label="Вход" id='simple-tab-0' />
					<Tab sx={{ fontSize: 30 }} label="Регистрация" id='simple-tab-1' />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<LoginOrRegisterForm enterHandler={logIn} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<LoginOrRegisterForm register enterHandler={createUser} />
			</TabPanel>
		</div>
	)
}