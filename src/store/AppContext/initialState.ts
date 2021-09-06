import { AppState } from './types'

/** INITIAL STATE **/
const initialState: AppState = {
  status: 'init',
  Items: {},
  tags: {},
  itemList: [],
  filterTag: '',
}

export default initialState
