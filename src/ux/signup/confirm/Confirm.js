import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as confActions from '../../../api/users/confirm/actions'
import * as actions from './actions'

class Confirm extends Component {

    componentDidMount () {
        if (this.props.confirmKey)
            this.props.confirmAccount(this.props.confirmKey)
    }

    _processing = () => {
        return (
            <p>Processing account confirmation...</p>
        )
    }

    _failed = () => {
        return (
            <div>
                <h5>Confirmation Failed</h5>
                <p>The confirmation token you provided has either expired or it is invalid.</p>
            </div>
        )
    }

    render () {
        if (this.props.loading || !this.props.failed)
            return this._processing()
        else
            return this._failed()
    }
}

const mapStateToProps = (state) => ({
    loading: state.api.users.confirm.loading,
    failed: state.ux.signup.confirm.failed
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    confirmAccount(key) { dispatch(actions.confirmAccount(key, ownProps.redirectTarget))}
})

Confirm = connect(mapStateToProps, mapDispatchToProps)(Confirm)

Confirm.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired,
    confirmKey: React.PropTypes.string.isRequired
}

Confirm.defaultProps = {
    redirectTarget: "/login"
}

export default Confirm