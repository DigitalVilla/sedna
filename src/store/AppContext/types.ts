import * as React from 'react'

/** CUSTOM CONTEXT TYPES */
/**
 * State parameters
 * @public
 */
export interface AppState {
  status: 'loading' | 'success' | 'edit' | 'error' | 'init'
  Items: Record<string, ItemType>
  tags: Record<string, string[]>
  itemList: string[]
  filterTag: string
}

type ItemType = {
  id: string
  name: string
  tags: string[]
  created_at: string
}

/**
 * Valid actions for a reducer and a dispatcher
 * @public
 */
export type AppActionTypes =
  | 'ADD_TAG'
  | 'REMOVE_TAG'
  | 'FILTER_BY_TAG'
  | 'SET_FORM_STATUS'
  | 'SET_INITIAL_ITEMS'

/**
 * Actions return object
 * @public
 */
export type AppActionReturn = {
  [key: string]: (val?: unknown) => void
}

/** DEFAULT TYPES **/

/**
 * Default contract for the Context value
 * @internal
 */
export interface AppContextValue {
  AppState: AppState
  AppActions: AppActionReturn
}

/**
 * Default contract for the actions function
 * @internal
 */
export type AppActionsFn = (
  dispatch: AppDispatchFn,
  state: AppState,
  isMounted: React.MutableRefObject<boolean>
) => AppActionReturn

/**
 * Default Type for the dispatch function
 * @internal
 */
export type AppDispatchFn = React.Dispatch<AppActionProps>

/**
 * Default Type for a Reducer
 * @internal
 */
export type AppReducer = (state: AppState, action: AppActionProps) => AppState

/**
 * Default Type for the dispatch function
 * @internal
 */
export interface AppActionProps {
  type: AppActionTypes
  payload: any | Record<string, any>
  options?: Record<string, any> | null
}
