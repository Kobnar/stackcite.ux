import React, { Component } from 'react'

import Form from './Form'
import Confirm from './confirm/Confirm'

class Signup extends Component {

    render () {
        var confirmKey = this.props.location.query.confirm
        return (
            <div className="auth-container">
                { confirmKey ? 
                    <Confirm confirmKey={confirmKey}/> :
                    <Form />
                }
            </div>
        )
    }
}

export default Signup