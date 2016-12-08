import React from 'react'
import { Link } from 'react-router'

import './css/nav.css'

const MobileNavigationMenu = ({ isLoggedIn, menuVisible, logoutHandler, navClickHandler }) => {
    var signupLink = (
        <li key='m-signup-li' className="mobile-nav-item" onClick={() => {navClickHandler("/signup")}}>
            <div className="container">
                <Link to="/signup" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-pencil"/>Sign up</Link>
            </div>
        </li>)

    var loginLink = (
            <li key='m-login-li' className="mobile-nav-item" onClick={() => {navClickHandler("/login")}}>
                <div className="container">
                    <Link to="/login" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-log-in"/>Log in</Link>
                </div>
            </li>)

    var accountLink = (
            <li key='m-account-li' className="mobile-nav-item" onClick={() => {navClickHandler("/account")}}>
                <div className="container">
                    <Link to="/account" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-cog"/>Account</Link>
                </div>
            </li>)

    var logoutLink = (
            <li key='m-logout-li' className="mobile-nav-item" onClick={() => {navClickHandler("/")}}>
                <div className="container">
                    <Link to="/" className="mobile-nav-link" onClick={logoutHandler}><span className="glyphicon glyphicon-log-out"/>Log out</Link>
                </div>
            </li>)

    return (
        <nav className={ menuVisible ? "mobile-nav visible" : "mobile-nav"}>
            <ul className="mobile-nav-list">
                <li className="mobile-nav-item" onClick={() => {navClickHandler("/sources")}}>
                    <div className="container">
                        <Link to="/sources" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-book"/>Sources</Link>
                    </div>
                </li>
                <li className="mobile-nav-item" onClick={() => {navClickHandler("/people")}}>
                    <div className="container">
                        <Link to="/people" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-user"/>People</Link>
                    </div>
                </li>
                <li className="mobile-nav-item" onClick={() => {navClickHandler("/organizations")}}>
                    <div className="container">
                        <Link to="/organizations" className="mobile-nav-link" activeClassName="active"><span className="glyphicon glyphicon-briefcase"/>Organizations</Link>
                    </div>
                </li>
                
                {/** Authentication links */}
                { !isLoggedIn ? signupLink : null }
                { !isLoggedIn ? loginLink : null }
                { isLoggedIn ? accountLink : null }
                { isLoggedIn ? logoutLink : null }
            </ul>
        </nav>
    )
}

MobileNavigationMenu.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
    menuVisible: React.PropTypes.bool.isRequired,
    logoutHandler: React.PropTypes.func.isRequired,
    navClickHandler: React.PropTypes.func.isRequired
}

export default MobileNavigationMenu