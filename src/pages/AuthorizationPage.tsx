import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TabPanel from '../components/TabPanel/TabPanel';
import LoginForm from '../components/LoginForm/LoginForm';
import { useLocation, useNavigate } from 'react-router';
import { createUser, logIn } from '../store/userSlice';
import { useAppSelector } from '../hooks/useStore';

export default function AuthorizationPage() {
	const [value, setValue] = useState(0);
	const user = useAppSelector(state => state.user);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setValue(location.state?.registration || 0);
		if (user?.isLogin) navigate('/');
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
				<LoginForm authorizationHandler={logIn} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<LoginForm register authorizationHandler={createUser} />
			</TabPanel>
		</div>
	)
}