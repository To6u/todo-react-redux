import { SHOW_LOADER_TODO_LIST, SHOW_LOADER_FINISH_LIST, HIDE_LOADER_TODO_LIST, SHOW_ALERT, HIDE_ALERT, HIDE_LOADER_FINISH_LIST } from "./types"
import Todo from '../components/Todo/Todo'
import About from '../components/About/About'

const initialState = {
  loadingTodoList: false,
  loadingFinishList: false,
  alert: {text: '', type: 'warning'},
  visible: false,
  routes: [
    {path: '/', name: 'Тудушка', Component: Todo},
    {path: '/about', name: 'о Тудушке', Component: About}
  ]
}

export const appReducer = (state = initialState, action) => {
   switch(action.type) {
      case SHOW_LOADER_TODO_LIST:
        return {...state, loadingTodoList: true}
      case SHOW_LOADER_FINISH_LIST:
        return {...state, loadingFinishList: true}
      case HIDE_LOADER_TODO_LIST:
        return {...state, loadingTodoList: false}
      case HIDE_LOADER_FINISH_LIST:
        return {...state, loadingFinishList: false}
      case SHOW_ALERT:
        return {...state, alert: action.payload, visible: true}
      case HIDE_ALERT:
        return {...state, visible: false }
      default: return state
   }
}
