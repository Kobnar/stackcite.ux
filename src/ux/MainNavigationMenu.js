import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'

import './css/nav.css'

class MainNavigationMenu extends Component {
    
    renderLink (target, text, isAuthLink, handler) {
        return (
            <li className={ isAuthLink ? "navbar-item u-pull-right" : "navbar-item" }>
                <Link to={target} className="navbar-link" activeClassName="active" onClick={handler}>{text}</Link>
            </li>
        )
    }

    render () {
        var isLoggedIn = this.props.isLoggedIn
        return (
            <nav className="navbar">
                <div className="container">
                    <ul className="navbar-list">

                        {/** Website header */}
                        <li className="navbar-item">
                            <IndexLink to="/" className="navbar-link navbar-title" activeClassName="active">StackCite</IndexLink>
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
                        { !isLoggedIn ? this.renderLink('/login', 'Log In', true) : null }
                        { !isLoggedIn ? this.renderLink('/signup', 'Sign Up', true) : null }
                        { isLoggedIn ? this.renderLink('/logout', 'Log Out', true, this.props.logout) : null }
                        { isLoggedIn ? this.renderLink('/account', 'Account', true) : null }
                        
                        {/** Responsive menu button */}
                        <li className="navbar-item u-pull-right" >
                            <button
                                id="mobile-nav-button"
                                className="button"
                                onClick={this.props.toggleMobileNavMenu}>
                                    <span className="glyphicon glyphicon-menu-hamburger" />
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

MainNavigationMenu.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
    toggleMobileNavMenu: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
}

export default MainNavigationMenu