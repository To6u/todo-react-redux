import React from 'react'
import {connect} from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {sortableContainer, sortableElement} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import ToDoItem from '../TodoItem/ToDoItem'
import {removeTodo, toggleEditForm, addFinishTodo,
  removeFinishTodo, showAlert, returnFinishTodo, updateTodo} from '../../redux/actions'
import './todoList.sass'

const TodoList = ({
      todoList = [], visible, finish,
      removeTodo, toggleEditForm, addFinishTodo,
      removeFinishTodo, showAlert, returnFinishTodo, updateTodo
  }) => {

  const ref = React.createRef()

  const SortableItem = sortableElement(({value, ref}) => (
    <CSSTransition
      classNames='todo-item'
      timeout={{enter: 300, exit: 250}}
    >
      {!value.finish
        ? <ToDoItem
            onSuccessBtn={() => onSuccessHandler(value.id)}
            onRemoveBtn={() => onRemoveHandler(value.id)}
            onEditBtn={() => onEditHandler(value.id)}
            task={value}
            ref={ref}
          />
        : <ToDoItem

            onRemoveBtn={() => onRemoveFinishHandler(value.id)}
            onReturnBtn={() => onReturnFinishTodo(value.id)}
            task={value}
            className='finish-card'
          />
      }
    </CSSTransition>
  ))

  const SortableContainer = sortableContainer(({children}) => {
  return <div className="tasks-container">{children}</div>
  })

  const tasks = todoList.map((task, index) =>
    <SortableItem value={task} ref={ref} key={task.id} index={index}/>
  )

  const noTask = (
    <CSSTransition
      in={visible}
      timeout={{enter: 200, exit: 100}}
      classNames={'no-task'}
    >
      {!finish
        ? <p className='no-task text-left font-weight-light mb-1'>Любую задачу реально выполнить, если разбить ее на выполнимые части.</p>
        : <React.Fragment>
            <p className='no-task text-left font-weight-light mb-1'>
            «Удовлетворённый человек решает поставленную задачу, но он не превращает задачу в проблему.»
            </p>
            <p className='no-task text-left font-weight-lighter'>Макс Люшер</p>
          </React.Fragment>
      }
    </CSSTransition>
  )

  const onEditHandler = id => {
    const newTodo = todoList.map((e, i) => {
      if (e.id === id) {
        return todoList[i] = {...e, edit: true}
      } else {
        return  todoList[i] = {...e}
      }
    })
    toggleEditForm(newTodo)
  }

  const onSuccessHandler = id => {
    const task = todoList.filter(task => task.id === id)
    addFinishTodo(task[0])
    removeTodo(id)
    showAlert('Поздравляю! Задача завершена', 'success')
  }

  const onRemoveHandler = id => {
    removeTodo(id)
    showAlert('Задача удалена', 'danger')
  }

  const onReturnFinishTodo = id => {
    const task = todoList.filter(task => task.id === id)
    returnFinishTodo(task[0])
    showAlert('Вы вернули задачу', 'success')
  }

  const onRemoveFinishHandler = id => {
    removeFinishTodo(id)
    showAlert('Задача удалена', 'danger')

  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    const newList = arrayMove(todoList, oldIndex, newIndex)
    updateTodo(newList)
  }

  if(!todoList.length) {
    return (
      <TransitionGroup>
        {noTask}
      </TransitionGroup>
    )
  } else {
    return (
      <TransitionGroup>
        <SortableContainer onSortEnd={onSortEnd}>
          {tasks}
        </SortableContainer>
      </TransitionGroup>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  visible: state.app.visible
})

const mapDispatchToProps = {
  removeTodo, toggleEditForm, addFinishTodo, removeFinishTodo, showAlert,
  returnFinishTodo, updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
