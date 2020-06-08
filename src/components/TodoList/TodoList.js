import React from 'react'
import {connect} from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {sortableContainer, sortableElement} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { Button, Tooltip, Drawer } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import ToDoItem from '../TodoItem/ToDoItem'
import {removeTodo, toggleEditForm, addFinishTodo,
  removeFinishTodo, returnFinishTodo, updateTodo, showFinishList, hideFinishList} from '../../redux/actions'
import './todoList.sass'

const TodoList = ({
      todoList, visible, finish, visibleFinishList,
      removeTodo, toggleEditForm, addFinishTodo, removeFinishTodo, returnFinishTodo, updateTodo, showFinishList, hideFinishList
  }) => {

  const TaskItem = ({value}) => {
    return (
      // <CSSTransition
      //   classNames='todo-item'
      //   timeout={{enter: 300, exit: 250}}
      // >
        <ToDoItem
          onSuccessBtn={() => onSuccessHandler(value.id)}
          onRemoveBtn={() => removeTodo(value.id)}
          onEditBtn={() => onEditHandler(value.id)}
          task={value}
        />
      // </CSSTransition>
    )
  }

  const FinishItem = ({value}) => {
    return (
      <CSSTransition
        classNames='todo-item'
        timeout={{enter: 300, exit: 250}}
      >
        <ToDoItem
          onRemoveBtn={() => removeFinishTodo(value.id)}
          onReturnBtn={() => onReturnFinishTodo(value.id)}
          task={value}
          className='finish-card'
        />
      </CSSTransition>
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
    ? <FinishItem value={task} key={task.id}/>
    : <CSSTransition
        key={task.id}
        classNames='todo-item'
        timeout={{enter: 300, exit: 250}}
      >
        <SortableItem value={task} index={index}/>
      </CSSTransition>
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

  if(!todoList.length) {
    return (
      <React.Fragment>{noTask}</React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {finish
          ? (<>
              <Tooltip title="Все выполненные задачи" placeholder="right">
                <Button className="show-finish-list" shape="circle" icon={<EyeOutlined />} onClick={() => showFinishList()} />
              </Tooltip>
              <TransitionGroup className="todo-list">
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
              >
                {tasks}
              </Drawer>
            </>)
          : (<SortableContainer onSortEnd={onSortEnd}>
              <TransitionGroup className="todo-list">
                {tasks}
              </TransitionGroup>
            </SortableContainer>)
        }
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  visible: state.app.visible,
  visibleFinishList: state.todo.visibleFinishList
})

const mapDispatchToProps = {
  removeTodo, toggleEditForm, addFinishTodo, removeFinishTodo,
  returnFinishTodo, updateTodo, showFinishList, hideFinishList
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
