"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

export class SafeIsland extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("SafeIsland", error?.message, info?.componentStack);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
