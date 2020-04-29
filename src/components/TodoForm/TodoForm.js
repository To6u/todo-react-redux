import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Input } from '../Input/Input'
import {addTodo, showAlert} from '../../redux/actions'
import { Textarea } from '../Textarea/Textarea'
import Alert from '../Alert/Alert'
import './todoForm.sass'

const TodoForm = ({addTodo, showAlert, alert}) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const submitHandler = event => {
    event.preventDefault()

    if (!title.trim()) {
      return showAlert('Заполните заголовок задачи')
    } else {
      
    }
    const newTodo = {title: title, text: text, id: Date.now().toString()}

    addTodo(newTodo)
    setTitle('')
    setText('')
  }

  return (
    <form onSubmit={e => submitHandler(e)} className='todo-form'>
      {alert && <Alert />}
      <Input value={title} label='Заголовок задачи' onChange={e => setTitle(e.target.value)}/>
      <Textarea value={text} label='Описание задачи' onChange={e => setText(e.target.value)}/>
      <button className='btn btn-success' type='submit'>Создать</button>
    </form>
  )
}

const mapStateToProps = state => ({
  alert: state.app.alert
})

const mapDispatchToProps = {
  addTodo, showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)