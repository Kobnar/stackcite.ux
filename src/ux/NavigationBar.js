import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'
import * as bs from 'react-bootstrap'

import { logout } from './login/actions'

import NavLink from './NavLink'

import './css/nav.css'

class NavigationBar extends Component {

    constructor (props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout (event) {
        event.preventDefault()
        var authKey = this.props.auth.token.key
        this.props.dispatch(logout(authKey))
    }

    render () {
        var isLoggedIn = this.props.auth.token.key
        return (
            <bs.Navbar collapseOnSelect>
                <bs.Navbar.Header>
                    <bs.Navbar.Brand>
                        <IndexLink to="/">StackCite</IndexLink>
                    </bs.Navbar.Brand>
                    <bs.Navbar.Toggle/>
                </bs.Navbar.Header>
                <bs.Navbar.Collapse id="navbar-collapse">
                    <bs.Nav>
                        <NavLink to="/sources" className="navbar-link">Sources</NavLink>
                        <NavLink to="/people" className="navbar-link">People</NavLink>
                        <NavLink to="/organizations" className="navbar-link">Organizations</NavLink>
                    </bs.Nav>
                    <bs.Nav pullRight>
                        { !isLoggedIn ? <NavLink to="/signup" className="navbar-link">Sign up</NavLink> : null }
                        { !isLoggedIn ? <NavLink to="/login" className="navbar-link">Log in</NavLink> : null }
                        { isLoggedIn ? <NavLink to="/account" className="navbar-link">Account</NavLink> : null }
                        { isLoggedIn ? <NavLink to="/logout" onClick={this.handleLogout} className="navbar-link">Log out</NavLink> : null }
                    </bs.Nav>
                </bs.Navbar.Collapse>
            </bs.Navbar>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.api.auth
})

export default connect(mapStateToProps)(NavigationBar)