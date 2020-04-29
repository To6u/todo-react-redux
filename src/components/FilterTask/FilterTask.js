import React, {useState} from 'react'
import { Dropdown } from 'react-bootstrap'

export default () => {
  const [newTask, setNew] = useState(true)
  const [oldTask, setOld] = useState(true)

  const sort = type => {
    
  }

  return (
    <Dropdown className="filter-btn">
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
      Новые в начале
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Новые в конце</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Пользовательский</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}