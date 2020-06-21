import {ADD_TODO, REMOVE_TODO, FETCH_TODO, NO_TODO, NO_FINISH_TODO, FINISH_COUNT,
        SHOW_ALL_FINISH_LIST_TODO, HIDE_ALL_FINISH_LIST_TODO, TODO_COUNT} from './types'

export type TodoType = {
  id: string
  title: string
  text?: string
  dateCreate: string
  dateFinish?: string
  dateModified?: string
  edit?: boolean
  finish?: boolean
}

const initialState = {
  todoList: [] as Array<TodoType>,
  visibleFinishList: false,
  noTasks: false,
  noFinishTask: false,
  finishCount: 0,
  taskCount: 0
}

export type TodoReducerType = typeof initialState

export const todoReducer = (state = initialState, action: any): TodoReducerType => {
  switch(action.type) {
    case FETCH_TODO:
      return {...state, todoList: action.payload}
    case ADD_TODO:
      const newElement = [action.payload]
      return {...state, todoList: newElement.concat(state.todoList)}
    case REMOVE_TODO:
      return { ...state, todoList: state.todoList.filter(task => task.id !== action.payload)}
    case SHOW_ALL_FINISH_LIST_TODO:
      return {...state, visibleFinishList: true}
    case HIDE_ALL_FINISH_LIST_TODO:
      return {...state, visibleFinishList: false}
    case NO_TODO:
      return {...state, noTasks: action.payload}
    case NO_FINISH_TODO:
      return {...state, noFinishTask: action.payload}
    case FINISH_COUNT:
      return {...state, finishCount: state.finishCount + action.payload}
    case TODO_COUNT:
      return {...state, taskCount: state.taskCount + action.payload}
    default: return state
  }
}
