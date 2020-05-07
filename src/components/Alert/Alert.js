import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {CSSTransition} from 'react-transition-group'
import {hideAlert} from '../../redux/actions'
import './alert.sass'

const Alert = () => {
  const dispatch = useDispatch()

  const alert = useSelector(state => state.app.alert)
  const visible = useSelector(state => state.app.visible)

  return (
    <CSSTransition
      in={visible}
      timeout={{
        enter: 700,
        exit: 1000
      }}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit
    >
      <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
        {alert.text}
        <button onClick={() => dispatch(hideAlert())} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </CSSTransition>
)}

export default Alert
