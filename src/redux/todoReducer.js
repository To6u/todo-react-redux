import {ADD_TODO, REMOVE_TODO, FETCH_TODO, NO_TODO, NO_FINISH_TODO, FINISH_COUNT,
        SHOW_ALL_FINISH_LIST_TODO, HIDE_ALL_FINISH_LIST_TODO} from './types'

const initialState = {
  todoList: [],
  visibleFinishList: false,
  noTasks: false,
  noFinishTask: false,
  finishCount: 0
}

export const todoReducer = (state = initialState,{type, payload}) => {
  switch(type) {
    case FETCH_TODO:
      return {...state, todoList: payload}
    case ADD_TODO:
      const newElement = [payload]
      return {...state, todoList: newElement.concat(state.todoList)}
    case REMOVE_TODO:
      return { ...state, todoList: state.todoList.filter(task => task.id !== payload)}
    case SHOW_ALL_FINISH_LIST_TODO:
      return {...state, visibleFinishList: true}
    case HIDE_ALL_FINISH_LIST_TODO:
      return {...state, visibleFinishList: false}
    case NO_TODO:
      return {...state, noTasks: payload}
    case NO_FINISH_TODO:
      return {...state, noFinishTask: payload}
    case FINISH_COUNT:
      return {...state, finishCount: state.finishCount + payload}
    default: return state
  }
}
