import {ADD_TODO, REMOVE_TODO, FETCH_TODO, TOGGLE_EDIT_FORM, 
        ADD_FINISH_TODO, FETCH_FINISH_TODO, REMOVE_FINISH_TODO, RETURN_FINISH_TODO, UPDATE_TODO} from './types'

const initialState = {
  todoList: [],
  finishList: [],
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
    case TOGGLE_EDIT_FORM:
      return {...state, todoList: payload}
    case ADD_FINISH_TODO: 
      const newFinishElement = [payload]
      return {...state, finishList: newFinishElement.concat(state.finishList)}
    case FETCH_FINISH_TODO:
      return {...state, finishList: payload}
    case REMOVE_FINISH_TODO:
      return {...state, finishList: state.finishList.filter(task => task.id !== payload)}
    default: return state
  }
}