import { ItemProps } from './Item.types'
import { Input } from '../Input'
import React from 'react'
import { Button } from '../Button'
import { useAppContext } from '../../store/AppContext'
import './Item.scss'
import { Icon } from '../Icon'

export const Item = ({
  itemId,
  title,
  subtitle,
  tags = [],
}: ItemProps): JSX.Element => {
  const {
    AppActions: { addTag, removeTag },
  } = useAppContext()

  const [tagValue, setTagValue] = React.useState('')

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    let tag = e.currentTarget.getAttribute('data-tag') || ''
    removeTag({ itemId, tag })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!/^[\w\d]+$/.test(value)) return
    setTagValue(value)
  }

  const handleAddTag = () => {
    const val = tagValue.toLowerCase()
    if (!tags.includes(val)) {
      addTag({ itemId, tag: val })
    }
    setTagValue('')
  }

  return (
    <div className="app-item">
      <div className="info">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      <div className="tag-list">
        {tags.map((el: string) => {
          return (
            <div className="tag-label" key={`${itemId}-${el}`}>
              {el}
              <button data-tag={el} onClick={handleRemove} type="button">
                <Icon i="close" />
              </button>
            </div>
          )
        })}
      </div>

      <div className="add-tag">
        <Input
          label="add tag"
          hideLabel
          width="lg"
          name="tag"
          placeholder="Tag"
          value={tagValue}
          onChange={handleChange}
          disabled={tags.length === 5}
        />
        <Button
          label="Add Tag"
          fill
          radius="1"
          width="none"
          onClick={handleAddTag}
          disabled={tags.length === 5 || tagValue.length < 2}
        />
      </div>
    </div>
  )
}

export default Item
