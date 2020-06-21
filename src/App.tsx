import React from 'react';
import {useTypedSelector} from './redux/rootReducer'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './components/Navbar/Navbar';

const App: React.FC = () => {
  const routes = useTypedSelector(state => state.app.routes)

  return (
    <Router>
      <TopNavbar/>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <div className="page">
                <Component />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </Router>
  );
}

export default App;
