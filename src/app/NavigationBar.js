import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import * as actions from './auth/actions'

import './css/NavigationBar.css'

class NavigationBar extends Component
{
    constructor (props) {
        super(props);
        this.state = { mobileNavVisible: false }
    }

    toggleMobileNav(event) { this.setState({ mobileNavVisible: !this.state.mobileNavVisible }) }

    render() {
        var authLinks
        if (!this.props.user.id) {
            authLinks = [
                <li key="al0" className="navbar-item u-pull-right">
                    <Link to="/login" className="navbar-link navbar-auth-link desktop" activeClassName="active">Log in</Link>
                </li>,
                <li key="al1" className="navbar-item u-pull-right">
                    <Link to="/signup" className="navbar-link navbar-auth-link desktop" activeClassName="active">Sign up</Link>
                </li>
            ]
        } else {
            authLinks = [
                <li key="al0" className="navbar-item u-pull-right">
                    <Link to="/login" className="navbar-link navbar-auth-link desktop" activeClassName="active" onClick={this.props.logout}>Log out</Link>
                </li>,
                <li key="al1" className="navbar-item u-pull-right">
                    <Link to="/account" className="navbar-link navbar-auth-link desktop" activeClassName="active">Account</Link>
                </li>
            ]
        }
        return (
            <div className="navbar-contaner">
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
                            
                            {/** Responsive menu */}
                            <li className="navbar-item u-pull-right" >
                                <button id="mobile-nav-button" className="button" onClick={this.toggleMobileNav.bind(this)}><span className="glyphicon glyphicon-menu-hamburger" /></button>
                            </li>

                            {/** Logged-in user nav controls */}
                            { authLinks }
                        </ul>
                    </div>
                </nav>
                <nav className={ this.state.mobileNavVisible ? "mobile-nav visible" : "mobile-nav"}>
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
                        <li className="mobile-nav-item">
                            <div className="container">
                                <Link to="/signup" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-pencil"/>Sign up</Link>
                            </div>
                        </li>
                        <li className="mobile-nav-item">
                            <div className="container">
                                <Link to="/login" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-log-in"/>Log in</Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.app.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    logout() { dispatch(actions.logout) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)