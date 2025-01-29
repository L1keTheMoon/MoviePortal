import { RefObject, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { InputAdornment, IconButton, TextField } from '@mui/material';

interface PasswordInputProps {
	ref: RefObject<HTMLInputElement>,
	error: boolean,
	helperText: string
	lable: string,
	id: string,
	onChange: () => void
}

const iconStyle = { color: 'var(--fontcolor)' };

export default function PasswordInput({ ref, error, helperText, lable, id, onChange }: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	return (
		<TextField
			sx={{ m: 1 }}
			fullWidth
			name='user'
			variant="outlined"
			onChange={onChange}
			label={lable}
			id={id}
			inputRef={ref}
			error={error}
			helperText={helperText}
			type={showPassword ? 'text' : 'password'}
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								onMouseUp={handleMouseUpPassword}
								edge="end"
							>
								{showPassword ? <VisibilityOff style={iconStyle} /> : <Visibility style={iconStyle} />}
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		/>
	)
}
