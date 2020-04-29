import { ADD_TODO} from "./types"
import { showAlert } from "./actions"

const forbiden = ['fuck', 'php']

export function forbidenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_TODO) {
        const found = forbiden.filter(w => action.payload.title.includes(w))
        if(found.length) {
          return dispatch(showAlert('Вы спамер, идите домой!'))
        }
      }
      return next(action)
    }
  }
}