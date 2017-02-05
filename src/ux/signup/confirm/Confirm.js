import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SUCCESS } from 'api/actions'

import { confirm } from './actions'

const Processing = () => {
    return <p>Processing account confirmation...</p>
}

const Failure = () => {
    return <div>
            <h1 className='page-title'>Confirmation Failed</h1>
            <p>The confirmation token you provided has either expired or it is invalid.</p>
        </div>
}

class Confirm extends Component {

    componentDidMount () {
        if (this.props.confirmKey)
            this.props.dispatch(confirm(this.props.confirmKey))
                .then(action => {
                    if (action.status === SUCCESS) {
                        this.props.dispatch(push(this.props.redirectTarget))
                        return action
                    }
                })
    }

    render () {
        if (this.props.loading || this.props.success)
            return <Processing />
        else
            return <Failure />
    }
}

const mapStateToProps = (state) => ({
    loading: state.ux.signup.confirm.loading,
    success: state.ux.signup.confirm.success
})

Confirm = connect(mapStateToProps)(Confirm)

Confirm.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired,
    confirmKey: React.PropTypes.string.isRequired
}

Confirm.defaultProps = {
    redirectTarget: "/login"
}

export default Confirm