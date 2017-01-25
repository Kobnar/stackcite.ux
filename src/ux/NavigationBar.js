import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as actions from './actions'

import MainNavigationMenu from './MainNavigationMenu'
import MobileNavigationMenu from './MobileNavigationMenu'

import './css/nav.css'

class NavigationBar extends Component {

    // A generalized event handler for logout links
    handleLogout(event) {
        event.preventDefault()
        this.props.logout(this.props.tokenKey)
    }

    // Checks if an event was triggerd anywhere on the NavigationBar component
    handleClick(event) {
        var domNode = ReactDOM.findDOMNode(this)
        if (this.props.mobileNavMenuVisible & !domNode.contains(event.target)) {
            this.props.hideMobileNavMenu()
        }
    }

    // Establishes a click-event listener to capture clicks away from the nav bar
    componentDidMount() { window.addEventListener('click', this.handleClick.bind(this), false) }
    componentWillUnount() { window.removeEventListener('click', this.handleClick.bind(this), false) }

    render () {
        var isLoggedIn = !!this.props.tokenKey
        return (
            <div className="navbar-contaner">
                <MainNavigationMenu
                    isLoggedIn={isLoggedIn}
                    toggleMobileNavMenu={this.props.toggleMobileNavMenu}
                    logout={this.handleLogout.bind(this)}/>
                <MobileNavigationMenu
                    isLoggedIn={isLoggedIn}
                    isVisible={this.props.mobileNavMenuVisible}
                    push={this.props.push}
                    logout={this.handleLogout.bind(this)}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tokenKey: state.api.users.auth.token.key,
    mobileNavMenuVisible: state.ux.mobileNavMenuVisible
})

const mapDispatchToProps = (dispatch) => ({
    toggleMobileNavMenu() { dispatch(actions.toggleMobileNavMenu()) },
    hideMobileNavMenu() { dispatch(actions.hideMobileNavMenu()) },
    push(target) { dispatch(push(target)) },
    logout(tokenKey) { dispatch(actions.logout(tokenKey)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)