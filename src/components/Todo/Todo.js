import React, {useEffect}  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CSSTransition} from 'react-transition-group'
import Loader from '../Loader'
import TodoList from '../TodoList/TodoList';
import TodoForm from '../TodoForm/TodoForm';
import {fetchTodo} from '../../redux/actions'
import Alert from '../Alert/Alert'
import './todo.sass'
import 'antd/dist/antd.css'

const Todo = () => {
  const dispatch = useDispatch()
  const loadingTodoList = useSelector(state => state.app.loadingTodoList)
  const loadingFinishList = useSelector(state => state.app.loadingFinishList)
  const alert = useSelector(state => state.app.alert)

  useEffect(() => {
    dispatch(fetchTodo())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container-xl pt-5">
      {alert && Alert()}
      <div className="row">
        <div className="col-lg-4">
          <h3 className="mb-4 font-weight-light">Добавить задачу</h3>
          <TodoForm />
          <div className="pt-4">
            <div className="d-lg-block mt-5 d-none todo-finish-list">
              <Loader loading={loadingFinishList}/>
              <h3 className="font-weight-light">Выполненные задачи</h3>
              <TodoList finish={true}/>
            </div>
          </div>
        </div>
        <div className="col-lg-8 todo-list">
          <Loader loading={loadingTodoList}/>
          <h3 className="mb-4 mt-5 mt-lg-0 font-weight-light tasks-list-header px-0">Список задач
          {/* <FilterTask/> */}
          </h3>
          <TodoList/>
        </div>
        <div className="col-lg-4 d-lg-none todo-finish-list">
          <Loader loading={loadingFinishList}/>
          <h3 className="mb-4 font-weight-light">Выполненные задачи</h3>
          <TodoList finish={true}/>
        </div>
      </div>
    </div>
  )
}

export default Todo
