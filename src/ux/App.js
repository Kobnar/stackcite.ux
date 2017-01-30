import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as reactCookie from 'react-cookie'

import { SUCCESS } from '../api/actions'
import { retrieveUser } from '../api/users/actions'
import { COOKIE_NAME, updateAuthToken } from '../api/users/auth/actions'

import NavigationBar from './NavigationBar'

import './css/app.css'

class App extends Component {

    componentWillMount () {
        var tokenKey = reactCookie.load(COOKIE_NAME)
        if (tokenKey && !this.props.user.id)
            this.props.updateAuthToken(tokenKey)
                .then(action => {
                    // Loads user data if auth successful
                    if (action.status === SUCCESS) {
                        var userId = this.props.user.id
                        this.props.retrieveUser(userId, tokenKey)
                    } else {
                        reactCookie.remove(COOKIE_NAME)
                    }
                })
    }

    render() {
        return (
            <div className="App">
                <NavigationBar />
                <div className="main-container">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.api.users.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    updateAuthToken (tokenKey) { return dispatch(updateAuthToken(tokenKey)) },
    retrieveUser (userId, tokenKey) { return dispatch(retrieveUser(tokenKey, userId))}
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App