import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

const propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool
}

class DeleteAccount extends Component {
    render () {
        return (
            <div>
                <h2>Delete account</h2>
                <form onSubmit={() => this.props.delete()}>
                    <bs.Button
                        block
                        type='submit'
                        bsStyle='danger'
                        disabled={this.props.loading}>
                        Delete account
                    </bs.Button>
                </form>
            </div>
        )
    }

    static propTypes = propTypes
}

export default DeleteAccount