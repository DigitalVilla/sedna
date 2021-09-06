import * as React from 'react'
import { useAppContext } from '../../store/AppContext'
import { ItemList } from '../../components/ItemList'
import { InputSearch } from '../../components/InputSearch'
import './Home.scss'

export const Home = (): JSX.Element => {
  const {
    AppActions: { fetchItems },
  } = useAppContext()

  React.useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="home">
      <div className="container">
        <header>
          <InputSearch />
        </header>
        <ItemList />
      </div>
    </div>
  )
}

export default Home
