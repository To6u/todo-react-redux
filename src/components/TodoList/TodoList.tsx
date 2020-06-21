import React, {useEffect, useState, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/rootReducer'
import { TodoType} from '../../redux/todoReducer'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import update from 'immutability-helper'
import { Button, Tooltip, Drawer } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import ToDoItem from '../TodoItem/ToDoItem'
import ToDoItemDragDrop from '../TodoItemDragDrop/TodoItemDragDrop'
import NoTasks from '../NoTasks/NoTasks'
import { emptyFinishTodo, emptyTodo, showFinishList, hideFinishList } from '../../redux/actions'
import './todoList.sass'

interface TodoListProps {
  finish?: boolean
}

const TodoList: React.FC<TodoListProps> = ({finish}) => {
  const dispatch = useDispatch()
  const visibleFinishList = useTypedSelector(state => state.todo.visibleFinishList)
  const todoList = useTypedSelector(state => state.todo.todoList)
  const taskCount = useTypedSelector(state => state.todo.taskCount)
  const noFinishTask = useTypedSelector(state => state.todo.noFinishTask)
  const finishCount = useTypedSelector(state => state.todo.finishCount)

  const [list, setList] = useState([...todoList])
  const [finishList, setFinishList] = useState([...todoList])

  useEffect(() => {
    setList(todoList.filter(todo => !todo.finish))
    setFinishList(todoList.filter(todo => todo.finish))
  }, [todoList])

  useEffect(() => {
    !finishCount ? dispatch(emptyFinishTodo(true)) : dispatch(emptyFinishTodo(false))
    !taskCount ? dispatch(emptyTodo(true)) : dispatch(emptyTodo(false))
    noFinishTask && dispatch(hideFinishList())
     // eslint-disable-next-line
  }, [finishCount, taskCount])

  const TaskItem = (value: TodoType, index: number) => (
    <CSSTransition
      key={value.id}
      classNames='todo-item'
      timeout={{enter: 300, exit: 400}}
      mountOnEnter
      unmountOnExit
    >
      <ToDoItemDragDrop
        index={index}
        task={value}
        list={todoList}
        moveTodo={moveTodo}
      />
    </CSSTransition>
  )

  const FinishItem = (value: TodoType, index: number) => (
    <CSSTransition
      key={value.id}
      classNames='todo-item'
      timeout={{enter: 300, exit: 400}}
      mountOnEnter
      unmountOnExit
    >
      <ToDoItem
        task={value}
        list={todoList}
        className='finish-card'
      />
    </CSSTransition>
  )

  let tasks = [] as TodoType[]

  if (finish && finishList.length) {
    tasks = finishList.filter(task => task.finish ? task : null )
  } else if (!finish && list.length) {
    tasks = list.filter(task => !task.finish ? task : null )
  }

  const buttonShowFinishList = () => {
    return finishCount > 2
    ? (
      <Tooltip title="Все выполненные задачи" placement="right">
        <Button className="show-finish-list d-lg-block d-none" shape="circle" icon={<EyeOutlined />} onClick={() => dispatch(showFinishList())} />
      </Tooltip>
    )
    : null
  }

  const moveTodo = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragTodo = list[dragIndex]
      setList(
        update(list, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragTodo],
          ],
        }),
      )
    },
    [list],
  )

  return (
    <>
      {finish
        ? (<>
            <NoTasks finish={true} />
            {buttonShowFinishList()}
            <TransitionGroup>
              {tasks.map((task, index) => {
                return FinishItem(task, index)
              })}
            </TransitionGroup>
            {!noFinishTask && (
              <Drawer
                title="Выполненные задачи"
                placement="left"
                closable={false}
                getContainer={false}
                onClose={() => dispatch(hideFinishList())}
                visible={visibleFinishList}
                width={400}
                className="d-lg-block d-none"
              >
                <TransitionGroup>
                  {tasks.map((task, index) => {
                    return FinishItem(task, index)
                  })}
                </TransitionGroup>
              </Drawer>
            )}
          </>)
        : (<>
            <NoTasks finish={false} />
            {list.length
              ? (
                <TransitionGroup>
                  {tasks.map((task, index) => {
                    return TaskItem(task, index)
                  })}
                </TransitionGroup>
              )
              : null
            }
          </>)
      }
      </>
  )
}

export default TodoList
