import { ErrorBoundary } from './components/ErrorBoundary'
import { Home } from './pages/Home'
import AppProvider from './store/AppContext'

function App() {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <ErrorBoundary buttonLabel="Reload" onClick={handleReload}>
      <AppProvider>
        <Home />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
