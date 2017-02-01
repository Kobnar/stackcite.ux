import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { IndexLink } from 'react-router'
import * as bs from 'react-bootstrap'

import * as actions from './actions'

import authEndpoint from '../api/users/auth/actions'

import NavLink from './NavLink'

import './css/nav.css'

class NavigationBar extends Component {

    constructor (props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout (event) {
        event.preventDefault()
        this.props.logout(this.props.tokenKey)
        this.props.push("/")
    }

    render () {
        var isLoggedIn = !!this.props.tokenKey
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
    tokenKey: state.api.users.auth.token.key,
    mobileNavMenuVisible: state.ux.mobileNavMenuVisible
})

const mapDispatchToProps = (dispatch) => ({
    toggleMobileNavMenu() { dispatch(actions.toggleMobileNavMenu()) },
    hideMobileNavMenu() { dispatch(actions.hideMobileNavMenu()) },
    push(target) { dispatch(push(target)) },
    logout(tokenKey) { 
        dispatch(authEndpoint.delete(tokenKey))
            .then(actions.removeToken(tokenKey))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)