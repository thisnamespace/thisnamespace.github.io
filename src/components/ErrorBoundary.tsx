import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <main className="wrap plain-page">
          <h1>Oops! Something went wrong</h1>
          <p>We encountered an unexpected error. Please try refreshing the page.</p>
          {import.meta.env.DEV && this.state.error && <pre>{this.state.error.toString()}</pre>}
          <button type="button" className="button button--solid" onClick={this.handleReset}>
            Try Again
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
