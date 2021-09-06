import { AppActionsFn } from './types'
import fetcher from '../../utils/fetcher'
const API = process.env.REACT_APP_API

/** ACTION DISPATCHERS **/
const actions: AppActionsFn = (dispatch, _state, isMounted) => ({
  addTag: (payload) => {
    dispatch({ type: 'ADD_TAG', payload })
  },
  removeTag: (payload) => {
    dispatch({ type: 'REMOVE_TAG', payload })
  },
  filterByTag: (payload) => {
    dispatch({ type: 'FILTER_BY_TAG', payload })
  },
  setItems: (payload) => {
    dispatch({ type: 'SET_INITIAL_ITEMS', payload })
  },
  fetchItems: async () => {
    try {
      const cachedItems = localStorage.getItem('AppItems')
        ? JSON.parse(localStorage.getItem('AppItems') || '')
        : null
      const cachedTags = localStorage.getItem('AppTags')
        ? JSON.parse(localStorage.getItem('AppTags') || '')
        : []
      const cachedItemList = localStorage.getItem('AppItemList')
        ? JSON.parse(localStorage.getItem('AppItemList') || '')
        : []

      if (!cachedItems) {
        dispatch({ type: 'SET_FORM_STATUS', payload: 'loading' })
        const res = await fetcher({ api: `${API}`, method: 'GET' })

        if (!isMounted.current) return
        if (res.error) {
          dispatch({ type: 'SET_FORM_STATUS', payload: 'error' })
        } else {
          const mapItems: Record<string, any> = {}
          const itemList: string[] = []

          for (let i = 0; i < res.length; i++) {
            const el = res[i]
            mapItems[el.id] = el
            mapItems[el.id].tags = []
            itemList.push(el.id)
          }

          dispatch({
            type: 'SET_INITIAL_ITEMS',
            payload: {
              Items: mapItems,
              tags: [],
              itemList,
            },
          })
          window.localStorage.setItem('AppItems', JSON.stringify(mapItems))
          window.localStorage.setItem('AppItemList', JSON.stringify(itemList))
        }
      } else {
        dispatch({
          type: 'SET_INITIAL_ITEMS',
          payload: {
            Items: cachedItems,
            itemList: cachedItemList,
            tags: cachedTags,
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
})

export default actions
