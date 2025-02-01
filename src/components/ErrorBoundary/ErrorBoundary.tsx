import { Component, ErrorInfo, JSX } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default class ErrorBoundary extends Component<{ children: JSX.Element }> {
	state = {
		isError: false
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.log(error, errorInfo);
		this.setState({
			isError: true
		})
	}

	render() {
		if (this.state.isError) {
			return <ErrorMessage />
		}
		return this.props.children;
	}
}
