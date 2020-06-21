import React from 'react'
import {useDispatch} from 'react-redux'
import { EditTaskForm } from '../EditTaskForm/EditTaskForm'
import {TodoType} from '../../redux/todoReducer'
import { Card } from 'react-bootstrap'
import { Tooltip } from 'antd';
import {removeTodo, toggleEditForm, addFinishTodo, returnFinishTodo} from '../../redux/actions'
import './ToDoItem.sass'
import checkIcon from './img/check-circle.svg'
import removeIcon from './img/trash.svg'
import editIcon from './img/edit-3.svg'
import returnIcon from './img/corner-up-right.svg'

interface TodoItemProps {
  className?: string
  task: TodoType
  list: TodoType[]
  TodoItemRef?: any
  style?: any
}


const ToDoItem: React.FC<TodoItemProps> = ({task, list, className, style, TodoItemRef}) => {
  const dispatch = useDispatch()
  const cardClass = [className]

  const chekcBackg = {
    background: `url(${checkIcon}) no-repeat`,
    backgroundPosition: 'center',
    backgroundSize: "55%"
  }
  const removeBackg = {
    background: `url(${removeIcon}) no-repeat`,
    backgroundPosition: 'center',
    backgroundSize: "55%"
  }
  const editBackg = {
    background: `url(${editIcon}) no-repeat`,
    backgroundPosition: 'center',
    backgroundSize: "55%"
  }
  const returnBackg = {
    background: `url(${returnIcon}) no-repeat`,
    backgroundPosition: 'center',
    backgroundSize: "55%"
  }

  const onSuccessHandler = (event: React.MouseEvent<HTMLInputElement> ,todo: TodoType) => {
    event.preventDefault()
    dispatch(addFinishTodo(todo, list))
  }
  const onRemoveHandler = (event: React.MouseEvent<HTMLInputElement>, id: string) => {
    event.preventDefault()
    dispatch(removeTodo(id, list))
  }
  const onEditHandler = (event: React.MouseEvent<HTMLInputElement>, id:string) => {
    event.preventDefault()
    const newTodo = list.map(e => {
      if (e.id === id) {
        e.edit = true
      }
      return e
    })
    dispatch(toggleEditForm(newTodo))
  }
  const onReturnFinishTodo = (event: React.MouseEvent<HTMLInputElement> ,id: string) => {
    event.preventDefault()
    const task = list.filter(task => task.id === id)
    dispatch(returnFinishTodo(task[0], list))
  }

  const defaultTask = (
    <>
      <Card.Title>{task.title}</Card.Title>
      <Card.Text>{task.text}</Card.Text>
      <p className="card-text"></p>
      <div className="date">
        <p className="card-date"><span>Создан:</span> {task.dateCreate}</p>
        { task.dateModified !== ''
          ? <p className="card-date"><span>Изменен:</span> {task.dateModified}</p>
          : null
        }
        {
          task.dateFinish
          ? <p className="card-date"><span>Завершен:</span> {task.dateFinish}</p>
          : null
        }
      </div>
      { !task.finish
        ? <React.Fragment>
            <div className="task-btns btn-group-vertical" role="group" aria-label="Basic example">
              <Tooltip title="Завершить" placement="left">
                <input onClick={(e) => onSuccessHandler(e, task)} style={chekcBackg} type="submit" value="" className="btn btn-secondary"/>
              </Tooltip>
              <Tooltip title="Удалить" placement="left">
                <input onClick={(e) => onRemoveHandler(e, task.id)} style={removeBackg} type="submit" value="" className="btn btn-secondary i-close"/>
              </Tooltip>
              <Tooltip title="Изменить" placement="left">
                <input onClick={(e) => onEditHandler(e, task.id)} style={editBackg} type="submit" value="" className="btn btn-secondary"/>
              </Tooltip>
            </div>
          </React.Fragment>
        : <div className="finish-buttons">
            <div className="btn-group" role="group" aria-label="Basic example">
              <Tooltip title="Удалить" placement="top">
                <input onClick={(e) => onRemoveHandler(e, task.id)} style={removeBackg} type="submit" value="" className="btn btn-secondary i-close"/>
              </Tooltip>
              <Tooltip title="Вернуть" placement="top">
              <input onClick={(e) => onReturnFinishTodo(e, task.id)} style={returnBackg} type="submit" value="" className="btn btn-secondary"/>
              </Tooltip>
            </div>
          </div>
      }
    </>
  )

  return (
    <Card ref={TodoItemRef} className={cardClass.join(' ')} border="light">
      <Card.Body>
        {task.edit
          ? <EditTaskForm props={task}/>
          : defaultTask
        }
      </Card.Body>
    </Card>
  )
}

export default ToDoItem
