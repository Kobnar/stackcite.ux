import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as authActions from './auth/actions'

import './css/nav.css'

class MainNavigationMenu extends Component
{
    render () {
        var signupLink = (
            <li key="login-li" className="navbar-item u-pull-right">
                <Link to="/login" className="navbar-link navbar-auth-link desktop" activeClassName="active">Log in</Link>
            </li>)

        var loginLink = (
            <li key="signup-li" className="navbar-item u-pull-right">
                <Link to="/signup" className="navbar-link navbar-auth-link desktop" activeClassName="active">Sign up</Link>
            </li>)

        var accountLink = (
            <li key="logout-li" className="navbar-item u-pull-right">
                <Link to="/login" className="navbar-link navbar-auth-link desktop" activeClassName="active" onClick={this.props.logout.bind(this)}>Log out</Link>
            </li>)

        var logoutLink = (
            <li key="account-li" className="navbar-item u-pull-right">
                <Link to="/account" className="navbar-link navbar-auth-link desktop" activeClassName="active">Account</Link>
            </li>)

        return (
            <nav className="navbar">
                <div className="container">
                    <ul className="navbar-list">

                        {/** Website header */}
                        <li className="navbar-item">
                            <IndexLink to="/" className="navbar-title" activeClassName="active">StackCite</IndexLink>
                        </li>

                        {/** Main page links */}
                        <li className="navbar-item">
                            <Link to="/sources" className="navbar-link" activeClassName="active">Sources</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/people" className="navbar-link" activeClassName="active">People</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/organizations" className="navbar-link" activeClassName="active">Organizations</Link>
                        </li>

                        { !this.props.user.id ? signupLink : null }
                        { !this.props.user.id ? loginLink : null }
                        { !!this.props.user.id ? accountLink : null }
                        { !!this.props.user.id ? logoutLink : null }
                        
                        {/** Responsive menu button */}
                        <li className="navbar-item u-pull-right" >
                            <button id="mobile-nav-button" className="button" onClick={this.props.toggleMobileNavMenu.bind(this)}><span className="glyphicon glyphicon-menu-hamburger" /></button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

    static propTypes = {
        user: React.PropTypes.object.isRequired,
        logout: React.PropTypes.func.isRequired,
        toggleMobileNavMenu: React.PropTypes.func.isRequired
    }
}

const mapStateToProps = (state) => ({
    user: state.app.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    logout() { dispatch(authActions.logout()) },
    toggleMobileNavMenu() { dispatch(actions.toggleMobileNavMenu()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigationMenu)