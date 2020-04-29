import React from 'react'
import {connect} from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { hideAlert } from '../../redux/actions'
import './alert.sass'

const Alert = ({alert, visible, hideAlert}) => {
  return (
    <TransitionGroup>
      <CSSTransition
        in={visible}
        timeout={{
          enter: 700,
          exit: 1000
        }}
        classNames={'alert'}
      >
        <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
          {alert.text}
          <button onClick={() => hideAlert()} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </CSSTransition>
    </TransitionGroup>
)}

const mapStateToProps = state => ({
  alert: state.app.alert,
  visible: state.app.visible
})

const mapDispatchToProps = {
  hideAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)