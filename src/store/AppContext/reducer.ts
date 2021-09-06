import initialState from './initialState'
import { AppReducer } from './types'

/** REDUCER **/
const reducer: AppReducer = (state, action) => {
  let newState = {}
  switch (action.type) {
    case 'ADD_TAG': {
      const newTags = { ...state.tags }
      const newItems = { ...state.Items }

      if (newTags[action.payload.tag]) {
        newTags[action.payload.tag].push(action.payload.itemId)
      } else {
        newTags[action.payload.tag] = [action.payload.itemId]
      }

      newItems[action.payload.itemId].tags.push(action.payload.tag)

      newState = {
        items: newItems,
        tags: newTags,
      }

      window.localStorage.setItem('AppTags', JSON.stringify(newTags))
      window.localStorage.setItem('AppItems', JSON.stringify(newItems))
      break
    }
    case 'REMOVE_TAG': {
      const newTags = { ...state.tags }
      const newItems = { ...state.Items }

      if (newTags[action.payload.tag]) {
        newTags[action.payload.tag] = newTags[action.payload.tag].filter(
          (id) => id !== action.payload.itemId
        )

        if (newTags[action.payload.tag].length === 0) {
          delete newTags[action.payload.tag]
        }
      }

      newItems[action.payload.itemId].tags = newItems[
        action.payload.itemId
      ].tags.filter((tag) => tag !== action.payload.tag)

      newState = {
        items: newItems,
        tags: newTags,
      }

      window.localStorage.setItem('AppTags', JSON.stringify(newTags))
      window.localStorage.setItem('AppItems', JSON.stringify(newItems))
      break
    }
    case 'FILTER_BY_TAG':
      newState = {
        filterTag: action.payload,
      }
      break
    case 'SET_FORM_STATUS':
      newState = {
        status: action.payload,
      }
      break
    case 'SET_INITIAL_ITEMS':
      newState = {
        status: 'edit',
        ...(action.payload as Record<string, any>),
      }
      break
    default:
      newState = { ...initialState }
      break
  }

  const reduced = { ...state, ...newState }

  return reduced
}

export default reducer
