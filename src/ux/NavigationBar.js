import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { IndexLink } from 'react-router'
import * as bs from 'react-bootstrap'

import NavLink from './NavLink'

import * as actions from './actions'

import './css/nav.css'

class NavigationBar extends Component {

    constructor (props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout (event) {
        event.preventDefault()
        this.props.logout()
        this.props.push("/")
    }

    render () {
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
                        <NavLink to="/signup" className="navbar-link">Sign up</NavLink>
                        <NavLink to="/login" className="navbar-link">Log in</NavLink>
                        <NavLink to="/account" className="navbar-link">Account</NavLink>
                        <NavLink to="/logout" onClick={this.handleLogout} className="navbar-link">Log out</NavLink>
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

const mapDispatchToProps = (dispatch, props) => ({
    toggleMobileNavMenu() { dispatch(actions.toggleMobileNavMenu()) },
    hideMobileNavMenu() { dispatch(actions.hideMobileNavMenu()) },
    push(target) { dispatch(push(target)) },
    logout() { dispatch(actions.logout(props.tokenKey)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)