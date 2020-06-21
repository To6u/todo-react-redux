import React from 'react'
import {useTypedSelector} from '../../redux/rootReducer'
import {NavLink} from 'react-router-dom'
import {Nav, Navbar, Container} from 'react-bootstrap'
import Logo from '../Logo/Logo'
import GitHubLogo from '../github.svg'
import './navbar.sass'

const TopNavbar: React.FC = () => {
  const routes = useTypedSelector(state => state.app.routes)

  return (
      <Navbar bg="dark" variant="dark">
        <Logo/>
        <Container>
          <Nav className="mr-auto">
            {routes.map(route => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                exact
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
        <a href="https://github.com/To6u/todo-react-redux" target="_blank" rel="noopener noreferrer">
          <img className="github-logo" src={GitHubLogo} alt="GitHub"/>
        </a>
      </Navbar>
  )
}

export default TopNavbar
