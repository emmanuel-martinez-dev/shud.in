'use client'

import { Component, ReactNode } from 'react'

// @ts-expect-error types are not available yet?
import { unstable_ViewTransition as ViewTransition } from 'react'

interface Props {
  children: ReactNode
  name?: string
}

interface State {
  hasError: boolean
}

export class ViewTransitionWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Log the error but don't crash the app
    console.warn('ViewTransition error caught:', error.message)
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when navigating to a new page
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback to rendering without ViewTransition
      return this.props.children
    }

    try {
      return (
        <ViewTransition name={this.props.name || 'crossfade'}>
          {this.props.children}
        </ViewTransition>
      )
    } catch (error) {
      // If ViewTransition fails, render without it
      console.warn('ViewTransition failed, falling back to normal render:', error)
      return this.props.children
    }
  }
} 