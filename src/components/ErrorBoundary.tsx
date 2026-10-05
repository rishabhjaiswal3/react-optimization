import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-lg font-medium text-slate-700">This page failed to load.</p>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary;
