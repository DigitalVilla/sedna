import * as React from 'react'
import { useAppContext } from '../../store/AppContext'
import { Item } from '../Item'
import { Loader } from '../Loader'
import './ItemList.scss'

export const ItemList = (): JSX.Element => {
  const {
    AppState: { status, itemList, tags, Items, filterTag },
  } = useAppContext()
  const [list, setList] = React.useState(itemList)

  // swap when filtering
  React.useEffect(() => {
    if (status !== 'init') {
      setList(filterTag.length ? tags[filterTag] || [] : itemList)
    }
  }, [filterTag, Items, status, tags, itemList])

  return /^loading|init$/.test(status) ? (
    <Loader loading={true} />
  ) : (
    <section className="item-list">
      {list.length > 0 &&
        status !== 'init' &&
        list.map((id) => {
          return (
            <Item
              key={id}
              title={`${Items[id].name}`}
              subtitle={`Date: ${Items[id].created_at}`}
              itemId={id}
              tags={Items[id].tags}
            />
          )
        })}

      {list.length === 0 && (
        <div className="not-found">
          <h2>No Items Found</h2>
        </div>
      )}
    </section>
  )
}

export default ItemList
