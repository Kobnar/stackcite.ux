import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as actions from './auth/actions'

import './css/nav.css'

class MobileNavigationMenu extends Component
{
    render () {
        var signupLink = (
            <li key='m-signup-li' className="mobile-nav-item">
                <div className="container">
                    <Link to="/signup" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-pencil"/>Sign up</Link>
                </div>
            </li>)

        var loginLink = (
                <li key='m-login-li' className="mobile-nav-item">
                    <div className="container">
                        <Link to="/login" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-log-in"/>Log in</Link>
                    </div>
                </li>)

        var accountLink = (
                <li key='m-account-li' className="mobile-nav-item">
                    <div className="container">
                        <Link to="/account" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-pencil"/>Account</Link>
                    </div>
                </li>)

        var logoutLink = (
                <li key='m-logout-li' className="mobile-nav-item">
                    <div className="container">
                        <Link to="/logout" className="mobile-nav-link" activeClassName="active" onClick={this.props.logoutHandler.bind(this)}><span className="glyphicon glyphicon-log-in"/>Log out</Link>
                    </div>
                </li>)

        return (
            <nav className={ this.props.menuVisible ? "mobile-nav visible" : "mobile-nav"}>
                <ul className="mobile-nav-list">
                    <li className="mobile-nav-item">
                        <div className="container">
                            <Link to="/sources" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-book"/>Sources</Link>
                        </div>
                    </li>
                    <li className="mobile-nav-item">
                        <div className="container">
                            <Link to="/people" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-user"/>People</Link>
                        </div>
                    </li>
                    <li className="mobile-nav-item">
                        <div className="container">
                            <Link to="/organizations" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-briefcase"/>Organizations</Link>
                        </div>
                    </li>
                    { !this.props.user.id ? signupLink : null }
                    { !this.props.user.id ? loginLink : null }
                    { !!this.props.user.id ? accountLink : null }
                    { !!this.props.user.id ? logoutLink : null }
                </ul>
            </nav>
        )
    }

    static propTypes = {
        user: React.PropTypes.object.isRequired,
        menuVisible: React.PropTypes.bool.isRequired,
        logoutHandler: React.PropTypes.func.isRequired
    }
}

const mapStateToProps = (state) => ({
    user: state.app.auth.user,
    menuVisible: state.app.ux.mobileNavMenuVisible
})

const mapDispatchToProps = (dispatch) => ({
    logoutHandler() { dispatch(actions.logout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigationMenu)