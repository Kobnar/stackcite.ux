import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as authActions from '../../api/users/actions'

import './css/account.css'

class Account extends Component {

    componentDidMount() {
        this.props.getUser(this.props.tokenKey, this.props.userId)
    }

    render () {
        return (
            <div className="container">
                <h4>Account Settings</h4>

                {/** User settings */}
                <div  className="settings-container">
                    <form>
                        <div className="row">
                            <label for="email">Email address</label>
                            <input id="email" className="u-full-width" type="email" placeholder={this.props.user.email}/>
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            className="button-primary"
                            onClick={(event) => event.stopPropagation()}/>
                    </form>
                </div>

                {/** User data */}
                <div  className="settings-container">
                    <div className="row">
                        <p><strong>Joined:</strong> {this.props.user.joined}</p>
                    </div>
                    <div className="row">
                        <p><strong>Last login:</strong> {this.props.user.previous_login}</p>
                    </div>
                </div>
                
                {/** Delete account */}
                <div  className="settings-container">
                    <button onClick={() => this.props.deleteUser(this.props.tokenKey, this.props.userId)}>Delete Account</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.ux.account.user,
    userId: state.api.users.auth.user.id,
    tokenKey: state.api.users.auth.token.key
})

const mapDispatchToProps = (dispatch) => ({
    getUser(tokenKey, userId) { dispatch(authActions.getUser(tokenKey, userId)) },
    deleteUser(tokenKey, userId) { dispatch(authActions.deleteUser(tokenKey, userId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)