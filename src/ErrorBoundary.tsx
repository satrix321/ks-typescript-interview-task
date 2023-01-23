import React from "react";

export default class ErrorBoundary extends React.Component {
  state: { hasError: boolean };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong! Try refreshing the page.</h1>;
    }
    return this.props.children;
  }
}
