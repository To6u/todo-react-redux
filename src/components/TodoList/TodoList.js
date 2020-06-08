import React from 'react'
import {connect} from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {sortableContainer, sortableElement} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { Button, Tooltip, Drawer } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import ToDoItem from '../TodoItem/ToDoItem'
import {removeTodo, toggleEditForm, addFinishTodo, emptyFinishTodo, emptyTodo,
  removeFinishTodo, returnFinishTodo, updateTodo, showFinishList, hideFinishList} from '../../redux/actions'
import './todoList.sass'

const TodoList = ({
      todoList, finish, visibleFinishList, noTasks, noFinishTask,
      removeTodo, toggleEditForm, addFinishTodo, removeFinishTodo, returnFinishTodo, updateTodo, showFinishList, hideFinishList
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
        onRemoveBtn={() => removeFinishTodo(value.id)}
        onReturnBtn={() => onReturnFinishTodo(value.id)}
        task={value}
        className='finish-card'
      />
    )
  }
  const SortableItem = sortableElement(({value}) => (
    !value.finish && <TaskItem value={value}/>
  ))

  const SortableContainer = sortableContainer(({children}) => {
    return <div className="tasks-container">{children}</div>
  })

  const tasks = todoList.map((task, index) =>
    finish
    ? (<CSSTransition
        key={task.id}
        classNames='todo-item'
        timeout={{enter: 300, exit: 400}}
      >
        <FinishItem value={task} key={task.id}/>
      </CSSTransition>)
    : (<CSSTransition
        key={task.id}
        classNames='todo-item'
        timeout={{enter: 300, exit: 400}}
        mountOnEnter
        unmountOnExit
      >
        <SortableItem value={task} index={index}/>
      </CSSTransition>)
  )

  const noTask = (
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
            in={noFinishTask}
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
  }

  const onReturnFinishTodo = id => {
    const task = todoList.filter(task => task.id === id)
    returnFinishTodo(task[0])
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    const newList = arrayMove(todoList, oldIndex, newIndex)
    localStorage.setItem('userSortedList', JSON.stringify(newList))
    updateTodo(newList)
  }

  if (finish && !todoList.length) {
    emptyFinishTodo(true)
  } else if (!finish && !todoList.length) {
    emptyTodo(true)
  }


  return (
    <React.Fragment>
      {finish
        ? (<>
            {noTask}
            <Tooltip title="Все выполненные задачи" placeholder="right">
              <Button className="show-finish-list d-lg-block d-none" shape="circle" icon={<EyeOutlined />} onClick={() => showFinishList()} />
            </Tooltip>
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
            {noTask}
            {todoList.length
              ? (
                <SortableContainer onSortEnd={onSortEnd}>
                  <TransitionGroup>
                    {tasks}
                  </TransitionGroup>
                </SortableContainer>
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
  noFinishTask: state.todo.noFinishTask
})

const mapDispatchToProps = {
  removeTodo, toggleEditForm, addFinishTodo, removeFinishTodo,
  returnFinishTodo, updateTodo, showFinishList, hideFinishList, emptyFinishTodo, emptyTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
