import React from 'react'
import {CSSTransition} from 'react-transition-group'
import {Spin} from 'antd'

const Loader: React.FC<{loading: boolean}> = ({loading}) => {
  return (
    <div>
      <CSSTransition
        in={loading}
        timeout={500}
        classNames="loading-list"
        unmountOnExit
        mountOnEnter
      >
        <div className="loader">
          <Spin/>
        </div>
      </CSSTransition>
    </div>
  )
}
export default Loader
