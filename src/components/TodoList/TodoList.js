import React from 'react'
import {connect} from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import arrayMove from 'array-move'
import { Button, Tooltip, Drawer } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import ToDoItem from '../TodoItem/ToDoItem'
import {removeTodo, toggleEditForm, addFinishTodo, emptyFinishTodo, emptyTodo,
  returnFinishTodo, showFinishList, hideFinishList} from '../../redux/actions'
import './todoList.sass'

const TodoList = ({
      todoList, finish, visibleFinishList, noTasks, noFinishTasks, finishCount,
      removeTodo, toggleEditForm, addFinishTodo, returnFinishTodo, showFinishList, hideFinishList
  }) => {

  const TaskItem = ({value}) => {
    return (
      <ToDoItem
        onSuccessBtn={() => onSuccessHandler(value.id)}
        onRemoveBtn={() => removeTodo(value.id)}
        onEditBtn={() => onEditHandler(value.id)}
        task={value}
      />
    )
  }

  const FinishItem = ({value}) => {
    return (
      <ToDoItem
        onRemoveBtn={() => removeTodo(value.id)}
        onReturnBtn={() => onReturnFinishTodo(value.id)}
        task={value}
        className='finish-card'
      />
    )
  }

  let tasks = []

  if (finish && todoList.length) {
    tasks = todoList.map(task =>
    task.finish
    ? (<CSSTransition
        key={task.id}
        classNames='todo-item'
        timeout={{enter: 300, exit: 400}}
      >
        <FinishItem value={task} key={task.id}/>
      </CSSTransition>)
    : null
    )
  } else if (!finish && todoList.length){
    tasks = todoList.map(task =>
    !task.finish
    ? (<CSSTransition
        key={task.id}
        classNames='todo-item'
        timeout={{enter: 300, exit: 400}}
        mountOnEnter
        unmountOnExit
      >
        <TaskItem value={task} key={task.id}/>
      </CSSTransition>)
    : null
    )
  }

  const NoTask = () => (
    <>
      {!finish
        ? (<CSSTransition
            in={noTasks}
            timeout={{enter: 300, exit: 400}}
            classNames='no-task'
          >
            <p className='no-task text-left font-weight-light mb-1'>Любую задачу реально выполнить, если разбить ее на выполнимые части.</p>
          </CSSTransition>)
        : (<CSSTransition
            in={noFinishTasks}
            timeout={{enter: 300, exit: 400}}
            classNames='no-task'
          >
            <div>
              <p className='no-task text-left font-weight-light mb-1'>
              «Удовлетворённый человек решает поставленную задачу, но он не превращает задачу в проблему.»
              </p>
              <p className='no-task text-left font-weight-lighter'>Макс Люшер</p>
            </div>
          </CSSTransition>)
      }
    </>
  )

  const onEditHandler = id => {
    const newTodo = todoList.map(e => {
      if (e.id === id) {
        e.edit = true
      }
      return e
    })
    toggleEditForm(newTodo)
  }

  const onSuccessHandler = id => {
    const task = todoList.filter(task => task.id === id)
    addFinishTodo(task[0], todoList)
  }

  const onReturnFinishTodo = id => {
    const task = todoList.filter(task => task.id === id)
    returnFinishTodo(task[0], todoList)
  }

  if (finish && !todoList.length) {
    emptyFinishTodo(true)
  } else if (!finish && !todoList.length) {
    emptyTodo(true)
  }

  const buttonShowFinishList = () => {
    return finishCount > 2
    ? (
      <Tooltip title="Все выполненные задачи" placeholder="right">
        <Button className="show-finish-list d-lg-block d-none" shape="circle" icon={<EyeOutlined />} onClick={() => showFinishList()} />
      </Tooltip>
    )
    : null
  }


  return (
    <React.Fragment>
      {finish
        ? (<>
            {noFinishTasks && <NoTask/>}
            {buttonShowFinishList()}
            <TransitionGroup>
              {tasks}
            </TransitionGroup>
            <Drawer
              title="Выполненные задачи"
              placement="left"
              closable={false}
              getContainer={false}
              onClose={() => hideFinishList()}
              visible={visibleFinishList}
              width={400}
              className="d-lg-block d-none"
            >
              <TransitionGroup>
                {tasks}
              </TransitionGroup>
            </Drawer>
          </>)
        : (<>
            <NoTask/>
            {todoList.length
              ? (
                <TransitionGroup>
                  {tasks}
                </TransitionGroup>
              )
              : null
            }
          </>)
      }
      </React.Fragment>
  )
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  visibleFinishList: state.todo.visibleFinishList,
  noTasks: state.todo.noTasks,
  noFinishTasks: state.todo.noFinishTask,
  todoList: state.todo.todoList,
  finishCount: state.todo.finishCount
})

const mapDispatchToProps = {
  removeTodo, toggleEditForm, addFinishTodo,
  returnFinishTodo, showFinishList, hideFinishList, emptyFinishTodo, emptyTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
