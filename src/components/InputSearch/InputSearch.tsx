import * as React from 'react'
import { useAppContext } from '../../store/AppContext'
import { Icon } from '../Icon'
import { Input } from '../Input'
import './InputSearch.scss'

function InputSearch() {
  const {
    AppActions: { filterByTag },
  } = useAppContext()

  const [tag, setTag] = React.useState('')

  const handleSearch = () => {
    filterByTag(tag.toLowerCase())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value && !/^[\w\d]+$/.test(value)) return
    setTag(value)
  }

  return (
    <div className="input-search">
      <Input
        label="Search tags"
        hideLabel={true}
        placeholder="Search Tags"
        width="none"
        value={tag}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSearch}>
        <Icon i="search" />
      </button>
    </div>
  )
}

export default InputSearch
