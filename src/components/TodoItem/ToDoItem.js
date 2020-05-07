import React from 'react'
// import { Trash2, Edit2, CheckCircle, CornerUpRight} from 'react-feather'
import { EditTaskForm } from '../EditTaskForm/EditTaskForm'
import { Card } from 'react-bootstrap'
import './ToDoItem.sass'
import checkIcon from './img/check-circle.svg'
import removeIcon from './img/trash.svg'
import editIcon from './img/edit-3.svg'
import returnIcon from './img/corner-up-right.svg'

const ToDoItem = ({task, onRemoveBtn, onEditBtn, onSuccessBtn, className, onReturnBtn}) => {
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

  const defaultTask = (
    <React.Fragment>
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
              <input onClick={onSuccessBtn} style={chekcBackg} type="submit" value="" className="btn btn-secondary"/>
              <input onClick={onRemoveBtn} style={removeBackg} type="submit" value="" className="btn btn-secondary i-close"/>
              <input onClick={onEditBtn} style={editBackg} type="submit" value="" className="btn btn-secondary"/>
            </div>
          </React.Fragment>
        : <div className="finish-buttons">
            <div className="btn-group" role="group" aria-label="Basic example">
              <input onClick={onRemoveBtn} style={removeBackg} type="submit" value="" className="btn btn-secondary i-close"/>
              <input onClick={onReturnBtn} style={returnBackg} type="submit" value="" className="btn btn-secondary"/>
            </div>
          </div>
      }
    </React.Fragment>
  )

  return (
    <Card className={cardClass.join(' ')} border="light">
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
