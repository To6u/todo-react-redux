import React, {useEffect}  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CSSTransition} from 'react-transition-group'
import {Spin} from 'antd'
import TodoList from '../TodoList/TodoList';
import TodoForm from '../TodoForm/TodoForm';
import {fetchTodo, fetchFinishTodo} from '../../redux/actions'
import Alert from '../Alert/Alert'
import './todo.sass'
import 'antd/dist/antd.css'

const Todo = () => {
  const dispatch = useDispatch()
  const todoListData = useSelector(state => state.todo.todoList)
  const finishListData = useSelector(state => state.todo.finishList)
  const loadingTodoList = useSelector(state => state.app.loadingTodoList)
  const loadingFinishList = useSelector(state => state.app.loadingFinishList)
  const alert = useSelector(state => state.app.alert)

  useEffect(() => {
    dispatch(fetchTodo())
    dispatch(fetchFinishTodo())
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
            <iv className="d-lg-block mt-5 d-none todo-finish-list">
              <CSSTransition
                in={loadingFinishList}
                timeout={500}
                classNames="loading-list"
                unmountOnExit
                mountOnEnter
              >
                <div className="loader"><Spin/></div>
              </CSSTransition>
              <h3 className="font-weight-light">Выполненные задачи</h3>
              <TodoList todoList={finishListData} finish={true}/>
            </iv>
          </div>
        </div>
        <div className="col-lg-8 todo-list">
            <CSSTransition
              in={loadingTodoList}
              timeout={500}
              classNames="loading-list"
              unmountOnExit
            >
              <div className="loader"><Spin/></div>
            </CSSTransition>
            <h3 className="mb-4 mt-5 mt-lg-0 font-weight-light tasks-list-header px-0">Список задач
            {/* <FilterTask/> */}
            </h3>
            <TodoList todoList={todoListData} finish={false}/>
        </div>
        <div className="col-lg-4 d-lg-none todo-finish-list">
          <CSSTransition
            in={loadingFinishList}
            timeout={500}
            classNames="loading-list"
            unmountOnExit
          >
            <div className="loader"><Spin/></div>
          </CSSTransition>
          <h3 className="mb-4 font-weight-light">Выполненные задачи</h3>
          <TodoList todoList={finishListData} finish={true}/>
        </div>
      </div>
    </div>
  )
}

export default Todo
