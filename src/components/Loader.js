import React from 'react'
import {CSSTransition} from 'react-transition-group'
import {Spin} from 'antd'

const Loader = ({loading}) => (
  <CSSTransition
    in={loading}
    timeout={500}
    classNames="loading-list"
    unmountOnExit
  >
    <div className="loader"><Spin/></div>
  </CSSTransition>
)
export default Loader
