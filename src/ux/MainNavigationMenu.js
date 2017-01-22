import React from 'react'
import { IndexLink, Link } from 'react-router'

import './css/nav.css'

const MainNavigationMenu = ({isLoggedIn, logoutHandler, toggleMenuHandler, hideMenuHandler}) => {
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
            <Link to="/login" className="navbar-link navbar-auth-link desktop" activeClassName="active" onClick={logoutHandler}>Log out</Link>
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
                        <IndexLink to="/" className="navbar-link navbar-title" activeClassName="active" onClick={hideMenuHandler}>StackCite</IndexLink>
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

                    {/** Authentication links */}
                    { !isLoggedIn ? signupLink : null }
                    { !isLoggedIn ? loginLink : null }
                    { isLoggedIn ? accountLink : null }
                    { isLoggedIn ? logoutLink : null }
                    
                    {/** Responsive menu button */}
                    <li className="navbar-item u-pull-right" >
                        <button id="mobile-nav-button" className="button" onClick={toggleMenuHandler}><span className="glyphicon glyphicon-menu-hamburger" /></button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

MainNavigationMenu.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
    logoutHandler: React.PropTypes.func.isRequired,
    hideMenuHandler: React.PropTypes.func.isRequired,
    toggleMenuHandler: React.PropTypes.func.isRequired
}

export default MainNavigationMenu