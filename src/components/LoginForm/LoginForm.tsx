import { KeyboardEvent, useRef, useState } from 'react';
import { TextField, Button } from '@mui/material';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useLocation, useNavigate } from 'react-router';
import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import { UserData } from '../../types/types';
import { useAppDispatch } from '../../hooks/useStore';
import styles from './LoginForm.module.css';

const defaultErrorState = { status: false, text: '' };

interface LoginFormProps {
	register?: boolean,
	authorizationHandler: ActionCreatorWithOptionalPayload<UserData>
}

export default function LoginForm({ register = false, authorizationHandler }: LoginFormProps) {
	const loginRef = useRef(null);
	const passwordRef = useRef(null);
	const password2Ref = useRef(null);
	const [loginError, setLoginError] = useState(defaultErrorState);
	const [passwordError, setPasswordError] = useState(defaultErrorState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	function handleChangeLogin() {
		if (loginError.status) setLoginError(defaultErrorState);
	}

	function handleChangePassword() {
		if (passwordError.status) setPasswordError(defaultErrorState);
	}

	function handleEnter(event: KeyboardEvent<HTMLDivElement>) {
		if (event.key === 'Enter') validate();
	}

	function validate() {
		let valid = true;
		const login = loginRef.current.value;
		const password = passwordRef.current.value;
		if (login.length > 2) {
			setLoginError(defaultErrorState);
		} else {
			setLoginError({ status: true, text: 'Логин должен содержать как минимум из 3 символов' });
			valid = false;
		};
		if (password.length > 7 && password.match(/[a-z]\d|\d[a-z]/i)) {
			setPasswordError(defaultErrorState);
			if (register && password !== password2Ref.current.value) {
				setPasswordError({ status: true, text: 'Пароли не совпадают' });
				valid = false;
			}
		} else {
			setPasswordError({ status: true, text: 'Пароль не соответствует требованиям' });
			valid = false;
		};
		if (valid) {
			try {
				dispatch(authorizationHandler({ login, password }));
			} catch (error) {
				console.log(error.message);
				setLoginError({ status: true, text: 'Неверный логин или пароль' });
				setPasswordError({ status: true, text: 'Неверный логин или пароль' });
				return;
			}
			navigate(location.state?.referrer || document.referrer || '/');
		}
	}

	return (
		<form className={styles.form} id={(register ? 'register-' : 'login-') + 'form'}>
			<TextField
				sx={{ m: 1 }}
				fullWidth
				label="Логин"
				name='user'
				variant="outlined"
				inputRef={loginRef}
				error={loginError.status}
				helperText={loginError.text}
				onChange={handleChangeLogin}
				onKeyDown={handleEnter}
			/>
			<PasswordInput
				ref={passwordRef}
				lable='Пароль'
				id='password1'
				error={passwordError.status}
				helperText={passwordError.text || (register && 'Пароль должен содержать как минимум 8 символов включая 1 букву и 1 цифру')}
				onChange={handleChangePassword}
				onKeyDown={handleEnter}
			/>
			{register &&
				<PasswordInput
					ref={password2Ref}
					lable='Повторите пароль'
					id='password2'
					error={passwordError.status}
					helperText={passwordError.text}
					onChange={handleChangePassword}
					onKeyDown={handleEnter}
				/>}
			<Button
				variant='contained'
				size='large'
				fullWidth
				onClick={validate}
			>
				{register ? 'Зарегистрироваться' : 'Войти'}
			</Button>
		</form>
	)
}