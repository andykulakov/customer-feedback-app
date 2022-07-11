import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: {
                name: '',
                message: ''
            }
        };
    }

    static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
        return {hasError: true};
    }

    componentDidCatch(error: Error): void {
        this.setState({error});
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <pre>{this.state.error.message}</pre>
                    <p>Error has occurred, please see console for stack trace.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
