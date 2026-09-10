"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message || "Unknown error" };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error in component", error?.message, errorInfo?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-background px-6 text-center">
          <h1 className="text-3xl font-headline font-semibold text-foreground">Something went wrong.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            {this.state.message || "You can retry this section without leaving the page."}
          </p>
          <button
            type="button"
            className="mt-6 min-h-11 rounded-full bg-primary px-5 font-semibold text-primary-foreground"
            onClick={() => this.setState({ hasError: false, message: "" })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
export default ErrorBoundary;
