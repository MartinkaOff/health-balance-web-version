import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import React from 'react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export let persistor = persistStore(store)

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    //@ts-ignore
    logErrorToMyService(error, errorInfo)
  }

  render() {
    //@ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    //@ts-ignore
    return this.props.children
  }
}

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
)
defineCustomElements(window)
