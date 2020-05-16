import React, {useEffect}  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import TodoList from '../TodoList/TodoList';
import TodoForm from '../TodoForm/TodoForm';
import {fetchTodo, fetchFinishTodo} from '../../redux/actions'
import { Loader } from '../Loader'
import './todo.sass'

const Todo = () => {
  const dispatch = useDispatch()
  const todoListData = useSelector(state => state.todo.todoList)
  const finishListData = useSelector(state => state.todo.finishList)
  const loadingTodoList = useSelector(state => state.app.loadingTodoList)
  const loadingFinishList = useSelector(state => state.app.loadingFinishList)

  useEffect(() => {
    dispatch(fetchTodo())
    dispatch(fetchFinishTodo())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-lg-4">
          <h3 className="mb-4 font-weight-light">Создать задачу</h3>
          <TodoForm />
          <div className="d-lg-block todo-finish-list">
            {loadingFinishList
              ? <Loader/>
              : null
            }
            <h3 className="mb-4 font-weight-light">Выполненные задачи</h3>
            <TodoList todoList={finishListData} finish={true}/>
          </div>
        </div>
        <div className="col-lg-8 todo-list">
            {loadingTodoList
              ? <Loader/>
              : null
            }
            <h3 className="mb-4 mt-5 mt-lg-0 font-weight-light tasks-list-header px-0">Список задач
            {/* <FilterTask/> */}
            </h3>
            <TodoList todoList={todoListData} finish={false}/>
        </div>
        <div className="col-lg-4 d-lg-none todo-finish-list">
          {loadingFinishList
            ? <Loader/>
            : null
          }
          <h3 className="mb-4 font-weight-light">Выполненные задачи</h3>
          <TodoList todoList={finishListData} finish={true}/>
        </div>
      </div>
    </div>
  )
}

export default Todo
