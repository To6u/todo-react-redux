import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Input } from '../Input/Input'
import {editTodo, toggleEditForm} from '../../redux/actions'
import Alert from '../Alert/Alert'
import { Textarea } from '../Textarea/Textarea'
import './editTaskForm.sass'

export const EditTaskForm = ({props}) => {
  const dispatch = useDispatch()

  const alert = useSelector(state => state.alert)
  const todoList = useSelector(state => state.todo.todoList)
  const [newTitle, setNewTitle] = useState(props.title)
  const [newText, setNewText] = useState(props.text)

  const saveHandler = e => {
    e.preventDefault()
    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
    const dateModified = new Date().toLocaleDateString('en-GB', dateOptions)
    const changedTask = {...props, title: newTitle, text: newText, edit: false, dateModified}
    dispatch(editTodo(changedTask))
  }

  const closeHandler = e => {
    e.preventDefault()
    const changedTask = todoList.map((e, i) => {
      if (e.id === props.id) {
        return todoList[i] = {...e, edit: false}
      } else {
        return  todoList[i] = {...e}
      }
    })
    dispatch(toggleEditForm(changedTask))
  }

  return (
    <form>
      {alert && <Alert/>}
      <Input value={newTitle} label='' onChange={e => setNewTitle(e.target.value)}/>
      <Textarea value={newText} label='' onChange={e => setNewText(e.target.value)}/>
      <div className="buttons">
        <button className='btn btn-danger' onClick={e => closeHandler(e)}>Отмена</button>
        <button className='btn btn-primary ml-2' onClick={e => saveHandler(e)}>Сохранить</button>
      </div>
    </form>
  )
}
