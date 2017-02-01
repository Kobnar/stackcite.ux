import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as reactCookie from 'react-cookie'

import { FAILURE } from '../api/actions'
import authEndpoint from '../api/users/auth/actions'

import { loadToken, removeToken } from './actions'

import NavigationBar from './NavigationBar'

import './css/app.css'

class App extends Component {

    componentWillMount () {
        var tokenKey = loadToken()
        if (tokenKey && !this.props.user.id)
            this.props.updateLogin(tokenKey)
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
    updateLogin (tokenKey) {
        return dispatch(authEndpoint.update(tokenKey))
            .then(action => {
                if (action.status === FAILURE)
                    removeToken()
            })
    }
})

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App