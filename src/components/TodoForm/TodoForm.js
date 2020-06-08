import React, {useState} from 'react'
import {connect} from 'react-redux'
import {notification} from 'antd'
import {Input} from '../Input/Input'
import {addTodo, showAlert} from '../../redux/actions'
import {Textarea} from '../Textarea/Textarea'
import './todoForm.sass'

const TodoForm = ({addTodo, showAlert, alert}) => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const titleInput = React.createRef()

  const submitHandler = event => {
    event.preventDefault()

    if (!title.trim()) {
      return notification['warning']({message: 'Опишите задачу!'})
    } else {

    }
    const newTodo = {title: title, text: text, id: Date.now().toString()}

    addTodo(newTodo)
    setTitle('')
    setText('')
    console.log(titleInput)
  }

  return (
    <form onSubmit={e => submitHandler(e)} className='todo-form'>
      <Textarea ref={titleInput} value={title} label='Задача' onChange={e => setTitle(e.target.value)}/>
      {/* <Textarea value={text} label='Описание задачи' onChange={e => setText(e.target.value)}/> */}
      <button className='btn btn-success' type='submit'>Добавить</button>
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
