import React, { Component } from 'react'
import { Link } from 'react-router'

import './css/nav.css'

class MobileNavigationMenu extends Component {

    renderLink (target, icon, text, handler) {
        return (
            <li className="mobile-nav-item" onClick={ handler ? handler : () => this.props.push(target)}>
                <div className="container">
                    <Link to={target} className="mobile-nav-link" activeClassName="active" onClick={handler}>
                        <span className={"glyphicon glyphicon-" + icon}/>
                        {text}
                    </Link>
                </div>
            </li>
        )
    }

    render () {
        var isLoggedIn = this.props.isLoggedIn
        var isVisible = this.props.isVisible
        return (
            <nav className={ isVisible ? "mobile-nav visible" : "mobile-nav"}>
                <ul className="mobile-nav-list">
                    {/** Navigation Links */}
                    { this.renderLink('/sources', 'book', 'Sources')}
                    { this.renderLink('/people', 'user', 'People')}
                    { this.renderLink('/organizations', 'briefcase', 'Organizations')}
                    {/** Authentication links */}
                    { !isLoggedIn ? this.renderLink('/signup', 'pencil', 'Sign Up') : null }
                    { !isLoggedIn ? this.renderLink('/login', 'log-in', 'Log In') : null }
                    { isLoggedIn ? this.renderLink('/account', 'cog', 'Account') : null }
                    { isLoggedIn ? this.renderLink('/logout', 'log-out', 'Log Out', this.props.logout) : null }
                </ul>
            </nav>
        )
    }
}

MobileNavigationMenu.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    push: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
}

export default MobileNavigationMenu