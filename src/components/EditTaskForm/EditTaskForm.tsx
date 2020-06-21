import React, {useState, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {useTypedSelector} from '../../redux/rootReducer'
import {TodoType} from '../../redux/todoReducer'
import {Input} from '../Input/Input'
import {editTodo, toggleEditForm} from '../../redux/actions'
import {Textarea} from '../Textarea/Textarea'
import './editTaskForm.sass'

interface EditTaskFormProps {
  props: TodoType
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({props}) => {
  const dispatch = useDispatch()

  const titleInput = useRef<HTMLInputElement>()
  useEffect(() => titleInput.current!.focus(), [])

  const todoList = useTypedSelector(state => state.todo.todoList)
  const [newTitle, setNewTitle] = useState(props.title)
  const [newText, setNewText] = useState(props.text)

  const saveHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
    const dateModified = new Date().toLocaleDateString('en-GB', dateOptions)
    const changedTask = {...props, title: newTitle, text: newText, edit: false, dateModified}
    dispatch(editTodo(changedTask, todoList))
  }

  const closeHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    const changedTask = todoList.map(e => {
      if (e.id === props.id) {
        e.edit = false
      }
      return e
    })
    dispatch(toggleEditForm(changedTask))
  }

  return (
    <form >
      <Input inputRef={titleInput} value={newTitle} label='' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}/>
      <Textarea value={newText} label='Дополнительное описание' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewText(e.target.value)}/>
      <div className="buttons">
        <button onClick={e => closeHandler(e)} className='btn btn-danger'>Отмена</button>
        <button onClick={e => saveHandler(e)} type="submit" className='btn btn-primary ml-2'>Сохранить</button>
      </div>
    </form>
  )
}
