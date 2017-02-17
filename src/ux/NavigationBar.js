import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { push } from 'react-router-redux'

import { hideNav, toggleNav } from './actions'
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

    componentDidMount() {
        document.addEventListener('click', this.handleClickAway.bind(this), true)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickAway.bind(this), true)
    }

    handleClickAway (event) {
        if (!this.props.hidden) {
            const domNode = ReactDOM.findDOMNode(this)
            if (!domNode || !domNode.contains(event.target))
                this.props.dispatch(hideNav())
        }
    }

    handleLogout (event) {
        event.preventDefault()
        var authKey = this.props.auth.token.key
        this.props.dispatch(logout(authKey))
        this.props.dispatch(push('/login'))
    }

    render () {
        var hidden = this.props.hidden
        var isLoggedIn = this.props.auth.token.key
        return (
            <div className='navbar'>
                <div className='container'>
                    <div className='navbar-header'>
                        <IndexLink
                            to='/'
                            className='navbar-brand'>
                            Stackcite
                        </IndexLink>
                    </div>
                    <div className='navbar-toggle'>
                        <button
                            className='button-outline'
                            onClick={() => this.props.dispatch(toggleNav())}>
                            <span className='glyphicons glyphicons-menu-hamburger' />
                        </button>
                    </div>
                    <div
                        className={'navbar-collapse' + (hidden ? ' hidden' : '')}>
                        <div className='navbar-nav'>
                            <ul className='navbar-list'>
                                <li>
                                    <NavLink
                                        to='/sources'>
                                        Sources
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/people'>
                                        People
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/organizations'>
                                        Organizations
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='navbar-nav navbar-right'>
                            { isLoggedIn ? 
                                <ul className='navbar-list'>
                                    <li>
                                        <NavLink
                                            to='/account'>
                                            Account
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/logout' 
                                            onClick={this.handleLogout}>
                                            Logout
                                        </NavLink>
                                    </li>
                                </ul> :
                                <ul className='navbar-list'>
                                    <li>
                                        <NavLink
                                            to='/signup'>
                                            Signup
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to='/login'>
                                            Login
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.api.auth,
    hidden: state.ux.navHidden
})

export default connect(mapStateToProps)(NavigationBar)