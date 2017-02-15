import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { push } from 'react-router-redux'

import { logout } from './login/actions'

const NavLink = React.createClass({
    render() {
        return <Link {...this.props} activeClassName='active' />
    }
})

class NavigationBar extends Component {

    constructor (props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout (event) {
        event.preventDefault()
        var authKey = this.props.auth.token.key
        this.props.dispatch(logout(authKey))
        this.props.dispatch(push('/login'))
    }

    render () {
        var isLoggedIn = this.props.auth.token.key
        return (
            <div className='navbar'>
                <div className='container'>
                    <div className='navbar-header'>
                        <IndexLink to='/' className='navbar-brand'>Stackcite</IndexLink>
                    </div>
                    <div className='navbar-nav'>
                        <ul className='navbar-list'>
                            <li>
                                <NavLink
                                    to='sources'>
                                    Sources
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='people'>
                                    People
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='organizations'>
                                    Organizations
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='navbar-nav float-right'>
                        { isLoggedIn ? 
                            <ul className='navbar-list'>
                                <li>
                                    <NavLink
                                        to='account'>
                                        Account
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='logout' 
                                        onClick={this.handleLogout}>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul> :
                            <ul className='navbar-list'>
                                <li>
                                    <NavLink
                                        to='signup'>
                                        Signup
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='login'>
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.api.auth
})

export default connect(mapStateToProps)(NavigationBar)