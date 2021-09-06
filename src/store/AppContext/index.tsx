import * as React from 'react'
import actions from './actions'
import reducer from './reducer'
import initialState from './initialState'
import { AppContextValue } from './types'

/** React Context **/
const AppContext = React.createContext<AppContextValue | undefined>(undefined)

/** Context Wrapper **/
function AppProvider({
  children,
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const isMounted = React.useRef(true)
  const [newState, dispatch] = React.useReducer(reducer, initialState)
  const contextActions = actions(dispatch, newState, isMounted)

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        AppState: newState,
        AppActions: contextActions,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/** Custom wrapper for React.useContext **/
export const useAppContext = (): AppContextValue => {
  const ctx = React.useContext(AppContext)
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return ctx
}

export default AppProvider
