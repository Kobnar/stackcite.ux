import React, { Component } from 'react'

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
                    <input
                        type='submit'
                        className='button-danger'
                        disabled={this.props.loading}
                        value='Delete account'/>
                </form>
            </div>
        )
    }

    static propTypes = propTypes
}

export default DeleteAccount