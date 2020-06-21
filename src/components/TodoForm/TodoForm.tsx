import React, {useState, useRef, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {notification} from 'antd'
import {addTodo} from '../../redux/actions'
import {Textarea} from '../Textarea/Textarea'
import './todoForm.sass'

const TodoForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const titleTextarea = useRef<HTMLTextAreaElement>()

  useEffect(() => titleTextarea.current!.focus(), [])

  const generateTodo = () => {
    if (!title.trim()) {
      return notification['warning']({message: 'Опишите задачу!'})
    } else {
      const newTodo = {title: title, id: Date.now().toString(), dateCreate: ''}
      dispatch(addTodo(newTodo))
      setTitle('')
    }
  }
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value)
  }
  const onPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      generateTodo()
    }
  }
  const submitHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    generateTodo()
  }

  return (
    <form className='todo-form'>
      <Textarea
        textareaRef={titleTextarea}
        value={title}
        label='Задача'
        onChange={onChangeHandler}
        onKeyPress={onPressHandler}
      />
      <button onClick={submitHandler} className='btn btn-success' type='submit'>Добавить</button>
    </form>
  )
}

export default TodoForm
