import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as actions from './actions'
import * as authActions from './auth/actions'

import MainNavigationMenu from './MainNavigationMenu'
import MobileNavigationMenu from './MobileNavigationMenu'

import './css/nav.css'

class NavigationBar extends Component
{
    handleClick(event) {
        var domNode = ReactDOM.findDOMNode(this)
        if (this.props.mobileNavMenuVisible & !domNode.contains(event.target)) {
            this.props.hideMobileNavMenu()
        }
    }

    componentDidMount() { window.addEventListener('click', this.handleClick.bind(this), false) }
    componentWillUnount() { window.removeEventListener('click', this.handleClick.bind(this), false) }

    render () {
        var isLoggedIn = !!this.props.user.id
        return (
            <div className="navbar-contaner">
                <MainNavigationMenu
                    isLoggedIn={isLoggedIn}
                    logoutHandler={this.props.logout}
                    menuToggleHandler={this.props.toggleMobileNavMenu} />
                <MobileNavigationMenu
                    isLoggedIn={isLoggedIn}
                    logoutHandler={this.props.logout}
                    menuVisible={this.props.mobileNavMenuVisible}
                    navClickHandler={this.props.navClickHandler} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.app.auth.user,
    mobileNavMenuVisible: state.app.ux.mobileNavMenuVisible
})

const mapDispatchToProps = (dispatch) => ({
    logout() { dispatch(authActions.logout()) },
    toggleMobileNavMenu() { dispatch(actions.toggleMobileNavMenu()) },
    hideMobileNavMenu() { dispatch(actions.hideMobileNavMenu()) },
    navClickHandler(target) { dispatch(push(target)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)