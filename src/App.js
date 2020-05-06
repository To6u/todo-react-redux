import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import {fetchTodo, fetchFinishTodo} from './redux/actions'
import { Loader } from './components/Loader'
// import FilterTask from './components/FilterTask/FilterTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import GitHubLogo from './components/github.svg'

const App = () => {
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
      <Link to="https://github.com/To6u/todo-react-redux">
        <img className="github-logo" src={GitHubLogo} alt="GitHub"/>
      </Link>
      <div className="row">
        <div className="col-4">
          <h3 className="mb-4 font-weight-light">Создать задачу</h3>
          <TodoForm />
          <div className="row">
            <div className="col-12 todo-finish-list">
              {loadingFinishList
                ? <Loader/>
                : null
              }
              <h3 className="mt-5 font-weight-light">Выполненные задачи</h3>
              <TodoList todoList={finishListData} finish={true}/>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col todo-list">
          {loadingTodoList
            ? <Loader/>
            : null
          }
          <h3 className="mb-4 font-weight-light tasks-list-header px-0">Список задач
          {/* <FilterTask/> */}
          </h3>
          <TodoList todoList={todoListData} finish={false}/>
        </div>
      </div>
    </div>
  );
}

export default App;
