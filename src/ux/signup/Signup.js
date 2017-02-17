import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SUCCESS } from 'api/actions'

import { signup } from './actions'
import { confirm } from './confirm/actions'

import SignUpForm from './SignUpForm'

const Success = ({ email }) => {
    return (
        <div>
            <h4>Success!</h4>
            <p>A confirmation link has been sent to {email}.</p>
        </div>
    )
}

const Failure = () => {
    return (
        <div>
            <h4>Confirmationation Failed!</h4>
            <p>The confirmation token you provided has either expired or it is invalid.</p>
        </div>
    )
}

class Signup extends Component {

    constructor (props) {
        super(props)

        this.state = {
            confirmKey: this.props.location.query.confirm,
            newEmail: this.props.location.query.success
        }

        this.signup = this.signup.bind(this)
        this.confirm = this.confirm.bind(this)
    }

    componentWillMount () {
        if (this.state.confirmKey)
            this.confirm(this.state.confirmKey)
    }

    signup (email, password) {
        this.props.dispatch(signup(email, password))
            .then(action => {
                if (action.status === SUCCESS)
                    this.props.dispatch(push('/signup?success=' + email))
            })
    }

    confirm (confirmKey) {
        this.props.dispatch(confirm(confirmKey))
            .then(action => {
                if (action.status === SUCCESS)
                    this.props.dispatch(push('/login'))
            })
    }

    render () {
        // Detect new signup confirmation
        if (this.state.confirmKey)
            if (this.props.confirm.loading)
                return <p>Loading...</p>
            else
                return (
                    <div className='container'>
                        <Failure />
                    </div>
                )

        // Detect signup success redirect
        else if (this.state.newEmail)
            return (
                <div className='container'>
                    <Success email={this.state.newEmail}/>
                </div>
            )

        // Render signup form
        else
            return (
                <div className='container narrow'>
                    <SignUpForm
                        loading={this.props.signup.loading}
                        success={this.props.signup.success}
                        errors={this.props.signup.errors}
                        onSubmit={this.signup} />
                </div>
            )
    }
}

const mapStateToProps = (state) => ({
    signup: state.ux.signup,
    confirm: state.ux.signup.confirm
})

export default connect(mapStateToProps)(Signup)