import { HTMLAttributes } from 'react';
import styles from './Decoration.module.css';

interface DecorationProps extends HTMLAttributes<HTMLSpanElement> { }

export default function Decoration({ children, ...props }: DecorationProps) {
	return (
		<span className={styles.decoration} {...props}>{children}</span>
	)
}
